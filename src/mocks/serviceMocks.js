import chats from './chatsMock.json';
import messages from './messagesMock.json';

const promiseResponse = data =>
    new Promise(function (resolve, reject) {
        // todo переписать
        if (Object.keys(data).length !== 0) {
            resolve(data);
        } else {
            reject("no data");
        }
    });

export const getChats = () => promiseResponse(chats);

export const getMessages = SenderID => {
    const userMessages = messages[SenderID] || [];

    return promiseResponse(userMessages);
};

