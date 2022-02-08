import mainPug from "./index.pug"
import "./style.scss"
import menuPug from "../headerMenu/index.pug";
import Router from "../../../router/router";

export function createMain () {
    const mainContent = [
        {
            title:"Войти",
            description:"Для опытных джежаев",
            link:"/login-btn"
        },
        {
            title:"Зарегистрироваться",
            description:"Для юных падаванов",
            link:"/signup-btn"
        }
    ]

    const stuff = document.getElementById('stuff');
    stuff.setAttribute('class', '');
    stuff.innerHTML = '';


    stuff.setAttribute('class', 'main-page');

    const reg = document.createElement('div');
    stuff.appendChild(reg);
    reg.innerHTML = mainPug({
        mainContent: mainContent
    });

    mainContent.forEach((element) => {
        const button = document.getElementById(element.link);
        button.addEventListener('click', function (event) {
            event.preventDefault();
            let routLink = element.link.slice(0,-4);
            Router.goTo(routLink,element.title);
            console.log(element.link);
            console.log("lolkek");
        });
    });
}
