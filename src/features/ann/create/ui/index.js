import { Button, Form, Alert } from '@shared/ui';
import { validation } from '../lib/validation';
import { readFileAsDataURL } from '../lib/utils'
import { goTo } from '@shared/lib/history';
import { annApi } from '@shared/api/anns';

import template from './Form/Form.handlebars';

export const CreateAnn = (parent) => {
    const actions = {};
    
    // сохраняем картинки
    let imges;

    const self = () => {
        return parent.querySelector('#createAnnForm');
    }

    const destroy = () => {
        if (self()) {
            self().remove();
        }
    }

    /**
     * Установка действий на модалку входа
     * @param {Object} newActions
     * @param {Function} newActions.back - событие при клике на стрелку возвращения
     * @param {Function} newActions.noAccount - событие при клике на кнопку "Нет аккаунта"
     */
    const setActions = (newActions) => {
        for (let action in newActions) {
            actions[action] = newActions[action];
        }
    }

    const applyActions = () => {
        if (actions.titleChange) {
            self().title.addEventListener('input', actions.titleChange);
        }
        if (actions.descriptionChange) {
            self().description.addEventListener('input', actions.descriptionChange);
        }
        if (actions.priceChange) {
            self().price.addEventListener('input', actions.priceChange);
        }
        if (actions.tagsChange) {
            self().tags.addEventListener('input', actions. tagsChange);
        }
        if (actions.imagesChange) {
            self().image.addEventListener('change', function (event) {
                var files = event.target.files;
                var promises = [];

                for (var i = 0; i < files.length; i++) {
                    promises.push(readFileAsDataURL(files[i]));
                }

                Promise.all(promises).then(function (images) {
                    imges = images;
                    actions.imagesChange(images);
                }).catch(function (error) {
                    console.error('Ошибка чтения файлов:', error);
                });
            });
        }
    }

    const render = () => {
        const form = Form(parent, {
            id: "createAnn",
            template,
        });

        form.setActions({
            submit: async (fields) => {
                fields.image = imges;
                fields.price = fields.price.replace(/\s/g, '');

                const data = {
                    ...fields,
                    close: false,
                }

                let res = await annApi.create(data);

                if (res.ok) {
                    goTo('/seller');

                    Alert(document.body, {
                        id: "createAnn",
                        title: "Успешно",
                        text: "Объявление создано",
                        timer: 3000,
                    }).render();
                } else {
                    let message = await res.json(); 
                    const error = {};

                    error['title'] = message.error;
                    form.showError(error);
                }
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
        createBtn.self().style.margin = "5px auto";

        applyActions();
    }

    return {
        self,
        destroy,
        setActions,
        render,
    };
}