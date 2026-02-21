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
import { X } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href: string;
}

const breadcrumbData: BreadcrumbItem[] = [
  { label: "Home", href: "/admin/dashboard" },
  { label: "Products", href: "/admin/product" },
  { label: "Add product", href: "" },
];

interface CategoryResponse {
  success: boolean;
  data: any[];
}

const AddProduct = () => {
  const [loading, setloading] = useState(false);
  const [Categories, setCategories] = useState<{ label: string, value: string, types: string[] }[]>([]);
  const [productTypes, setProductTypes] = useState<{ label: string, value: string }[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);


  // editor states
  const [open, setOpen] = useState<boolean>(false);
  const [selectedMedia, setSelectedMedia] = useState<string[]>([]);

  // tag states
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState("");


  const { data: Category } = useFetch<CategoryResponse>('/api/category?deleteType=SD&&size=1000');

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
    tags: true,
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
      tags: [],
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

  const addTag = () => {
    if (currentTag.trim() && !tags.includes(currentTag.trim())) {
      setTags([...tags, currentTag.trim()]);
      setCurrentTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(t => t !== tagToRemove));
  };

  const handleTagKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
  };

  const onSubmit = async (values: FormValues) => {
    setloading(true);
    try {
      if (selectedMedia.length <= 0) {
        toast.error("Please select at least one media");
        return;
      };

      const mediaIds = selectedMedia.map((media: any) => media._id);
      values.media = mediaIds;
      values.tags = tags;

      const { data: response } = await axios.post('/api/product/create', values);
      if (!response.success) {
        toast.error(response.message);
      } else {
        form.reset();
        setSelectedMedia([]);
        setTags([]);
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

            {/* Tags Input */}
            <div className="ios-input col-span-2 space-y-2">
              <label className="text-sm font-medium">Product Tags</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Add tag (e.g., New Arrival, Bestseller)"
                  className="ios-input flex-1 !p-2"
                  value={currentTag}
                  onChange={(e) => setCurrentTag(e.target.value)}
                  onKeyPress={handleTagKeyPress}
                />
                <button
                  type="button"
                  onClick={addTag}
                  className="px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600"
                >
                  Add
                </button>
              </div>

              {/* Display added tags */}
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {tags.map((tag, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-1 px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-full text-sm"
                    >
                      <span>{tag}</span>
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="hover:text-red-600 text-zinc-500 hover:text-red-500 transition-colors"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
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