// добавить стиль кнопки
import './Button.scss';
import template from './Button.handlebars';

/**
 * Обычная кнопка
 * @param {HTMLElement} parent - родительский элемент
 * @param {Object} config - конфигурация
 * @param {string} config.id
 * @param {string} config.color
 * @param {boolean} config.disabled
 * @param {string} config.form - форма, которая отправляется при нажатии кнопки.
 * Кнопка автоматически становится типа submit
 * @param {string} config.srcIcon - путь до иконки, которая будет внутри кнопки
 * @param {string} config.text - текст кнопки
 * @param {string} config.textColor - класс текста кнопки
 * @param {boolean} config.autofocus - автофокус на кнопку
 * @returns 
 */
export const Button = (parent, config) => {
    config.id = config.id || "";
    config.id += "Button";

    config.color = config.color || "primary";
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
