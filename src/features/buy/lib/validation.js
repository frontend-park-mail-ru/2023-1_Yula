export const validation = (fields) => {
    let { cardNumber, cvv, name, expDate } = fields;
    const errors = {};

    if (cardNumber.trim() === '') {
        errors.cardNumber = 'Введите номер карты';
    }
    if (cvv.trim() === '') {
        errors.cvv = 'Введите CVV-код';
    }
    if (name.trim() === '') {
        errors.name = 'Введите фамилию и имя владельца';
    }
    if (expDate.trim() === '') {
        errors.expDate = 'Введите срок действия карты'
    }

    if (new Date(expDate) < new Date()) {
        errors.expDate = 'Карта просрочена';
    }
    if (cvv.length > 3) {
        errors.cvv = 'неверный CVV-код'
    }

    return errors;
}