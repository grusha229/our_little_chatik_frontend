import { IChatsUploadFileLink } from "../../../../models/chats";
import MediaPhotoAttachmentsItem from "../MediaPhotoAttachmentsItem/MediaPhotoAttachmentsItem";
import fallbackIcon from '../../../../img/icons/icon--photo.svg';

export const isPicture = (content_type: string): boolean => {
    return content_type.startsWith("image/");
};

export interface IProps extends IChatsUploadFileLink {
    isFileUploaded: boolean
}

export const getAttachmentComponent = ({content_type, ...props}: IProps) => {
    if (isPicture(content_type)) {
        const previewImage = props.isFileUploaded ? props.preview_link : fallbackIcon
        return (
            <MediaPhotoAttachmentsItem
                size="small"
                src={previewImage}
            />
        )
    }

    return (
        <div>{props.upload_file_name}</div>
    )
}