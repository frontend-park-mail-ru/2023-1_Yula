import { MenuPanelDesktop, MenuPanelMobile } from "./ui";
import { Button, Input, Icon } from "@shared/ui/index.js";
import { toggleTheme } from "@features/theme";
import store from "@modules/state-manager";
import { goTo } from "@shared/lib/history";

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

        // переключение темы
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

        // строка поиска
        const input = Input(nav, {
            id: "search",
            placeholder: "Я ищу...",
            type: "text",
            leftIcon: searchSvg,
        });
        input.render();

        const createAnn = Button(nav, {
            id: "createAnn",
            type: "button",
            text: "Создать объявление",
            color: "primary",
            textColor: "white",
        });
        createAnn.setActions({
            click: () => {
                if (store.getState('user')) {
                    goTo('/create');
                } else {
                    actions.login();

                    Alert(parent, {
                        title: "Упс!",
                        text: "Для создания объявления нужна авторизация",
                        timer: 3000,
                    }).render();
                }
            }
        });

        const menuPanelDesktop = MenuPanelDesktop(nav);
        menuPanelDesktop.setActions({ 'login': actions.auth });
        
        const menuPanelMobile = MenuPanelMobile(nav);
        menuPanelMobile.setActions({ 'login': actions.auth });

        if (window.innerWidth >= 900) {
            createAnn.render();
            menuPanelDesktop.render();
        } else {
            menuPanelMobile.render();
        }

        window.addEventListener('resize', () => {
            if (window.innerWidth >= 900 && !menuPanelDesktop.self()) {
                themeIcon.destroy();
                themeIcon.render();
                input.render();
                createAnn.render();
                menuPanelDesktop.render();
                menuPanelMobile.destroy();
            } else if (window.innerWidth < 900 && !menuPanelMobile.self()) {
                createAnn.destroy();
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
