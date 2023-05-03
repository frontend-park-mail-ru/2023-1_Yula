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
 * @param {timer} config.timer
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

    const actions = {
        close: () => {
            destroy();
        }
    };

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
        if (actions.close) {
            self().querySelector('.alert__close-btn').addEventListener('click', actions.close);
        }

        if (config.timer) {
            setTimeout(() => {
                destroy();
            }, config.timer);
        }
    }

    const render = () => {
        if (self()) {
            // throw new Error(`Объект с id="${config.id}" уже есть на странице`);
            return;
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
