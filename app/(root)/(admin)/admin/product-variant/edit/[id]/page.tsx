'use client';
import { zSchema } from '@/lib/zodSchema';
import BreadCrumb from '@/app/(root)/(admin)/admin/components/BreadCrumb';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { use, useEffect, useState } from 'react';
import slugify from 'slugify';
import axios from 'axios';
import toast from 'react-hot-toast';
import useFetch from '@/hooks/editCallfunction';
import Select from '@/components/application/select';
import Editor from '@/app/(root)/(admin)/admin/components/Editor';
import MediaModal from '@/app/(root)/(admin)/admin/components/MediaModal';
import Image from 'next/image';
import { sizes } from '@/lib/utils';

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface CategoryEditProps {
  params: Promise<{ id: string }>;
}

const breadcrumbData: BreadcrumbItem[] = [
  { label: "Home", href: "/admin/dashboard" },
  { label: "Variants", href: "/admin/product-variant" },
  { label: "Edit variant", href: "" },
];

interface ProductResponse {
  success: boolean;
  data: any[];
}

interface VariantResponse {
  success: boolean;
  data: {
    _id: string;
    product: string;
    color: string;
    sku: string;
    size: string;
    mrp: number;
    sellingPrice: number;
    discountPercentage: number;
    media: any[];
  };
}

const EditProduct: React.FC<CategoryEditProps> = ({ params }) => {

  const { id } = use(params);

  const [loading, setloading] = useState<boolean>(false);
  const [Products, setProducts] = useState<{ label: string, value: string }[]>([]);

  // editor states
  const [open, setOpen] = useState<boolean>(false);
  const [selectedMedia, setSelectedMedia] = useState<string[]>([]);

  const { data: Product } = useFetch<ProductResponse>('/api/product?deleteType=SD');
  const { data: getProductVariant } = useFetch<VariantResponse>(`/api/product-variant/get/${id}`);

  useEffect(() => {
    if (Product && Product.success) {
      const pOptions = Product.data.map((p: any) => ({ label: p.name, value: p._id }));
      setProducts(pOptions)
    }
  }, [Product]);


  // 1. Define the schema
  const formSchema = zSchema.pick({
    _id: true,
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
      _id: id,
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


  useEffect(() => {
    if (getProductVariant && getProductVariant.success) {
      const variant = getProductVariant.data;
      form.reset({
        _id: variant?._id,
        product: variant?.product,
        color: variant?.color,
        sku: variant?.sku,
        size: variant?.size,
        mrp: variant?.mrp,
        sellingPrice: variant?.sellingPrice,
        discountPercentage: variant?.discountPercentage
      });

      if (variant.media) {
        const media = variant.media.map((media: any) => media);
        setSelectedMedia(media);
        // also set the form value for media so validation passes immediately if needed
        const mediaIds = variant.media.map((m: any) => m._id);
        form.setValue('media', mediaIds);
      }
    }
  }, [getProductVariant]);

  // Sync selectedMedia with form state
  useEffect(() => {
    if (selectedMedia) {
      const mediaIds = selectedMedia.map((m: any) => m._id);
      form.setValue('media', mediaIds, { shouldValidate: true });
    }
  }, [selectedMedia]);


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

      const { data: response } = await axios.put('/api/product-variant/update', values);
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
          <h4>Edit variant</h4>
        </CardHeader>
        <CardContent>
          <form className="ios-card gap-5 mt-6 grid md:grid-cols-2 items-center justify-center" onSubmit={form.handleSubmit(onSubmit)}>

            <div className="flex flex-col gap-2">
              <Controller
                control={form.control}
                name="product"
                render={({ field }) => (
                  <Select
                    options={Products}
                    selected={field.value}
                    // When the user selects an item, we update the form form value
                    setSelected={(val: any) => field.onChange(val)}
                    isMulti={false}
                  />
                )}
              />
              {/* Show error for category if validation fails */}
              {form.formState.errors.product && (
                <p className="text-red-500 text-sm">
                  {form.formState.errors.product.message}
                </p>
              )}
            </div>

            {/* sku */}
            <input
              type="text"
              placeholder="Enter sku"
              className="ios-input"
              {...form.register('sku')}
              required
            />
            {form.formState.errors.sku && <p className="text-red-500 text-sm">{form.formState.errors.sku.message}</p>}

            {/* size */}
            <div className="flex flex-col gap-2">
              <Controller
                control={form.control}
                name="size"
                render={({ field }) => (
                  <Select
                    options={sizes}
                    selected={field.value}
                    // When the user selects an item, we update the form form value
                    setSelected={(val: any) => field.onChange(val)}
                    isMulti={false}
                  />
                )}
              />
              {/* Show error for category if validation fails */}
              {form.formState.errors.size && (
                <p className="text-red-500 text-sm">
                  {form.formState.errors.size.message}
                </p>
              )}
            </div>

            {/* color */}
            <input
              type="text"
              placeholder="Enter color"
              className="ios-input"
              {...form.register('color')}
              required
            />

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
              {loading ? "Updating..." : "Update"}
            </button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default EditProduct;