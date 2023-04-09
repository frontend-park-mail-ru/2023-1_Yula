import { PricePanel } from "./ui/price-panel/PricePanel";
import { purchApi } from "../../shared/api/purch.js"
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

    // const contentFilling = async () => {
    //     const prc = document.createElement('div');
    //     prc.classList.add('prc');

    //     const purchaseCounter = document.createElement('p');
    //     purchaseCounter.classList.add('prc-cnt');

    //     const money = document.createElement('h3');
    //     money.classList.add('money');

    //     const purchases = await purchApi.getPurchases();
    //     const cnt = purchases.length;

    //     purchaseCounter.innerHTML = cnt != 0 ? cnt + ' товаров' : 'Корзина пуста.';
    //     const totalPrice = purchases.reduce((acc, curr) => acc + parseInt(curr.price), 0);
    //     money.innerHTML = 'Итого: ' + totalPrice + ' руб.';

    //     prc.appendChild(purchaseCounter);
    //     prc.appendChild(money);
    // }

    // contentFilling();

    const render = async () => {
        // const parentElem = document.querySelector(parent);
    
        // // Удалить старый элемент, если он существует
        // destroy();
    
        // // Создать новый элемент
        // await contentFilling();
    
        // // Добавить новый элемент на страницу
        // parentElem.appendChild(self());
        const prc = document.createElement('div');
        prc.classList.add('prc');
        parent.appendChild(prc);

        const purchaseCounter = document.createElement('p');
        purchaseCounter.classList.add('prc-cnt');

        const money = document.createElement('h3');
        money.classList.add('prc-money');

        const purchases = await purchApi.getPurchases();
        const cnt = purchases.length;

        purchaseCounter.innerHTML = cnt != 0 ? cnt + ' товаров' : 'Корзина пуста.';
        
        const totalPrice = purchases.reduce((acc, curr) => acc + parseInt(curr.price), 0);
        
        money.innerHTML = 'Итого: ' + totalPrice + ' ₽';
        
        prc.appendChild(purchaseCounter);
        prc.appendChild(money);
    }    

    return {
        render,
        destroy,
        self,
    }
}