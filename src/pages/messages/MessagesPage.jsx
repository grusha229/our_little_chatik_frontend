import s from './messages.module.css'
import chatIcon from "../../assets/newChat.svg"
import ChatBoard from "../../blocks/ChatList/ChatBoard/ChatBoard";
import { Outlet } from "react-router-dom";
import {useCallback, useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {searchChats} from "../../store/chatListSlice.js";
import Modal from "../../components/modal/Modal.jsx";
import {toggleVisible} from "../../store/modalSlice.js";



export default function MessagesPage() {

    const isModalVisible = useSelector(state => state.modal.isVisible)

    const dispatch = useDispatch();

    const handleAddChat = useCallback(()=> {
        dispatch(toggleVisible())
    })

    const searchRef = useRef('');

    function handleChange() {
        dispatch(searchChats(searchRef.current.value))
    }

    return (
        <div className={s.layout}>
            <Modal
                active={isModalVisible}
                children={
                    <input
                        className={s.messageInput}
                        placeholder="Найти чат"
                        ref={searchRef}
                        onChange={handleChange}
                    />
                }
            />
            <div className={s.chatlist}>
                <div className={s.inputs}>
                    <div className={s.сontent}>
                        <input
                            className={s.messageInput}
                            placeholder="Найти чат"
                            ref={searchRef}
                            onChange={handleChange}
                        />
                        <div className={s.addIcon} onClick={handleAddChat}>
                            <img src={chatIcon}/>
                        </div>
                    </div>
                </div>

                <ChatBoard/>

            </div>
            <div className={s.chatContent}>
                <div className={s.chatarea}>
                    <Outlet/>
                </div>
            </div>
        </div>
    );
}
