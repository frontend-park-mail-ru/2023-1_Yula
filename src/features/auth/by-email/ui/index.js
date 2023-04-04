import { Button, Modal, Form } from '../../../../shared/ui/index.js';
import { validation } from '../lib/validation.js';
import { userApi } from '../../../../shared/api/users.js';
import store from '../../../../modules/state-manager.js';

export const loginModal = (parent) => {
    const modal = Modal(parent, {
        id: 'login',
        title: 'Авторизация'
    });
    const actions = {
        noAccount: () => {}
    };

    return {
        render: () => {
            // рендерим модалку
            modal.render();

            // заполняем тело
            const form = Form(modal.body(), {
                id: "login",
                template: 'features/auth/by-email/ui/Form/Form',
            });

            form.setActions({
                submit: async (fields) => {
                    let res = await userApi.loginByEmail(fields);
                    
                    if (res.ok) {
                        res = await userApi.getMe(); // под вопросом
                        const user = await res.json();

                        store.setState('user', user);
                        modal.destroy();

                    } else {
                        let message = await res.json(); 
                        const error = {};
                        
                        error['email'] = message.error;
                        form.showError(error);
                    }
                },
                validation: validation,
            });

            form.render();
            
            // заполняем футер
            const noAccountBtn = Button(modal.footer(), {
                id: "noAccount",
                type: "button",
                text: "Нет аккаунта?",
                color: "tertiary",
                textColor: "primary"
            });
            noAccountBtn.setActions({
                click: actions.noAccount,
            });
            noAccountBtn.render();

            const submitBtn = Button(modal.footer(), {
                id: "auth",
                type: "submit",
                color: "primary",
                text: "Войти",
                form: "loginForm",
                icon: "/icons/favicon.ico"
            });
            submitBtn.render();

            // добавляем события
            if (actions.back) {
                modal.setActions({back: actions.back});
            }
        },

        /**
         * Установка действий на модалку входа
         * @param {Object} newActions
         * @param {Function} newActions.back - событие при клике на стрелку возвращения
         * @param {Function} newActions.noAccount - событие при клике на кнопку "Нет аккаунта"
         */
        setActions: (newActions) => {
            for (let action in newActions) {
                actions[action] = newActions[action];
            }
        },

        self: () => modal.self(),

        destroy: () => modal.destroy(),
    };
}