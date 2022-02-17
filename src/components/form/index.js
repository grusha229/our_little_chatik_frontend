import formPug from "./index.pug"
import "./style.scss"
import Router from "../../../router/router";
import {createMenu} from "../headerMenu";
import {serverLocate} from "../../handlers/locale";
import {fetchRequest} from "../../handlers/network/fetch";

export function createFormLogin () {
    const auth = "login";
    const stuff = document.getElementById('stuff');
    stuff.setAttribute('class', '');
    stuff.innerHTML = '';

    stuff.setAttribute('class', 'auth');

    const reg = document.createElement('div');
    stuff.appendChild(reg);
    reg.innerHTML = formPug({
        auth: auth
    });
}

export function createFormSignup () {
    const auth = "signup"
    const stuff = document.getElementById('stuff');
    stuff.setAttribute('class', '');
    stuff.innerHTML = '';

    stuff.setAttribute('class', 'reg');

    const reg = document.createElement('div');
    stuff.appendChild(reg);
    reg.innerHTML = formPug({
        auth: auth
    });


// обработка отправки формы
    const form = document.getElementById('form');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        alert("gogogo");
        debugger;
        const firstname = document.getElementById('firstname').value;
        const lastname = document.getElementById('lastname').value;
        const password = document.getElementById('password').value;
        const username = document.getElementById('username').value;
        // let msg = '';
        // if (!validators.username(name)) {
        //     msg += 'Имя должно быть длиннее 3 символов. ';
        // }
        // if (!validators.password(pwd)) {
        //     msg += 'Пароль должен быть от 6 до 16 символов. ';
        // }
        // if (msg !== '') {
        //     showErrors(msg );
        // } else {
        const user = {
            firstname: firstname,
            lastname: lastname,
            password: password,
            username: username
        };
        alert(user);
        const url = serverLocate+'/auth/signup';
        // 3.67.182.34
        const data = JSON.stringify(user);
        alert(data);
        debugger;
        fetchRequest(url, 'POST', data).then((result)=>{
            if (!result.ok) {
                alert('error - unlogined');
                throw error;
            }
        }).then(
            () => {
                alert('Logined');
                // Router.goTo('/', '', null, true, true);
            },
        ).catch(function() {
            alert('Неверный логин или пароль');
            // showErrors('Неверный логин или пароль');
        });
        // }
    });

}

// export const renderAuth = () => {
//     const root = document.getElementById('stuff');
//     root.innerHTML = '';
//     root.setAttribute('class', 'reg-auth');
//
//     const reg = document.createElement('div');
//     root.appendChild(reg);
//
//     // eslint-disable-next-line new-cap
//     reg.innerHTML = formPug();
//
//
//     // обработка отправки формы
//     const form = document.getElementById('form');
//     form.addEventListener('submit', function(event) {
//         event.preventDefault();
//         const name = document.getElementById('auth-login').value;
//         const pwd = document.getElementById('auth-password').value;
//
//         let msg = '';
//         if (!validators.username(name)) {
//             msg += 'Имя должно быть длиннее 3 символов. ';
//         }
//         if (!validators.password(pwd)) {
//             msg += 'Пароль должен быть от 6 до 16 символов. ';
//         }
//         if (msg !== '') {
//             showErrors(msg );
//         } else {
//             const user = {login: name, password: pwd};
//             const url = serverLocate+'/users/login';
//             // 3.67.182.34
//             fetchRequest(url, 'POST', user).then((result)=>{
//                 if (!result.ok) {
//                     throw error;
//                 }
//             }).then(
//                 () => {
//                     Router.go('/', 'LimeTV', null, true, true);
//                 },
//             ).catch(function() {
//                 showErrors('Неверный логин или пароль');
//             });
//         }
//     });
// };
