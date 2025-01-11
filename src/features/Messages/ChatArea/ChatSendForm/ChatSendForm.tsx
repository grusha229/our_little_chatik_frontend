import React, { useCallback } from 'react'
import styles from './ChatSendForm.module.scss'
import Button from '../../../controls/Button/Button';
import Input from '../../../controls/Input/Input';
import { useForm } from 'react-hook-form';
import { IChatsSendMessagePayload } from '../../../../models/chats';
import { useSendChatMessageMutation } from '../../../../services/chat';
import { generateNewMessage } from './ChatSendForm.utils';
import { useAppSelector } from '../../../../store/store';
import { addMessage, updateMessageStatus } from '../../../../store/features/chats';
import { useDispatch } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';

export interface IProps {
    chat_id: string;
}

export default function ChatSendForm({ chat_id }: IProps) {

    const { register, handleSubmit, formState: { isValid, isSubmitting }, reset} = useForm<IChatsSendMessagePayload>({
        defaultValues: {
            payload: '',
            id: chat_id,
        },
    });
    const current_user = useAppSelector((state) => state.users.current_user);
    const current_id = current_user?.user_id || '';

    const dispatch = useDispatch();
    const [ sendMessage ] = useSendChatMessageMutation();

    const onSubmit = async (formData: IChatsSendMessagePayload) => {
        console.log(formData)
        const tempId = nanoid();
        const newMessage = generateNewMessage(tempId, formData.payload, current_id );

        dispatch(addMessage({ chat_id, message: newMessage }));
        console.log('добавляем сообщение в стор', newMessage)

        try {
          await sendMessage(formData).unwrap()
            .then((response) => {
                console.log('Пришёл ответ', response)
                // Обновляем статус на "sent" и ID на настоящий
                dispatch(
                    updateMessageStatus({
                        tempId,
                        id: response.id,
                        status: 'sent',
                        chat_id: response.chat_id
                    })
                );
            });
        } catch (error) {
          // В случае ошибки обновляем статус на "failed"
          dispatch(
            updateMessageStatus({
                tempId,
                id: newMessage.id,
                status: 'failed',
                chat_id
            })
          );
          console.error('Ошибка отправки сообщения:', error);
        }

        reset(); // Очистка формы
    };


    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className={styles['form']}
        >
            <Input
                name='payload'
                register={register}
                rules={{ required: true }}
                className={styles['input']}
                placeholder="Enter a message..."
            />
            <Button
                type='submit'
                disabled={!isValid || isSubmitting}
                // onClick={handleAddMessageClick}
            >
                Отправить
            </Button>
        </form>
    )
}
