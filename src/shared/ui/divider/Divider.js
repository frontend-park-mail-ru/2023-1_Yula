import './Divider.scss'
import template from './Divider.handlebars';

/**
 * элемент панели пользователя
 * @param {HTMLElement} parent - родительский элемент
 * @param {Object} config - конфигурация
 * @param {string} config.id - id элемента
 * @param {string} config.class - путь до изображения
 * @returns 
 * @example
 * const elem = UserPanelElement(document.body, {
 *    id: 'username',
 *    class: "user_panel_bottom",
 * });
 */

export const Divider = (parent, config) => {
    const self = () => {
        return parent.querySelector('#' + config.id);
    }

    const destroy = () => {
        if (self()) {
            self().remove();
        }
    }

    const changeConfig = (newConfig) => {
        config = {
            ...config,
            ...newConfig,
        };

        if (self()) {
            render();
        }
    }

    const render = async () => {
        const wrapper = document.createElement('div');
        wrapper.innerHTML = template(config).trim();
        const newDivider = wrapper.firstChild;

        if (self()) {
            self().replaceWith(newDivider);
        } else {
            parent.insertAdjacentElement("beforeEnd", newDivider);
        }
    }

    return {
        self,
        destroy,
        changeConfig,
        render,
    }
}
