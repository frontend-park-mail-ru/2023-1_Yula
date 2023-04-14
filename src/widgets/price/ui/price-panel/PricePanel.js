import { Icon } from "@shared/ui/index.js";
import store from "@modules/state-manager.js";
import { toggleTheme } from "@features/theme";

import createAnnSvg from 'assets/icons/create-ann.svg';
import userSvg from 'assets/icons/user.svg';
import basketSvg from 'assets/icons/basket.svg';
import sellerSvg from 'assets/icons/seller.svg';
import moonSvg from 'assets/icons/moon.svg';
import sunSvg from 'assets/icons/sun.svg';
import homeSVG from 'assets/icons/home.svg'
import plusSVG from 'assets/icons/plus.svg'


export const PricePanel = (parent) => {
    const actions = {}

    const self = () => {
        return parent.querySelector('.price-panel');
    }

    const destroy = () => {
        if (self()) {
            self().remove();
        }
    }

    const render = async () => {
        const price = document.createElement('div');
        menu.classList.add('price-panel');
        parent.appendChild(price);

        const theme = store.getState('theme');
        const invert = (theme === 'light') ? false : true;
    }

    return {
        self,
        destroy,
        render,
    }
}