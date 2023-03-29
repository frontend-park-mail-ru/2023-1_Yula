import { fButton, fModal, Form } from '../../../../shared/ui/index.js';
import { validation } from '../lib/validation.js';
import { userApi } from '../../../../shared/api/users.js';
import bus from '../../../../modules/event-bus.js';

export const signupModal = (parent) => {
    const modal = fModal(parent, {
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
                        bus.emit('user:logged-in', fields);
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
            const existsAccountBtn = fButton(modal.footer(), {
                id: "existsAccount",
                type: "button",
                text: "Есть аккаунт?",
                class: "btn btn-primary-tertiary grid-left"
            });
            existsAccountBtn.setActions({
                click: actions.existsAccount,
            });
            existsAccountBtn.render();

            const submitBtn = fButton(modal.footer(), {
                id: "signup",
                type: "submit",
                class: "btn btn-success grid-right",
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