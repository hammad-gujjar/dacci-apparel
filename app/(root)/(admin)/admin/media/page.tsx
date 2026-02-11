'use client'
import React, { useEffect } from 'react';
import axios from 'axios';
import BreadCrumb from '../components/BreadCrumb';
import UploadMedia from '../components/UploadMedia';
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import Media from '../components/Media';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import useDeleteMutation from '@/hooks/useDeleteMutation';
import toast from 'react-hot-toast';

interface BreadcrumbItem {
  label: string;
  href: string;
}

// Use proper typing for selectedMedia state for correct pass-through to mutation
const breadcrumbData: BreadcrumbItem[] = [
  { label: "Home", href: "/admin/dashboard" },
  { label: "Media", href: "" },
];

const MediaPage = () => {

  const queryClient = useQueryClient()
  // Type to match DeleteMutationVariables['ids']
  const [selectedMedia, setSelectedMedia] = useState<string[]>([])
  const [deleteType, setdeleteType] = useState<string>('')
  const [selectall, setSelectall] = useState(false)

  const searchParams = useSearchParams()

  useEffect(() => {
    if (searchParams) {
      setSelectedMedia([])
      const param = searchParams.get('trashof')
      if (param) {
        setdeleteType('PD')
      } else {
        setdeleteType('SD')
      }
    }
  }, [searchParams])


  const fetchMedia = async (page: number, deleteType: string) => {
    const { data: response } = await axios.get(`/api/media?page=${page}&&limit=10&&deleteType=${deleteType}`)
    if (!response.success) {
      toast.error(response.message)
    }
    toast.success(response.message)
    return response
  }

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    status,
  } = useInfiniteQuery({
    queryKey: ['media-data', deleteType],
    queryFn: async ({ pageParam }) => await fetchMedia(pageParam, deleteType),
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => {
      const nextPage = pages.length
      return lastPage.hasMore ? nextPage : undefined
    },
  })

  const deletemutation = useDeleteMutation('media-data', '/api/media/delete')

  // Properly structure params according to useDeleteMutation expectation
  const handleDelete = (ids: string[], delType: string) => {
    let c = true
    if (delType === 'PD') {
      c = confirm('Are you sure to delete permanently')
    }
    if (c) {
      deletemutation.mutate({ ids, deleteType: delType })
    }

    setSelectall(false);
    setSelectedMedia([])

  }

  const handleSelectAll = () => {
    setSelectall(!selectall)
  }

  useEffect(() => {
    if (selectall && data) {
      // collect all media IDs into a single array
      const ids = data.pages.flatMap((page: any) =>
        page.mediaData.map((media: any) => media._id)
      );
      setSelectedMedia(ids as string[]);
    } else {
      setSelectedMedia([])
    }
  }, [selectall, data])

  return (
    <div>
      <BreadCrumb breadcrumbData={breadcrumbData} />
      <Card className='py-0 rounded shadow-sm'>
        <CardHeader className='pt-2 px-3 border-b [.border-b]:pb-2'>
          <div className='flex justify-between items-center'>
            <h2 className='font-semibold text-xl uppercase'>
              {deleteType === 'SD' ? 'Media' : 'Media trash'}
            </h2>
            <div className='flex items-center gap-5'>
              {deleteType === 'SD' && <UploadMedia queryClient={queryClient} />}
              <div>
                {deleteType === 'SD' ?
                  <button className='bg-red-500! text-white! light-button'>
                    <Link href='/admin/media?trashof=media'>trash</Link>
                  </button>
                  :
                  <button className='light-button dark:dark-button'>
                    <Link href='/admin/media'>back to media</Link>
                  </button>
                }
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className='pb-5 flex flex-col gap-5'>

          {selectedMedia.length > 0 &&
            <div className='ios-card flex items-center justify-between mb-2'>
              <Label className='cursor-pointer'>
                <Checkbox
                  checked={selectall}
                  onCheckedChange={handleSelectAll}
                  className='ios-card flex items-center justify-center cursor-pointer'
                />
                select all
              </Label>
              <div className='flex items-center gap-2'>
                {deleteType === 'SD' ?
                  <button onClick={() => handleDelete(selectedMedia, deleteType)} className='light-button bg-red-500! text-white'>move to trash</button>
                  :
                  <>
                    <button onClick={() => handleDelete(selectedMedia, 'RSD')} className='light-button bg-green-500! text-white'>Restore</button>
                    <button onClick={() => handleDelete(selectedMedia, deleteType)} className='light-button bg-red-500! text-white'>Delete</button>
                  </>
                }
              </div>
            </div>
          }

          {status === 'pending' ?
            <div>Loading...</div>
            :
            status === 'error' ?
              <div className='text-red-500 text-center text-sm px-6'>{error.message}</div>
              :
              <>
                {data.pages.flatMap((page: any) => page.mediaData).length === 0 && (
                  <p className='text-md'>No data in trash..</p>
                )}
                <div className='w-full grid lg:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-2 px-2 relative'>
                  {data?.pages?.map((page, index) => (
                    <React.Fragment key={index}>
                      {page?.mediaData?.map((media: any) => (
                        <Media
                          key={media._id}
                          media={media}
                          handleDelete={handleDelete}
                          deleteType={deleteType}
                          selectedMedia={selectedMedia}
                          setSelectedMedia={setSelectedMedia}
                        />
                      ))}
                    </React.Fragment>
                  ))}
                </div>
              </>
          }
          {hasNextPage && (
            <div className='w-full flex items-center justify-center py-5'>
              <button className='light-button' onClick={() => fetchNextPage()}>{isFetching ? 'Loading...' : 'Load more'}</button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default MediaPage
