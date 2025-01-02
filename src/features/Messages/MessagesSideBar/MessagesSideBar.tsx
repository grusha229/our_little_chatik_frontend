import React, { useCallback, useState } from 'react'
import MessagesSearchForm from '../MessagesSearchForm/MessagesSearchForm'
import MessagesChatList from '../MessagesChatList/MessagesChatList';
import MessagesSearchResults from '../MessagesSearchResults/MessagesSearchResults';
import styles from './MessagesSideBar.module.scss'

export default function MessagesSideBar() {

  const [isSearchActive, setIsSearchActive] = useState(false)

  const didSearchFocused = useCallback(() => {
    setIsSearchActive(true);
  }, [])

  const didSearchBlurred = useCallback(() => {
    setIsSearchActive(false);
  }, [])

  return (
    <>
      <MessagesSearchForm
        onBlur={didSearchBlurred}
        onFocus={didSearchFocused}
      />
      <div className={styles['sidebar-content']}>
        {isSearchActive && <MessagesSearchResults />}
        {!isSearchActive && <MessagesChatList />}
      </div>
    </>
  )
}
