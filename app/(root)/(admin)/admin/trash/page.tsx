'use client';
import React, { useCallback, useMemo } from 'react';
import BreadCrumb from '../components/BreadCrumb';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import DataTableWrapper from '@/components/application/DataTableWrapper';
import { columnConfig } from '@/lib/columnConfig';
import { DT_CATEGORY_COLUMN, DT_PRODUCT_COLUMN, DT_PRODUCT_VARIANT_COLUMN, DT_COUPON_COLUMN, DT_REVIEW_COLUMN } from '@/lib/column';
import DeleteAction from '@/components/application/DeleteAction';
import { useSearchParams } from 'next/navigation'

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





const TRASH_CONFIG = {
    category: {
        title: 'Category Trash',
        columns: DT_CATEGORY_COLUMN,
        fetchUrl: '/api/category',
        exportUrl: '/api/category/export',
        deleteUrl: '/api/category/delete',
    },

    product: {
        title: 'Product Trash',
        columns: DT_PRODUCT_COLUMN,
        fetchUrl: '/api/product',
        exportUrl: '/api/product/export',
        deleteUrl: '/api/product/delete',
    },

    "product-variant": {
        title: 'Product-variant Trash',
        columns: DT_PRODUCT_VARIANT_COLUMN,
        fetchUrl: '/api/product-variant',
        exportUrl: '/api/product-variant/export',
        deleteUrl: '/api/product-variant/delete',
    },

    coupon: {
        title: 'Coupon Trash',
        columns: DT_COUPON_COLUMN,
        fetchUrl: '/api/coupon',
        exportUrl: '/api/coupon/export',
        deleteUrl: '/api/coupon/delete',
    },

    review: {
        title: 'Review Trash',
        columns: DT_REVIEW_COLUMN,
        fetchUrl: '/api/review',
        exportUrl: '/api/review/export',
        deleteUrl: '/api/review/delete',
    },
} as const;

type TrashKey = keyof typeof TRASH_CONFIG;

const Category: React.FC = () => {

    const searchParams = useSearchParams()
    const trash = searchParams.get('trashof') as TrashKey | null;

    // 🚨 Guard: invalid or missing trash key
    if (!trash || !(trash in TRASH_CONFIG)) {
        return <div>Invalid trash type</div>;
    }

    const config = TRASH_CONFIG[trash]

    const breadcrumbData: BreadcrumbItem[] = [
        { label: "Home", href: "/admin/dashboard" },
        { label: trash === 'product' ? "Product" : trash === 'product-variant' ? "Variant" : trash === 'coupon' ? "Coupon" : trash === 'review' ? "Reviews" : "Category", href: `/admin/${trash}` },
        { label: "Trash", href: "" },
    ];

    const columns = useMemo(() => {
        return columnConfig(config.columns, false, false, true)
    }, [])

    const action = useCallback(
        (
            row: RowType,
            deleteType: DeleteType,
            handleDelete: HandleDelete
        ) => {
            return [
                <DeleteAction
                    key="delete"
                    handleDelete={handleDelete}
                    row={row}
                    deleteType={deleteType}
                />];
        },
        []
    );

    return (
        <div>
            <BreadCrumb breadcrumbData={breadcrumbData} />
            <Card>
                <CardHeader className='pt-3 px-3 border-b [.border-b]:pb-3'>
                    <div className='flex items-center justify-between'>
                        <h3>{config.title}</h3>
                    </div>
                </CardHeader>
                <CardContent className='px-0 pb-0'>
                    <DataTableWrapper
                        queryKey={`${trash}-category-data`}
                        fetchUrl={config.fetchUrl}
                        initialPageSize={10}
                        columnsConfig={columns}
                        exportEndPoint={config.exportUrl}
                        deleteEndPoint={config.deleteUrl}
                        deleteType="PD"
                        createAction={action}
                    />
                </CardContent>
            </Card>
        </div>
    );
};

export default Category;