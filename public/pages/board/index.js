import { AnnCard } from "../../entities/announcement/ui/index.js";
import { annApi } from "../../shared/api/anns.js";
import { Navbar } from "../../widgets/navbar/index.js";
import { AuthWidget } from "../../widgets/auth/index.js";

export const boardPage = (parent) => {
    const header = document.createElement('header');
    const content = document.createElement('main');

    const renderHeader = () => {
        const navbar = Navbar(header);
        const authWidget = AuthWidget(parent);

        navbar.setActions({
            auth: () => {
                authWidget.render();
            }
        });
        navbar.render();

        // рендерим, если только нет на странице
        if (!parent.querySelector('header')) {
            parent.appendChild(header);
        }
    }

    const renderContent = async () => {
        const annGroup = document.createElement('div');
        annGroup.classList.add('ann-group');
        content.appendChild(annGroup);

        const anns = await annApi.getAll();

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

        // если контент есть, заменяем его новым
        if (!parent.querySelector('main')) {
            parent.appendChild(content);
        } else {
            parent.querySelector('main').replaceWith(content);
        }
    }

    const render = () => {
        renderHeader();
        renderContent();
    } 

    return {
        render,
    }
}