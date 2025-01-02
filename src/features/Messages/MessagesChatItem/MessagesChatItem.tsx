import React from 'react';
import {Link} from "react-router-dom";

import styles from './MessagesChatItem.module.scss';
import { IChatsChat } from '../../../models/chats';
import Avatar from '../../Users/Avatar/Avatar';

export interface IProps {
	heading: string;
	last_message?: string;
	img_src?: string;
	link: string;
}

export default function MessagesChatItem({ heading, last_message, img_src, link } : IProps) {
	return (
		<Link to={`${link}`} className={styles['chat']}>
				<Avatar src={img_src || `https://ui-avatars.com/api/?name=${heading}`} />
				<div className={styles['chat-details']} >
					<div className={styles['name']}>
						{heading}
					</div>
					<div className={styles['message']}>
						{last_message}
					</div>
				</div>
		</Link>
	);
};
