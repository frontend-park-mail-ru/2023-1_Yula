import { CreateAnn } from "@features/ann";
import { Navbar } from "@widgets/navbar";
import { AuthWidget } from "@widgets/auth";
import { Carousel } from "@shared/ui";

import './layout.scss';
import annPreview from "./ann-preview.handlebars";

export const createAnnPage = (parent) => {
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
        content.classList.add('create-ann-content');

        const contentCreater = document.createElement('div');
        content.appendChild(contentCreater);

        const createAnn = CreateAnn(contentCreater);
        createAnn.render();

        const contentPreview = document.createElement('div');
        contentPreview.classList.add('ann-characteristics');
        content.appendChild(contentPreview);

        const annCarousel = document.createElement('div');
        annCarousel.classList.add('announcement-carousel');
        content.appendChild(annCarousel);
        const carousel = Carousel(annCarousel, { });
        carousel.render();

        contentPreview.innerHTML += annPreview({
            title: 'Заголовок',
            price: 'Цена',
            address: 'Адрес',
            description: 'Описание',
            images: []
        });
    }

    headerFilling();
    contentFilling();

    const render = () => {
        if (!parent.querySelector('header')) {
            parent.appendChild(header);
        } else {
            parent.querySelector('header').replaceWith(header);
        }

        if (!parent.querySelector('main')) {
            parent.appendChild(content);
        } else {
            parent.querySelector('main').replaceWith(content);
        }
    }

    return {
        render,
    }
}