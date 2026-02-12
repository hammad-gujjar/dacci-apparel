import { Chip } from "@mui/material"
import dayjs from "dayjs"
import Image from "next/image"

export const DT_CATEGORY_COLUMN = [
    {
        accessorKey: 'name',
        header: 'Category Name',
    },
    {
        accessorKey: 'slug',
        header: 'Slug',
    },
]

export const DT_PRODUCT_COLUMN = [
    {
        accessorKey: 'name',
        header: 'Product Name',
    },
    {
        accessorKey: 'slug',
        header: 'Slug',
    },
    {
        accessorKey: 'category',
        header: 'Category',
    },
    {
        accessorKey: 'sellingPrice',
        header: 'Price',
    },
    {
        accessorKey: 'mrp',
        header: 'MRP',
    },
    {
        accessorKey: 'discountPercentage',
        header: 'Discount',
    },
]

export const DT_PRODUCT_VARIANT_COLUMN = [
    {
        accessorKey: 'product',
        header: 'Product Name',
    },
    {
        accessorKey: 'color',
        header: 'color',
    },
    {
        accessorKey: 'size',
        header: 'size',
    },
    {
        accessorKey: 'sku',
        header: 'sku',
    },
    {
        accessorKey: 'sellingPrice',
        header: 'Price',
    },
    {
        accessorKey: 'mrp',
        header: 'MRP',
    },
    {
        accessorKey: 'discountPercentage',
        header: 'Discount',
    },
]

export const DT_COUPON_COLUMN = [
    {
        accessorKey: 'code',
        header: 'Code',
    },
    {
        accessorKey: 'discountPercentage',
        header: 'Discount Percentage',
    },
    {
        accessorKey: 'minShoppingAmount',
        header: 'Min Shopping Amount',
    },
    {
        accessorKey: 'validity',
        header: 'Validity',
        Cell: ({ renderedCellValue }: { renderedCellValue: unknown }) =>
            new Date() > new Date(String(renderedCellValue)) ?
                <Chip label={dayjs(renderedCellValue as string).format('DD/MM/YYYY')} color="error" />
                :
                <Chip label={dayjs(renderedCellValue as string).format('DD/MM/YYYY')} color="success" />
    },
]

export const DT_CUSTOMER_COLUMN = [
    {
        accessorKey: 'image',
        header: 'Avatar',
        Cell: ({ renderedCellValue }: { renderedCellValue: unknown }) =>
            <Image 
                src={(renderedCellValue as string) || "https://i.pinimg.com/736x/4c/6f/12/4c6f1205a136d44eb22c4edfaa0603d2.jpg"} 
                alt="avatar" 
                width={40} 
                height={40} 
                className='w-10 h-10 rounded-full' 
            />
    },
    {
        accessorKey: 'name',
        header: 'Name',
    },
    {
        accessorKey: 'email',
        header: 'Email',
    },
    {
        accessorKey: 'phone',
        header: 'Phone',
    },
    {
        accessorKey: 'emailVerified',
        header: 'Email Verified',
        Cell: ({ renderedCellValue }: { renderedCellValue: unknown }) =>
            renderedCellValue ?
                <Chip label="Verified" color="success" />
                :
                <Chip label="Not Verified" color="error" />
    },
]

export const DT_REVIEW_COLUMN = [
    {
        accessorKey: 'user',
        header: 'User',
    },
    {
        accessorKey: 'product',
        header: 'Product',
    },
    {
        accessorKey: 'title',
        header: 'Title',
    },
    {
        accessorKey: 'rating',
        header: 'Rating',
    },
    {
        accessorKey: 'review',
        header: 'Review',
    },
    {
        accessorKey: 'createdAt',
        header: 'Created At',
        Cell: ({ renderedCellValue }: { renderedCellValue: unknown }) =>
            dayjs(renderedCellValue as string).format('DD/MM/YYYY'),
    },
]
