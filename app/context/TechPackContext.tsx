'use client';
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { authClient } from "@/lib/auth-client";

export interface TechPackItem {
    id: string; // Unique instance ID
    slug: string;
    name: string;
    category: string;
    image: string;
    quantity: number; // Minimum 30 pcs (MOQ)
    color: string;
    sizeRange: string;
    customizationOptions: string[];
    notes?: string;
}

interface TechPackContextType {
    items: TechPackItem[];
    isDrawerOpen: boolean;
    openDrawer: () => void;
    closeDrawer: () => void;
    toggleDrawer: () => void;
    addItem: (item: Omit<TechPackItem, 'id'>) => void;
    removeItem: (id: string) => void;
    updateItem: (id: string, updates: Partial<TechPackItem>) => void;
    clearItems: () => void;
    itemCount: number;
    totalQuantity: number;
}

const BASE_STORAGE_KEY = 'slots_tech_pack';
const GUEST_KEY = `${BASE_STORAGE_KEY}_guest`;
const getUserKey = (userId: string) => `${BASE_STORAGE_KEY}_user_${userId}`;

const DEFAULT_MOQ = 30;

const TechPackContext = createContext<TechPackContextType | undefined>(undefined);

export const TechPackProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { data: session, isPending } = authClient.useSession();
    const [items, setItems] = useState<TechPackItem[]>([]);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isInitialized, setIsInitialized] = useState(false);

    const storageKey = session?.user?.id ? getUserKey(session.user.id) : GUEST_KEY;

    // Load from localStorage and handle guest migration
    useEffect(() => {
        if (isPending) return;

        try {
            if (session?.user?.id) {
                // Authenticated User Flow
                const guestSaved = localStorage.getItem(GUEST_KEY);
                let guestItems: TechPackItem[] = [];
                if (guestSaved) {
                    const parsed = JSON.parse(guestSaved);
                    if (Array.isArray(parsed)) guestItems = parsed;
                }

                const userSaved = localStorage.getItem(storageKey);
                let userItems: TechPackItem[] = [];
                if (userSaved) {
                    const parsed = JSON.parse(userSaved);
                    if (Array.isArray(parsed)) userItems = parsed;
                }

                // Migrate guest items to user if present
                if (guestItems.length > 0) {
                    const merged = [...userItems, ...guestItems];
                    setItems(merged);
                    localStorage.setItem(storageKey, JSON.stringify(merged));
                    localStorage.removeItem(GUEST_KEY);
                } else {
                    setItems(userItems);
                }
            } else {
                // Guest Flow
                const guestSaved = localStorage.getItem(GUEST_KEY);
                if (guestSaved) {
                    const parsed = JSON.parse(guestSaved);
                    if (Array.isArray(parsed)) setItems(parsed);
                } else {
                    setItems([]);
                }
            }
        } catch (e) {
            console.error('Failed to load tech pack items from localStorage:', e);
            setItems([]);
        } finally {
            setIsInitialized(true);
        }
    }, [isPending, session?.user?.id, storageKey]);

    // Save to localStorage on updates after initial load
    useEffect(() => {
        if (!isInitialized) return;
        try {
            localStorage.setItem(storageKey, JSON.stringify(items));
        } catch (e) {
            console.error('Failed to save tech pack items to localStorage:', e);
        }
    }, [items, isInitialized, storageKey]);

    const openDrawer = useCallback(() => setIsDrawerOpen(true), []);
    const closeDrawer = useCallback(() => setIsDrawerOpen(false), []);
    const toggleDrawer = useCallback(() => setIsDrawerOpen(prev => !prev), []);

    const addItem = useCallback((newItem: Omit<TechPackItem, 'id'>) => {
        setItems(prev => {
            // Check if exact same product + color + size exists
            const existingIndex = prev.findIndex(
                item => item.slug === newItem.slug && item.color === newItem.color && item.sizeRange === newItem.sizeRange
            );

            if (existingIndex > -1) {
                const updated = [...prev];
                updated[existingIndex] = {
                    ...updated[existingIndex],
                    quantity: updated[existingIndex].quantity + (newItem.quantity || DEFAULT_MOQ),
                    customizationOptions: Array.from(new Set([
                        ...updated[existingIndex].customizationOptions,
                        ...newItem.customizationOptions
                    ])),
                    notes: newItem.notes || updated[existingIndex].notes,
                };
                return updated;
            }

            const itemWithId: TechPackItem = {
                ...newItem,
                id: `${newItem.slug}-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
                quantity: Math.max(newItem.quantity || DEFAULT_MOQ, DEFAULT_MOQ),
                customizationOptions: newItem.customizationOptions || ['Sublimation', 'Private Label'],
            };
            return [...prev, itemWithId];
        });
        setIsDrawerOpen(true);
    }, []);

    const removeItem = useCallback((id: string) => {
        setItems(prev => prev.filter(item => item.id !== id));
    }, []);

    const updateItem = useCallback((id: string, updates: Partial<TechPackItem>) => {
        setItems(prev => prev.map(item => {
            if (item.id !== id) return item;
            const updated = { ...item, ...updates };
            if (typeof updates.quantity === 'number') {
                updated.quantity = Math.max(updates.quantity, DEFAULT_MOQ);
            }
            return updated;
        }));
    }, []);

    const clearItems = useCallback(() => {
        setItems([]);
    }, []);

    const itemCount = items.length;
    const totalQuantity = items.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <TechPackContext.Provider
            value={{
                items,
                isDrawerOpen,
                openDrawer,
                closeDrawer,
                toggleDrawer,
                addItem,
                removeItem,
                updateItem,
                clearItems,
                itemCount,
                totalQuantity,
            }}
        >
            {children}
        </TechPackContext.Provider>
    );
};

export const useTechPack = (): TechPackContextType => {
    const context = useContext(TechPackContext);
    if (!context) {
        throw new Error('useTechPack must be used within a TechPackProvider');
    }
    return context;
};
