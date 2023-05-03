import { AnnCard } from "@entities/announcement/ui";
import { CategoryCard } from "@entities/category/ui";
import { AdverticementPoster } from "@entities/adverticement/ui";
import { annApi } from "@shared/api/anns";
import { Navbar } from "@widgets/navbar";
import { AuthWidget } from "@widgets/auth";
import store from "@modules/state-manager";
import { baseUrl } from "@shared/config";
import { AdverticementPanel } from "@/widgets/adverticementpanel/AdverticementPanel";

import './layout.scss';

export const SearchPage = (parent) => {
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
        mainPageContent.classList.add('search-page');
        content.appendChild(mainPageContent);

        // 3 grid rows
        const mainPageContentAdvertise = document.createElement('div');
        mainPageContentAdvertise.classList.add('search-page__advertise');
        mainPageContent.appendChild(mainPageContentAdvertise);

        const mainPageContentAnns = document.createElement('div');
        mainPageContentAnns.classList.add('search-page__anns');
        mainPageContent.appendChild(mainPageContentAnns);


        // // Заполнение рекламы
        // const adverticementGroup = document.createElement('div');
        // adverticementGroup.classList.add('adverticement-poster-group');
        // mainPageContentAdvertise.appendChild(adverticementGroup);

        // const adverticements = {
        //     adv1: AdverticementPoster( adverticementGroup, {
        //         id: "adverticement1",
        //         link: `#`,
        //         image: `${baseUrl}/static/images/anns/robots-era.png`,
        //     }),
        //     adv2: AdverticementPoster( adverticementGroup, {
        //         id: "adverticement2",
        //         link: `#`,
        //         image: `${baseUrl}/static/images/anns/garden-era.png`,
        //     }),
        // }
        
        // for (let adv in adverticements) {
        //     adverticements[adv].render();
        // }

        const advPanel = AdverticementPanel(mainPageContentAdvertise);
        advPanel.render();

        // Заглавие для объявлений
        const annsTitle = document.createElement('div');
        annsTitle.classList.add('search-page__text');
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