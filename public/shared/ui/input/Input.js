export default class Input {
    defaultConfig = {
        id: "",
        style: "btn btn-primary",
        label: "",
        value: "",

        type: "text",
        callback: () => {}
    }

    #parent;
    #config = this.defaultConfig;

    constructor(parent) {
        this.#parent = parent;
    }

    get config() {
        return this.#config;
    }

    /**
     * @param {any} value
     */
    set config(value) {
        this.#config = {...this.#config, ...value};
    }

    render() {
        const template = Handlebars.templates["shared/button/Button"];
        console.log(template(this.#config), this.#parent)
        this.#parent.insertAdjacentHTML("beforeEnd", template(this.#config));
    }
}