"use client";
import axios from "axios";
import { CldUploadWidget } from "next-cloudinary";
import toast from "react-hot-toast";
import { FiPlus } from "react-icons/fi";

type UploadMediaProps = {
    isMultiple?: boolean;
    queryClient:any
};

const UploadMedia = ({ isMultiple = true, queryClient }: UploadMediaProps) => {

    const handleonError = (error: any) => {
        toast(error.message);
    };

    const handleonQueuesEnd = async (results: any) => {
        const files = results.info.files
        const uploadfiles = files.filter((file: any) => file.uploadInfo).map((file: any) => ({
            asset_id: file.uploadInfo.asset_id,
            public_id: file.uploadInfo.public_id,
            secure_url: file.uploadInfo.secure_url,
            path: file.uploadInfo.path,
            thumbnail_url: file.uploadInfo.thumbnail_url
        }))
        if (uploadfiles.length > 0) {
            try {
                const { data: mediaUploadResponse } = await axios.post('/api/media/creat',uploadfiles)
                if(!mediaUploadResponse.success){
                    toast.error(mediaUploadResponse.message)
                }
                queryClient.invalidateQueries(['media-data'])
                toast.success(mediaUploadResponse.message)
            } catch (error){
                console.error('error during call api', error)
            }
        }
    }

    return (
        <CldUploadWidget
            signatureEndpoint="/api/cloudinary-signature"
            uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!}
            onError={handleonError}
            onQueuesEnd={handleonQueuesEnd}
            config={{
                cloud: {
                    cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!,
                    apiKey: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY!
                }
            }}
            options={{
                multiple: isMultiple,
                sources: ["local", "url", "unsplash", "google_drive"],
            }}
        >
            {({ open }) => (
                <button
                    onClick={() => open()}
                    className="flex items-center gap-2 light-button dark:dark-button"
                >
                    <FiPlus className="dark:fill-black" />
                    Upload Media
                </button>
            )}
        </CldUploadWidget>
    );
};

export default UploadMedia;