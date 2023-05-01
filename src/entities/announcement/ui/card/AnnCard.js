import { Carousel } from '@shared/ui';

import './AnnCard.scss';
import template from './AnnCard.handlebars';

/**
 * Карточка объявления
 * @param {HTMLElement} parent - родительский элемент
 * @param {Object} config - конфигурация
 * @param {string} config.id - id карточки
 * @param {string} config.link - ссылка на объявление
 * @param {string} config.title - заголовок объявления
 * @param {string} config.price - цена
 * @param {string} config.tags - тег
 * @param {string} config.images - массив изображений
 */
export const AnnCard = (parent, config = {id: ""}) => {
    config.id += "AnnCard";
    config.link = config.link || "#";

    const actions = {};

    const self = () => {
        return document.getElementById(config.id);
    }

    const destroy = () => {
        if (self()) {
            self().remove();
        }
    }

    const setActions = (newActions) => {
        for (let action in newActions) {
            actions[action] = newActions[action];
        }
    }

    const applyActions = () => {
        if (self()) {
            for (let action in actions) {
                self().addEventListener(action, actions[action]);
            }
        }
    }

    const render = () => {
        if (self()) {
            throw new Error(`Объект с id="${config.id}" уже есть на странице`);
        }

        const wrapper = document.createElement('div');
        wrapper.innerHTML += template(config);
        const elem = wrapper.firstElementChild;

        Carousel(elem.querySelector('.announcement-card__carousel'), {
            images: config.images,
        }).render();

        parent.insertAdjacentElement("beforeEnd", elem);

        applyActions();
    }

    return {
        self,
        destroy,
        setActions,
        render,
    };
}
