export const validation = (fields) => {
    let { title, description, tags, price, image } = fields;
    const errors = {};

    if (title.trim() === '') {
        errors.title = 'Введите логин';
    }
    if (description.trim() === '') {
        errors.description = 'Введите пароль';
    }

    if (price.trim() === '') {
        errors.price = 'Введите цену';
    } else if (!+(price.replace(/\s/g, ''))) {
        errors.price = 'Цена должна быть целым числом';
    } else if (+(price.replace(/\s/g, '')) < 0) {
        errors.price = 'Цена не может быть отрицательной';
    }

    if (tags.trim() === '') {
        errors.tags = 'Введите теги';
    }

    if (!image.size) {
        errors.image = 'Добавьте изображение';
    }
    
    return errors;
}