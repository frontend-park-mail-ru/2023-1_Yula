import './Icon.scss';
import template from './Icon.handlebars';

/**
 * Иконка с текстом
 * @param {HTMLElement} parent - родительский элемент
 * @param {Object} config - конфигурация
 * @param {string} config.id - id иконки
 * @param {string} config.src - путь до иконки
 * @param {string} config.text - текст иконки
 * @param {string} config.textColor - цвет текста иконки
 * @param {string} config.bgColor - размер иконки
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
 *    textColor: 'primary',
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
    config.textColor = config.textColor || "secondary";
    config.bgColor = config.bgColor || "none";
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
     * Измение конфигурации иконки и перерисовка, если иконка уже отрисована
     * @param {HTMLElement} parent - родительский элемент
     * @param {Object} config - конфигурация
     * @param {string} config.id - id иконки
     * @param {string} config.src - путь до иконки
     * @param {string} config.text - текст иконки
     * @param {string} config.textColor - цвет текста иконки
     * @param {string} config.bgColor - размер иконки
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
     *    textColor: 'primary',
     * });
     */
    const changeConfig = (newConfig) => {
        config = {
            ...config,
            ...newConfig,
        };

        if (self()) {
            render();
        }
    }

    /**
     * Отрисовка иконки
     * @returns
     */
    const render = () => {
        const wrapper = document.createElement('div');
        wrapper.innerHTML = template(config).trim();

        const icon = wrapper.firstChild;
        
        if (self()) {
            self().replaceWith(icon);
        } else {
            parent.insertAdjacentElement("beforeEnd", icon);
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
