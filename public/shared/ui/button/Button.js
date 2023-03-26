import {Base} from "../base/Base.js"

export class Button extends Base {
    constructor(parent) {
        super(parent)

        this.name = 'Button';
        this.pathTemplate = "shared/ui/button/Button";

        this.config = {
            id: "button",
            class: "btn btn-primary",
            text: "Submit",
            type: "button",
            actions: {},
        }
    }

    render() {
        super.render();

        const self = this.self();

        if (this.config.actions) {
            for (let action in this.config.actions) {
                self.addEventListener(action, this.config.actions[action]);
            }
        }
    }
}

//  в виде функции:
export const fButton = (parent, config = {id: ""}) => {
    config.id += "Button";
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

        const template = Handlebars.templates["shared/ui/button/Button"];
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
