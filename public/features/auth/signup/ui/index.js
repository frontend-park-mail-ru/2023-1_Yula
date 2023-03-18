import {  Button, Modal } from '../../../../shared/ui/index.js';
import { Form } from '../ui/Form/Form.js';
import { validation } from '../lib/validation.js';

export const signupModal = (parent, actions = {}) => {
    // инициализируем модальное окно
    const modal = new Modal(parent);
    modal.config = {
        id: 'signup',
        title: 'Регистрация'
    }

    // добавляем события
    if (actions.back) {
        modal.config.actions.back = actions.back;
    }

    // рендерим модалку
    modal.render();

    // заполняем тело
    const form = Form(modal.body());
    form.render();
    
    // заполняем футер
    const submitBtn = new Button(modal.footer());
    submitBtn.config = {
        id: "signup",
        type: "submit",
        form: "signupForm"
    }
    submitBtn.render();

    // событие отправки данных
    form.self().addEventListener('submit', (e) => {
        e.preventDefault();
        form.resetErrors();

        let {username, email, password, repeatPassword} = form.getFields();
        const errors = validation(username, email, password, repeatPassword);
        console.log(errors);

        if (!Object.keys(errors).length) {
            console.log('Api!');
        } else {
            form.showError(errors);
        }
    });

    return modal;
}