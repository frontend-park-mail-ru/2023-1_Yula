import { Button, Modal, Form, Alert } from '@shared/ui/index.js';
import { validation } from '../lib/validation.js';
import template from './Form/Form.handlebars';
import store from '@modules/state-manager.js';

export const buyModal = (parent) => {
    const modal = Modal(parent, {
        id: 'buy',
        title: 'Оформление покупки'
    });

    const actions = {

    };

    return {
        render: () => {
            modal.render();

            const form = Form(modal.body(),{
                id: 'buy',
                template,
            });

            form.setActions ({
                submit: (fields) => {
                    modal.destroy();
                },
                validation: validation,
            });

            form.render();

            const submitBtn = Button(modal.footer(), {
                id: "purchase",
                type: "submit",
                color: "primary",
                text: "Купить",
                form: "buyForm",
            });

            submitBtn.setActions({
                "click": () => {
                    store.setState('bucket', 'clear');
                    localStorage.clear();

                    Alert(document.body, {
                        id: "buy",
                        title: "Успешно",
                        text: "Покупка прошла успешно",
                        timer: 3000,
                    }).render();
                },
            });

            submitBtn.render();

            if (actions.back) {
                modal.setActions({back: actions.back});
            }
        },

        setActions: (newActions) => {
            for (let action in newActions) {
                actions[action] = newActions[action];
            }
        },

        self: () => modal.self(),

        destroy: () => modal.destroy(),
    }
}