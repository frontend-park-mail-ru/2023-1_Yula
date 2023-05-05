export const validation = (fields) => {
    let { login, password } = fields;
    const errors = {};

    if (login.trim() === '') {
        errors.login = 'Введите логин';
    }
    if (password.trim() === '') {
        errors.password = 'Введите пароль';
    }

    if (!/^[a-zA-Zа-яА-Я0-9]+$/u.test(login)) {
        errors.login = 'Логин не валидный';
    }
    if (!/^[a-zA-Zа-яА-Я0-9]+$/u.test(password)) {
        errors.password = 'Пароль не валидный';
    }

    if (password.length < 6) {
        errors.password = 'Пароль должен содержать не менее 6 символов';
    }
    
    return errors;
}