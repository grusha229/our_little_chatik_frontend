import { useCallback } from 'react';
import { Link } from 'react-router-dom';

import styles from './ConversationsItem.module.scss';
import Avatar from '@app/ui/Avatar/Avatar';
import { IChatsMessage } from '@app/models/chats';

export interface IProps {
    heading: string;
    last_message?: IChatsMessage;
    img_src?: string;
    link?: string;
    onClick?: () => void;
    ref?: React.MutableRefObject<any>;
}

export default function ConversationsItem({ heading, last_message, img_src, link, onClick, ref }: IProps) {
    const didItemClicked = useCallback(() => {
        return onClick && onClick();
    }, [onClick]);

    const lastMessageText = last_message?.payload ?? '';
    const lastMessageSender = last_message?.sender_nickname ?? '';

    if (link) {
        return (
            <Link to={`${link}`} className={styles['chat']} onClick={didItemClicked} ref={ref}>
                <Avatar src={img_src} title={heading} />
                <div className={styles['chat-details']}>
                    <div className={styles['name']}>{heading}</div>
                    <div className={styles['message']}>
                        {lastMessageSender}: {lastMessageText}
                    </div>
                </div>
            </Link>
        );
    }

    return (
        <div className={styles['chat']} onClick={didItemClicked} ref={ref}>
            <Avatar src={img_src} title={heading} />
            <div className={styles['chat-details']}>
                <div className={styles['name']}>{heading}</div>
                <div className={styles['message']}>
                    {lastMessageSender}: {lastMessageText}
                </div>
            </div>
        </div>
    );
}
