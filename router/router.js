import {createFormLogin} from "../src/components/form";
import {createFormSignup} from "../src/components/form";
import {createAbout} from "../src/components/about";
import {createMain} from "../src/components/main";

export class Router {
    constructor() {
        this.routs = {
            '/': createMain,
            '/about': createAbout,
            '/signup': createFormSignup,
            '/login': createFormLogin,
            // '/logout': logOut,
        }
    }
    goTo(path, title) {
        if (document.getElementById('stuff') == null){
            const root = document.getElementById('root');
            const stuff = document.createElement('div');
            stuff.setAttribute('id','stuff');
            root.appendChild(stuff);
        }
        const state = {}
        history.pushState(state, title, path)
        const func = this.routs[path];
        if ((func === null) || (func === undefined)) {
            alert(`плохо ${path}`);
        } else {
            func();
        }
    }
} export default new Router();