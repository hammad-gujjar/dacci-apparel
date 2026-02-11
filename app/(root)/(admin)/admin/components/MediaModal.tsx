'use client';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { keepPreviousData, useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react'
import AddMedia from './AddMedia';
import { toast } from 'react-hot-toast';

interface MediaModalProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    selectedMedia: string[];
    setSelectedMedia: React.Dispatch<React.SetStateAction<string[]>>;
    isMultiple: boolean;
}


const MediaModal: React.FC<MediaModalProps> = ({ open, setOpen, selectedMedia, setSelectedMedia, isMultiple }) => {


    const [previousData, setpreviousData] = useState<string[]>([]);


    const fetchMedia = async (page: number) => {
        const { data: response } = await axios.get(`/api/media?page=${page}&&limit=18&&deleteType=SD`);
        return response;
    }

    const { isPending, isError, error, data, isFetching, fetchNextPage, hasNextPage } = useInfiniteQuery({
        queryKey: ['MediaModal'],
        queryFn: async ({ pageParam }) => await fetchMedia(pageParam),
        placeholderData: keepPreviousData,
        initialPageParam: 0,
        getNextPageParam: (lastPage, allPages) => {
            const nextPage = allPages.length
            return lastPage.hasMore ? nextPage : undefined
        }
    })

    const handleClear = () => {
        // hanfel clear function
        setSelectedMedia([]);
        setOpen(false);
        toast('🧹media cleared.');
    }

    const handleClose = () => {
        // handle close all function
        setSelectedMedia(previousData);
        setOpen(false);
    }

    const handleSelect = () => {
        // handle close all function
        if (selectedMedia.length <= 0) {
            toast.error('Media not selected');
        }
        setpreviousData(selectedMedia);
        setOpen(false);
    }

    return (
        <Dialog
            open={open}
            onOpenChange={() => setOpen(!open)}
        >
            <DialogContent onInteractOutside={(e) => e.preventDefault()}
                className='sm:max-w-[80%] h-screen p-0py-10 bg-transparent border-0 shadow-none'
            >

                <DialogDescription className='hidden'></DialogDescription>

                <div className='h-[85vh] mt-10 bg-white dark:bg-[#212121] p-3 rounded shadow flex flex-col gap-2'>
                    <DialogHeader className='h-[10%] border-b'>
                        <DialogTitle>
                            Media Sellection
                        </DialogTitle>
                    </DialogHeader>

                    <div className='h-[80%] overflow-y-auto w-full py-2 border'>
                        {isPending ?
                            (<div className='size-full flex items-center justify-center'>
                                Loading...
                            </div>)
                            :
                            isError ?
                                <div className='size-full flex items-center justify-center text-[red]'>
                                    {error.message}
                                </div>
                                :
                                <div className='w-full h-[80%] grid lg:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-2 px-2'>
                                    {data?.pages?.map((page, index) => (
                                        <React.Fragment key={index}>
                                            {page?.mediaData?.map((media: any) => (
                                                <AddMedia
                                                    key={media._id}
                                                    media={media}
                                                    selectedMedia={selectedMedia}
                                                    setSelectedMedia={setSelectedMedia}
                                                    isMultiple={isMultiple}
                                                />
                                            ))}
                                        </React.Fragment>
                                    ))}
                                </div>
                        }
                    </div>

                    <div className='h-[10%] pt-3 border-t flex justify-between items-center'>
                        <div>
                            <button className='light-button bg-[red]!' onClick={handleClear}>
                                Clear All
                            </button>
                        </div>

                        <div className='flex gap-5'>
                            <button className='light-button' onClick={handleClose}>
                                Close
                            </button>
                            <button className='light-button' onClick={handleSelect}>
                                Select
                            </button>
                        </div>
                    </div>
                </div>

            </DialogContent>
        </Dialog>
    )
}

export default MediaModal