import store from "@modules/state-manager.js";


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