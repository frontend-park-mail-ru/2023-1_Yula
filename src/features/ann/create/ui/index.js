import { Button, Form } from '@shared/ui/index.js';
import { validation } from '../lib/validation.js';
import template from './Form/Form.handlebars';

export const CreateAnn = (parent) => {
    const actions = {
        noAccount: () => {}
    };

    return {
        render: () => {
            const form = Form(parent, {
                id: "createAnn",
                template,
            });

            form.setActions({
                submit: async (fields) => {
                    console.log(fields);
                    // let res = await userApi.loginByEmail(fields);
                    
                    // if (res.ok) {
                    //     const user = await userApi.getMe();
                    //     store.setState('user', user);
                    //     modal.destroy();

                    // } else {
                    //     let message = await res.json(); 
                    //     const error = {};
                        
                    //     error['email'] = message.error;
                    //     form.showError(error);
                    // }
                },
                validation: validation,
            });

            form.render();

            const createBtn = Button(parent, {
                id: "createAnn",
                text: "Создать объявление",
                color: "primary",
                textColor: "bg",
                form: "createAnnForm"
            });
            
            createBtn.render();
            
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