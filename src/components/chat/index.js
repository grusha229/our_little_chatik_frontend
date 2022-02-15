import chatAreaPug from './index.pug';
import chatListPug from './subcomponents/chatList/index.pug';
import './style.scss';
import './subcomponents/chatList/style.scss';
import {chatList} from "./chatList";

export function createChats () {
    const stuff = document.getElementById('stuff');
    stuff.setAttribute('class', '');
    stuff.innerHTML = '';

    stuff.setAttribute('class', 'chat-page');

    const reg = document.createElement('div');
    stuff.appendChild(reg);
    reg.innerHTML = chatAreaPug();
    const messageList = document.getElementById('messages-list');

    const list = document.createElement('div');

    list.setAttribute("id","panel");
    list.innerHTML = chatListPug({
        chatList: chatList
    });
    messageList.appendChild(list);
}