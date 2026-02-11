'use client';
import React, { useCallback, useMemo } from 'react';
import BreadCrumb from '../components/BreadCrumb';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import DataTableWrapper from '@/components/application/DataTableWrapper';
import { columnConfig } from '@/lib/columnConfig';
import DeleteAction from '@/components/application/DeleteAction';
import { DT_REVIEW_COLUMN } from '@/lib/column';

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
    { label: "Reviews", href: "" },
];

const ShowReviews: React.FC = () => {

    const columns = useMemo(() => {
        return columnConfig(DT_REVIEW_COLUMN)
    }, [])

    const action = useCallback(
        (
            row: RowType,
            deleteType: DeleteType,
            handleDelete: HandleDelete
        ) => {
            const actionMenu = [];
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
            <Card className='w-full!'>
                <CardHeader className='pt-3 px-3 border-b [.border-b]:pb-3'>
                    <div className='flex items-center justify-between'>
                        <h3>Show Reviews</h3>
                    </div>
                </CardHeader>
                <CardContent className='px-0 pb-0 w-full overflow-auto'>
                    <DataTableWrapper
                        queryKey="reviews-data"
                        fetchUrl="/api/review"
                        initialPageSize={10}
                        columnsConfig={columns}
                        exportEndPoint="/api/review/export"
                        deleteEndPoint="/api/review/delete"
                        deleteType="SD"
                        trashView="/admin/trash?trashof=review"
                        createAction={action}
                    />
                </CardContent>
            </Card>
        </div>
    );
};
export default ShowReviews;