import { Button, Modal, Form } from '../../../../shared/ui/index.js';
import { validation } from '../lib/validation.js';
import { userApi } from '../../../../shared/api/users.js';
// import bus from '../../../../modules/event-bus.js';
import store from '../../../../modules/state-manager.js';

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
                template: 'features/auth/signup/ui/Form/Form',
            });

            form.setActions({
                submit: async (fields) => {
                    let res = await userApi.signup(fields);
                    
                    if (res.ok) {
                        // bus.emit('user:logged-in', fields);
                        store.setState('user', fields);
                        modal.destroy();
                    } else {
                        let message = await res.json(); 
                        const error = {};
                        error['email'] = message.error;
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