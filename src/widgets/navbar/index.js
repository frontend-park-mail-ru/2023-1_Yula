import { MenuPanelDesktop, MenuPanelMobile } from "./ui";
import { Input, Icon } from "@shared/ui/index.js";
import { toggleTheme } from "@features/theme";
import store from "@modules/state-manager";

import './index.scss';

import searchSvg from 'assets/icons/search.svg';
import sunSVG from 'assets/icons/sun.svg';
import moonSVG from 'assets/icons/moon.svg';

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

        const menuPanelDesktop = MenuPanelDesktop(nav);
        menuPanelDesktop.setActions({ 'login': actions.auth });
        
        const menuPanelMobile = MenuPanelMobile(nav);
        menuPanelMobile.setActions({ 'login': actions.auth });

        if (window.innerWidth >= 900) {
            menuPanelDesktop.render();
        } else {
            menuPanelMobile.render();
        }

        const theme = store.getState('theme');
        const themeIcon = Icon(nav, {
            id: "theme",
            src: (theme === 'light') ? sunSVG : moonSVG,
            invert: (theme === 'light') ? false : true,
            size: "large",
            actions: {
                'click': () => {
                    const newTheme = toggleTheme();
                    store.setState('theme', newTheme);
                    themeIcon.changeConfig({
                        src: (newTheme === 'light') ? sunSVG : moonSVG,
                        invert: (newTheme === 'light') ? false : true,
                    });
                },
            }
        });
        themeIcon.render();

        window.addEventListener('resize', () => {
            if (window.innerWidth >= 900 && !menuPanelDesktop.self()) {
                menuPanelDesktop.render();
                menuPanelMobile.destroy();
                themeIcon.destroy();
                themeIcon.render();
            } else if (window.innerWidth < 900 && !menuPanelMobile.self()) {
                menuPanelMobile.render();
                menuPanelDesktop.destroy();
            }
        });
    }

    return {
        self,
        destroy,
        setActions,
        render,
    }
} 
