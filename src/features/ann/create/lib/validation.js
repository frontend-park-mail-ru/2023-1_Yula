export const validation = (fields) => {
    let { title, description, tags, price } = fields;
    const errors = {};

    if (title.trim() === '') {
        errors.title = 'Введите логин';
    }
    if (description.trim() === '') {
        errors.description = 'Введите пароль';
    }

    console.log(price);
    if (price.trim() === '') {
        errors.price = 'Введите цену';
    } else if (!+price) {
        errors.price = 'Цена должна быть целым числом';
    } else if (+price < 0) {
        errors.price = 'Цена не может быть отрицательной';
    }
    
    return errors;
}