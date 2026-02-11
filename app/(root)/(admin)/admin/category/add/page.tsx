'use client';
import { zSchema } from '@/lib/zodSchema';
import BreadCrumb from '../../components/BreadCrumb';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useEffect, useState } from 'react';
import slugify from 'slugify';
import axios from 'axios';
import toast from 'react-hot-toast';
import { X } from 'lucide-react';


interface BreadcrumbItem {
    label: string;
    href: string;
}

const breadcrumbData: BreadcrumbItem[] = [
    { label: "Home", href: "/admin/dashboard" },
    { label: "Category", href: "/admin/category" },
    { label: "Add", href: "" },
];


const AdCategory = () => {

    const [loading, setloading] = useState(false);
    const [types, setTypes] = useState<string[]>([]);
    const [currentType, setCurrentType] = useState("");

    const formSchema = zSchema.pick({
        name: true,
        slug: true,
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            slug: "",
        },
    });

    useEffect(() => {
        const name = form.getValues('name')
        const slug = form.getValues('slug')
        if (name) {
            return form.setValue('slug', slugify(name).toLowerCase())
        }
        if (slug) {
            return form.setValue('slug', slugify(slug).toLowerCase())
        }
    }, [form.watch('name'), form.watch('slug')])

    const addType = () => {
        if (currentType.trim() && !types.includes(currentType.trim())) {
            setTypes([...types, currentType.trim()]);
            setCurrentType("");
        }
    };

    const removeType = (typeToRemove: string) => {
        setTypes(types.filter(t => t !== typeToRemove));
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addType();
        }
    };

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setloading(true);
        try {
            const payload = {
                ...values,
                types: types
            };
            const { data: response } = await axios.post('/api/category/create', payload);
            if (!response.success) {
                toast.error(response.message);
            } else {
                form.reset();
                setTypes([]);
                toast.success(response.message);
            }
        } catch (err: any) {
            toast.error(err.message);
        }
        finally {
            setloading(false);
        }
    }

    return (
        <div>
            <BreadCrumb breadcrumbData={breadcrumbData} />
            <Card>
                <CardHeader className='pt-3 px-3 border-b [.border-b]:pb-3 '>
                    <h4>Add Category</h4>
                </CardHeader>
                <CardContent>
                    <form className="ios-card space-y-4 mt-6 flex flex-col items-center justify-center" onSubmit={form.handleSubmit(onSubmit)}>
                        <div>
                        </div>
                        {/* Category Name Input */}
                        <input
                            type="text"
                            placeholder="Enter Category Name (e.g., Mens, Womens, Kids)"
                            className="ios-input sm:w-1/2!"
                            {...form.register('name')}
                            required
                        />

                        {/* Slug Input */}
                        <input
                            type="text"
                            placeholder="Enter slug"
                            className="ios-input sm:w-1/2!"
                            {...form.register('slug')}
                            required
                        />

                        {/* Types Input */}
                        <div className="w-full sm:w-1/2 space-y-2">
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    placeholder="Add type (e.g., T-Shirts, Hoodies)"
                                    className="ios-input flex-1"
                                    value={currentType}
                                    onChange={(e) => setCurrentType(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                />
                                <button
                                    type="button"
                                    onClick={addType}
                                    className="px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600"
                                >
                                    Add
                                </button>
                            </div>
                            
                            {/* Display added types */}
                            {types.length > 0 && (
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {types.map((type, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center gap-1 px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-full text-sm"
                                        >
                                            <span>{type}</span>
                                            <button
                                                type="button"
                                                onClick={() => removeType(type)}
                                                className="hover:text-red-600"
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
                            className="w-full sm:w-1/2! dark-button text-white"
                        >
                            {loading ? "Creating..." : "Create"}
                        </button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

export default AdCategory