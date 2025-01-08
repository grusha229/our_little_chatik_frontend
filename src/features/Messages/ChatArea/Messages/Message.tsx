import { Skeleton } from "@mui/material";
import s from "./Message.module.scss"

type Props = {
    text: string;
    isMine: boolean;
    date: string;
};

export const MessageSkeleton = ( { isMine } : { isMine?: boolean} ) => {
    return (
        <>
            <div className={`${s.messageLine} ${ isMine ? s.mine : s.notMine}`}>
                <div>
                    <p className={s.messageText}>
                        <Skeleton variant="text" animation="pulse" width={220}/>
                    </p>
                </div>
                <div className={s.messageDate}>
                    <p className={s.messageDate_time} >
                        <Skeleton variant="text" animation="pulse" width={30}/>
                    </p>
                </div>
            </div>
        </>
    )
}

export const Message = (props: Props) => {

    const messageTime = new Date(props.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    return (
        <>
            <div className={`${s.messageLine} ${ props.isMine ? s.mine : s.notMine}`}>
                <div>
                    <p className={s.messageText}>{props.text}</p>
                </div>
                <div className={s.messageDate}>
                    <p className={s.messageDate_time} >{messageTime}</p>
                </div>
            </div>
        </>
    )
};
