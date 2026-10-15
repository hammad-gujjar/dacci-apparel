export const trackEvent = (eventName: string, eventData?: Record<string, any>) => {
    try {
        // Track locally in the browser console for debugging
        console.log(`[Analytics Foundation] Event: ${eventName}`, eventData);
        
        // Single event-delivery method to prevent duplicate tracking
        if (typeof window !== 'undefined') {
            // Priority 1: Direct Google Analytics 4 (gtag.js) — configured in app/layout.tsx
            if (typeof (window as any).gtag === 'function') {
                (window as any).gtag('event', eventName, eventData);
            } else if (Array.isArray(window.dataLayer)) {
                // Priority 2: Fallback to Google Tag Manager dataLayer only if gtag is absent
                window.dataLayer.push({
                    event: eventName,
                    ...eventData,
                    timestamp: new Date().toISOString()
                });
            }

            // If a specific CRM/marketing pixel is added later, it will intercept this
            // e.g. fbq('track', eventName, eventData);
        }
    } catch (error) {
        console.error('Analytics tracking failed:', error);
    }
};

// Global augmentation for the window object to prevent TS errors
declare global {
    interface Window {
        dataLayer: any[];
    }
}
