import aboutPug from "./index.pug"
import "./style.scss"
import formPug from "../form/index.pug";

export function createAbout () {
    const stuff = document.getElementById('stuff');
    stuff.setAttribute('class', '');
    stuff.innerHTML = '';

    stuff.setAttribute('class', 'about-page');

    const reg = document.createElement('div');
    stuff.appendChild(reg);
    reg.innerHTML = aboutPug();
}
