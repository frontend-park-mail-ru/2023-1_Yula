import { Button, Modal, Form } from '@shared/ui/index.js';
import { validation } from '../lib/validation.js';
import { userApi } from '@shared/api/users.js';
import template from './Form/Form.handlebars';
import store from '@modules/state-manager.js';

export const signupModal = (parent) => {
    const modal = Modal(parent, {
        id: 'signup',
        title: 'Регистрация'
    });
    const actions = {};

    return {
        render: () => {
            // рендерим модалку
            modal.render();

            // заполняем тело
            const form = Form(modal.body(), {
                id: "signup",
                template,
            });

            form.setActions({
                submit: async (fields) => {
                    const { accept, ...data } = fields;
                    data['avatar'] = 'default.jpeg';
                    console.log(data);
                    let res = await userApi.signup(data);
                    
                    if (res.ok) {
                        let user = await userApi.getMe();
                        store.setState('user', user);
                        modal.destroy();
                    } else {
                        let message = await res.json(); 
                        const error = {};
                        error['email'] = message.message;
                        form.showError(error);
                    }
                },
                validation: validation,
                accept: (checked) => {
                    form.self().submit.disabled = !checked;
                }
            });

            form.render();
            
            // заполняем футер
            const existsAccountBtn = Button(modal.footer(), {
                id: "existsAccount",
                type: "button",
                text: "Есть аккаунт?",
                color: "tertiary",
                textColor: "primary"
            });
            existsAccountBtn.setActions({
                click: actions.existsAccount,
            });
            existsAccountBtn.render();

            const submitBtn = Button(modal.footer(), {
                id: "signup",
                type: "submit",
                color: "success",
                text: "Регистрация",
                form: "signupForm",
                disabled: true,
            });
            submitBtn.render();

            // добавляем события
            if (actions.back) {
                modal.setActions({back: actions.back});
            }
        },

        setActions: (newActions) => {
            actions.back = newActions.back;
            actions.existsAccount = newActions.existsAccount;
        },

        self: () => modal.self(),

        destroy: () => modal.destroy(),
    };
}