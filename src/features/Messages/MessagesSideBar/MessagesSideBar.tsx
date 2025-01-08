import React, { useCallback, useState } from 'react'
import MessagesSearchForm from '../MessagesSearchForm/MessagesSearchForm'
import MessagesChatList from '../MessagesChatList/MessagesChatList';
import MessagesSearchResults from '../MessagesSearchResults/MessagesSearchResults';
import styles from './MessagesSideBar.module.scss'
import Button from '../../controls/Button/Button';
import { useAppDispatch } from '../../../store/store';
import { openModal } from '../../../store/features/modals';
import IconButton from '../../controls/IconButton/IconButton';

export default function MessagesSideBar() {

  const [isSearchActive, setIsSearchActive] = useState(false)

  const didSearchFocused = useCallback(() => {
    setIsSearchActive(true);
  }, [])

  const didSearchBlurred = useCallback(() => {
    setIsSearchActive(false);
  }, [])

  const dispatch = useAppDispatch();

  const toggleModalVisibility = useCallback(()=> {
          dispatch(openModal('create_chat'))
      },[dispatch])

  const handleOpenModalClicked = useCallback(() => {
    toggleModalVisibility()
  }, []);

  return (
    <>
      <div className={styles['form']}>
        <MessagesSearchForm
          onBlur={didSearchBlurred}
          onFocus={didSearchFocused}
        />
        <IconButton
          onClick={handleOpenModalClicked}
        />
      </div>
      <div className={styles['sidebar-content']}>
        {isSearchActive && <MessagesSearchResults />}
        {!isSearchActive && <MessagesChatList />}
      </div>
    </>
  )
}
