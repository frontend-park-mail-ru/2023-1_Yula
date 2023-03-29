class EventBus {
    #events = new Map();

    /**
     * @param {string} name
     * @param {Object} module
     * @return {Mediator}
     * @throws {Error}
     * */
    on = (event, callback) => {
        if (!this.#events.has(event)) {
            this.#events.set(event, []);
        }

        this.#events.get(event).push(callback);
    }

    /**
     * @param {string} name
     * @param {Object} module
     * @return {Mediator}
     * @throws {Error}
     * */
    off = (event, callback) => {
        if (!this.#events.has(event)) {
            throw new Error(`Событие ${event} не существует`);
        }

        const index = this.#events.get(event).indexOf(callback);
        if (index === -1) {
            throw new Error(`Событие ${event} не содержит callback`);
        }

        this.#events.get(event).splice(index, 1);
    }

    /**
     * @param {string} name
     * @param {Object} module
     * @return {Mediator}
     * @throws {Error}
     * */
    emit = (event, ...args) => {
        if (!this.#events.has(event)) {
            throw new Error(`Событие ${event} не существует`);
        }

        this.#events.get(event).forEach((callback) => {
            callback(...args);
        });
    }
}

export default new EventBus();
