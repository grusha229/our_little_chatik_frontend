import styles from './MessagesPage.module.scss';
import { useParams } from 'react-router-dom';
import ChatArea from '@app/features/Chat/ChatArea/ChatArea';
import { isDesktop, useWindowSize } from '@app/utils/responsives';
import PersonalInfoModal from '@app/features/Users/PersonalInfoModal/PersonalInfoModal';
import ImagesGalleryModal from '@app/features/Images/ImagesGalleryModal/ImagesGalleryModal';
import AlertBlock from '@app/ui/AlertBlock/AlertBlock';
import sadImage from '@app/img/emoji/emoji-sad.png';
import ConversationsSidebar from '@app/features/Conversations/ConversationsSidebar/ConversationsSidebar';
import CreateChatModal from '@app/features/Conversations/CreateConversationFormModal/CreateConversationFormModal';

export default function MessagesPage() {
    const params = useParams();
    const { width: windowWidth } = useWindowSize();
    const isDesktopView = isDesktop(windowWidth);

    return (
        <>
            <div className={styles['page']}>
                {(isDesktopView || !params.id) && (
                    <div className={styles['page--sidebar']}>
                        <ConversationsSidebar />
                    </div>
                )}
                {(isDesktopView || params.id) && (
                    <div className={styles['page--content']}>
                        {params.id ? (
                            <ChatArea />
                        ) : (
                            <AlertBlock title="No chat selected" description="Select chat or create new to start 🚀" img_src={sadImage} />
                        )}
                    </div>
                )}
            </div>
            <CreateChatModal />
            <PersonalInfoModal />
            <ImagesGalleryModal />
        </>
    );
}
