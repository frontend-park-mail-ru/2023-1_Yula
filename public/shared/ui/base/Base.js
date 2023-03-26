export class Base {
    name;
    pathTemplate;

    #parent;
    #config;

    constructor(parent) {
        this.#parent = parent;
        this.#config = {id: "base"};
    }

    get config() {
        return this.#config;
    }

    /**
     * @param {Object} value
     */
    set config(value) {
        this.#config = {...this.#config, ...value};
        this.#config.name = this.name;
    }

    self() {
        let id = this.config.id + this.name;
        return document.getElementById(id);
    }

    destroy() {
        const self = this.self();
        if (self) {
            self.remove();
        }
    }

    render() {
        let id = this.config.id + this.name;
        if (this.self()) {
            throw new Error(`Объект с id="${id}" уже есть на странице`);
        }

        const template = Handlebars.templates[this.pathTemplate];
        this.#parent.insertAdjacentHTML("beforeEnd", template(this.#config));
    }
}

//  в виде функции:
export const fBase = (parent) => {
    let config = {id: "base"};

    const self = () => {
        let id = config.id + "Base";
        return document.getElementById(id);
    }

    const destroy = () => {
        const self = self();
        if (self) {
            self.remove();
        }
    }

    const render = () => {
        let id = config.id + "Base";
        if (self()) {
            throw new Error(`Объект с id="${id}" уже есть на странице`);
        }

        const template = Handlebars.templates["shared/ui/base/Base"];
        parent.insertAdjacentHTML("beforeEnd", template(config));
    }

    return {
        self,
        destroy,
        render,
    }
}