import { PanelElement } from '@shared/ui/index.js';
import { Icon } from '@shared/ui/index.js';
import { Divider } from '@shared/ui/index.js';
import store from "@modules/state-manager.js";

import './AdverticementPanel.scss';

import userSvg from 'assets/icons/user.svg';
import nameSurnameSVG from 'assets/icons/user_02.svg';
import phoneSVG from 'assets/icons/phone.svg';

export const AdverticementPanel = (parent, user) => {
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
        const sellerPanel = document.createElement('div');
        sellerPanel.classList.add('adverticement_panel');
        parent.appendChild(sellerPanel);

        const theme = store.getState('theme');
        const invert = (theme === 'light') ? false : true;
        
        // задаем элемeнты боковой панели
        const sellerPanelInfo = document.createElement('div');
        sellerPanelInfo.classList.add('seller_panel_info');
        sellerPanel.appendChild(sellerPanelInfo);

        const elements = {
            elem0 : Icon(sellerPanel, {
                id: "user",
                src: (user != null) ? user.pathtoavatar : userSvg,
                size: "large",
                invert: user ? false : invert,
                circular: user ? true : false,
            }),
            elem1 : PanelElement(sellerPanel, {
                id: 'fio',
                text: (user != null) ? `${user.name}` : 'none',
            }),

        }
        
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
