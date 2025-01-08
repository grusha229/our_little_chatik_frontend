import s from "./Messages.module.scss"
import {Message, MessageSkeleton} from "./Message";
import {useEffect, useRef} from "react";
import {scrollToBottom} from "../../../../utils/scrollToBottom";
import {useDispatch, useSelector} from "react-redux";
import {fetchMessages} from "../../../store/messagesSlice.js";
import { useGetChatMessagesMutation } from "../../../../services/chat.js";
import { Skeleton } from "@mui/material";

const YOUR_ID = "337295eb-cbde-479c-a4ee-683019adc838"

export interface IProps {
    chat_id: string
}

export default function Messages ({ chat_id }: IProps) {

    const [ getMessages, { isLoading, data: currentMessages } ] = useGetChatMessagesMutation();
    const containerRef = useRef(null);

    useEffect(()=>{
        getMessages({id: chat_id})
    },[chat_id])


    useEffect(() => {
        scrollToBottom(containerRef)
    }, [containerRef]);

    if (isLoading) {
        return (
            <div className={s.messages} ref={containerRef}>
                <MessageSkeleton isMine />
                <MessageSkeleton />
                <MessageSkeleton isMine />
            </div>
        )
    }

    // {(chatListError !== null) && (
    //     <div className={s.error}>
    //         Возникла ошибка загрузки сообщений
    //     </div>
    // )}
    // {(chatListStatus === "pending") && (
    //     <Loader/>
    // )}

    return (
        <div className={s.messages} ref={containerRef}>
            {currentMessages?.map((message, index) => {
                return <Message key={index} text={message.payload} isMine={(message.sender_id === YOUR_ID)} date={message.created_at}/>
            })}
        </div>
    )
}
