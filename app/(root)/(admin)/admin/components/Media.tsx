import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { ADMIN_MEDIA_EDIT } from '@/routes/adminroutes';
import Image from 'next/image';
import Link from 'next/link';
import { HiOutlineDotsVertical, HiOutlinePencil } from "react-icons/hi";
import { IoMdCopy } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";
import toast from 'react-hot-toast';
import React from 'react';

interface MediaType {
  _id: string;
  secure_url: string;
  // add additional media fields if needed
}

interface MediaProps {
  media: MediaType;
  handleDelete: (ids: string[], deleteType: string) => void;
  deleteType: string;
  selectedMedia: string[];
  setSelectedMedia: React.Dispatch<React.SetStateAction<string[]>>;
}

const Media: React.FC<MediaProps> = ({
  media,
  handleDelete,
  deleteType,
  selectedMedia,
  setSelectedMedia,
}) => {
  // Toggle check state for a single media item
  const handleCheck = () => {
    let newSelectedMedia: string[];
    if (selectedMedia.includes(media._id)) {
      newSelectedMedia = selectedMedia.filter((id) => id !== media._id);
    } else {
      newSelectedMedia = [...selectedMedia, media._id];
    }
    setSelectedMedia(newSelectedMedia);
  };

  // Copy media link to clipboard
  const handleCopyLink = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      toast.success('Link copied to clipboard');
    } catch (err: any) {
      toast.error('Failed to copy link');
    }
  };

  return (
    <div className="ios-card border border-gray-200 dark:border-gray-800 relative group rounded p-0! overflow-hidden">
      {/* Checkbox for selecting media */}
      <div className="absolute top-2 left-2 z-20">
        <Checkbox
          className="ios-card flex items-center justify-center shadow-2xl cursor-pointer"
          checked={selectedMedia.includes(media._id)}
          onCheckedChange={handleCheck}
        />
      </div>
      {/* Dropdown menu for actions */}
      <div className="absolute top-2 right-2 z-20">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <span className="ios-card w-8 h-8 rounded-full flex items-center justify-center p-0! cursor-pointer">
              <HiOutlineDotsVertical color="#000000" />
            </span>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            {deleteType === 'SD' && (
              <>
                <DropdownMenuItem asChild className="cursor-pointer">
                  <Link href={ADMIN_MEDIA_EDIT(media._id)}>
                    <span className="flex items-center gap-2">
                      <HiOutlinePencil />
                      edit
                    </span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => handleCopyLink(media.secure_url)}
                >
                  <span className="flex items-center gap-2">
                    <IoMdCopy />
                    copy
                  </span>
                </DropdownMenuItem>
              </>
            )}
            <DropdownMenuItem
              onClick={() => handleDelete([media._id], deleteType)}
              className="cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <RiDeleteBin6Line color="red" />
                {deleteType === 'SD' ? 'trash' : 'delete'}
              </span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {/* Shade overlay on hover */}
      <div className="absolute top-0 left-0 w-full h-full bg-transparent group-hover:bg-white/20 transition-all duration-300"></div>
      {/* Media image */}
      <div>
        <Image
          src={media.secure_url}
          alt="media"
          height={400}
          width={300}
          className="object-cover w-full sm:h-75 h-37.5"
        />
      </div>
    </div>
  );
};

export default Media;