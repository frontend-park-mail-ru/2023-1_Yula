import { PanelElement } from '@shared/ui/index.js';
import { Icon } from '@shared/ui/index.js';
import { Divider } from '@shared/ui/index.js';
import store from "@modules/state-manager.js";
import { baseUrl } from "@shared/config";
import { AdverticementCard } from "@entities/adverticement/ui";

import './AdverticementPanel.scss';

import template from './AdverticementPanelElem.handlebars';

export const AdverticementPanel = (parent) => {
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
        const adverticementPanel = document.createElement('div');
        adverticementPanel.classList.add('adverticement_panel');
        parent.appendChild(adverticementPanel);

        const theme = store.getState('theme');
        const invert = (theme === 'light') ? false : true;
        
        // задаем элемeнты боковой панели
        const adverticementPanelCards = document.createElement('div');
        adverticementPanelCards.classList.add('adverticement_panel_cards');
        adverticementPanel.appendChild(adverticementPanelCards);

        // const elements = {
        //     elem0 : Icon(adverticementPanel, {
        //         id: "user",
        //         src: (user != null) ? user.pathtoavatar : userSvg,
        //         size: "large",
        //         invert: user ? false : invert,
        //         circular: user ? true : false,
        //     }),
        //     elem1 : PanelElement(adverticementPanel, {
        //         id: 'fio',
        //         text: (user != null) ? `${user.name}` : 'none',
        //     }),

        // }
        
        // // рендерим все элементы
        // for (let element in elements) {
        //     elements[element].render();
        // }

        // // событие изменения темы
        // store.subscribe('theme', (theme) => {
        //     for (let elem in elements) {
        //         elements[elem].changeConfig({ invert: (theme === 'light') ? false : true });
        //     }
            
        //     if (store.getState('user')) {
        //         elements.elem0.changeConfig({ invert: false });
        //     }
        // });

        const wrapper = document.createElement('div');
        wrapper.innerHTML += template();
        const templateElem = wrapper.firstElementChild;
        adverticementPanelCards.insertAdjacentElement("beforeEnd", templateElem);

        
        const adverticementCards = {
            card1: AdverticementCard( adverticementPanel, {
                id: "electronics",
                link: `#`,
                image: `${baseUrl}/static/images/anns/your-adv1.png`,
            }),
            card2: AdverticementCard( adverticementPanel, {
                id: "electronics",
                link: `#`,
                image: `${baseUrl}/static/images/anns/your-adv2.png`,
            }),
        }

        for (let card in adverticementCards) {
            adverticementCards[card].render();
        }


    };

    return {
        self,
        destroy,
        setActions,
        render,
    }
}
