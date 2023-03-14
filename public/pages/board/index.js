import { Card } from "../../entities/announcement/ui/card/Card.js";
import { api } from "../../shared/api/api.js";

export const boardPage = (parent) => {
    const annGroup = document.createElement('div');
    annGroup.classList.add('ann-group');
    api.getAll()
        .then(anns => {
            anns.forEach(ann => {
                const card = new Card(annGroup);
                card.config = ann;
                card.config.id = ann.name;
                annGroup.innerHTML += card.html();
            });
        }).finally(() => {
            parent.appendChild(annGroup);
        });
}