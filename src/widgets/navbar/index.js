import { Button, Input, Icon } from "@shared/ui/index.js";
import { UserBar } from "@entities/user/ui/index.js";
import store from "@modules/state-manager.js";
import { userApi } from "@shared/api/users.js";
import { MenuPanel } from "./ui/menu-panel/MenuPanel.js";

import './index.scss';

import searchSvg from 'assets/icons/search.svg';
import accountSvg from 'assets/icons/account.svg';
import basketSvg from 'assets/icons/basket.svg';

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
            leftIcon: searchSvg,
        });
        input.render();
        
        const menu = MenuPanel(nav);
        menu.setActions({ 'login': actions.auth });
        menu.render();
    }

    return {
        self,
        destroy,
        setActions,
        render,
    }
} 
