export default class CardGroup {
    #parent;

    constructor(parent) {
        this.#parent = parent;
    }

    render() {
        const cardGroupElement = document.createElement('div');

        Ajax.get({
            url: '/board',
            callback: (status, responseString) => {
                const anns = JSON.parse(responseString);

                const template = Handlebars.templates["components/card/CardGroup"];
                cardGroupElement.innerHTML += template({anns: anns});

                // this.#parent.appendChild(cardGroupElement);
                this.#parent.insertAdjacentHTML("beforeEnd", template({anns: anns}));
            }
        });
    }
}
