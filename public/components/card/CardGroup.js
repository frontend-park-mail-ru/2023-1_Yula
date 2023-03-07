// import * as Eta from "eta";
const Eta = require("eta");

export default class Card {
    #parent;

    constructor(parent) {
        this.#parent = parent;
    }

    render() {
        const source = document.getElementById('ann-group-template').innerHTML;

        const context = {
            anns: [
                {
                    src: '/ann6.jpeg', category: 'Спорт', title: 'Мяч', desc: 'Удобный мяч', price: '500', address: 'Москва, ул. Красная 28',
                },
            ],
        };

        const html = Eta.renderFile('./CardGroup', context);
        this.#parent.innerHTML = html;
    }
}
