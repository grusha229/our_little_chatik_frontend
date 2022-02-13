import chatArea from './index.pug';
import './style.scss';

export function createChats () {
    const stuff = document.getElementById('stuff');
    stuff.setAttribute('class', '');
    stuff.innerHTML = '';

    stuff.setAttribute('class', 'main-page');

    const reg = document.createElement('div');
    stuff.appendChild(reg);
    reg.innerHTML = chatArea();
}