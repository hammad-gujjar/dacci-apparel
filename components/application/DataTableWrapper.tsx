'use client';
import React, { useState, useEffect } from 'react';
import { ThemeProvider } from '@mui/material';
import DataTable, { DataTableProps } from './DataTable';
import { useTheme } from 'next-themes'
import { darkTheme, lightTheme } from '@/lib/materialTheme'

const DataTableWrapper: React.FC<DataTableProps> = ({
    queryKey,
    fetchUrl,
    columnsConfig,
    initialPageSize = 10,
    exportEndPoint,
    deleteEndPoint,
    deleteType,
    trashView,
    createAction
}) => {

  const { resolvedTheme } = useTheme();
  const mounted = React.useSyncExternalStore(
    (onStoreChange) => {
      // No-op subscribe since we only care about initial mount
      return () => {};
    },
    () => true, // Client-side: mounted
    () => false // Server-side: not mounted
  );

  if (!mounted) return null;

  return (
    <ThemeProvider theme={resolvedTheme === 'dark' ? darkTheme : lightTheme}>
      <DataTable
        queryKey={queryKey}
        fetchUrl={fetchUrl}
        columnsConfig={columnsConfig}
        initialPageSize={initialPageSize}
        exportEndPoint={exportEndPoint}
        deleteEndPoint={deleteEndPoint}
        deleteType={deleteType}
        trashView={trashView}
        createAction={createAction}
      />
    </ThemeProvider>
  );
}

export default DataTableWrapper;