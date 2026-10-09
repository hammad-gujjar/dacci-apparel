export const trackEvent = (eventName: string, eventData?: Record<string, any>) => {
    try {
        // Track locally in the browser console for debugging
        console.log(`[Analytics Foundation] Event: ${eventName}`, eventData);
        
        // DataLayer integration for Google Tag Manager / GA4
        if (typeof window !== 'undefined') {
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
                event: eventName,
                ...eventData,
                timestamp: new Date().toISOString()
            });

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
