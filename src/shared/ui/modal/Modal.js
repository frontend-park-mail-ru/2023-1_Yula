import './Modal.scss';
import template from './Modal.handlebars';

export const Modal = (parent, config = {id: ""}) => {
    config.id += "Modal";

    const actions = {
        back: () => destroy(),
        close: () => destroy(),
        outside: () => destroy()
    };

    const self = () => {
        return parent.querySelector('#' + config.id);
    }

    const body = () => {
        if (!self()) {
            throw new Error(`Объект с id="${config.id}" не найден на странице`);
        }
        
        return self().querySelector(`.modal__body`);
    }

    const footer = () => {
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

    /**
     * Добавить действия для элементов модального окна
     * @param {Object} newActions 
     * @param {Function} newActions.back - действие при нажатии на кнопку "Назад"
     * @param {Function} newActions.close - действие при нажатии на кнопку "Закрыть"
     * @param {Function} newActions.outside - действие при нажатии вне модального окна
     */
    const setActions = (newActions) => {
        for (let action in newActions) {
            actions[action] = newActions[action];
        }
    }

    const applyActions = () => {
        const backButton = self().querySelector(`.modal__btn-back`);
        backButton.addEventListener('click', () => actions.back());
        
        // escape key pressed
        self().addEventListener("keydown", (event) => {
            if (event.keyCode === 27) {
              actions.back();
            }
        });

        const closeButton = self().querySelector(`.modal__btn-close`);
        closeButton.addEventListener('click', () => actions.close());

        self().addEventListener('click', (e) => {
            if (e.target === self()) {
                actions.outside();
            }
        });
    };

    const render = () => {
        if (self()) {
            throw new Error(`Объект с id="${config.id}" уже есть на странице`);
        }

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