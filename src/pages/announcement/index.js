import { Carousel, Icon } from "@shared/ui";
import { Navbar } from "@widgets/navbar";
import { AuthWidget } from "@widgets/auth";
import { annApi } from "@shared/api/anns";
import store from "@modules/state-manager";

import './layout.scss';
import charackteristics from "./ann-characteristics.handlebars";

import basketSVG from "assets/icons/basket.svg";

export const announcementPage = (parent, params) => {
    const header = document.createElement('header');
    const content = document.createElement('main');

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
        content.innerHTML = '';
        content.classList.add('announcement-content');

        const annCarousel = document.createElement('div');
        annCarousel.classList.add('announcement-carousel');
        content.appendChild(annCarousel);

        const ann = await annApi.getById(2);

        const carousel = Carousel(annCarousel, {
            images: ann.images,
            current: 1,
        });
        carousel.render();

        const annCharacteristics = document.createElement('div');
        annCharacteristics.classList.add('announcement-characteristics');

        annCharacteristics.innerHTML = charackteristics(ann);
        content.appendChild(annCharacteristics);

        const buyIcon = Icon(annCharacteristics, {
            src: basketSVG,
            text: 'Купить',
            textColor: 'fg',
            size: 'large',
            direction: 'row',
        });
        buyIcon.render();
        buyIcon.self().style.alignSelf = 'flex-end';

        store.subscribe('theme', (theme) => {
            buyIcon.changeConfig({
                invert: theme === 'dark',
            });
            buyIcon.self().style.alignSelf = 'flex-end';
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

    // подписываемся на изменения в сторе (вынести в роутер)
    store.subscribe('user', () => {
        contentFilling();
        render();
    });

    return {
        render,
    }
}