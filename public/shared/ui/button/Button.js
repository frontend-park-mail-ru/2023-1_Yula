import {Base} from "../base/Base.js"

export class Button extends Base {
    constructor(parent) {
        super(parent)

        this.name = 'Button';
        this.pathTemplate = "shared/ui/button/Button";

        this.config = {
            id: "button",
            class: "btn btn-primary",
            text: "Submit",
            type: "button",
        }
    }
}