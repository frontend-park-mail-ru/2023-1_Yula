import './PurchCard.scss';
import template from './PurchCard.handlebars';

export const PurchCard = (parent, config = {id: ""}) => {
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
        parent.insertAdjacentHTML("beforeEnd", template(config));

        applyActions();
    }

    return {
        self,
        destroy,
        setActions,
        render,
    }
}