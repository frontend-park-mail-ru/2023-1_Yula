import { Icon } from "@shared/ui/index.js";
import store from "@modules/state-manager.js";
import { toggleTheme } from "@features/theme";

import createAnnSvg from 'assets/icons/create-ann.svg';
import userSvg from 'assets/icons/user.svg';
import basketSvg from 'assets/icons/basket.svg';
import orderSvg from 'assets/icons/order.svg';
import moonSvg from 'assets/icons/moon.svg';
import sunSvg from 'assets/icons/sun.svg';
import homeSVG from 'assets/icons/home.svg'
import plusSVG from 'assets/icons/plus.svg'

import './MenuPanel.scss'

export const MenuPanel = (parent) => {
    const actions = {
        login: () => {},
    };

    const self = () => {
        return parent.querySelector('.menu-panel');
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
        menu.classList.add('menu-panel');
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
                color: "fg",
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
            theme: Icon(menu, {
                id: "theme",
                src: (theme === 'light') ? sunSvg : moonSvg,
                size: "large",
                invert: invert,
            }),
        }

        Icons.theme.setActions({
            "click": () => {
                const newTheme = toggleTheme();
                Icons.theme.changeConfig({ src: (newTheme === 'light') ? sunSvg : moonSvg });

                for (let icon in Icons) {
                    Icons[icon].changeConfig({ invert: (newTheme === 'light') ? false : true });
                }
                
                if (store.getState('user')) {
                    Icons.user.changeConfig({ invert: false });
                }
            } 
        });
        
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
    }

    return {
        self,
        destroy,
        setActions,
        render,
    }
}

//////////////////////////////////////////////////////////////////////////////
// функция выделения вкладки для мобилок
function activeIcon(iconClassName) {
    const list = document.querySelector('.menu-panel').querySelectorAll('.icon')
    list.forEach((icon) => icon.classList.remove('icon_active'))
    iconClassName.classList.add('icon_active')
}

// for mobile devices
export const MenuPanelMobile = (parent) => {
    const actions = {
        login: () => {},
    };

    const self = () => {
        return parent.querySelector('.menu-panel');
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
        menu.classList.add('menu-panel');
        parent.appendChild(menu);

        const theme = store.getState('theme');
        const invert = (theme === 'light') ? false : true;
        const user = store.getState('user');

        const Icons = {
            homePage: Icon(menu, {
                id: "homePage",
                src: homeSVG,
                size: "large",
                invert: invert,
                link: "/",
                // actions: {
                //     'click': () => {
                //         const iconClassName = document.getElementById('homePageIcon')

                //         activeIcon(iconClassName)
                //     }
                // }
            }),

            basket: Icon(menu, {
                id: "basket",
                src: basketSvg,
                size: "large",
                invert: invert,
                // actions: {
                //     'click': () => {
                //         const iconClassName = document.getElementById('basketIcon')
                //         activeIcon(iconClassName)
                //     }
                // }
            }),

            createAnn: Icon(menu, {
                id: "createAnn",
                src: createAnnSvg,
                size: "large",
                direction: "row",
                color: "fg",
                invert: invert,
                actions: {
                    'click': () => {
                        if (store.getState('user')) {
                            console.log("перенаправление...");
                        } else {
                            actions.login();
                        }
                        // const iconClassName = document.getElementById('createAnnIcon')
                        // activeIcon(iconClassName)
                    }
                }
            }),

            order: Icon(menu, {
                id: "order",
                src: orderSvg,
                size: "large",
                invert: invert,
                // actions: {
                //     'click': () => {
                //         const iconClassName = document.getElementById('orderIcon')
                //         activeIcon(iconClassName)
                //     }
                // }
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
                        // const iconClassName = document.getElementById('userIcon')
                        // activeIcon(iconClassName)
                    }
                }
            }),

            theme: Icon(menu, {
                id: "theme",
                src: (theme === 'light') ? sunSvg : moonSvg,
                size: "large",
                invert: invert,
            }),
        }

        Icons.theme.setActions({
            "click": () => {
                const newTheme = toggleTheme();
                Icons.theme.changeConfig({ src: (newTheme === 'light') ? sunSvg : moonSvg });

                for (let icon in Icons) {
                    Icons[icon].changeConfig({ invert: (newTheme === 'light') ? false : true });
                }
                
                if (store.getState('user')) {
                    Icons.user.changeConfig({ invert: false });
                }
            } 
        });

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

        menu.addEventListener('click', (e) => {
            let targt = e.target;
            if (targt != e.currentTarget) {
                while (!targt.classList.contains('icon')) {
                    targt = targt.parentElement;
                };
                activeIcon(targt);
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
