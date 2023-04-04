import './Icon.scss';

/**
 * Иконка с текстом
 * @param {HTMLElement} parent - родительский элемент
 * @param {Object} config - конфигурация
 * @param {string} config.id
 * @param {string} config.src - путь до иконки
 * @param {string} config.text - текст иконки
 * @param {string} config.textColor - цвет текста иконки
 * @returns 
 */
export const Icon = (parent, config) => {
    config.id = config.id || "";
    config.id += "Icon";

    config.srcIcon = config.src || "";
    config.text = config.text || "";
    config.textColor = config.textColor || "grey";

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

        const template = Handlebars.templates["shared/ui/icon/Icon"];
        parent.insertAdjacentHTML("beforeEnd", template(config));

        applyActions();
    }

    return {
        self,
        destroy,
        setActions,
        render,
    };
}
