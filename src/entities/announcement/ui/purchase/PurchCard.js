import './PurchCard.scss';
import template from './PurchCard.handlebars';
import { Icon } from '@shared/ui';
import store from "@modules/state-manager";
import crossSvg from "assets/icons/cross.svg";

export const PurchCard = (parent, config = { id: "" }) => {
    const purchId = config.id;
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
        parent.insertAdjacentHTML("beforeEnd", template({...config, href: `/ann/${purchId.slice(3)}`}));

        const closeButton = self().querySelector('.purchase-card__close');

        const deleteIcon = Icon(closeButton, {
            id: "deletePurchase",
            src: crossSvg,
            size: "large",
            direction: "row",
            invert: store.getState('theme') === 'dark',
            actions: {
                'click' : () => {
                    localStorage.removeItem(purchId);
                    store.setState('bucket', 'clearOne');
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