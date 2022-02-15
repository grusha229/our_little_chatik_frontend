import Router from "../router/router";
import {createMenu} from "./components/headerMenu"
import {createMain} from "./components/main";
import {createChats} from "./components/chat";


const root = document.getElementById('root');
const stuff = document.createElement('div');
stuff.setAttribute('id','stuff');
root.innerHTML = '';
createMenu();
root.appendChild(stuff);
createMain();

Router.goTo(decodeURIComponent(window.location.pathname), document.title);
console.log('test');