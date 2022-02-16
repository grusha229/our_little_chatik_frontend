import {serverLocate} from "../locale";
import {fetchRequest} from "../network/fetch";
import {Router} from "../../../router/router";

// обработка отправки формы
const form = document.getElementById('form');
form.addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('login').value;
    const pwd = document.getElementById('password').value;
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
        const user = {login: name, password: pwd};
        const url = serverLocate+'/users/login';
        // 3.67.182.34
        fetchRequest(url, 'POST', user).then((result)=>{
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