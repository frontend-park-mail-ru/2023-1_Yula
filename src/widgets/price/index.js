import { PricePanel } from "./ui/price-panel/PricePanel";
import { purchApi } from "../../shared/api/purch.js"
import { Button } from "../../shared/ui";
import store from "@modules/state-manager.js"
import "./index.scss";
import { goTo } from "../../shared/lib/history";
import { buyModal } from "../../features/buy";

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

        const purchases = await purchApi.getPurchases();

        const cnt = localStorage.length;
        purchaseCounter.innerHTML = cnt != 0 ? cnt + ' товаров' : 'Корзина пуста.';

        // const totalPrice = purchases.reduce((acc, curr) => acc + parseInt(curr.price), 0);
        const totalPrice = Object.values(localStorage).reduce((acc, val) => {
            const obj = JSON.parse(val);
            return acc + parseInt(obj.price);
        }, 0);

        console.log(totalPrice);
        money.innerHTML = 'Итого: ' + totalPrice + ' ₽';


        const modal = buyModal(prc);

        const btn = Button(prc, {
            id: "buy",
            type: "Submit",
            text: "Купить",
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