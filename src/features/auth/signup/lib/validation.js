export const validation = (fields) => {
    let {login, name, phoneNumber, email, password, passwordCheck} = fields;
    const errors = {};

    if (login.trim() === '') {
        errors.login = 'Введите логин';
    }
    if (name.trim() === '') {
        errors.Name = 'Введите имя';
    }
    if (phoneNumber.trim() === '') {
        errors.phoneNumber = 'Введите номер телефона';
    }
    if (email.trim() === '') {
        errors.login = 'Введите логин';
    }
    if (password.trim() === '') {
        errors.password = 'Введите пароль';
    }

    if (!/^[a-zA-Zа-яА-Я0-9]+$/u.test(login)) {
        errors.login = 'Логин не валидный';
    }
    if (!/^[a-zA-Zа-яА-Я0-9]+$/u.test(name)) {
        errors.name = 'Имя не валидное';
    }
    if (!/^[a-zA-Zа-яА-Я0-9]+$/u.test(password)) {
        errors.password = 'Пароль не валидный';
    }


    if (password.length < 6) {
        errors.password = 'Пароль должен содержать не менее 6 символов';
    }

    if (phoneNumber.length !== 18) {
        errors.phoneNumber = 'Номер телефона не валиден';
    }

    if (passwordCheck !== password) {
        errors.passwordCheck = 'Пароли должны совпадать';
    }
    
    return errors;
}