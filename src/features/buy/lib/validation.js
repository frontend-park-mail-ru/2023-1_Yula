export const validation = (fields) => {
    let { cardNum, cvv, expDate, nameSurname } = fields;
    const errors = {};
    if (cardNum.trim() === '') {
        errors.cardNumber = 'Введите номер карты';
    }
    if (cvv.trim() === '') {
        errors.cvv = 'Введите CVV-код';
    }
    if (nameSurname.trim() === '') {
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