import { Button } from "../../shared/ui";
import { buyModal } from "../../features/buy";
import store from "@modules/state-manager.js"

import "./index.scss";

export const Price = (parent) => {
    const actions = {};

    const self = () => {
        return document.querySelector('prc')
    }

    const destroy = () => {
        if (self()) {
            self().destroy();
        }
    }

    const setActions = (newActions) => {
        for (let action in newActions) {
            actions[action] = newActions[action];
        }
    }

    const render = async () => {
        const prc = document.createElement('div');
        prc.classList.add('prc');
        parent.appendChild(prc);

        const purchaseCounter = document.createElement('p');
        purchaseCounter.classList.add('prc-cnt');

        const money = document.createElement('h3');
        money.classList.add('prc-money');

        const basket = store.getState('basket');
        const cnt = basket.length;
        purchaseCounter.innerHTML = cnt != 0 ? cnt + ' товаров' : 'Корзина пуста.';

        const prices = basket.map(item => +item.price);
        const totalPrice = prices.reduce((acc, val) => acc + val, 0);

        money.innerHTML = 'Итого: ' + totalPrice + ' ₽';


        const modal = buyModal(prc);

        const btn = Button(prc, {
            id: "buy",
            type: "Submit",
            text: "Купить",
            disabled: cnt == 0,
        });
        btn.setActions({
            click: () => { modal.render() },
        });

        prc.appendChild(purchaseCounter);
        prc.appendChild(money);
        btn.render();
    }

    return {
        render,
        destroy,
        self,
        setActions,
    }
}