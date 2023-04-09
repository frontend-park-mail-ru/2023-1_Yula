import { Icon } from "@shared/ui/index.js";
import store from "@modules/state-manager.js";
import { toggleTheme } from "@features/theme";

import createAnnSvg from 'assets/icons/create-ann.svg';
import userSvg from 'assets/icons/user.svg';
import basketSvg from 'assets/icons/basket.svg';
import orderSvg from 'assets/icons/order.svg';
import moonSvg from 'assets/icons/moon.svg';
import sunSvg from 'assets/icons/sun.svg';

import './MenuPanelDesktop.scss'

export const MenuPanelDesktop = (parent) => {
    const actions = {
        login: () => {},
    };

    const self = () => {
        return parent.querySelector('.menu-panel-desktop');
    }

    const destroy = () => {
        if (self()) {
            self().remove();
        }
    }

    /**
     * Установка событий на навигационную панель
     * @param {Object} newActions
     * @param {Function} newActions.login - событие при нажатие на
     * "Аккаунт" или "Создать объявление" (если не авторизирован)
     */
    const setActions = (newActions) => {
        for (let action in newActions) {
            actions[action] = newActions[action];
        }
    }

    const render = async () => {
        const menu = document.createElement('div');
        menu.classList.add('menu-panel-desktop');
        parent.appendChild(menu);

        const theme = store.getState('theme');
        const invert = (theme === 'light') ? false : true;
        const user = store.getState('user');

        const Icons = {
            createAnn: Icon(menu, {
                id: "createAnn",
                src: createAnnSvg,
                size: "large",
                direction: "row",
                text: "Создать объявление",
                textColor: "fg",
                invert: invert,
                actions: {
                    'click': () => {
                        if (store.getState('user')) {
                            console.log("перенаправление...");
                        } else {
                            actions.login();
                        }
                    }
                }
            }),
            user: Icon(menu, {
                id: "user",
                src: user ? user.avatar : userSvg,
                size: "large",
                invert: user ? false : invert,
                link: user ? '/profile' : null,
                circular: user ? true : false,
                actions: {
                    'click': () => {
                        if (!store.getState('user')) {
                            actions.login();
                        }
                    }
                }
            }),
            basket: Icon(menu, {
                id: "basket",
                src: basketSvg,
                size: "large",
                invert: invert,
            }),
            order: Icon(menu, {
                id: "order",
                src: orderSvg,
                size: "large",
                invert: invert,
            }),
        }
        
        for (let icon in Icons) {
            Icons[icon].render();
        }

        // событие входа в аккаунт
        store.subscribe('user', (user) => {
            if (user) {
                Icons.user.changeConfig({
                    circular: true,
                    src: user.avatar,
                    link: `/profile`,
                    invert: false,
                });
            } else {
                Icons.user.changeConfig({
                    circular: false,
                    src: userSvg,
                    link: null,
                    invert: (store.getState('theme') === 'dark') ? true : false,
                });
            }
        });     
        
        // событие изменения темы
        store.subscribe('theme', (theme) => {
            for (let icon in Icons) {
                Icons[icon].changeConfig({ invert: (theme === 'light') ? false : true });
            }
            
            if (store.getState('user')) {
                Icons.user.changeConfig({ invert: false });
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
