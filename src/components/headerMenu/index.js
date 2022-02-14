import menuPug from "./index.pug"
import "./style.scss"
import Router from "../../../router/router";

const application = document.getElementById('root');

export function createMenu () {
    const menuContent = [
        {
            title:"Че тут такое",
            link:"/about"
        },
        {
            title:"Зарегистрироваться",
            link:"/signup"
        },
        {
            title:"Войти",
            link:"/login"
        },
        {
            title:"Чаты",
            link:"/messages"
        }
    ]
    const imageUrl = "https://vinyl-market.ru/images/shop_items/800.jpg";

    const menu = document.createElement("div");
    menu.setAttribute("id","menu");
    menu.innerHTML = menuPug({
            menuContent: menuContent,
            imageUrl: imageUrl
        });

    application.appendChild(menu);



    menuContent.forEach((element) => {
        const button = document.getElementById(element.link);
        button.addEventListener('click', function (event) {
            event.preventDefault();
            Router.goTo(element.link,element.title);
            console.log(element.link);
            console.log("lolkek");
        });
    });
    const logo = document.getElementById("logo");
    logo.addEventListener('click', function (event) {
        event.preventDefault();
        Router.goTo("/","Главная");
    });

}
//
// const goSignup = () => {
//     Router.goTo('/signup', 'Регистрация');
// };
//
// const menuRoutes = {
//     signup: goSignup,
// };


// navbar.append(menu);

// menuItem.setAttribute('class', 'navbar-link btn-in first');
// menuItem.textContent = unAuthElements[key];
// menuItem.dataset.section = key;
// menuItem.id = `/${key}`;
// li.appendChild(menuItem);
// menuItem.addEventListener('click', function(event) {
//     event.preventDefault();
//     Router.go(`/${key}`, unAuthElements[key], null, true, false);
//     const rt = document.getElementById('navbar');
//     rt.setAttribute('class', '');
//     closeMenu();
// });

