'use client';

import React, { useState, useRef, DragEvent, ChangeEvent } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import {
    IoCloudUploadOutline,
    IoDocumentTextOutline,
    IoImageOutline,
    IoArchiveOutline,
    IoTrashOutline,
    IoCheckmarkCircle,
    IoAlertCircleOutline,
    IoOpenOutline
} from 'react-icons/io5';

export interface TechPackUploadedFile {
    fileName: string;
    fileUrl: string;
    fileType: string;
    fileSize: number;
    publicId?: string;
}

interface TechPackUploadZoneProps {
    files: TechPackUploadedFile[];
    onFilesChange: (files: TechPackUploadedFile[]) => void;
    maxFiles?: number;
    className?: string;
    title?: string;
    description?: string;
}

const ALLOWED_EXTENSIONS = ['pdf', 'ai', 'eps', 'psd', 'dxf', 'zip', 'png', 'jpg', 'jpeg'];
const MAX_FILE_SIZE_BYTES = 25 * 1024 * 1024; // 25 MB

export default function TechPackUploadZone({
    files,
    onFilesChange,
    maxFiles = 10,
    className = '',
    title = 'Attach Tech Packs & Vector Artwork',
    description = 'Upload technical drawings, garment specs, vector logos, or artwork archives.',
}: TechPackUploadZoneProps) {
    const [isDragging, setIsDragging] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [currentUploadingName, setCurrentUploadingName] = useState<string | null>(null);

    const fileInputRef = useRef<HTMLInputElement>(null);

    const formatFileSize = (bytes: number): string => {
        if (!bytes || bytes === 0) return '0 B';
        const k = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
    };

    const getFileBadge = (fileType: string) => {
        const type = fileType.toLowerCase();
        if (type.includes('pdf')) {
            return (
                <div className="size-9 rounded-xl bg-neutral-900 text-white flex items-center justify-center font-[middle] font-bold text-[10px] tracking-wider shrink-0">
                    PDF
                </div>
            );
        }
        if (['ai', 'eps', 'psd', 'dxf'].includes(type)) {
            return (
                <div className="size-9 rounded-xl bg-black text-amber-300 flex items-center justify-center font-[middle] font-bold text-[10px] tracking-wider shrink-0">
                    {type.toUpperCase()}
                </div>
            );
        }
        if (type.includes('zip')) {
            return (
                <div className="size-9 rounded-xl bg-neutral-800 text-[#EDEEE7] flex items-center justify-center text-lg shrink-0">
                    <IoArchiveOutline />
                </div>
            );
        }
        return (
            <div className="size-9 rounded-xl bg-neutral-100 text-neutral-800 border border-black/10 flex items-center justify-center text-lg shrink-0">
                <IoImageOutline />
            </div>
        );
    };

    const validateFile = (file: File): string | null => {
        const ext = file.name.split('.').pop()?.toLowerCase() || '';
        if (!ALLOWED_EXTENSIONS.includes(ext)) {
            return `Unsupported format (.${ext}). Allowed: PDF, AI, EPS, PSD, DXF, ZIP, PNG, JPG, JPEG.`;
        }
        if (file.size > MAX_FILE_SIZE_BYTES) {
            return `File "${file.name}" exceeds 25 MB limit (${(file.size / (1024 * 1024)).toFixed(1)} MB).`;
        }
        if (files.length >= maxFiles) {
            return `Maximum limit of ${maxFiles} files reached.`;
        }
        return null;
    };

    const processFiles = async (fileList: FileList | File[]) => {
        const fileArray = Array.from(fileList);
        if (fileArray.length === 0) return;

        if (files.length + fileArray.length > maxFiles) {
            toast.error(`You can only upload up to ${maxFiles} technical files in total.`);
            return;
        }

        setIsUploading(true);
        setUploadProgress(0);

        const newUploadedFiles: TechPackUploadedFile[] = [];

        for (let i = 0; i < fileArray.length; i++) {
            const file = fileArray[i];
            const validationError = validateFile(file);

            if (validationError) {
                toast.error(validationError);
                continue;
            }

            setCurrentUploadingName(file.name);
            setUploadProgress(Math.round(((i) / fileArray.length) * 100));

            const formData = new FormData();
            formData.append('file', file);

            try {
                const response = await axios.post('/api/upload/tech-pack', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                    onUploadProgress: (progressEvent) => {
                        if (progressEvent.total) {
                            const percent = Math.round(
                                ((i + (progressEvent.loaded / progressEvent.total)) / fileArray.length) * 100
                            );
                            setUploadProgress(percent);
                        }
                    },
                });

                if (response.data.success && response.data.file) {
                    newUploadedFiles.push(response.data.file);
                    toast.success(`Uploaded "${file.name}"`);
                } else {
                    toast.error(response.data.message || `Failed to upload "${file.name}"`);
                }
            } catch (err: any) {
                console.error('File upload error:', err);
                const msg = err.response?.data?.message || `Failed to upload "${file.name}"`;
                toast.error(msg);
            }
        }

        if (newUploadedFiles.length > 0) {
            onFilesChange([...files, ...newUploadedFiles]);
        }

        setIsUploading(false);
        setCurrentUploadingName(null);
        setUploadProgress(0);

        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    };

    const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        if (e.dataTransfer && e.dataTransfer.files) {
            processFiles(e.dataTransfer.files);
        }
    };

    const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            processFiles(e.target.files);
        }
    };

    const handleRemoveFile = (indexToRemove: number) => {
        const updated = files.filter((_, idx) => idx !== indexToRemove);
        onFilesChange(updated);
        toast.success('Removed file attachment');
    };

    return (
        <div className={`space-y-4 ${className}`}>
            {/* Header / Instructions */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-1">
                <div>
                    <h4 className="text-xs uppercase tracking-[0.25em] font-bold text-neutral-900 font-[middle]">
                        {title}
                    </h4>
                    <p className="text-[11px] font-[middle] text-neutral-600 mt-0.5">
                        {description}
                    </p>
                </div>
                <span className="text-[9px] uppercase font-bold tracking-widest text-neutral-500 font-[middle]">
                    {files.length}/{maxFiles} Files Attached
                </span>
            </div>

            {/* Drag & Drop Zone */}
            <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => !isUploading && fileInputRef.current?.click()}
                className={`relative border-2 border-dashed rounded-2xl p-6 sm:p-7 text-center transition-all duration-300 cursor-pointer select-none flex flex-col items-center justify-center gap-3 ${
                    isDragging
                        ? 'border-black bg-white/80 shadow-md scale-[1.01]'
                        : 'border-neutral-900/20 bg-white/40 hover:border-black/40 hover:bg-white/60'
                } ${isUploading ? 'pointer-events-none opacity-80' : ''}`}
            >
                <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept=".pdf,.ai,.eps,.psd,.dxf,.zip,.png,.jpg,.jpeg"
                    onChange={handleFileInputChange}
                    className="hidden"
                    disabled={isUploading}
                />

                {/* Upload Status Animation or Icon */}
                {isUploading ? (
                    <div className="w-full max-w-xs space-y-3 py-2 flex flex-col items-center">
                        <div className="size-10 rounded-full border-2 border-neutral-300 border-t-black animate-spin" />
                        <div className="space-y-1 w-full text-center">
                            <span className="text-[11px] font-[middle] font-bold text-neutral-800 uppercase tracking-wider block">
                                Uploading {currentUploadingName || 'file'}...
                            </span>
                            <div className="w-full bg-black/10 rounded-full h-1.5 overflow-hidden">
                                <div
                                    className="bg-black h-full transition-all duration-300 rounded-full"
                                    style={{ width: `${uploadProgress}%` }}
                                />
                            </div>
                            <span className="text-[9px] font-[middle] text-neutral-500 tabular-nums block">
                                {uploadProgress}% Completed
                            </span>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="size-12 rounded-full bg-black text-[#EDEEE7] flex items-center justify-center text-2xl transition-transform duration-300 group-hover:scale-105 shadow-sm">
                            <IoCloudUploadOutline />
                        </div>

                        <div className="space-y-1 max-w-sm">
                            <p className="text-xs sm:text-sm font-semibold font-[middle] text-neutral-900">
                                Drag & drop your tech pack, or <span className="underline underline-offset-4 decoration-black/40 font-bold">browse files</span>
                            </p>
                            <p className="text-[10px] font-[middle] text-neutral-500 uppercase tracking-wider">
                                Accepted: PDF, AI, EPS, PSD, DXF, ZIP, PNG, JPG (Max 25 MB)
                            </p>
                        </div>
                    </>
                )}
            </div>

            {/* Attached Files List */}
            {files.length > 0 && (
                <div className="space-y-2 pt-1">
                    <span className="text-[10px] uppercase tracking-wider font-bold text-neutral-600 font-[middle] block">
                        Attached Files Ready For Engineering Review:
                    </span>
                    <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                        {files.map((file, idx) => (
                            <div
                                key={file.publicId || `${file.fileName}-${idx}`}
                                className="flex items-center justify-between gap-3 p-3 bg-white/70 border border-black/10 rounded-xl backdrop-blur-xs hover:border-black/30 transition-all shadow-2xs"
                            >
                                <div className="flex items-center gap-3 min-w-0">
                                    {getFileBadge(file.fileType)}
                                    <div className="min-w-0">
                                        <p
                                            className="text-xs font-semibold font-[middle] text-neutral-900 truncate max-w-[180px] sm:max-w-xs md:max-w-sm"
                                            title={file.fileName}
                                        >
                                            {file.fileName}
                                        </p>
                                        <div className="flex items-center gap-2 mt-0.5">
                                            <span className="text-[9px] uppercase font-bold text-neutral-500 font-[middle]">
                                                {file.fileType}
                                            </span>
                                            <span className="text-[9px] text-neutral-400">•</span>
                                            <span className="text-[9px] text-neutral-500 font-[middle] tabular-nums">
                                                {formatFileSize(file.fileSize)}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 shrink-0">
                                    <a
                                        href={file.fileUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-1.5 text-neutral-500 hover:text-black hover:bg-black/5 rounded-lg transition-colors cursor-pointer"
                                        title="Preview / Download file"
                                    >
                                        <IoOpenOutline className="text-base" />
                                    </a>
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveFile(idx)}
                                        className="p-1.5 text-neutral-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                                        title="Remove file"
                                    >
                                        <IoTrashOutline className="text-base" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
