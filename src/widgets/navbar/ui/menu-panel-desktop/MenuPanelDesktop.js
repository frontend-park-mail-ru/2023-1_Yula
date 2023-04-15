import { Icon, Alert} from "@shared/ui";
import { goTo } from "@shared/lib/history";
import store from "@modules/state-manager";

import createAnnSvg from 'assets/icons/create-ann.svg';
import userSvg from 'assets/icons/user.svg';
import basketSvg from 'assets/icons/basket.svg';
import sellerSvg from 'assets/icons/seller.svg';

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
            basket: Icon(menu, {
                id: "basket",
                src: basketSvg,
                size: "large",
                invert: invert,
                actions: {
                    'click': () => {
                        if (store.getState('user')) {
                            goTo('/bucket');
                        } else {
                            actions.login();

                            Alert(parent, {
                                title: "Упс!",
                                text: "Для просмотра корзины нужна авторизация",
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
                actions: {
                    'click': () => {
                        if (store.getState('user')) {
                            goTo('/seller');
                        } else {
                            actions.login();
                            Alert(parent, {
                                title: "Упс!",
                                text: "Для просмотра личного кабинета продавца нужна авторизация",
                                timer: 3000,
                            }).render();
                        }
                    }
                }
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
