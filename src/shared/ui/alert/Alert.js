// добавить стиль кнопки
import './Alert.scss';
import template from './Alert.handlebars';

/**
 * 
 * @param {HTMLElement} parent - родительский элемент
 * @param {Object} config - конфигурация
 * @param {string} config.id
 * @param {string} config.color
 * @param {string} config.title
 * @param {string} config.text 
 * @param {boolean} config.textColor
 * @returns 
 */
export const Alert = (parent, config) => {
    config.id = config.id || "";
    config.id += "Alert";

    config.color = config.color || "bg";
    config.disabled = config.disabled || false;
    config.form = config.form || "";
    config.srcIcon = config.srcIcon || "";
    config.text = config.text || "";
    config.textColor = config.textColor || "white";
    config.autofocus = config.autofocus || false;

    const actions = {};

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

    const render = () => {
        if (self()) {
            throw new Error(`Объект с id="${config.id}" уже есть на странице`);
        }

        const templ = template(config).trim();
        parent.insertAdjacentHTML("beforeEnd", templ);

        applyActions();
    }

    return {
        self,
        destroy,
        setActions,
        render,
    };
}
