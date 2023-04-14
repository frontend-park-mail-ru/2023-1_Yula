import { AnnCard } from "@entities/announcement/ui";
import { annApi } from "@shared/api/anns";
import { Navbar } from "@widgets/navbar";
import { AuthWidget } from "@widgets/auth";
import store from "@modules/state-manager";

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