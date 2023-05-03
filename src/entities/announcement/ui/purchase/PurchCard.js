import './PurchCard.scss';
import template from './PurchCard.handlebars';
import { Icon } from '@shared/ui';
import { basketApi } from '@shared/api/basket';
import store from "@modules/state-manager";
import crossSvg from "assets/icons/cross.svg";

export const PurchCard = (parent, config = { id: "" }) => {
    const purchId = +config.id.slice(3);
    config.id += "PurchCard";
    const actions = {};

    const self = () => {
        return parent.querySelector(`#${config.id}`);
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
        parent.insertAdjacentHTML("beforeEnd", template({...config, href: `/ann/${purchId}`}));

        const closeButton = self().querySelector('.purchase-card__close');

        const deleteIcon = Icon(closeButton, {
            id: "deletePurchase",
            src: crossSvg,
            size: "large",
            direction: "row",
            invert: store.getState('theme') === 'dark',
            actions: {
                'click': async () => {
                    await basketApi.deleteFromBasket(purchId);
                    const basket = store.getState('basket');
                    store.setState('basket', basket.filter((item) => item.postId !== purchId));
                    self().remove();
                }
            }
        });
        deleteIcon.render();

        store.subscribe('theme', (newTheme) => {
            deleteIcon.changeConfig({invert: newTheme === 'dark'});
        });

        applyActions();
    }

    return {
        self,
        destroy,
        setActions,
        render,
    }
}