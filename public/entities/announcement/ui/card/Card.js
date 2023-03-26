import {Base} from "../../../../shared/ui/base/Base.js"

export class Card extends Base {
    constructor(parent) {
        super(parent)

        this.name = 'Card';
        this.pathTemplate = "entities/announcement/ui/card/Card";

        this.config = {
            id: "Card"
        }
    }
}