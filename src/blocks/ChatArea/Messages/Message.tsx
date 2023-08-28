// @ts-ignore
import s from "./Message.module.css"
import {Skeleton} from "../../../components/sceleton/Sceleton";
import React from "react";

type ChatMessageType = {
    chat_id: string;
    created_at: boolean;
    date: number;
    msg_id: string;
    payload: string;
    sender_id: string;
    isMine: boolean;
};

export const MessageLoader = () => (
    <>
        <div className={`${s.messageLine} ${s.mine} ${s.loading}`}>
                <Skeleton/>
            <div className={`${s.messageDate} ${s.loading}`}>
                <Skeleton/>
            </div>
        </div>
        <div className={`${s.messageLine} ${s.notMine} ${s.loading}`}>
            <Skeleton/>
            <div className={`${s.messageDate} ${s.loading}`}>
                <Skeleton/>
            </div>
        </div>
    </>
)

export const Message = (props: ChatMessageType) => {

    const  messageStyle = {
        color: props.isMine ?  "black" : "white",
        backgroundColor: props.isMine ? "#fcc521":"DodgerBlue",
        alignSelf: props.isMine ?  "flex-end" : "flex-start",
        borderRadius: props.isMine ? "8px 8px 8px 0":"8px 8px 0 8px",
    };

    const dateStyle = {
        alignSelf: props.isMine ?  "flex-end" : "flex-start",
        textAlign: props.isMine ?  "right" : "left",
    };

    console.log('MESSAGE', props)

    let messageTime = new Date(props.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    // console.log(messageTime)
    return (
        <>
            <div className={`${s.messageLine} ${ props.isMine ? s.mine : s.notMine}`}>
                <div>
                    <p className={s.messageText}>{props.payload}</p>
                </div>
                <div className={s.messageDate}>
                    <p className={s.messageDate_time} >{messageTime}</p>
                </div>
            </div>
            {/*<div style={s.messageData}>*/}
            {/*    /!*<p className={s.messageText} >{messageTime.getUTCHours()}:{messageTime.getUTCMinutes()}</p>*!/*/}
            {/*    <p className={s.messageText} >{messageTime}</p>*/}
            {/*</div>*/}
        </>
    )
};
