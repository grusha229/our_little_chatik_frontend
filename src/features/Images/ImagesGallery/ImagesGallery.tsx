import React, { useCallback, useEffect, useState } from 'react'
import { IMediaRefItem } from '@app/models/chats';
import styles from './ImagesGallery.module.scss';

export interface IProps {
    images: IMediaRefItem[];
    start_image: IMediaRefItem;
}

export default function ImagesGallery({
    images,
    start_image
}: IProps) {
    const start_index = images.findIndex((image) => image.url === start_image.url);
    const images_amount = images.length;
    const [currentIndex, setCurrentIndex] = useState(0);

    const isNotSingleImage = images?.length > 1

    useEffect(() => {
        setCurrentIndex(start_index)
    }, [start_index])

    const handleNextClicked = useCallback(() => {
        setCurrentIndex((prev) => {
            if (prev === images_amount - 1) {
                return prev + 1 - images_amount
            } else {
                return prev + 1
            }
        })
    }, [images_amount])

    const handlePrevClicked = useCallback(() => {
        setCurrentIndex((prev) => {
            if (prev ===  0) {
                return images_amount - 1
            } else {
                return prev - 1
            }
        })
    }, [images_amount])

    return (
        <div>
            <div className={styles['image-block']}>
                <img
                    className={styles['image']}
                    src={images[currentIndex]?.url} />
            </div>
            {isNotSingleImage && (
                <div className={styles['navigation']}>
                    <div
                        className={styles['navigation--item']}
                        onClick={handlePrevClicked}
                    >
                        Previous
                    </div>
                    <div
                        className={styles['navigation--item']}
                        onClick={handleNextClicked}
                    >
                        Next
                    </div>
                </div>
            )}
        </div>
    )
}
