import { useCallback, useState } from 'react';
import styles from './ConversationsSIdebar.module.scss';
import { useAppDispatch } from '@app/store/hooks';
import { openModal } from '@app/store/features/modals';
import IconButton from '@app/ui/Button/IconButton/IconButton';
import ConversationsSearchForm from '../ConversationsSearchForm/ConversationsSearchForm';
import ConversationsSearchResults from '../ConversationsSearchResults/ConversationsSearchResults';
import { ConversationsList } from '../ConversationsList/ConversationsList';

export default function ConversationsSidebar() {
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
                <ConversationsSearchForm onBlur={didSearchBlurred} onFocus={didSearchFocused} />
                <IconButton onClick={handleOpenModalClicked} />
            </div>
            <div className={styles['sidebar-content']}>
                {isSearchActive && <ConversationsSearchResults />}
                {!isSearchActive && <ConversationsList />}
            </div>
        </>
    );
}
