import MediaFileAttachmentsItem from "@app/ui/MediaAttachments/MediaFileAttachmentsItem/MediaFileAttachmentsItem";
import { TAttachmentsSize } from '@app/ui/MediaAttachments/MediaPhotoAttachments';
import fallbackIcon from '@app/img/icons/icon--file-image.svg';
import zipFileIcon from '@app/img/icons/icon--file-zip.svg';
import pdfFileIcon from '@app/img/icons/icon--file-pdf.svg';
import audioFileIcon from '@app/img/icons/icon--file-audio.svg';
import videoFileIcon from '@app/img/icons/icon--file-video.svg';
import defaultFileIcon from '@app/img/icons/icon--file-default.svg';

export const isImageFile = (content_type: string): boolean => {
    return content_type.startsWith("image/");
};

export const FILE_TYPE_ICONS: Record<string, string> = {
    image: fallbackIcon,
    zip: zipFileIcon,
    pdf: pdfFileIcon,
    audio: audioFileIcon,
    video: videoFileIcon,
    default: defaultFileIcon,
};

export const getFileType = (content_type: string): keyof typeof FILE_TYPE_ICONS => {
    if (content_type?.startsWith("image/")) return "image";
    if (content_type?.startsWith("application/zip")) return "zip";
    if (content_type?.startsWith("application/pdf")) return "pdf";
    if (content_type?.startsWith("audio/")) return "audio";
    if (content_type?.startsWith("video/")) return "video";
    return "default";
};


export interface IProps {
    size: TAttachmentsSize,
    isFileUploaded: boolean;
    preview_link: string;
    content_type: string;
}

export const getAttachmentComponent = ({content_type, size, isFileUploaded, preview_link}: IProps) => {
    const fileType = getFileType(content_type);

    const iconBackgroundSrc = ((fileType === "image") && isFileUploaded)
        ? preview_link
        : FILE_TYPE_ICONS[fileType];

    return (
        <MediaFileAttachmentsItem
            size={size}
            src={iconBackgroundSrc}
        />
    )
}