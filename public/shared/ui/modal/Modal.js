import {Base} from "../base/Base.js"

export class Modal extends Base {
    body() {
        let id = this.config.id + this.name;
        return document.getElementById(id + 'Body');
    }

    footer() {
        let id = this.config.id + this.name;
        return document.getElementById(id + 'Footer');
    }

    /**
     * function to render Header of site page
     * @function renderHeader
     * @param {any} parent - parent content element
     * @config { back - event 'click' of backButton }
     */
    constructor(parent) {
        super(parent);
        this.name = 'Modal';
        this.pathTemplate = "shared/ui/modal/Modal";

        this.config = {
            title: "Poput",
            body: "",
            footer: "",
            actions: {
                back: () => this.destroy(),
            }
        }
    }

    render() {
        super.render();
        
        let id = this.config.id + this.name;

        document.getElementById(id + 'Close').addEventListener('click', () => this.destroy());

        document.getElementById(id + 'Back').addEventListener('click', () => this.config.actions.back());
    }
}

//  в виде функции:
export const fModal = (parent, config = {id: ""}) => {
    config.id += "Modal";

    const actions = {
        back: () => destroy(),
        close: () => destroy(),
    };

    const self = () => {
        return document.getElementById(config.id);
    }

    const body = () => {
        return document.getElementById(config.id + 'Body');
    }

    const footer = () => {
        return document.getElementById(config.id + 'Footer');
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
        const backButton = document.getElementById(config.id + 'Back');
        backButton.addEventListener('click', () => actions.back());

        const closeButton = document.getElementById(config.id + 'Close');
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