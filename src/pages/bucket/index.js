import { Navbar } from "@widgets/navbar";
import { AuthWidget } from "@widgets/auth";
import { PurchCard } from "@entities/announcement/ui";
import { AnnCard } from "@entities/announcement/ui";
import { Divider } from '@shared/ui/index.js';
import store from "@modules/state-manager";
import { Price } from "@widgets/price";
import { annApi } from "@shared/api/anns";

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

        // grid
        const purchGrid = document.createElement('div');
        purchGrid.classList.add('purchase-grid');
        content.appendChild(purchGrid);

        const purchGrid1 = document.createElement('div');
        purchGrid1.classList.add('purchase-grid1');
        purchGrid.appendChild(purchGrid1);

        const purchGrid2 = document.createElement('div');
        purchGrid2.classList.add('purchase-grid2');
        purchGrid.appendChild(purchGrid2);


        // заполнение корзины
        const purchGroup = document.createElement('div');
        purchGroup.classList.add('purchase-group');
        content.appendChild(purchGroup);

        store.subscribe('bucket', newState => {
            if (newState === 'clear') {
                purchGroup.innerHTML = '';
                localStorage.clear();
                priceWidget.destroy();
                priceWidget.render();
            }
            if (newState === 'clearOne') {
                priceWidget.destroy();
                priceWidget.render();
            }
        });

        // Object.keys(localStorage).forEach(function(key) {
        //     const obj = JSON.parse(localStorage.getItem(key))
        //     const purchCard = PurchCard(purchGroup, {
        //         id: key,
        //         tags: obj.tags,
        //         title: obj.title,
        //         price: obj.price,
        //         address: obj.address,
        //         src: obj.images[0],
        //     });
        //     purchCard.render();
        // });
        priceWidget.render();

        // разделитель
        const divider = Divider(content, {
            id: 'bottom_divider',
            class: 'basket',
            invert: true,
        });
        divider.render();

        // Заглавие для похожих объявлений
        const annsTitle = document.createElement('div');
        annsTitle.classList.add('basket-page__text');
        content.appendChild(annsTitle);
        annsTitle.innerText = "Похожие объявления";

        // Заполнение объявлениями
        const annGroup = document.createElement('div');
        annGroup.classList.add('announcement-group');
        content.appendChild(annGroup);

        const anns = await annApi.getAll();

        anns.forEach(ann => {
            const annCard = AnnCard(annGroup, {
                tags: ann.tags,
                title: ann.title,
                price: ann.price,
                images: ann.images,
                link: `/ann/${ann.id}`,
            });
            annCard.render();
        });
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