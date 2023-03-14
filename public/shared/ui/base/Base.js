export function notElementInDOM(id) {
    throw new Error(`Объекта с id="${id}" нет в DOM-дереве`);
}

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
     * @param {any} value
     */
    set config(value) {
        this.#config = {...this.#config, ...value};
        this.#config.name = this.name;
    }

    // возвращает экземпляр элемента
    self() {
        return document.getElementById(
            this.#config.id + this.#config.name
            )
    }

    // возвращает html элемента
    html() {
        let id = this.#config.id + this.#config.name;

        if (!id)
            throw new Error(`При создании объекта id обязателен`);
        if (this.self())
            throw new Error(`Объект с id="${id}" уже есть на странице`);

        const template = Handlebars.templates[this.pathTemplate];
        return template(this.#config);
    }

    render() {
        this.#parent.insertAdjacentHTML("beforeEnd", this.html());
        // this.#parent.innerHTML += this.html()
        this.didMount();
    }

    // запускается после "монтажа" элемента
    didMount() {}
}