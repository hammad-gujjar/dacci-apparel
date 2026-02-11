import { Checkbox } from '@/components/ui/checkbox'
import Image from 'next/image'


interface AddMediaProps {
    media: any;
    selectedMedia: any;
    setSelectedMedia: any;
    isMultiple: boolean;
}
const AddMedia = ({
    media,
    selectedMedia,
    setSelectedMedia,
    isMultiple
}: AddMediaProps) => {

    const handleCheck = (checked: boolean) => {
        if (checked) {
            if (isMultiple) {
                setSelectedMedia((prev: any) => [...prev, media])
            } else {
                setSelectedMedia(media)
            }
        } else {
            setSelectedMedia((prev: any) => prev.filter((m: any) => m._id !== media._id))
        }
    }

    return (
        <label htmlFor={media} className='border border-white/40 relative group rounded cursor-pointer'>
            <div className='absolute top-2 left-2 z-20'>
                <Checkbox
                    id={media._id}
                    checked={selectedMedia.find((m: any) => m._id === media._id) ? true : false}
                    onCheckedChange={handleCheck}
                />
            </div>
            <div className='size-full relative'>
                <Image
                    src={media.secure_url}
                    alt={media.alt || 'media'}
                    fill
                    className='object-cover h-[45%]'
                />
            </div>
        </label>
    )
}

export default AddMedia