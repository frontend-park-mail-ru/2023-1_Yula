import './PanelElement.scss'
import template from './PanelElement.handlebars'

/**
 * элемент панели пользователя
 * @param {HTMLElement} parent - родительский элемент
 * @param {Object} config - конфигурация
 * @param {string} config.id - id элемента
 * @param {string} config.imgSource - путь до изображения
 * @param {string} config.text - текст элемента
 * @param {boolean} config.invert - инвертировать цвет
 * @param {Object} config.actions - события иконки
 * @returns 
 * @example
 * const elem = PanelElement(document.body, {
 *    id: 'username',
 *    imgSource: "./img.jpg",
 *    text: 'имя пользователя',
 * });
 */

export const PanelElement = (parent, config) => {
    const actions = config.actions || {};

    const setActions = (newActions) => {
        for (let action in actions) {
            actions[action] = newActions[action]
        }
    };

    const applyActions = () => {
        if (self()) {
            for (let action in actions) {
                self().addEventListener(action, actions[action]);
            }
        }
    };

    const changeConfig = (newConfig) => {
        config = {
            ...config,
            ...newConfig,
        };

        if (self()) {
            render();
        }
    }

    const self = () => {
        return parent.querySelector('#' + config.id);
    }

    const destroy = () => {
        if (self()) {
            self().remove();
        }
    };

    const render = async () => {
        const wrapper = document.createElement('div');
        wrapper.innerHTML = template(config).trim();
        const newElem = wrapper.firstChild;

        if (self()) {
            self().replaceWith(newElem);
        } else {
            parent.insertAdjacentElement("beforeEnd", newElem);
        }

        applyActions();
    };

    return {
        self,
        destroy,
        changeConfig,
        setActions,
        render,
    }
}
