import { UserPanelElement } from '@shared/ui/index.js';
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
        
        // задаем элемпнты боковой панели
        const elements = {
            elem0 : Icon(userPanel, {
                id: "user",
                src: user ? user.avatar : userSvg,
                size: "large",
                invert: user ? false : invert,
                link: user ? '/profile' : null,
                circular: user ? true : false,
            }),
            elem1 : UserPanelElement(userPanel, {
                id: 'fio',
                imgSource: nameSurnameSVG,
                text: `fio ${user.username}`,
            }),
            elem2 : UserPanelElement(userPanel, {
                id: 'username',
                imgSource: usernameSVG,
                text: `username ${user.username}`,
            }),
            elem3 : UserPanelElement(userPanel, {
                id: 'email',
                imgSource: emailSVG,
                text: `email ${user.email}`,
            }),
            elem4 : UserPanelElement(userPanel, {
                id: 'phone',
                imgSource: phoneSVG,
                text: `phone ${user.phone}`,
            }),
            elem5 : UserPanelElement(userPanel, {
                id: 'password',
                imgSource: passwordSVG,
                text: `password ${user.password}`,
            }),
            elem6 : UserPanelElement(userPanel, {
                id: 'exit',
                imgSource: exitSVG,
                text: `Выйти`,
            }),
            elem7 : Divider(userPanel, {
                id: 'bottom_divider',
                class: 'new',
            }),
        };

        elements.elem6.setActions({
            click: async () => {
                await userApi.logout();
                store.setState('user', null);
                goTo('/');
            }
        });


        // рендерим все элементы
        for (let element in elements) {
            elements[element].render();
        }
    };

    return {
        self,
        destroy,
        setActions,
        render,
    }
}
