import { Button, Input, Icon } from "../../shared/ui/index.js";
import { UserBar } from "../../entities/user/ui/index.js";
import store from "../../modules/state-manager.js";
import { userApi } from "../../shared/api/users.js";
import './index.scss';

export const Navbar = (parent) => {
    const actions = {
        auth: () => {},
    };

    const self = () => {
        return document.querySelector('nav');
    }

    const destroy = () => {
        if (self()) {
            self().remove();
        }
    }

    /**
     * Установка событий на навигационную панель
     * @param {Object} newActions
     * @param {Function} newActions.auth - событие при нажатие на кнопку входа
     */
    const setActions = (newActions) => {
        for (let action in newActions) {
            actions[action] = newActions[action];
        }
    }

    const render = async () => {
        const nav = document.createElement('nav');
        nav.classList.add('nav');
        parent.appendChild(nav);

        // логотип
        const logo = document.createElement('a');
        logo.classList.add('nav__logo');
        logo.href = '/';
        logo.innerText = 'AppUniq';
        nav.appendChild(logo);

        // строка поиска
        const input = Input(nav, {
            id: "search",
            placeholder: "Я ищу...",
            type: "text",
            leftIcon: "icons/search.svg",
        });
        input.render();

        // кнопка входа
        const authButton = Button(nav, {
            id: "login",
            type: "button",
            text: "Войти",
            color: "primary"
        });
        authButton.setActions({
            click: actions.auth
        });

        // account bar
        const testIcon = Icon(nav, {
            id: "test",
            src: "icons/search.svg",
        });

        // пользовательская панель
        const userbar = UserBar(nav, {
            href: "/profile",
        });
        userbar.setActions({
            logout: () => {
                userApi.logout();
                store.setState('user', null);
            }
        });

        // событие входа в аккаунт
        store.subscribe('user', (user) => {
            if (!user) {
                userbar.destroy();
                authButton.render();
                return;
            } else {
                userbar.config.username = user.username; // исправить обращение к конфигу напрямую
                userbar.config.avatar = user.avatar;
                userbar.render();
                authButton.destroy();
            }
        });


        // проверка авторизирован ли пользователь
        if (store.getState('user')) {
            userbar.config.username = store.getState('user').username; // исправить обращение к конфигу напрямую
            userbar.config.avatar = store.getState('user').avatar;
            userbar.render();
            authButton.destroy();
        } else {
            userbar.destroy();
            authButton.render();
        }

    }

    return {
        self,
        destroy,
        setActions,
        render,
    }
} 
