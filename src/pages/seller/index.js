import { userApi } from "@shared/api/users";
import { Navbar } from "@widgets/navbar/index.js";
import { AuthWidget } from "@widgets/auth/index.js";
import { AnnCard } from "@entities/announcement/ui";
import { annApi } from "@shared/api/anns";
import store from "@modules/state-manager.js";

import { SellerPanel } from "@/widgets/sellerpanel/SellerPanel";

import './layout.scss';

export const sellerPage = (parent, params) => {
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
        let user;

        if (!params || params.id == null) {
            user = store.getState('user');
        } else {
            user = await userApi.getById(params.id);
        };


        const textInfo = document.createElement("div");
        textInfo.innerText = "Продавец";
        textInfo.style.marginLeft  = "45%";
        textInfo.style.fontWeight  = "bold";
        textInfo.style.fontSize  = "26px";
        textInfo.style.color = "var(--text-color)";
        content.appendChild(textInfo);

        // main grid
        const mainPageContent = document.createElement('div');
        mainPageContent.classList.add('seller-content');
        content.appendChild(mainPageContent);

        const userPanel = SellerPanel(mainPageContent, user);
        userPanel.render();


        // объявления
        const mainPageContentAnns = document.createElement('div');
        mainPageContentAnns.classList.add('seller-page__anns');
        mainPageContent.appendChild(mainPageContentAnns);

        // Заглавие для объявлений
        const annsTitle = document.createElement('div');
        annsTitle.classList.add('seller-page__text');
        mainPageContentAnns.appendChild(annsTitle);
        annsTitle.innerText = "Продукты";

        // Заполнение объявлениями
        const annGroup = document.createElement('div');
        annGroup.classList.add('announcement-group');
        mainPageContentAnns.appendChild(annGroup);

        const anns = await annApi.getAll();

        for (let ann in anns) {
            if (anns[ann].userId == user.id) {
                const annCard = AnnCard(annGroup, {
                    tags: anns[ann].tags,
                    title: anns[ann].title,
                    price: anns[ann].price,
                    images: anns[ann].images,
                    link: `/ann/${anns[ann].id}`,
                    viewCount: 10,
                });
                annCard.render();
            }
        }
        ///////////////////////////////////////////////
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
        render,
    }
}
