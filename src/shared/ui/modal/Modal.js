import './Modal.scss';

export const Modal = (parent, config = {id: ""}) => {
    config.id += "Modal";

    const actions = {
        back: () => destroy(),
        close: () => destroy(),
    };

    const self = () => {
        return parent.querySelector('#' + config.id);
    }

    const body = () => {
        // return parent.querySelector(`#${config.id}Body`);
        if (!self()) {
            throw new Error(`Объект с id="${config.id}" не найден на странице`);
        }
        
        return self().querySelector(`.modal__body`);
    }

    const footer = () => {
        // return parent.querySelector(`#${config.id}Footer`);
        if (!self()) {
            throw new Error(`Объект с id="${config.id}" не найден на странице`);
        }
        
        return self().querySelector(`.modal__footer`);
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
        // const backButton = parent.querySelector(`#${config.id}Back`);
        const backButton = self().querySelector(`.modal__btn-back`);
        backButton.addEventListener('click', () => actions.back());

        // const closeButton = parent.querySelector(`#${config.id}Close`);
        const closeButton = self().querySelector(`.modal__btn-close`);
        closeButton.addEventListener('click', () => actions.close());
    }

    const render = () => {
        if (self()) {
            throw new Error(`Объект с id="${config.id}" уже есть на странице`);
        }

        const template = Handlebars.templates["shared/ui/modal/Modal"];
        parent.insertAdjacentHTML("beforeEnd", template(config));

        applyActions();
    }

    return {
        self,
        body,
        footer,
        destroy,
        setActions,
        render,
    };
}