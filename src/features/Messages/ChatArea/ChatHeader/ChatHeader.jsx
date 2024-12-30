import s from "./ChatHeader.module.css"
import Picture from "../../../components/picture/Picture";
import {useSelector} from "react-redux";
import {useEffect} from "react";
import {Skeleton} from "../../../components/sceleton/Sceleton";

export default function ChatHeader (props) {

    const chatList = useSelector((state) => state.chatList.chats);
    const chatStatus = useSelector((state) => state.chatList.status);

    //
    const currentChat = chatList.find(chat=> chat.id === props.id)

    return (
        <div className={s.header}>
            { (chatStatus === 'fulfilled') &&
                <div className={s.content}>
                    <Picture
                        class={s.avatar}
                        src={currentChat.avatar}
                        alt={''}
                    />
                    <div className={s.info}>
                        {currentChat.name} {currentChat.surname}
                    </div>
                </div>
            }

            { (chatStatus === 'pending') &&
                <div className={s.content}>
                    <div className={s.avatar}>
                        <Skeleton/>
                    </div>
                    <div className={s.info}>
                        <Skeleton/>
                    </div>
                </div>
            }
        </div>
    )
}
