import React from 'react'
import styles from './MessagesPage.module.scss'
import MessagesSideBar from '../../features/Messages/MessagesSideBar/MessagesSideBar'
import { useParams } from 'react-router-dom';
import CreateChatModal from '../../features/Messages/CreateChatModal/CreateChatModal';
import ChatArea from '../../features/Messages/ChatArea/ChatArea';
import { isDesktop, useWindowSize } from '../../utils/responsives';
import PersonalInfoModal from '../../features/Users/PersonalInfoModal/PersonalInfoModal';
import ImagesGalleryModal from '../../features/Images/ImagesGalleryModal/ImagesGalleryModal';


export default function MessagesPage() {

  const params = useParams();
  const { width: windowWidth } = useWindowSize();
  const isDesktopView = isDesktop(windowWidth);

  return (
      <>
        <div className={styles['page']}>
            {(isDesktopView || !params.id) && (
                <div className={styles['page--sidebar']}>
                  <MessagesSideBar />
                </div>
              )
            }
            {(isDesktopView || params.id) && (
              <div className={styles['page--content']}>
                {params.id
                  ? <ChatArea/>
                  : <div> No chat selected </div>
                }
              </div>
            )}
        </div>
        <CreateChatModal />
        <PersonalInfoModal />
        <ImagesGalleryModal />
      </>
  )
}
