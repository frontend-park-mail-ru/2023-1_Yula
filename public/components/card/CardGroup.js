export default class Card {
    #parent;

    constructor(parent) {
        this.#parent = parent;
    }

    render() {
        Ajax.get({
            url: '/board',
            callback: (status, responseString) => {
                const anns = JSON.parse(responseString);

                const template = Handlebars.templates["components/card/CardGroup"];
                this.#parent.innerHTML += template({anns: anns});
            }
        });
    }
}
