import {Router} from "../router/router";
import {createMenu} from "../src/components/headerMenu/index"

new Router();
const root = document.getElementById('root');
root.innerHTML = '';
createMenu();

Router.goTo(decodeURIComponent(window.location.pathname), document.title);
console.log('test');