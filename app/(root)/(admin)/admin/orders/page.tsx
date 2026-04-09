'use client';

import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import {
    MaterialReactTable,
    useMaterialReactTable,
    type MRT_ColumnDef,
} from 'material-react-table';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import Icon from '@/app/components/Icon';
import toast from 'react-hot-toast';

export default function OrdersPage() {
    const [data, setData] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedOrder, setSelectedOrder] = useState<any | null>(null);

    const fetchOrders = async () => {
        setIsLoading(true);
        try {
            const res = await axios.get('/api/contact/get');
            if (res.data.success) {
                setData(res.data.data);
            }
        } catch (error) {
            console.error("Failed to fetch orders:");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const handleRowClick = async (row: any) => {
        setSelectedOrder(row.original);

        // Remove new mark if it's new
        if (row.original.isNewStatus) {
            try {
                await axios.put(`/api/contact/update/${row.original._id}`, {
                    isNewStatus: false
                });
                // Update local state
                setData(prev => prev.map(item => 
                    item._id === row.original._id ? { ...item, isNewStatus: false } : item
                ));
            } catch (error) {
                console.error("Failed to update status");
            }
        }
    };

    const columns = useMemo<MRT_ColumnDef<any>[]>(
        () => [
            {
                accessorKey: 'isNewStatus',
                header: 'Status',
                size: 100,
                Cell: ({ cell }) => (
                    cell.getValue<boolean>() ? (
                        <span className="px-3 py-1 bg-black text-white text-[10px] uppercase font-bold tracking-widest rounded-full animate-pulse">
                            New
                        </span>
                    ) : (
                        <span className="px-3 py-1 bg-gray-200 text-gray-500 text-[10px] uppercase font-bold tracking-widest rounded-full">
                            Viewed
                        </span>
                    )
                ),
            },
            {
                accessorKey: 'createdAt',
                header: 'Date',
                Cell: ({ cell }) => new Date(cell.getValue<string>()).toLocaleDateString(),
            },
            {
                accessorFn: (row) => `${row.name} / ${row.company || 'Ind.'}`,
                header: 'Client',
                Cell: ({ row }) => (
                    <div>
                        <div className="font-bold">{row.original.name}</div>
                        <div className="text-xs text-gray-500">{row.original.company || '-'}</div>
                    </div>
                )
            },
            {
                accessorKey: 'email',
                header: 'Email',
            },
            {
                accessorKey: 'productType',
                header: 'Product Type',
                Cell: ({ cell }) => <span className="uppercase text-xs font-bold">{cell.getValue<string>()}</span>
            },
            {
                accessorKey: 'deadline',
                header: 'Deadline',
                Cell: ({ cell }) => new Date(cell.getValue<string>()).toLocaleDateString(),
            },
        ],
        []
    );

    const theme = createTheme({
        palette: {
            mode: 'light',
            primary: {
                main: '#000000',
            },
            background: {
                default: '#EDEEE7',
                paper: '#ffffff',
            },
        },
        typography: {
            fontFamily: "inherit",
        },
        components: {
            MuiPaper: {
                styleOverrides: {
                    root: {
                        boxShadow: 'none',
                        border: '1px solid rgba(0,0,0,0.1)',
                        borderRadius: '12px',
                    }
                }
            }
        }
    });

    const table = useMaterialReactTable({
        columns,
        data,
        state: { isLoading },
        muiTableBodyRowProps: ({ row }) => ({
            onClick: () => handleRowClick(row),
            sx: {
                cursor: 'pointer',
                backgroundColor: row.original.isNewStatus ? 'rgba(0,0,0,0.02)' : 'inherit',
                '&:hover': {
                    backgroundColor: 'rgba(0,0,0,0.05)',
                },
            },
        }),
        initialState: {
            sorting: [{ id: 'createdAt', desc: true }],
            pagination: { pageSize: 15, pageIndex: 0 },
        },
    });

    return (
        <div className="w-full min-h-screen bg-[#EDEEE7] p-5 md:p-10 pt-20">
            <div className="max-w-[1400px] mx-auto space-y-8">
                <div className="flex flex-col gap-2">
                    <h1 className="text-4xl font-[main] uppercase tracking-tighter">Orders & Tech Packs</h1>
                    <p className="text-black/50 text-sm font-medium">Manage and review incoming tech pack submissions.</p>
                </div>

                <ThemeProvider theme={theme}>
                    <MaterialReactTable table={table} />
                </ThemeProvider>

                {/* Modal for viewing order details */}
                <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
                    <DialogContent className="max-w-2xl bg-[#EDEEE7] border-black/10 text-black max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle className="text-2xl font-[main] uppercase tracking-tighter border-b border-black/10 pb-4">
                                Tech Pack Specification
                            </DialogTitle>
                        </DialogHeader>

                        {selectedOrder && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-6">
                                <div className="space-y-6">
                                    {/* Client Details */}
                                    <div className="space-y-4">
                                        <h3 className="text-[10px] uppercase font-bold tracking-[0.4em] text-black/40">Client Intel</h3>
                                        <div className="bg-white/50 p-4 rounded-xl border border-black/5 space-y-2">
                                            <p className="text-sm"><span className="font-bold">Name:</span> {selectedOrder.name}</p>
                                            <p className="text-sm"><span className="font-bold">Email:</span> {selectedOrder.email}</p>
                                            <p className="text-sm"><span className="font-bold">Company:</span> {selectedOrder.company || 'N/A'}</p>
                                        </div>
                                    </div>

                                    {/* Product Details */}
                                    <div className="space-y-4">
                                        <h3 className="text-[10px] uppercase font-bold tracking-[0.4em] text-black/40">Product Directive</h3>
                                        <div className="bg-white/50 p-4 rounded-xl border border-black/5 space-y-2">
                                            <p className="text-sm"><span className="font-bold">Type:</span> <span className="uppercase">{selectedOrder.productType}</span></p>
                                            <p className="text-sm"><span className="font-bold">Slug / Ref:</span> {selectedOrder.productSlug || 'N/A'}</p>
                                            <p className="text-sm"><span className="font-bold">Quantity:</span> {selectedOrder.quantity} Units</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    {/* Timeline */}
                                    <div className="space-y-4">
                                        <h3 className="text-[10px] uppercase font-bold tracking-[0.4em] text-black/40">Timeline</h3>
                                        <div className="bg-white/50 p-4 rounded-xl border border-black/5 flex items-center justify-between">
                                            <span className="font-bold text-sm">Target Deadline:</span>
                                            <span className="text-sm text-red-600 font-bold bg-red-100 px-3 py-1 rounded-full">{new Date(selectedOrder.deadline).toLocaleDateString()}</span>
                                        </div>
                                    </div>

                                    {/* Customization Details */}
                                    <div className="space-y-4">
                                        <h3 className="text-[10px] uppercase font-bold tracking-[0.4em] text-black/40">Customization Specs</h3>
                                        <div className="bg-white p-5 rounded-xl border border-black/10 h-48 overflow-y-auto">
                                            <p className="text-sm leading-relaxed whitespace-pre-wrap">{selectedOrder.customizationDetails}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
}
