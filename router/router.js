import {createFormLogin} from "../src/components/form";
import {createFormSignup} from "../src/components/form";
import {createAbout} from "../src/components/about";
import {createMain} from "../src/components/main";
import {createChats} from "../src/components/chat";

export class Router {
    constructor() {
        this.routs = {
            '/': createMain,
            '/about': createAbout,
            '/signup': createFormSignup,
            '/login': createFormLogin,
            '/messages': createChats,
            // '/logout': logOut,
        };

        window.addEventListener('popstate', (evt) => {
            if (evt.state === null) {
                this.goTo('/', "Хме");
            } else {
                const path = evt.state.path;
                this.goTo(path, evt.state.title);
            }
        });
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