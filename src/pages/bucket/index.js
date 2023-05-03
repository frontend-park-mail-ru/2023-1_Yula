import { Navbar } from "@widgets/navbar";
import { AuthWidget } from "@widgets/auth";
import { PurchCard } from "@entities/announcement/ui";
import store from "@modules/state-manager";
import { Price } from "@widgets/price";

import './layout.scss';

export const bucketPage = (parent) => {
    const self = () => {
        return parent.querySelector('.purchase-group');
    }

    const destroy = () => {
        if (self()) {
            self().remove();
        }
    }

    const header = document.createElement('header')
    const content = document.createElement('main')

    const headerFilling = () => {
        const navbar = Navbar(header);
        const authWidget = AuthWidget(parent);

        navbar.setActions({
            auth: () => {
                authWidget.render();
            }
        });
        navbar.render();
    }

    const contentFilling = async () => {
        const priceWidget = Price(content);
        content.innerHTML = '';

        const purchGroup = document.createElement('div');
        purchGroup.classList.add('purchase-group');
        content.appendChild(purchGroup);

        store.subscribe('basket', newState => {
            purchGroup.innerHTML = '';
            newState.forEach(ann => {
                const purchCard = PurchCard(purchGroup, {
                    id: 'ann' + ann.postId,
                    tags: ann.tag,
                    title: ann.title,
                    price: ann.price,
                    images: ann.images,
                });
                purchCard.render();
            });
            priceWidget.destroy();
            priceWidget.render();
        });

        store.getState("basket").forEach(ann => {
            const purchCard = PurchCard(purchGroup, {
                id: 'ann' + ann.postId,
                tags: ann.tag,
                title: ann.title,
                price: ann.price,
                images: ann.images,
            });
            purchCard.render();
        });

        priceWidget.render();
    }

    headerFilling();
    contentFilling();

    const render = () => {
        // рендерим, если только нет на странице
        if (!parent.querySelector('header')) {
            parent.appendChild(header);
        } else {
            parent.querySelector('header').replaceWith(header);
        }

        // если контент есть, заменяем его новым
        if (!parent.querySelector('main')) {
            parent.appendChild(content);
        } else {
            parent.querySelector('main').replaceWith(content);
        }
    }

    return {
        self,
        destroy,
        render,
    }
}
