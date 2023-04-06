import './AnnCard.scss';
import template from './AnnCard.handlebars';

export const AnnCard = (parent, config = {id: ""}) => {
    config.id += "AnnCard";
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
                self().addEventListener(action, actions[action]);
            }
        }
    }

    const render = () => {
        if (self()) {
            throw new Error(`Объект с id="${config.id}" уже есть на странице`);
        }

        parent.insertAdjacentHTML("beforeEnd", template(config));

        applyActions();
    }

    return {
        self,
        destroy,
        setActions,
        render,
    };
}
