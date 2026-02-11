'use client';
import { zSchema } from '@/lib/zodSchema';
import BreadCrumb from '../../components/BreadCrumb';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useEffect, useState } from 'react';
import slugify from 'slugify';
import axios from 'axios';
import toast from 'react-hot-toast';
import useFetch from '@/hooks/editCallfunction';
import Select from '@/components/application/select';
import Editor from '../../components/Editor';
import MediaModal from '../../components/MediaModal';
import Image from 'next/image';

interface BreadcrumbItem {
  label: string;
  href: string;
}

const breadcrumbData: BreadcrumbItem[] = [
  { label: "Home", href: "/admin/dashboard" },
  { label: "Coupons", href: "/admin/coupon" },
  { label: "Add coupon", href: "" },
];

const AddCoupon = () => {
  const [loading, setloading] = useState(false);

  // 1. Define the schema
  const formSchema = zSchema.pick({
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
      code: "",
      discountPercentage: "" as unknown as number,
      minShoppingAmount: "" as unknown as number,
      validity: new Date(),
    },
  });


  const onSubmit = async (values: FormValues) => {
    setloading(true);
    try {
      const { data: response } = await axios.post('/api/coupon/create', values);
      if (!response.success) {
        toast.error(response.message);
      } else {
        form.reset();
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
          <h4>Add Coupon</h4>
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
              {loading ? "Adding..." : "Add coupon"}
            </button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default AddCoupon;