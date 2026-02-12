'use client';
import { zSchema } from '@/lib/zodSchema';
import BreadCrumb from '@/app/(root)/(admin)/admin/components/BreadCrumb';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { use, useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import useFetch from '@/hooks/editCallfunction';
import dayjs from 'dayjs';

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface CategoryEditProps {
  params: Promise<{ id: string }>;
}

const breadcrumbData: BreadcrumbItem[] = [
  { label: "Home", href: "/admin/dashboard" },
  { label: "Coupons", href: "/admin/coupon" },
  { label: "Edit coupon", href: "" },
];

interface CouponResponse {
  success: boolean;
  data: {
    _id: string;
    code: string;
    discountPercentage: number;
    minShoppingAmount: number;
    validity: string | Date;
  };
  message?: string;
}

const EditCoupon: React.FC<CategoryEditProps> = ({ params }) => {

  const { id } = use(params);

  const [loading, setloading] = useState<boolean>(false);

  const { data: getCoupon } = useFetch<CouponResponse>(`/api/coupon/get/${id}`);

  // 1. Define the schema
  const formSchema = zSchema.pick({
    _id: true,
    code: true,
    discountPercentage: true,
    minShoppingAmount: true,
    validity: true,
  });

  // 2. Infer the type from the schema
  type FormValues = z.infer<typeof formSchema>;

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      _id: id,
      code: "",
      discountPercentage: "" as unknown as number,
      minShoppingAmount: "" as unknown as number,
      validity: new Date(),
    },
  });

  useEffect(() => {
    if (getCoupon && getCoupon.success) {
      const coupon = getCoupon.data;
      form.reset({
        _id: coupon?._id,
        code: coupon?.code,
        discountPercentage: coupon?.discountPercentage,
        minShoppingAmount: coupon?.minShoppingAmount,
        validity: dayjs(coupon?.validity).format('YYYY-MM-DD'),
      });
    }
  }, [getCoupon]);

  const onSubmit = async (values: FormValues) => {
    setloading(true);
    try {
      const { data: response } = await axios.put('/api/coupon/update', values);
      if (!response.success) {
        toast.error(response.message);
      } else {
        toast.success(response.message);
      }
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setloading(false);
    }
  }

  return (
    <div>
      <BreadCrumb breadcrumbData={breadcrumbData} />
      <Card>
        <CardHeader className='pt-3 px-3 border-b [.border-b]:pb-3 '>
          <h4>Edit Coupon</h4>
        </CardHeader>
        <CardContent>

          <form className="ios-card gap-5 mt-6 grid md:grid-cols-2 items-center justify-center" onSubmit={form.handleSubmit(onSubmit)}>

            {/* Code */}
            <input
              type="text"
              placeholder="Enter Code"
              className="ios-input"
              {...form.register('code')}
              required
            />

            {/* Discount Percentage */}
            <input
              type="number"
              placeholder="Enter discount Percentage"
              className="ios-input"
              {...form.register('discountPercentage')}
              required
            />

            {/* minShoppingAmount */}
            <input
              type="number"
              placeholder="Enter min Shopping Amount"
              className="ios-input"
              {...form.register('minShoppingAmount')}
              required
            />

            {/* validity */}
            <input
              type="date"
              className="ios-input"
              {...form.register('validity')}
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-1/2! justify-self-center dark-button text-white col-span-2"
            >
              {loading ? "Updating..." : "Update"}
            </button>
          </form>

        </CardContent>
      </Card>
    </div>
  )
}

export default EditCoupon;