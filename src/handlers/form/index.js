import {serverLocate} from "../locale";
import {fetchRequest} from "../network/fetch";
import {Router} from "../../../router/router";

// обработка отправки формы
const form = document.getElementById('form');
form.addEventListener('submit', function(event) {
    event.preventDefault();
    alert("gogogo")
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