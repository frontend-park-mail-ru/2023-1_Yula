export const validation = (fields) => {
    let { email, password } = fields;
    const errors = {};

    if (email.trim() === '') {
        errors.login = 'Введите логин';
    }
    if (password.trim() === '') {
        errors.password = 'Введите пароль';
    }

    if (email.indexOf('@') === -1) {
        errors.email = 'Email должен содержать символ "@"';
    }

    if (password.length < 6) {
        errors.password = 'Пароль должен содержать не менее 6 символов';
    }
    
    return errors;
}