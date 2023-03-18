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

    open() {
        const modal = this.self();
        modal.style.display = "block";
    }

    close() {
        const modal = this.self();
        modal.style.display = "none";
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
                // back: () => this.close(),
            }
        }
    }

    render() {
        super.render();
        
        let id = this.config.id + this.name;

        document.getElementById(id + 'Close').addEventListener('click', () => this.close());

        document.getElementById(id + 'Back').addEventListener('click', () => this.config.actions.back());
    }
}