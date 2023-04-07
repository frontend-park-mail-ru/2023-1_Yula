import './Icon.scss';
import template from './Icon.handlebars';

/**
 * Иконка с текстом
 * @param {HTMLElement} parent - родительский элемент
 * @param {Object} config - конфигурация
 * @param {string} config.id - id иконки
 * @param {string} config.src - путь до иконки
 * @param {string} config.text - текст иконки
 * @param {string} config.color - цвет текста иконки
 * @param {string} config.size - размер иконки
 * @param {string} config.link - ссылка на страницу
 * @param {string} config.direction - направление иконки
 * @param {boolean} config.invert - инвертировать цвет иконки
 * @param {boolean} config.circular - круглая иконка
 * @param {Object} config.actions - события иконки
 * @returns 
 * @example
 * const icon = Icon(document.body, {
 *    src: 'logo.svg',
 *    text: 'Иконка',
 *    color: 'primary',
 *    size: 'small',
 *    direction: 'row',
 *    invert: true,
 *    circular: true,
 * });
 */
export const Icon = (parent, config) => {
    config.id = config.id || "";
    config.id += "Icon";

    config.srcIcon = config.src || "";
    config.text = config.text || "";
    config.color = config.color || "secondary";
    config.size = config.size || "medium";
    config.direction = config.direction || "column";
    config.invert = config.invert || false;
    config.circular = config.circular || false;

    const actions = config.actions || {};

    const self = () => {
        return parent.querySelector('#' + config.id);
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

    /**
     * Измение конфигурации иконки
     * @param {HTMLElement} parent - родительский элемент
     * @param {Object} config - конфигурация
     * @param {string} config.id - id иконки
     * @param {string} config.src - путь до иконки
     * @param {string} config.text - текст иконки
     * @param {string} config.color - цвет текста иконки
     * @param {string} config.size - размер иконки
     * @param {string} config.link - ссылка на страницу
     * @param {string} config.direction - направление иконки
     * @param {boolean} config.invert - инвертировать цвет иконки
     * @param {boolean} config.circular - круглая иконка
     * @param {Object} config.action - события иконки
     * @returns
     * @example
     * icon.changeConfig({
     *    src: 'path/to/icon',
     *    text: 'text',
     *    color: 'primary',
     * });
     */
    const changeConfig = (newConfig) => {
        config = {
            ...config,
            ...newConfig,
        };

        render();
    }

    /**
     * Отрисовка иконки
     * @returns
     */
    const render = () => {
        const wrapper = document.createElement('div');
        wrapper.innerHTML = template(config).trim();

        // делаем активной иконку homePage
        if (config.id == 'homePageIcon') {
            wrapper.firstChild.classList.add('icon_active');
        };

        const newIcon = wrapper.firstChild;
        
        if (self()) {
            self().replaceWith(newIcon);
        } else {
            parent.insertAdjacentElement("beforeEnd", newIcon);
        }

        applyActions();
    }

    return {
        self,
        destroy,
        setActions,
        changeConfig,
        render,
    };
}
