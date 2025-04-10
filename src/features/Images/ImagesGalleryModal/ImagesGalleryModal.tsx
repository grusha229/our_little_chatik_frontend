
import Modal from '@app/ui/Modal/Modal'
import ImagesGallery from '@app/features/Images/ImagesGallery/ImagesGallery'
import { useAppSelector } from '@app/store/hooks';

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
