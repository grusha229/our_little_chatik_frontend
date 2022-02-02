import menuPug from "./index.pug"
import "./style.scss"
import {Router} from "../../../router/router";

export function createMenu () {
    const root = document.getElementById('root');
    const menu = document.createElement('div');
    menu.setAttribute('id', 'menu');
    root.appendChild(menu);
    root.innerHTML = menuPug();
}