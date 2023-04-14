import './Input.scss';
import template from './Input.handlebars';

/**
 * @param {HTMLElement} parent
 * @param {Object} config
 * @param {string} config.id
 * @param {string} config.text
 * @param {string} config.placeholder
 * @param {string} config.type
 * @param {string} config.leftIcon
 * @param {string} config.rightIcon
 */
export const Input = (parent, config = {id: ""}) => {
    config.id += "Input";
    const actions = {};

    const self = () => {
        return parent.querySelector('#' + config.id);
    }

    const field = () => {
        if (!self()) {
            throw new Error(`Объект с id="${config.id}" не найден на странице`);
        }
        return self().querySelector(".input__field");
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
        if (actions.leftIcon) {
            const leftIcon = self().querySelectorAll(".input__icon")[0];
            leftIcon.addEventListener("click", actions.leftIcon);
        }
        if (actions.rightIcon) {
            const rightIcon = self().querySelectorAll(".input__icon")[1];
            rightIcon.addEventListener("click", actions.rightIcon);
        }
    }

    const render = () => {
        if (self()) {
            throw new Error(`Объект с id="${config.id}" уже есть на странице`);
        }

        parent.insertAdjacentHTML("beforeEnd", template(config));

        applyActions();
    }

    return {
        self,
        field,
        render,
        setActions,
        destroy,
    }
}