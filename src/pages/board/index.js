import { AnnCard } from "@entities/announcement/ui";
import { CategoryCard } from "@entities/category/ui";
import { AdverticementPoster } from "@entities/adverticement/ui";
import { annApi } from "@shared/api/anns";
import { Navbar } from "@widgets/navbar";
import { AuthWidget } from "@widgets/auth";
import store from "@modules/state-manager";
import { baseUrl } from "@shared/config";

import './layout.scss';

export const boardPage = (parent) => {
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

        // main grid
        const mainPageContent = document.createElement('div');
        mainPageContent.classList.add('main-page');
        content.appendChild(mainPageContent);

        // 3 grid rows
        const mainPageContentAdvertise = document.createElement('div');
        mainPageContentAdvertise.classList.add('main-page__advertise');
        mainPageContent.appendChild(mainPageContentAdvertise);

        const mainPageContentCategory = document.createElement('div');
        mainPageContentCategory.classList.add('main-page__category');
        mainPageContent.appendChild(mainPageContentCategory);

        const mainPageContentAnns = document.createElement('div');
        mainPageContentAnns.classList.add('main-page__anns');
        mainPageContent.appendChild(mainPageContentAnns);


        // Заполнение рекламы
        const adverticementGroup = document.createElement('div');
        adverticementGroup.classList.add('adverticement-poster-group');
        mainPageContentAdvertise.appendChild(adverticementGroup);

        const adverticements = {
            adv1: AdverticementPoster( adverticementGroup, {
                id: "adverticement1",
                link: `#`,
                image: `${baseUrl}/static/images/anns/robots-era.png`,
            }),
            adv2: AdverticementPoster( adverticementGroup, {
                id: "adverticement2",
                link: `#`,
                image: `${baseUrl}/static/images/anns/garden-era.png`,
            }),
        }

        for (let adv in adverticements) {
            adverticements[adv].render();
        }


        // Заглавие для категорий
        const categoryTitle = document.createElement('div');
        categoryTitle.classList.add('main-page__text');
        mainPageContentCategory.appendChild(categoryTitle);
        categoryTitle.innerText = "Категории";

        // Заполнение категориями
        const categoryGroup = document.createElement('div');
        categoryGroup.classList.add('category-group');
        mainPageContentCategory.appendChild(categoryGroup);
        
        const categories = {
            category1: CategoryCard( categoryGroup, {
                id: "clothes",
                link: `${baseUrl}/search/3`,
                title: "Одежда и аксессуары",
                image: `${baseUrl}/static/images/anns/clothes-cat.png`,
            }),
            category2: CategoryCard( categoryGroup, {
                id: "jewelery",
                link: `${baseUrl}/search/1`,
                title: "Украшения",
                image: `${baseUrl}/static/images/anns/jewelery-cat.png`,
            }),
            category3: CategoryCard( categoryGroup, {
                id: "house",
                link: `${baseUrl}/search/2`,
                title: "Дом и интерьер",
                image: `${baseUrl}/static/images/anns/house-cat.png`,
            }),
            category4: CategoryCard( categoryGroup, {
                id: "gifts",
                link: `${baseUrl}/search/4`,
                title: "Подарки",
                image: `${baseUrl}/static/images/anns/gifts-cat.png`,
            }),
            category5: CategoryCard( categoryGroup, {
                id: "electronics",
                link: `${baseUrl}/search/5`,
                title: "Цифровые устройства",
                image: `${baseUrl}/static/images/anns/electronics-cat.png`,
            }),
        }

        for (let cat in categories) {
            categories[cat].render();
        }

        // Заглавие для объявлений
        const annsTitle = document.createElement('div');
        annsTitle.classList.add('main-page__text');
        mainPageContentAnns.appendChild(annsTitle);
        annsTitle.innerText = "Популярные объявления";

        // Заполнение объявлениями
        const annGroup = document.createElement('div');
        annGroup.classList.add('announcement-group');
        mainPageContentAnns.appendChild(annGroup);

        const anns = await annApi.getAll();

        anns.forEach(ann => {
            const annCard = AnnCard(annGroup, {
                title: ann.title,
                price: ann.price,
                images: ann.images,
                link: `/ann/${ann.postId}`,
                viewCount: ann.views, // TODO: сделать нормальный подсчет просмотров
            });
            annCard.render();
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

    // подписываемся на изменения в сторе (вынести в роутер)
    store.subscribe('user', () => {
        contentFilling();
        render();
    });

    return {
        render,
    }
}