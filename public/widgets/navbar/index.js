import { fButton, Input } from "../../shared/ui/index.js";
import { UserBar } from "../../entities/user/ui/index.js";
import bus from "../../modules/event-bus.js";
import { userApi } from "../../shared/api/users.js";

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
        parent.appendChild(nav);

        // логотип
        const logo = document.createElement('a');
        // logo.classList.add('navbar__logo');
        logo.classList.add('nav-brand', 'pointer');
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
        const authButton = fButton(nav, {
            id: "login",
            type: "button",
            text: "Войти",
            class: "btn btn-primary-tertiary grid-left"
        });
        authButton.setActions({
            click: actions.auth
        });

        // пользовательская панель
        const userbar = UserBar(nav, {
            href: "/profile",
        });
        userbar.setActions({
            logout: () => {
                userApi.logout();
                bus.emit('user:logout');
            }
        })

        // событие входа в аккаунт
        bus.on('user:logged-in', (user) => {
            userbar.config.username = user.username; // исправить обращение к конфигу напрямую
            userbar.config.avatar = user.avatar;
            userbar.render();
            authButton.destroy();
        });

        // событие выхода из аккаунта
        bus.on('user:logout', () => {
            userbar.destroy();
            authButton.render();
        });

        // проверка авторизирован ли пользователь
        let res = await userApi.getMe();
        if (!res.ok) {
            authButton.render();
        } else {
            const user = await res.json();
            bus.emit('user:logged-in', user);
        }
    }

    return {
        self,
        destroy,
        setActions,
        render,
    }
} 
