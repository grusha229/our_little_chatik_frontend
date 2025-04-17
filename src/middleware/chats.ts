import { Middleware } from '@reduxjs/toolkit';
import { chatApi } from '@app/services/chat';
import { addMoreMessages, addUploadFiles, setChatMessages, setChats, setCurrentChat, updateMessageStatus } from '@app/store/features/chats';
import { AppDispatch } from '@app/store/types';

const chatsMiddleware: Middleware = store => next => async action => {
    const result = next(action);

    const dispatch: AppDispatch = store.dispatch;

    if (chatApi.endpoints.create.matchFulfilled(action)) {
        console.log('created:');
        dispatch(chatApi.endpoints.chatsList.initiate({} as any, { forceRefetch: true }))
            .unwrap()
            .then(response => {
                console.log('Список чатов обновлён:', response);
                store.dispatch(setChats(response));
            })
            .catch(error => {
                console.error('Ошибка при обновлении списка чатов:', error);
            });
    }

    if (chatApi.endpoints.chatsList.matchFulfilled(action)) {
        store.dispatch(setChats(action.payload));
    }

    if (chatApi.endpoints.sendChatMessage.matchFulfilled(action)) {
        store.dispatch(
            updateMessageStatus({
                id: action.payload.id,
                status: 'done',
                chat_id: action.payload.chat_id,
            }),
        );
    }

    if (chatApi.endpoints.sendChatMessage.matchRejected(action)) {
        console.log('match Rejected', action);
        store.dispatch(
            updateMessageStatus({
                chat_id: action.meta.arg.originalArgs.chat_id,
                status: 'rejected',
                id: action.meta.arg.originalArgs.id,
            }),
        );
    }

    if (chatApi.endpoints.getChatInfo.matchFulfilled(action)) {
        store.dispatch(setCurrentChat(action.payload));
        if (!action.payload?.last_message) {
            store.dispatch(setChatMessages({ chat_id: action.payload.chat_id, messages: [] }));
        }
        store.dispatch(addUploadFiles({ chat_id: action.payload.chat_id, files: [], status: 'done' }));
    }

    if (chatApi.endpoints.getChatMessages.matchFulfilled(action)) {
        if (action.meta.arg.originalArgs.isFirstMessagesFetching === true) {
            store.dispatch(
                setChatMessages({
                    chat_id: action.meta.arg.originalArgs.id,
                    messages: action.payload,
                }),
            );
        } else {
            store.dispatch(
                addMoreMessages({
                    chat_id: action.meta.arg.originalArgs.id,
                    messages: action.payload,
                }),
            );
        }
    }

    return result;
};

export default chatsMiddleware;
