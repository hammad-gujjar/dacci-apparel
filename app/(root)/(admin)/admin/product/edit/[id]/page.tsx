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

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface CategoryEditProps {
  params: Promise<{ id: string }>;
}

const breadcrumbData: BreadcrumbItem[] = [
  { label: "Home", href: "/admin/dashboard" },
  { label: "Products", href: "/admin/product" },
  { label: "Edit product", href: "" },
];

const EditProduct: React.FC<CategoryEditProps> = ({ params }) => {

  const { id } = use(params);

  const [loading, setloading] = useState<boolean>(false);
  const [Categories, setCategories] = useState<string[]>([]);

  // editor states
  const [open, setOpen] = useState<boolean>(false);
  const [selectedMedia, setSelectedMedia] = useState<string[]>([]);

  const { data: Category } = useFetch('/api/category?deleteType=SD&&size=1000');
  const { data: getProduct } = useFetch(`/api/product/get/${id}`);

  useEffect(() => {
    if (Category && Category.success) {
      const catOptions = Category.data.map((cat: any) => ({ label: cat.name, value: cat._id }));
      setCategories(catOptions)
    }
  }, [Category]);


  // 1. Define the schema
  const formSchema = zSchema.pick({
    _id: true,
    name: true,
    slug: true,
    category: true,
    mrp: true,
    sellingPrice: true,
    discountPercentage: true,
    description: true,
    media: true,
  });

  // 2. Infer the type from the schema
  type FormValues = z.infer<typeof formSchema>;

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      _id: id,
      name: "",
      slug: "",
      category: "",
      mrp: "" as unknown as number,
      sellingPrice: "" as unknown as number,
      discountPercentage: "" as unknown as number,
      description: "",
      media: [],
    },
  });


  useEffect(() => {
    if (getProduct && getProduct.success) {
      const product = getProduct.data;
      form.reset({
        _id: product?._id,
        name: product?.name,
        slug: product?.slug,
        category: product?.category,
        mrp: product?.mrp,
        sellingPrice: product?.sellingPrice,
        discountPercentage: product?.discountPercentage,
        description: product?.description,
      });

      if (product.media) {
        const media = product.media.map((media: any) => media);
        setSelectedMedia(media);
        // also set the form value for media so validation passes immediately if needed
        const mediaIds = product.media.map((m: any) => m._id);
        form.setValue('media', mediaIds);
      }
    }
  }, [getProduct]);

  // Sync selectedMedia with form state
  useEffect(() => {
    if (selectedMedia) {
      const mediaIds = selectedMedia.map((m: any) => m._id);
      form.setValue('media', mediaIds, { shouldValidate: true });
    }
  }, [selectedMedia]);

  useEffect(() => {
    const name = form.getValues('name')
    if (name) {
      form.setValue('slug', slugify(name, { lower: true }));
    }
  }, [form.watch('name'), form]);


  // discountPercentage calculation
  useEffect(() => {
    const mrp = form.getValues('mrp');
    const sellingPrice = form.getValues('sellingPrice');
    if (mrp && sellingPrice && Number(mrp) > 0) {
      const discountPercentage = Math.round(((Number(mrp) - Number(sellingPrice)) / Number(mrp)) * 100);
      form.setValue('discountPercentage', discountPercentage);
    }
  }, [form.watch('mrp'), form.watch('sellingPrice'), form]);


  const editor = (event: any, editor: any) => {
    // editor function
    const data = editor.getData()
    form.setValue('description', data, { shouldValidate: true })
  }

  const onSubmit = async (values: FormValues) => {
    setloading(true);
    try {
      if (selectedMedia.length <= 0) {
        toast.error("Please select at least one media");
        return;
      };

      const mediaIds = selectedMedia.map((media: any) => media._id);
      values.media = mediaIds;

      const { data: response } = await axios.put('/api/product/update', values);
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
          <h4>Edit Product</h4>
        </CardHeader>
        <CardContent>
          <form className="ios-card gap-5 mt-6 grid md:grid-cols-2 items-center justify-center" onSubmit={form.handleSubmit(onSubmit)}>

            {/* Name */}
            <input
              type="text"
              placeholder="Enter Product Name"
              className="ios-input"
              {...form.register('name')}
              required
            />
            {form.formState.errors.name && <p className="text-red-500 text-sm">{form.formState.errors.name.message}</p>}

            {/* Slug */}
            <input
              type="text"
              placeholder="Enter slug"
              className="ios-input"
              {...form.register('slug')}
              required
            />

            {/* Category */}
            {/* Category */}
            <div className="flex flex-col gap-2">
              <Controller
                control={form.control}
                name="category"
                render={({ field }) => (
                  <Select
                    options={Categories}
                    selected={field.value}
                    // When the user selects an item, we update the form form value
                    setSelected={(val: any) => field.onChange(val)}
                    isMulti={false}
                  />
                )}
              />
              {/* Show error for category if validation fails */}
              {form.formState.errors.category && (
                <p className="text-red-500 text-sm">
                  {form.formState.errors.category.message}
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

            <div className="flex flex-col gap-2 col-span-2">
              <Controller
                control={form.control}
                name="description"
                render={({ field }) => (
                  <Editor onChange={editor} initialData={field.value} />
                )}
              />
              {/* Show error for category if validation fails */}
              {form.formState.errors.description && (
                <p className="text-red-500 text-sm">
                  {form.formState.errors.description.message}
                </p>
              )}
            </div>

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
              {loading ? "Editing..." : "Edit product"}
            </button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default EditProduct;