import MediaFileAttachmentsItem, { TAttachmentsSize } from "../MediaFileAttachmentsItem/MediaFileAttachmentsItem";
import fallbackIcon from '../../../img/icons/icon--file-image.svg';
import zipFileIcon from '../../../img/icons/icon--file-zip.svg';
import pdfFileIcon from '../../../img/icons/icon--file-pdf.svg';
import audioFileIcon from '../../../img/icons/icon--file-audio.svg';
import videoFileIcon from '../../../img/icons/icon--file-video.svg';
import defaultFileIcon from '../../../img/icons/icon--file-default.svg';

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

const getFileType = (content_type: string): keyof typeof FILE_TYPE_ICONS => {
    console.log(content_type)
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
    onClick: () => void;
}

export const getAttachmentComponent = ({content_type, size, isFileUploaded, preview_link, onClick}: IProps) => {
    console.log(content_type)
    const fileType = getFileType(content_type);

    const iconBackgroundSrc = ((fileType === "image") && isFileUploaded)
        ? preview_link
        : FILE_TYPE_ICONS[fileType];

    return (
        <MediaFileAttachmentsItem
            size={size}
            src={iconBackgroundSrc}
            onClick={onClick}
        />
    )
}