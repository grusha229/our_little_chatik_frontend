export class Router {
    constructor() {
        this.routs = {
            // '/': displayMessages,
            // '/signup': authModule.renderRegistration,
            // '/login': authModule.renderAuth,
            // '/logout': logOut,
        }
    }
    goTo(path, title, state=null) {
        state.path = path;
        state.title = title;
        window.history.pushState(
            state, // объект состояния
            state.title, // заголовок состояния
            path, // URL новой записи (same origin)
        );
    }
}