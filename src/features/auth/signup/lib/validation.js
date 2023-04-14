export const validation = (fields) => {
    let {login, firstName, secondName, phoneNumber, email, password, passwordCheck} = fields;
    const errors = {};

    if (login.trim() === '') {
        errors.login = 'Введите логин';
    }
    if (firstName.trim() === '') {
        errors.firstName = 'Введите имя';
    }
    if (secondName.trim() === '') {
        errors.secondName = 'Введите фамилию';
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

    if (login.indexOf(' ') !== -1) {
        errors.login = 'Логин не должно содержать пробелов';
    }

    if (email.indexOf('@') === -1) {
        errors.email = 'Email должен содержать символ "@"';
    }

    if (password.length < 6) {
        errors.password = 'Пароль должен содержать не менее 6 символов';
    }

    if (phoneNumber.length !== 10) {
        errors.phoneNumber = 'Номер телефона должен содержать 10 цифр';
    }


    if (passwordCheck !== password) {
        errors.passwordCheck = 'Пароли должны совпадать';
    }
    
    return errors;
}