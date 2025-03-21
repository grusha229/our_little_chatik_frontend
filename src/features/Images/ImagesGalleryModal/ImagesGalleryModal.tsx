import React from 'react'
import Modal from '../../../ui/Modal/Modal'
import ImagesGallery from '../ImagesGallery/ImagesGallery'
import { useAppSelector } from '../../../store/store';

export default function ImagesGalleryModal() {
    const { images, start_image } = useAppSelector(state => state.modals["image_viewer"]);
    const initialImage = start_image ?? images[0]
    return (
        <Modal
            name="image_viewer"
            size="xlarge"
        >
            <ImagesGallery
                start_image={initialImage}
                images={images}
            />
        </Modal>
  )
}
