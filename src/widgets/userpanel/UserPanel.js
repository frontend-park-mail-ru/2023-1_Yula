import { PanelElement } from '@shared/ui/index.js';
import { Icon } from '@shared/ui/index.js';
import { Divider } from '@shared/ui/index.js';
import { Button, Input } from "@shared/ui/index.js";
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
import editSVG from 'assets/icons/edit.svg'

export const UserPanel = (parent) => {
    const actions = {
        logout: () => { },
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

        const inputs = {
            elem0: Icon(userPanel, {
                id: "user",
                src: user.avatar,
                size: "large",
                invert: user ? false : invert,
                link: user ? '/profile' : null,
                circular: user ? true : false,
            }),
            elem1: Input(userPanel, {
                id: "user-input",
                text: `${user.name}`,
                placeholder: "Имя",
            }),
            elem2: Input(userPanel, {
                id: "login-input",
                text: `${user.login}`,
                placeholder: "Логин",
            }),
            elem3: Input(userPanel, {
                id: "email-input",
                text: `${user.email}`,
                placeholder: "Почта",
            }),
            elem4: Input(userPanel, {
                id: "phone-input",
                text: `${user.phoneNumber}`,
                placeholder: "Телефон",
            }),
            elem5: Input(userPanel, {
                id: "password-input",
                text: `${user.password}`,
                type: "password",
                placeholder: "Пароль",
            }),
            elem6: Button(userPanel, {
                id: "button-input-submit",
                color: "primary",
                text: "Принять",
            })
        }

        inputs.elem6.setActions({
            click: () => {
                for (let input in inputs) {
                    inputs[input].destroy();
                }
                for (let element in elements) {
                    elements[element].render();
                }
            }
        });
        // задаем элемeнты боковой панели
        const elements = {
            elem0: Icon(userPanel, {
                id: "user",
                src: user.avatar,
                size: "large",
                invert: user ? false : invert,
                link: user ? '/profile' : null,
                circular: user ? true : false,
            }),
            elem1: PanelElement(userPanel, {
                id: 'name',
                imgSource: nameSurnameSVG,
                text: `${user.name}`,
                invert: invert,
            }),
            elem2: PanelElement(userPanel, {
                id: 'login',
                imgSource: usernameSVG,
                text: `${user.login}`,
                invert: invert,
            }),
            elem3: PanelElement(userPanel, {
                id: 'email',
                imgSource: emailSVG,
                text: `${user.email}`,
                invert: invert,
            }),
            elem4: PanelElement(userPanel, {
                id: 'phone',
                imgSource: phoneSVG,
                text: `${user.phoneNumber}`,
                invert: invert,
            }),
            elem5: PanelElement(userPanel, {
                id: 'password',
                imgSource: passwordSVG,
                text: `${'●'.repeat(user.password.length)}`,
                invert: invert,
            }),
            elem6: Button(userPanel, {
                id: 'edit-profile',
                // srcIcon: editSVG,
                text: "Изменить",
                invert: invert,
            }),
            elem7: PanelElement(userPanel, {
                id: 'exit',
                imgSource: exitSVG,
                text: `Выйти`,
                invert: invert,
                actions: {
                    click: async () => {
                        await userApi.logout();
                        store.setState('basket', []);
                        store.setState('user', null);
                        goTo('/');
                    }
                }
            }),
            elem8: Divider(userPanel, {
                id: 'bottom_divider',
                class: 'user_panel_divider',
                invert: invert,
            }),
        };

        
        elements.elem6.setActions({
            click: () => {
                for (let input in inputs) {
                    inputs[input].render();
                }
                for (let element in elements) {
                    elements[element].destroy();
                }
            }
        });

        for (let element in elements) {
            elements[element].render();
        }

        // событие изменения темы
        store.subscribe('theme', (theme) => {
            for (let elem in elements) {
                if (elem === 'elem6') continue;
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
