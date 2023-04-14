export const validation = (fields) => {
    let { title, desc } = fields;
    const errors = {};

    if (title.trim() === '') {
        errors.title = 'Введите логин';
    }
    if (desc.trim() === '') {
        errors.desc = 'Введите пароль';
    }
    
    return errors;
}