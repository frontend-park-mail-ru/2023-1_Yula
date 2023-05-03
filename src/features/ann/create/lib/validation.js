export const validation = (fields) => {
    let { title, description, tag, price, pathImages } = fields;
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

    if (tag.trim() === '') {
        errors.tag = 'Введите теги';
    }

    if (!pathImages.size) {
        errors.pathImages = 'Добавьте изображение';
    }
    
    return errors;
}