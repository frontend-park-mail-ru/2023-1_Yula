import { PanelElement } from '@shared/ui/index.js';
import { Icon } from '@shared/ui/index.js';
import { Divider } from '@shared/ui/index.js';
import { Button } from "@shared/ui/index.js";
import { userApi } from "@shared/api/users.js";
import { goTo } from "@shared/lib/history";
import store from "@modules/state-manager.js";

import './UserPanel.scss';

import exitSVG from 'assets/icons/exit.svg';
import passwordSVG from 'assets/icons/password-key.svg';
import nameSurnameSVG from 'assets/icons/user_02.svg';
import usernameSVG from 'assets/icons/username.svg';
import phoneSVG from 'assets/icons/phone.svg';
import emailSVG from 'assets/icons/email.svg';

export const UserPanel = (parent) => {
    const actions = {
        logout: () => {},
    }

    const self = () => {
        return parent.querySelector('.user__panel');
    };

    const destroy = () => {
        if (self()) {
            self().remove();
        }
    };

    const setActions = (newActions) => {
        for (let action in actions) {
            actions[action] = newActions[action];
        }
    }

    const render = async () => {
        const userPanel = document.createElement('div');
        userPanel.classList.add('user_panel');
        parent.appendChild(userPanel);

        const user = store.getState('user');
        const theme = store.getState('theme');
        const invert = (theme === 'light') ? false : true;

        // задаем элемeнты боковой панели
        console.log(user);
        const elements = {
            elem0 : Icon(userPanel, {
                id: "user",
                src: user.pathtoavatar,
                size: "large",
                invert: user ? false : invert,
                link: user ? '/profile' : null,
                circular: user ? true : false,
            }),
            elem1 : PanelElement(userPanel, {
                id: 'fio',
                imgSource: nameSurnameSVG,
                text: `${user.firstName} ${user.secondName}`,
                invert: invert,
            }),
            elem2 : PanelElement(userPanel, {
                id: 'login',
                imgSource: usernameSVG,
                text: `${user.login}`,
                invert: invert,
            }),
            elem3 : PanelElement(userPanel, {
                id: 'email',
                imgSource: emailSVG,
                text: `${user.email}`,
                invert: invert,
            }),
            elem4 : PanelElement(userPanel, {
                id: 'phone',
                imgSource: phoneSVG,
                text: `${user.phoneNumber}`,
                invert: invert,
            }),
            elem5 : PanelElement(userPanel, {
                id: 'password',
                imgSource: passwordSVG,
                text: `${'●'.repeat(user.password.length)}`,
                invert: invert,
            }),
            elem6 : PanelElement(userPanel, {
                id: 'exit',
                imgSource: exitSVG,
                text: `Выйти`,
                invert: invert,
                actions: {
                    click: async () => {
                        await userApi.logout();
                        store.setState('user', null);
                        goTo('/');
                    }
                }
            }),
            elem7 : Divider(userPanel, {
                id: 'bottom_divider',
                class: 'user_panel_divider',
                invert: invert,
            }),
        };
        
        // рендерим все элементы
        for (let element in elements) {
            elements[element].render();
        }

        // событие изменения темы
        store.subscribe('theme', (theme) => {
            for (let elem in elements) {
                elements[elem].changeConfig({ invert: (theme === 'light') ? false : true });
            }
            
            if (store.getState('user')) {
                elements.elem0.changeConfig({ invert: false });
            }
        });
    };

    return {
        self,
        destroy,
        setActions,
        render,
    }
}
