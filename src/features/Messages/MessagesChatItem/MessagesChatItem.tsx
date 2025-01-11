import React, { useCallback } from 'react';
import {Link} from "react-router-dom";

import styles from './MessagesChatItem.module.scss';
import Avatar from '../../Users/Avatar/Avatar';

export interface IProps {
	heading: string;
	last_message?: string;
	img_src?: string;
	link?: string;
	onClick?: () => void;
}

export default function MessagesChatItem({ heading, last_message, img_src, link, onClick } : IProps) {
	const didItemClicked = useCallback(() => {
		return onClick && onClick()
	}, [onClick])

	if (link) {
		return (
			<Link to={`${link}`} className={styles['chat']} onClick={didItemClicked}>
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
	}

	return (
		<div className={styles['chat']} onClick={didItemClicked}>
				<Avatar src={img_src || `https://ui-avatars.com/api/?name=${heading}`} />
				<div className={styles['chat-details']} >
					<div className={styles['name']}>
						{heading}
					</div>
					<div className={styles['message']}>
						{last_message}
					</div>
				</div>
		</div>
	);
};
