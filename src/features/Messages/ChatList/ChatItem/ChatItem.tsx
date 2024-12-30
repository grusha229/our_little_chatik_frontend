import React from 'react';
import {Link} from "react-router-dom";

import s from './ChatItem.module.css';
import {Skeleton} from "../../../components/sceleton/Sceleton";

export const LoadingChatItem = () => {
	return(
		<div className={s.info}>
			<div className={s.logo}>
				<Skeleton/>
			</div>
			<div>
				<div className={`${s.name} ${s.loading}`}>
					<Skeleton/>
					<Skeleton/>
				</div>
				<div className={`${s.message} ${s.loading}`}>
					<Skeleton/>
				</div>
			</div>
		</div>
	)
}

export default function ChatItem(props) {
	return (
			<Link to={`/${props.userId}`} className={s.info}>
				<div>
					<div className={s.name}>
						{props.name +" " + props.surname}
					</div>
					<div className={s.message}>
						{props.lastMessage}
					</div>
				</div>
			</Link>
	);
};
