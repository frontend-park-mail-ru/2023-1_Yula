import { Button } from "../../../../shared/ui/index.js";
import template from "./Avatar.handlebars";

/**
 * Управление пользователем из навигационной панели
 * @param {HTMLElement} parent - родительский элемент
 * @param {Object} config - конфигурация
 * @param {string} config.href - адрес ссылки при клике по профилю (временно)
 * @param {string} config.username
 * @param {string} config.avatar
 * @returns 
 */
export const UserBar = (parent, config = {id: ""}) => {
    config.id += "UserBar";
    const actions = {};

    const self = () => {
        return parent.querySelector('#' + config.id);
    }

    const destroy = () => {
        if (self()) {
            self().remove();
        }
    }

    /**
     * Установка действий на userbar
     * @param {Object} newActions
     * @param {Function} newActions.profile - событие при клике по профилю пользователя
     * @param {Function} newActions.logout - событие при клике разлогина (временно)
     */
    const setActions = (newActions) => {
        for (let action in newActions) {
            actions[action] = newActions[action];
        }
    }

    const applyActions = () => {
        if (actions.profile) {
            self().addEventListener('click', actions.profile);
        }

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

        const userbar = document.createElement('div');
        userbar.id = config.id;
        userbar.classList.add('flex');
        parent.appendChild(userbar);

        // добавление аватара
        userbar.insertAdjacentHTML("beforeEnd", template(config));

        // кнопка разлогина
        const logoutButton = Button(userbar, {
            id: "logout",
            class: 'cell-btn-sm grid-center',
            cssIcon: "log-out",
        });
        logoutButton.setActions({click: actions.logout});
        logoutButton.render();

        applyActions();
    }

    return {
        self,
        destroy,
        setActions,
        render,
        config,
    };
}
