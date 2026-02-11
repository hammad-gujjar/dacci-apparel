'use client';
import React, { useCallback, useMemo } from 'react';
import BreadCrumb from '../components/BreadCrumb';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { FiPlus } from "react-icons/fi";
import Link from 'next/link';
import DataTableWrapper from '@/components/application/DataTableWrapper';
import { columnConfig } from '@/lib/columnConfig';
import EditAction from '@/components/application/EditAction';
import DeleteAction from '@/components/application/DeleteAction';
import { DT_COUPON_COLUMN } from '@/lib/column';

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
  { label: "Coupon", href: "" },
];

const ShowCoupon: React.FC = () => {

  const columns = useMemo(() => {
    return columnConfig(DT_COUPON_COLUMN)
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
          href={`/admin/coupon/edit/${row.original._id}`}
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
      <Card className='w-full!'>
        <CardHeader className='pt-3 px-3 border-b [.border-b]:pb-3'>
          <div className='flex items-center justify-between'>
            <h3>Show Coupon</h3>
            <button className='w-fit dark-button'>
              <Link href='/admin/coupon/add' className='flex items-center gap-1'>
                <FiPlus /> New Coupon
              </Link>
            </button>
          </div>
        </CardHeader>
        <CardContent className='px-0 pb-0 w-full overflow-auto'>
          <DataTableWrapper
            queryKey="coupon-data"
            fetchUrl="/api/coupon"
            initialPageSize={10}
            columnsConfig={columns}
            exportEndPoint="/api/coupon/export"
            deleteEndPoint="/api/coupon/delete"
            deleteType="SD"
            trashView="/admin/trash?trashof=coupon"
            createAction={action}
          />
        </CardContent>
      </Card>
    </div>
  );
};
export default ShowCoupon;