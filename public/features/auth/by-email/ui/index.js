import {  Button, Modal } from '../../../../shared/ui/index.js';
import { Form } from '../ui/Form/Form.js';
import { validation } from '../lib/validation.js';

export const loginModal = (parent, actions = {}) => {
    // инициализируем модальное окно
    const modal = new Modal(parent);
    modal.config = {
        id: 'login',
        title: 'Авторизация'
    }

    // рендерим модалку
    modal.render();

    // заполняем тело
    const form = Form(modal.body());
    form.render();
    
    // заполняем футер
    const noAccountBtn = new Button(modal.footer());
    noAccountBtn.config = {
        id: "noAccount",
        type: "button",
        actions: {
            click: actions.noAccount,
        },
        text: "Нет аккаунта?",
        class: "btn btn-primary-tertiary grid-left"
    };
    noAccountBtn.render();

    const submitBtn = new Button(modal.footer());
    submitBtn.config = {
        id: "auth",
        type: "submit",
        form: "loginFormByEmail"
    };
    submitBtn.render();

    // событие отправки данных
    form.self().addEventListener('submit', (e) => {
        e.preventDefault();
        form.resetErrors();

        let {email, password} = form.getFields();
        const errors = validation(email, password);

        if (!Object.keys(errors).length) {
            console.log('Api!');
        } else {
            form.showError(errors);
        }
    });

    // добавляем события
    if (actions.back) {
        modal.config.actions.back = actions.back;
    }

    return modal;
}