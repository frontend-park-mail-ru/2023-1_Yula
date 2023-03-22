import { fButton, fModal, Form } from '../../../../shared/ui/index.js';
// import { Form } from '../ui/Form/Form.js';
import { validation } from '../lib/validation.js';

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
                submit: (fields) => {
                    console.log('Api!');
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