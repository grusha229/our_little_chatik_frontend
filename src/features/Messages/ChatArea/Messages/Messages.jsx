import s from "./Messages.module.css"
import {Message, MessageLoader} from "./Message";
import {useEffect} from "react";
import {scrollToBottom} from "../../../utils/utils";
import {useDispatch, useSelector} from "react-redux";
import {fetchMessages} from "../../../store/messagesSlice.js";

const YOUR_ID = "337295eb-cbde-479c-a4ee-683019adc838"


export const Loader = () => (
    <>
        <MessageLoader/>
        <MessageLoader/>
        <MessageLoader/>
    </>
)

export default function Messages (props) {

    const messagesList = useSelector((state) => state.messageList.messages);
    const chatListStatus = useSelector((state) => state.messageList.status);
    const chatListError = useSelector((state) => state.messageList.error);

    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(fetchMessages(props.id));
    },[props.id])


    useEffect(() => {
        scrollToBottom(props.container)
    }, [props.container, messagesList]);

    return (
        <>
            {(chatListError !== null) && (
                <div className={s.error}>
                    Возникла ошибка загрузки сообщений
                </div>
            )}
            {(chatListStatus === "pending") && (
                <Loader/>
            )}
            {(chatListStatus === "fulfilled") &&
                messagesList.map((message,index) => {
                    return <Message key={index} text={message.Payload} isMine={(message.SenderID === YOUR_ID)} date={message.CreatedAt}/>
                })
            }
        </>
    )
}
