'use client';
import React, { useCallback, useMemo } from 'react';
import BreadCrumb from '../components/BreadCrumb';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { FiPlus } from "react-icons/fi";
import Link from 'next/link';
import DataTableWrapper from '@/components/application/DataTableWrapper';
import { columnConfig } from '@/lib/columnConfig';
import { DT_CATEGORY_COLUMN } from '@/lib/column';
import EditAction from '@/components/application/EditAction';
import DeleteAction from '@/components/application/DeleteAction';

interface BreadcrumbItem {
    label: string;
    href: string;
}

// Fix types for table rows and action
type RowType = {
    original: { _id: string }
};

type DeleteType = string;
type HandleDelete = (ids: string[], deleteType: DeleteType) => void;

const breadcrumbData: BreadcrumbItem[] = [
    { label: "Home", href: "/admin/dashboard" },
    { label: "category", href: "" },
];

const Category: React.FC = () => {

    const columns = useMemo(() => {
        return columnConfig(DT_CATEGORY_COLUMN)
    }, [])

    const action = useCallback(
        (
            row: RowType,
            deleteType: DeleteType,
            handleDelete: HandleDelete
        ) => {
            const actionMenu = [];
            actionMenu.push(
                <EditAction
                    key="edit"
                    href={`/admin/category/edit/${row.original._id}`}
                />
            );
            actionMenu.push(
                <DeleteAction
                    key="delete"
                    handleDelete={handleDelete}
                    row={row}
                    deleteType={deleteType}
                />
            );
            return actionMenu;
        },
        []
    );

    return (
        <div>
            <BreadCrumb breadcrumbData={breadcrumbData} />
            <Card>
                <CardHeader className='pt-3 px-3 border-b [.border-b]:pb-3'>
                    <div className='flex items-center justify-between'>
                        <h3>Show Category</h3>
                        <button className='w-fit dark-button'>
                            <Link href='/admin/category/add' className='flex items-center gap-1'>
                                <FiPlus /> New Category
                            </Link>
                        </button>
                    </div>
                </CardHeader>
                <CardContent className='px-0 pb-0'>
                    <DataTableWrapper
                        queryKey="category-data"
                        fetchUrl="/api/category"
                        initialPageSize={10}
                        columnsConfig={columns}
                        exportEndPoint="/api/category/export"
                        deleteEndPoint="/api/category/delete"
                        deleteType="SD"
                        trashView="/admin/trash?trashof=category"
                        createAction={action}
                    />
                </CardContent>
            </Card>
        </div>
    );
};

export default Category;