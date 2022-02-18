import {serverLocate} from "../locale";
import {fetchRequest} from "../network/fetch";
import {Router} from "../../../router/router";

// обработка отправки формы
// http://89.208.86.252:8080/documentation/index.html#/ - swagger

export function formHandler(formType) {
    let formLink = '';
    let user = {};

    const form = document.getElementById('form');

    form.addEventListener('submit', function (event) {
        event.preventDefault();

            formLink = '/auth/signup';
            const firstname = document.getElementById('firstname').value;
            const lastname = document.getElementById('lastname').value;
            const password = document.getElementById('password').value;
            const username = document.getElementById('username').value;
            user = {
                firstname: firstname,
                lastname: lastname,
                password: password,
                username: username
            };
            const url = serverLocate + formLink;
            // 89.208.86.252
            const data = JSON.stringify(user);
            console.log(user);
            console.log(data);
            console.log(url);
            fetchRequest(url, 'POST', data).then((result) => {
                console.log(result);
                if (!result.ok) {
                    alert('error - unlogined');
                    throw error;
                }
            }).then(
                () => {
                    alert('Logined');
                    Router.goTo('/', 'about');
                },
            )

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


        //     .catch(function () {
        //     alert('Неверный логин или пароль');
        //     // showErrors('Неверный логин или пароль');
        // });
        // }
    });
}