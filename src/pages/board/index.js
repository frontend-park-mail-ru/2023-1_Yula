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
        console.log(anns);

        anns.forEach(ann => {
            const annCard = AnnCard(annGroup, {
                id: ann.name,
                category: ann.category,
                title: ann.title,
                price: ann.price,
                address: ann.address,
                src: ann.src,
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