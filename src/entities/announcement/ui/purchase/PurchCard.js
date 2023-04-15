import './PurchCard.scss';
// import template from './PurchCard.handlebars';
import { Icon } from '@shared/ui';
import store from "@modules/state-manager";
import crossSvg from "assets/icons/cross.svg";

export const PurchCard = (parent, config = { id: "" }) => {
    const localItemID = config.id;
    config.id += "PurchCard";
    const actions = {};

    const self = () => {
        return document.getElementById(config.id);
    }

    const destroy = () => {
        if (self()) {
            self().remove();
        }
    }

    const setActions = (newActions) => {
        for (let action in newActions) {
            actions[action] = newActions[action];
        }
    }

    const applyActions = () => {
        if (self()) {
            for (let action in actions) {
                self.addEventListener(actions, actions[action])
            }
        }
    }

    const render = () => {
        // parent.insertAdjacentHTML("beforeEnd", template(config));
        const wrapper = document.createElement('div');
        wrapper.classList.add('purchase-card');
        parent.appendChild(wrapper);

        const content = document.createElement('div');
        content.classList.add('purchase-card__content');
        wrapper.appendChild(content);

        const image = document.createElement('img');
        image.classList.add('purchase-card__img');
        image.src = config.src;
        image.alt = "";

        const tags = document.createElement('div');
        tags.classList.add('purchase-card__tags');
        tags.textContent = config.tags;

        const title = document.createElement('div');
        title.classList.add('purchase-card__title');
        title.textContent = config.title;
        console.log(config.title);

        const sale = document.createElement('div');
        sale.classList.add('purchase-card__sale');
        sale.textContent = config.price + ' ₽';
        console.log(config.price);

        const deleteIcon = Icon(wrapper, {
            id: "deletePurchase",
            src: crossSvg,
            size: "large",
            direction: "row",
            actions: {
                'click' : () => {
                    localStorage.removeItem(localItemID);
                    store.setState('bucket', 'clearOne');
                }
            }
        });

        content.appendChild(image);
        content.appendChild(tags);
        content.appendChild(title);
        content.appendChild(sale);
        deleteIcon.render();
        applyActions();
    }

    return {
        self,
        destroy,
        setActions,
        render,
    }
}