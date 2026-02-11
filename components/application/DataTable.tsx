'use client';
import React, { useState } from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import toast from 'react-hot-toast';
import {
    MaterialReactTable,
    MRT_ShowHideColumnsButton,
    MRT_ToggleDensePaddingButton,
    MRT_ToggleFullScreenButton,
    MRT_ToggleGlobalFilterButton,
    useMaterialReactTable,
    type MRT_Row,
    type MRT_TableInstance,
} from 'material-react-table';
import Link from 'next/link';
import RecyclingIcon from '@mui/icons-material/Recycling';
import DeleteIcon from '@mui/icons-material/Delete';
import RestorePageIcon from '@mui/icons-material/RestorePage';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import useDeleteMutation from '@/hooks/useDeleteMutation';
import IosShareIcon from '@mui/icons-material/IosShare';
import { download, generateCsv, mkConfig } from 'export-to-csv';

// ----- Interfaces and Types -----
type DataRow = {
    _id: string;
    [key: string]: any;
};

export interface DataTableProps {
    queryKey: string;
    fetchUrl: string;
    columnsConfig: any[]; // You may provide a stricter type for column definitions if available
    initialPageSize?: number;
    exportEndPoint: string;
    deleteEndPoint: string;
    deleteType: 'PD' | 'SD' | string;
    trashView?: string;
    createAction: (
        row: { original: DataRow },
        deleteType: string,
        handleDelete: (ids: string[], deleteType: string) => void
    ) => React.ReactNode;
}

const DataTable: React.FC<DataTableProps> = ({
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
    // State hooks
    const [columnFilters, setColumnFilters] = useState<any[]>([]);
    const [globalFilter, setGlobalFilter] = useState<string>('');
    const [sorting, setSorting] = useState<any[]>([]);
    const [pagination, setPagination] = useState<{ pageIndex: number; pageSize: number }>({
        pageIndex: 0,
        pageSize: initialPageSize,
    });
    const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({});
    const [exportLoading, setExportLoading] = useState<boolean>(false);

    // Delete mutation hook
    const deletemutation = useDeleteMutation(queryKey, deleteEndPoint);

    const handleDelete = (ids: string[], delType: string) => {
        let c: boolean;
        if (delType === 'PD') {
            c = window.confirm('Are you sure to delete permanently');
        } else {
            c = window.confirm('Are you sure to move data in trash');
        }
        if (c) {
            deletemutation.mutate({ ids, deleteType: delType });
            setRowSelection({});
        }
    };

    // Export data method
    const handleExport = async (selectedRows: Array<{ original: DataRow }>) => {
        setExportLoading(true);
        try {
            const csvConfig = mkConfig({
                fieldSeparator: ',',
                decimalSeparator: '.',
                useKeysAsHeaders: true,
                filename: 'csv-data'
            });

            let csv: any;
            if (Object.keys(rowSelection).length > 0) {
                // Export only selected rows
                const rowData = selectedRows.map((row) => row.original);
                csv = generateCsv(csvConfig)(rowData);
            } else {
                // Export all data from the backend
                const { data: response } = await axios.get(exportEndPoint);
                if (!response.success) {
                    toast.error(response.message);
                    return;
                }
                const rowData = response.data;
                csv = generateCsv(csvConfig)(rowData);
            }
            download(csvConfig)(csv);
        } catch (error: any) {
            // `any` used for error to access error.message
            // In production, better error type handling is encouraged.
            // eslint-disable-next-line no-console
            console.log(error);
            toast.error(error?.message || 'An error occurred during export');
        } finally {
            setExportLoading(false);
        }
    };

    // Data fetching (pagination, filter, etc.)
    const {
        data: { data = [], meta } = {},
        isError,
        isRefetching,
        isLoading,
    } = useQuery<{
        data?: DataRow[];
        meta?: { totalRowCount: number };
        success?: boolean;
        message?: string;
    }>({
        queryKey: [queryKey, { columnFilters, globalFilter, pagination, sorting }],
        queryFn: async () => {
            const url = new URL(fetchUrl, process.env.BETTER_AUTH_URL ?? window.location.origin);
            url.searchParams.set('start', `${pagination.pageIndex * pagination.pageSize}`);
            url.searchParams.set('size', `${pagination.pageSize}`);
            url.searchParams.set('filters', JSON.stringify(columnFilters ?? []));
            url.searchParams.set('globalFilter', globalFilter ?? '');
            url.searchParams.set('sorting', JSON.stringify(sorting ?? []));
            url.searchParams.set('deleteType', deleteType);
            const { data: response } = await axios.get(url.href);
            return response;
        },
        placeholderData: keepPreviousData,
    });

    // Table setup
    const table = useMaterialReactTable({
        columns: columnsConfig,
        data,
        enableRowSelection: true,
        columnFilterDisplayMode: 'popover',
        paginationDisplayMode: 'pages',
        enableColumnOrdering: true,
        enableStickyHeader: true,
        enableStickyFooter: true,
        initialState: { showColumnFilters: true },
        manualFiltering: true,
        manualPagination: true,
        manualSorting: true,
        muiToolbarAlertBannerProps: isError
            ? {
                color: 'error',
                children: 'Error loading data',
            }
            : undefined,
        onColumnFiltersChange: setColumnFilters as any, // type in MRT expects OnChangeFn
        onGlobalFilterChange: setGlobalFilter,
        onPaginationChange: setPagination as any,
        onSortingChange: setSorting as any,
        rowCount: meta?.totalRowCount ?? 0,
        onRowSelectionChange: setRowSelection as any,
        state: {
            columnFilters,
            globalFilter,
            isLoading,
            pagination,
            showAlertBanner: isError,
            showProgressBars: isRefetching,
            sorting,
            rowSelection,
        },
        getRowId: (originalRow: DataRow) => originalRow._id,

        renderToolbarInternalActions: ({ table }: { table: any }) => (
            <>
                {/* Built in table toolbar actions */}
                <MRT_ToggleGlobalFilterButton table={table} />
                <MRT_ShowHideColumnsButton table={table} />
                <MRT_ToggleDensePaddingButton table={table} />
                <MRT_ToggleFullScreenButton table={table} />

                {deleteType !== 'PD' && trashView && (
                    <Tooltip title="Recycle Bin">
                        <Link href={trashView}>
                            <IconButton>
                                <RecyclingIcon />
                            </IconButton>
                        </Link>
                    </Tooltip>
                )}

                {deleteType === 'SD' && (
                    <Tooltip title="Delete All">
                        <IconButton
                            disabled={
                                !table.getIsSomeRowsSelected?.() && !table.getIsAllRowsSelected?.()
                            }
                            onClick={() => handleDelete(Object.keys(rowSelection), deleteType)}
                        >
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                )}

                {deleteType === 'PD' && (
                    <>
                        <Tooltip title="Restore Data">
                            <IconButton
                                disabled={
                                    !table.getIsSomeRowsSelected?.() && !table.getIsAllRowsSelected?.()
                                }
                                onClick={() => handleDelete(Object.keys(rowSelection), 'RSD')}
                            >
                                <RestorePageIcon />
                            </IconButton>
                        </Tooltip>

                        <Tooltip title="Permanently Delete Data">
                            <IconButton
                                disabled={
                                    !table.getIsSomeRowsSelected?.() && !table.getIsAllRowsSelected?.()
                                }
                                onClick={() => handleDelete(Object.keys(rowSelection), deleteType)}
                            >
                                <DeleteForeverIcon />
                            </IconButton>
                        </Tooltip>
                    </>
                )}
            </>
        ),

        enableRowActions: true,
        positionActionsColumn: 'last',
        // Fix type by returning ReactNode[] instead of a single ReactNode
        renderRowActionMenuItems: ({
            row,
        }: {
            row: MRT_Row<DataRow>;
            // other props omitted for brevity
        }) => {
            // createAction may return a single node or an array. We ensure an array.
            const actions = createAction({ original: row.original }, deleteType, handleDelete);
            // If already array, return; else, wrap; ignore null/undefined
            if (Array.isArray(actions)) return actions;
            if (actions == null) return [];
            return [actions];
        },
        renderTopToolbarCustomActions: ({ table }: { table: MRT_TableInstance<DataRow> }) => (
            <Tooltip title="Export">
                <button
                    type="button"
                    className="flex items-center gap-1 dark-button"
                    onClick={() => handleExport(table.getSelectedRowModel().rows)}
                    disabled={exportLoading}
                >
                    <IosShareIcon sx={{ fontSize: 20 }} />
                    {exportLoading ? 'Exporting...' : 'Export'}
                </button>
            </Tooltip>
        ),
    });

    return <MaterialReactTable table={table} />;
};

export default DataTable;