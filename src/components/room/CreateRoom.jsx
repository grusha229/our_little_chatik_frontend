import React from "react";
import s from './Button.module.css';
import {useNavigate} from "react-router";

const CreateRoom = (props) => {
    const navigate = useNavigate();
    const create = async (e) => {
        e.preventDefault();
        var base = window.location.origin;
        const resp = await fetch(base+"/video/call?room_id="+props.chatId);
        const { room_id } = await resp.json();
        console.log('HERE', room_id)
		// props.history.push(`/room/${room_id}`)
        navigate(`/room/${room_id}`);
    };

    return (
        <div>
            <button
                className={s.callbutton}
                onClick={create}>Create Room
            </button>
        </div>
    );
};

export default CreateRoom;
