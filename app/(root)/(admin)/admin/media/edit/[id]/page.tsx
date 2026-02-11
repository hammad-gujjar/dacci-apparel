'use client';
import BreadCrumb from '@/app/admin/components/BreadCrumb';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import useFetch from '@/hooks/editCallfunction';
import Link from 'next/link';
import React, { use, useEffect } from 'react';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from 'zod';
import { zSchema } from '@/lib/zodSchema';
import Image from 'next/image';
import axios from 'axios';
import toast from 'react-hot-toast';


interface MediaEditProps {
  params: Promise<{ id: string }>;
}

const BreadCrumbData = [
  {
    href: '/admin/dashboard',
    label: 'Home',
  },
  {
    href: '/admin/media',
    label: 'Media',
  },
  {
    href: '#',
    label: 'Edit Media',
  }
]

const MediaEdit: React.FC<MediaEditProps> = ({ params }) => {

  const { id } = use(params);
  const { data: mediaData, loading, error } = useFetch(`/api/media/get/${id}`);


  const formSchema = zSchema.pick({
    _id: true,
    alt: true,
    title: true,
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      _id: "",
      alt: "",
      title: "",
    },
  });

  useEffect(() => {
    if (mediaData && mediaData.success) {
      const data = mediaData.data;
      form.reset({
        _id: data._id,
        alt: data.alt,
        title: data.title,
      })
    }
  }, [mediaData])

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const { data: response } = await axios.put('/api/media/update', values);
      if (!response.success) {
        toast.error(response.message)
      }
      toast.success(response.message)
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-600">Error: {error}</div>;
  }

  if (!mediaData || !mediaData.data) {
    return <div>No media data found.</div>;
  }

  const media = mediaData.data;

  return (
    <div>
      <BreadCrumb breadcrumbData={BreadCrumbData} />

      <Card>
        <CardHeader className='pt-3 px-3 border-b [.border-b]:pb-3 '>
          <h4>Media Edit</h4>
        </CardHeader>
        <CardContent>
          <form className="ios-card space-y-4 mt-6 flex flex-col items-center justify-center" onSubmit={form.handleSubmit(onSubmit)}>
            <div>
              <Image
                src={media.secure_url}
                alt={media.alt || 'image'}
                height={300}
                width={300}
              />
              <p>{media.title}</p>
              <p>{media.alt}</p>
            </div>
            {/* Use form input fields and bind to form state */}
            <input
              type="text"
              placeholder="Enter ID"
              className="ios-input sm:w-1/2!"
              {...form.register('_id')}
              required
              readOnly // probably readonly as ID shouldn't be changed by user
            />

            <input
              type="text"
              placeholder="Enter alt"
              className="ios-input sm:w-1/2!"
              {...form.register('alt')}
              required
            />

            <input
              type="text"
              placeholder="Enter title"
              className="ios-input sm:w-1/2!"
              {...form.register('title')}
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-1/2! light-button text-white"
            >
              {loading ? "Editing..." : "Edit"}
            </button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default MediaEdit;