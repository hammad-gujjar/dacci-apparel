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
  { label: "Products", href: "/admin/product" },
  { label: "Add product", href: "" },
];

const AddProduct = () => {
  const [loading, setloading] = useState(false);
  const [Categories, setCategories] = useState([]);
  const [productTypes, setProductTypes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);


  // editor states
  const [open, setOpen] = useState<boolean>(false);
  const [selectedMedia, setSelectedMedia] = useState<string[]>([]);


  const { data: Category } = useFetch('/api/category?deleteType=SD&&size=1000');

  useEffect(() => {
    if (Category && Category.success) {
      const catOptions = Category.data.map((cat: any) => ({ label: cat.name, value: cat._id, types: cat.types || [] }));
      setCategories(catOptions)
    }
  }, [Category])


  // 1. Define the schema
  const formSchema = zSchema.pick({
    name: true,
    slug: true,
    category: true,
    productType: true,
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
      name: "",
      slug: "",
      category: "",
      productType: "",
      mrp: "" as unknown as number,
      sellingPrice: "" as unknown as number,
      discountPercentage: "" as unknown as number,
      description: "",
      media: [],
    },
  });

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

  // Update product types when category changes
  useEffect(() => {
    const categoryId = form.watch('category');
    if (categoryId) {
      const category = Categories.find((cat: any) => cat.value === categoryId);
      if (category) {
        setSelectedCategory(category);
        const typeOptions = (category as any).types.map((type: string) => ({ label: type, value: type }));
        setProductTypes(typeOptions);
        // Reset product type when category changes
        form.setValue('productType', '');
      }
    } else {
      setProductTypes([]);
      setSelectedCategory(null);
    }
  }, [form.watch('category'), Categories, form]);


  const editor = (event: any, editor: any) => {
    // editor function
    const data = editor.getData()
    form.setValue('description', data)
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

      const { data: response } = await axios.post('/api/product/create', values);
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

  return (
    <div>
      <BreadCrumb breadcrumbData={breadcrumbData} />
      <Card>
        <CardHeader className='pt-3 px-3 border-b [.border-b]:pb-3 '>
          <h4>Add Product</h4>
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
            <div className="flex flex-col gap-2">
              <Controller
                control={form.control}
                name="category"
                render={({ field }) => (
                  <Select
                    options={Categories}
                    selected={field.value}
                    setSelected={(val: any) => field.onChange(val)}
                    isMulti={false}
                  />
                )}
              />
              {form.formState.errors.category && (
                <p className="text-red-500 text-sm">
                  {form.formState.errors.category.message}
                </p>
              )}
            </div>

            {/* Product Type */}
            <div className="flex flex-col gap-2 relative">
              <Controller
                control={form.control}
                name="productType"
                render={({ field }) => (
                  <Select
                    options={productTypes}
                    selected={field.value}
                    setSelected={(val: any) => field.onChange(val)}
                    isMulti={false}
                  />
                )}
              />
              {form.formState.errors.productType && (
                <p className="text-red-500 text-sm">
                  {form.formState.errors.productType.message}
                </p>
              )}
              {!selectedCategory && (
                <p className="text-sm text-gray-500 absolute bottom-[-1.3vw] left-1">Select a category first</p>
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
              placeholder="Selling Price"
              className="ios-input"
              {...form.register('sellingPrice')}
              required
            />

            {/* Discount Percentage */}
            <input
              type="number"
              placeholder="Discount %"
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
              {loading ? "Adding..." : "Add product"}
            </button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default AddProduct;