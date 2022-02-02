import formPug from "./index.pug"
import "./style.scss"
import {Router} from "../../../router/router";
import {createMenu} from "../headerMenu";

export function createForm () {
    if (document.getElementsByClassName('header') === null) {
        createMenu();
    }

    const root = document.getElementById('root');

    const stuff = document.createElement('div');
    stuff.setAttribute('id', 'stuff');
    root.appendChild(stuff);
    stuff.innerHTML = formPug();
}