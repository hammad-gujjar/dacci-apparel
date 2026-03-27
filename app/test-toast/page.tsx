'use client';

import toast from 'react-hot-toast';

export default function TestToastPage() {
  const notifySuccess = () => toast.success('Successfully saved your changes to the cloud.', {
    iconTheme: {
      primary: '#34c759',
      secondary: '#fff',
    },
  });
  const notifyError = () => toast.error('Could not complete the request. Please try again.', {
    iconTheme: {
      primary: '#ff3b30',
      secondary: '#fff',
    },
  });
  const notifyDefault = () => toast('A new system update is available for your Mac.', {
    icon: 'ℹ️',
  });

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#EDEEE7] gap-6 p-10">
      <h1 className="text-4xl font-bold mb-8">macOS Toast Test</h1>
      <div className="flex gap-4">
        <button 
          onClick={notifySuccess}
          className="px-6 py-3 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 transition-colors font-medium"
        >
          Trigger Success
        </button>
        <button 
          onClick={notifyError}
          className="px-6 py-3 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 transition-colors font-medium"
        >
          Trigger Error
        </button>
        <button 
          onClick={notifyDefault}
          className="px-6 py-3 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 transition-colors font-medium"
        >
          Trigger Info
        </button>
      </div>
      
      <div className="mt-12 p-8 rounded-2xl bg-white/30 backdrop-blur-xl border border-white/20 shadow-xl max-w-md text-center">
        <p className="text-gray-600">
          This page allows you to test the glassmorphism and typography of the new toast notifications.
        </p>
      </div>
    </div>
  );
}
