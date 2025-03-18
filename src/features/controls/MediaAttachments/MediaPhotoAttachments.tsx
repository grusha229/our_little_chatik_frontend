import React from 'react'
import styles from './MediaPhotoAttachments.module.scss'
import { IMediaRefItem } from '../../../models/chats'
import MediaPhotoAttachmentsItem from './MediaPhotoAttachmentsItem';
export type TAttachmentsSize = 'small' | 'large';

export interface IProps {
    media: IMediaRefItem[],
    size?: TAttachmentsSize
}

export default function MediaPhotoAttachments({
    media,
} : IProps) {
  return (
    <div className={styles['block']}>
       <div className={styles['photos-grid']}>
            {
                media?.map((media) => (
                    <MediaPhotoAttachmentsItem src={media.url} key={media.path}/>
                ))
            }
        </div>
    </div>
  )
}
