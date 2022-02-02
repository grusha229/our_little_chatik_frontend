import Router from "../router/router";
import {createMenu} from "./components/headerMenu"
import {createForm} from "./components/form";

// new Router();
const root = document.getElementById('root');
createMenu();
createForm();
Router.goTo(decodeURIComponent(window.location.pathname), document.title);
console.log('test');