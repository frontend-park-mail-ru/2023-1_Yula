import { CreateAnn } from "@features/ann";
import { Navbar } from "@widgets/navbar";
import { AuthWidget } from "@widgets/auth";
import { Carousel } from "@shared/ui";
import store from "@modules/state-manager";

import './create-ann.scss';
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
        createAnn.setActions({
            titleChange: (e) => {
                content.querySelector('.announcement-preview__title').innerText = e.target.value;
            },
            priceChange: (e) => {
                content.querySelector('.announcement-preview__price').innerText = e.target.value;
            },
            descriptionChange: (e) => {
                content.querySelector('.announcement-preview__description').innerText = e.target.value;
            },
            tagsChange: (e) => {
                content.querySelector('.announcement-preview__tags').innerText = e.target.value;
            },
            imagesChange: (images) => {
                carousel.changeConfig({ images });
            }
        });
        createAnn.render();
        createAnn.self().style.padding = '10px 30px';

        const contentPreview = document.createElement('div');
        contentPreview.classList.add('ann-characteristics');
        content.appendChild(contentPreview);

        const user = store.getState('user');

        const title = document.createElement('h1');
        title.classList.add('announcement-title');
        title.innerText = 'Картина Ван Гога';
        contentPreview.appendChild(title);

        const annCarousel = document.createElement('div');
        annCarousel.classList.add('announcement-carousel');
        contentPreview.appendChild(annCarousel);
        const carousel = Carousel(annCarousel, {
            images: ['https://artworld.ru/images/cms/content/catalog4/kartina_maslom_van_gogh_kopiay_olivkovye_derevja_na_fone_alp_vg230207.jpg', 'https://zimamagazine.com/wp-content/uploads/2019/05/zvezdnaya-noch-nad-ronoi-600x400.jpg'],
            outbound: true
        });
        carousel.render();
        
        contentPreview.insertAdjacentHTML('beforeend', annPreview({
            title: 'Картина Ван Гога',
            price: '1 000 000',
            description: 'Картина славится своей...',
            category: 'Живопись',
            sellerId: user.id,
            sellerName: user.name,
            sellerAvatar: user.pathtoavatar
        }));
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