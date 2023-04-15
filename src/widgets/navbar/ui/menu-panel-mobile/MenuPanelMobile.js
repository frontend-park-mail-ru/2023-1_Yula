import { Icon, Alert } from "@shared/ui/index.js";
import { goTo } from "@shared/lib/history";
import store from "@modules/state-manager.js";

import userSvg from 'assets/icons/user.svg';
import basketSvg from 'assets/icons/basket.svg';
import sellerSvg from 'assets/icons/seller.svg';
import homeSVG from 'assets/icons/home.svg'
import plusSVG from 'assets/icons/plus.svg'

import './MenuPanelMobile.scss'

export const MenuPanelMobile = (parent) => {
    const actions = {
        login: () => {},
    };

    const self = () => {
        return parent.querySelector('.menu-panel-mobile');
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
        menu.classList.add('menu-panel-mobile');
        parent.appendChild(menu);

        const theme = store.getState('theme');
        const invert = (theme === 'light') ? false : true;
        const user = store.getState('user');

        const Icons = {
            homePage: Icon(menu, {
                id: "homePage",
                src: homeSVG,
                size: "large",
                invert: (window.location.pathname === "/") ? !invert : invert,
                link: "/",
            }),

            basket: Icon(menu, {
                id: "basket",
                src: basketSvg,
                size: "large",
                invert: invert,
                // link: "/bucket",
                actions: {
                    'click': () => {
                        if (store.getState('user')) {
                            goTo('/bucket');
                        } else {
                            actions.login();

                            Alert(parent, {
                                title: "Упс!",
                                text: "Для просмотра корзины нужна авторизация",
                                timeout: 3000,
                            }).render();
                        }
                    }
                }
            }),

            createAnn: Icon(menu, {
                id: "createAnn",
                src: plusSVG,
                size: "large",
                direction: "row",
                bgColor: "primary",
                invert: true,
                actions: {
                    'click': () => {
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
                }
            }),

            seller: Icon(menu, {
                id: "seller",
                src: sellerSvg,
                size: "large",
                invert: invert,
                // link: '/seller',
                actions: {
                    'click': () => {
                        if (store.getState('user')) {
                            goTo('/seller');
                        } else {
                            actions.login();

                            Alert(parent, {
                                title: "Упс!",
                                text: "Для просмотра кабинета продавца нужна авторизация",
                                timer: 3000,
                            }).render();
                        }
                    }
                }
            }),

            user: Icon(menu, {
                id: "user",
                src: user ? user.pathtoavatar : userSvg,
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
        }

        switch (window.location.pathname) {
            case "/":
                Icons.homePage.changeConfig({ bgColor: "secondary", invert: !invert });
                Icons.homePage.active = true;
                break;
            case "/bucket":
                Icons.basket.changeConfig({ bgColor: "secondary", invert: !invert });
                Icons.basket.active = true;
                break;
            case "/seller":
                Icons.seller.changeConfig({ bgColor: "secondary", invert: !invert });
                Icons.seller.active = true;
                break;
            case "/profile":
                if (!store.getState('user')) {
                    Icons.user.changeConfig({ bgColor: "secondary", invert: !invert });
                }
                Icons.user.active = true;
                break;
        }

        for (let icon in Icons) {
            Icons[icon].render();
        }

        // событие входа в аккаунт
        store.subscribe('user', (user) => {
            if (user) {
                Icons.user.changeConfig({
                    circular: true,
                    src: user.pathtoavatar,
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
                if (Icons[icon].active) {
                    Icons[icon].changeConfig({ invert: (theme === 'light') ? true : false });
                } else {
                    Icons[icon].changeConfig({ invert: (theme === 'light') ? false : true });
                }
            }
            
            if (store.getState('user')) {
                Icons.user.changeConfig({ invert: false });
            }
            Icons.createAnn.changeConfig({ invert: true });
        });
    }

    return {
        self,
        destroy,
        setActions,
        render,
    }
}
