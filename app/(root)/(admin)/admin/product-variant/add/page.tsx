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
import { sizes } from '@/lib/utils';

interface BreadcrumbItem {
  label: string;
  href: string;
}

const breadcrumbData: BreadcrumbItem[] = [
  { label: "Home", href: "/admin/dashboard" },
  { label: "Variant", href: "/admin/product-variant" },
  { label: "Add variant", href: "" },
];

interface ProductResponse {
  success: boolean;
  data: any[];
}

const AddProduct = () => {
  const [loading, setloading] = useState(false);
  const [products, setProducts] = useState<{ label: string, value: string }[]>([]);


  // editor states
  const [open, setOpen] = useState<boolean>(false);
  const [selectedMedia, setSelectedMedia] = useState<string[]>([]);


  const { data: getProduct } = useFetch<ProductResponse>('/api/product?deleteType=SD&&size=10000');

  useEffect(() => {
    if (getProduct && getProduct.success) {
      const pOptions = getProduct.data.map((p: any) => ({ label: p.name, value: p._id }));
      setProducts(pOptions)
    }
  }, [getProduct])


  // 1. Define the schema
  const formSchema = zSchema.pick({
    product: true,
    color: true,
    sku: true,
    size: true,
    mrp: true,
    sellingPrice: true,
    discountPercentage: true,
    media: true,
  });

  // 2. Infer the type from the schema
  type FormValues = z.infer<typeof formSchema>;

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      product: "",
      color: "",
      sku: "",
      size: "",
      mrp: "" as unknown as number,
      sellingPrice: "" as unknown as number,
      discountPercentage: "" as unknown as number,
      media: [],
    },
  });

  // discountPercentage calculation
  useEffect(() => {
    const mrp = form.getValues('mrp');
    const sellingPrice = form.getValues('sellingPrice');
    if (mrp && sellingPrice && Number(mrp) > 0) {
      const discountPercentage = Math.round(((Number(mrp) - Number(sellingPrice)) / Number(mrp)) * 100);
      form.setValue('discountPercentage', discountPercentage);
    }
  }, [form.watch('mrp'), form.watch('sellingPrice'), form]);


  const onSubmit = async (values: FormValues) => {
    setloading(true);
    try {
      if (selectedMedia.length <= 0) {
        toast.error("Please select at least one media");
        return;
      };

      const mediaIds = selectedMedia.map((media: any) => media._id);
      values.media = mediaIds;

      const { data: response } = await axios.post('/api/product-variant/create', values);
      if (!response.success) {
        toast.error(response.message);
      } else {
        form.reset();
        setSelectedMedia([]);
        toast.success(response.message);
      }
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setloading(false);
    }
  }

  const onError = (errors: any) => {
    console.log("Form validation errors:", errors);

    const firstError = Object.values(errors)[0] as any;

    if (firstError?.message) {
      toast.error(firstError.message);
    } else {
      toast.error("Please fix the form errors");
    }
  };


  return (
    <div>
      <BreadCrumb breadcrumbData={breadcrumbData} />
      <Card>
        <CardHeader className='pt-3 px-3 border-b [.border-b]:pb-3 '>
          <h4>Add Variant</h4>
        </CardHeader>
        <CardContent>
          <form className="ios-card gap-5 mt-6 grid md:grid-cols-2 items-center justify-center" onSubmit={form.handleSubmit(onSubmit, onError)}>


            <div className="flex flex-col gap-2">
              <Controller
                control={form.control}
                name="product"
                render={({ field }) => (
                  <Select
                    options={products}
                    selected={field.value}
                    setSelected={(val: any) => field.onChange(val)}
                    isMulti={false}
                  />
                )}
              />
              {form.formState.errors.product && (
                <p className="text-red-500 text-sm">
                  {form.formState.errors.product.message}
                </p>
              )}
            </div>

            {/* Name */}
            <input
              type="text"
              placeholder="Enter SKU"
              className="ios-input"
              {...form.register('sku')}
              required
            />
            {form.formState.errors.sku && <p className="text-red-500 text-sm">{form.formState.errors.sku.message}</p>}

            {/* Slug */}
            <input
              type="text"
              placeholder="Enter color"
              className="ios-input"
              {...form.register('color')}
              required
            />

            <div className="flex flex-col gap-2">
              <Controller
                control={form.control}
                name="size"
                render={({ field }) => (
                  <Select
                    options={sizes}
                    selected={field.value}
                    setSelected={(val: any) => field.onChange(val)}
                    isMulti={false}
                  />
                )}
              />
              {form.formState.errors.product && (
                <p className="text-red-500 text-sm">
                  {form.formState.errors.product.message}
                </p>
              )}
            </div>

            {/* MRP */}
            <input
              type="number"
              placeholder="Enter MRP"
              className="ios-input"
              {...form.register('mrp')}
              required
            />
            {form.formState.errors.mrp && <p className="text-red-500 text-sm">{form.formState.errors.mrp.message}</p>}

            {/* Selling Price */}
            <input
              type="number"
              placeholder="Enter sellingPrice"
              className="ios-input"
              {...form.register('sellingPrice')}
              required
            />

            {/* Discount Percentage */}
            <input
              type="number"
              placeholder="Enter discount Percentage"
              className="ios-input"
              {...form.register('discountPercentage')}
              required
              readOnly
            />

            <div className='col-span-2 ios-input flex flex-col items-center justify-center gap-5'>
              <MediaModal
                open={open}
                setOpen={setOpen}
                selectedMedia={selectedMedia}
                setSelectedMedia={setSelectedMedia}
                isMultiple={true}
              />
              {selectedMedia.length > 0 &&
                <div className='flex gap-2 flex-wrap'>
                  {selectedMedia.map((media: any) => (
                    <div key={media._id} className='w-24 h-24 ios-card p-0!'>
                      <Image
                        src={media.secure_url}
                        alt='selectedMedia'
                        fill
                        className='object-cover size-full'
                      />
                    </div>
                  ))}
                </div>
              }

              <div onClick={() => setOpen(true)} className='dark-button w-fit'>
                Select Media
              </div>

            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-1/2! justify-self-center dark-button text-white col-span-2"
            >
              {loading ? "Adding..." : "Add variant"}
            </button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default AddProduct;