import { useCallback, useState } from 'react';
import MessagesSearchForm from '@app/features/Messages/MessagesSearchForm/MessagesSearchForm';
import MessagesChatList from '@app/features/Messages/MessagesChatList/MessagesChatList';
import MessagesSearchResults from '@app/features/Messages/MessagesSearchResults/MessagesSearchResults';
import styles from './MessagesSideBar.module.scss';
import { useAppDispatch } from '@app/store/hooks';
import { openModal } from '@app/store/features/modals';
import IconButton from '@app/ui/IconButton/IconButton';

export default function MessagesSideBar() {
    const [isSearchActive, setIsSearchActive] = useState(false);

    const didSearchFocused = useCallback(() => {
        setIsSearchActive(true);
    }, []);

    const didSearchBlurred = useCallback(() => {
        setIsSearchActive(false);
    }, []);

    const dispatch = useAppDispatch();

    const toggleModalVisibility = useCallback(() => {
        dispatch(openModal({ modal: 'create_chat' }));
    }, [dispatch]);

    const handleOpenModalClicked = useCallback(() => {
        toggleModalVisibility();
    }, [toggleModalVisibility]);

    return (
        <>
            <div className={styles['form']}>
                <MessagesSearchForm onBlur={didSearchBlurred} onFocus={didSearchFocused} />
                <IconButton onClick={handleOpenModalClicked} />
            </div>
            <div className={styles['sidebar-content']}>
                {isSearchActive && <MessagesSearchResults />}
                {!isSearchActive && <MessagesChatList />}
            </div>
        </>
    );
}
