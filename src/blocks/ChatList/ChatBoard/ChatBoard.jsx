import ChatItem, {LoadingChatItem} from "../ChatItem/ChatItem.jsx";
import s from "./ChatBoard.module.css"
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {fetchChats} from "../../../store/chatListSlice.js";

const Loader = () => (
    <>
        <LoadingChatItem/>
        <LoadingChatItem/>
        <LoadingChatItem/>
        <LoadingChatItem/>
        <LoadingChatItem/>
    </>
)

export default function ChatBoard () {

    const dispatch = useDispatch()

    const chatList = useSelector((state) => state.chatList.searchChats.searchedChats);
    const chatListStatus = useSelector((state) => state.chatList.status);
    const chatListError = useSelector((state) => state.chatList.error);

    useEffect(()=>{
        dispatch(fetchChats());

    },[dispatch])

    return (
        <div className={s.board}>
            {
                ((chatListStatus === "fulfilled") && (!chatListError)) &&
                    chatList.map((element) => (
                            <ChatItem
                                avatar={element.avatar}
                                name={element.name}
                                surname={element.surname}
                                lastMessage={element.lastMessage}
                                userId={element.id}
                                key={element.id}
                            />
                    )
                )
                }

            {
                (((chatListStatus === "pending") && (!chatListError)) &&
                        <Loader/>
                )
            }

            {
                ((chatListError) &&
                    <div className={s.error}>
                        <b>Возникла ошибка при загрузке данных</b>
                        <br/>
                        <br/>
                        Попробуйте перезагрузить страницу
                    </div>

                )
            }
        </div>
    );
}
