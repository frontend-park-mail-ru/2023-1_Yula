export const validation = (fields) => {
    let { login, password } = fields;
    const errors = {};

    if (login.trim() === '') {
        errors.login = 'Введите логин';
    }
    if (password.trim() === '') {
        errors.password = 'Введите пароль';
    }

    if (password.length < 6) {
        errors.password = 'Пароль должен содержать не менее 6 символов';
    }
    
    return errors;
}