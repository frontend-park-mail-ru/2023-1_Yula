export const validation = (fields) => {
    let {username, email, password, repeatPassword} = fields;
    const errors = {};

    if (username.trim() === '') {
        errors.login = 'Введите имя пользователя';
    }
    if (email.trim() === '') {
        errors.login = 'Введите логин';
    }
    if (password.trim() === '') {
        errors.password = 'Введите пароль';
    }

    if (email.indexOf(' ') !== -1) {
        errors.email = 'Имя пользователя не должно содержать пробелов';
    }

    if (email.indexOf('@') === -1) {
        errors.email = 'Email должен содержать символ "@"';
    }

    if (password.length < 6) {
        errors.password = 'Пароль должен содержать не менее 6 символов';
    }

    if (repeatPassword !== password) {
        errors.repeatPassword = 'Пароли должны совпадать';
    }
    
    return errors;
}