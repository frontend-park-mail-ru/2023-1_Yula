import { Carousel, Icon, Alert } from "@shared/ui";
import { Navbar } from "@widgets/navbar";
import { AuthWidget } from "@widgets/auth";
import { annApi } from "@shared/api/anns";
import store from "@modules/state-manager";

import './layout.scss';
import charackteristics from "./ann-characteristics.handlebars";

import basketSVG from "assets/icons/basket.svg";
import userSVG from "assets/icons/user.svg";

/**
 * Страница объявления
 * @param {HTMLElement} parent - родительский элемент
 * @param {Object} params
 * @param {string} params.id - id объявления 
 * @returns 
 */
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

        const ann = await annApi.getById(params.id);

        const carousel = Carousel(annCarousel, { images: ann.images });
        carousel.render();

        const annCharacteristics = document.createElement('div');
        annCharacteristics.classList.add('announcement-characteristics');

        annCharacteristics.innerHTML = charackteristics(ann);
        content.appendChild(annCharacteristics);
        annCharacteristics.style.justifySelf = 'flex-start';

        const buyIcon = Icon(annCharacteristics, {
            id: "buy",
            src: basketSVG,
            text: 'В корзину',
            textColor: 'fg',
            size: 'large',
            direction: 'row',
            invert: store.getState('theme') === 'dark',
            actions: {
                'click': () => {
                    localStorage.setItem(ann.id, JSON.stringify(ann));

                    Alert(parent, {
                        id: 'add-to-cart',
                        title: 'Успешно',
                        text: 'Товар добавлен в корзину',
                        timer: 2000,
                    }).render();
                }
            }
        });
        buyIcon.render();

        const userIcon = Icon(annCharacteristics, {
            id: "user",
            src: userSVG,
            text: 'Профиль продаца',
            textColor: 'fg',
            size: 'large',
            direction: 'row',
            invert: store.getState('theme') === 'dark',
            link: `/sellers/${ann.userId}`,
        });
        userIcon.render();

        store.subscribe('theme', (theme) => buyIcon.changeConfig({invert: theme === 'dark'}));
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