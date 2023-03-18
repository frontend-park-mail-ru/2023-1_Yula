export class Base {
    name;
    pathTemplate;

    #parent;
    #config;

    constructor(parent) {
        this.#parent = parent;
        this.#config = {id: "base", actions: {}};
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

    #addEvents() {
        const self = this.self();
        const actions = this.config.actions;

        for (let action in actions) {
            self.addEventListener(action, actions[action]);
        }
    }

    render() {
        if (this.self()) {
            throw new Error(`Объект с id="${id}" уже есть на странице`);
        }

        const template = Handlebars.templates[this.pathTemplate];
        this.#parent.insertAdjacentHTML("beforeEnd", template(this.#config));

        this.#addEvents();
    }
}