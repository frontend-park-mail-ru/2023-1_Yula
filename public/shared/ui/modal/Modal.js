import {Base, notElementInDOM} from "../base/Base.js"

export class Modal extends Base {
    set body(value) {
        let id = this.config.id + this.name;
        if (!this.self())
            notElementInDOM(id);

        const body = document.getElementById(id + 'Body');
        body.innerHTML = value;
    }

    get body() {
        let id = this.config.id + this.name;
        if (!this.self())
            notElementInDOM(id);

        return document.getElementById(id + 'Body');
    }

    footer() {
        let id = this.config.id + this.name;
        if (!this.self())
            notElementInDOM(id);

        return document.getElementById(id + 'Footer');
    }

    getBackButton() {
        let id = this.config.id + this.name;
        if (!this.self())
            notElementInDOM(id);

        return document.getElementById(id + 'Back');
    }

    open() {
        const modal = this.self();
        modal.style.display = "block";
    }

    close() {
        const modal = this.self();
        modal.style.display = "none";
    }

    didMount() {
        let closeButtonId = this.config.id + this.name + 'Close';
        const closeButton = document.getElementById(closeButtonId);

        closeButton.addEventListener('click', () => {
            const modal = this.self();
            modal.style.display = "none";
        })
        closeButton.onclick = () => console.log("test");
    }

    constructor(parent) {
        super(parent)
        this.name = 'Modal';
        this.pathTemplate = "shared/ui/modal/Modal";

        this.config = {
            title: "Poput",
            body: "",
            footer: "",
            // actions: 
        }
    }
}