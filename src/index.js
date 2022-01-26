import {router} from "../router/router";

new router();
const root = document.getElementById('root');
const menu = document.createElement('div');
menu.setAttribute('id', 'menu');
root.innerHTML = '';
root.appendChild(menu);
createMenu();
Rout.go(decodeURIComponent(window.location.pathname), document.title);