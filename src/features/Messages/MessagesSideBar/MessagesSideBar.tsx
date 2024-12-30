import React, { useCallback, useState } from 'react'
import MessagesSearchForm from '../MessagesSearchForm/MessagesSearchForm'
import MessagesChatList from '../MessagesChatList/MessagesChatList';

export default function MessagesSideBar() {

  const [isSearchActive, setIsSearchActive] = useState(false)

  const didSearchFocused = useCallback(() => {
    setIsSearchActive(true);
  }, [])

  const didSearchBlurred = useCallback(() => {
    setIsSearchActive(false);
  }, [])

  return (
    <div>
      <MessagesSearchForm
        onBlur={didSearchBlurred}
        onFocus={didSearchFocused}
      />
      {isSearchActive && <>results</>}
      {!isSearchActive && <MessagesChatList />}

    </div>
  )
}
