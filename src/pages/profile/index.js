import { AnnCard } from "../../entities/announcement/ui/card/AnnCard.js";
import { Navbar } from "../../widgets/navbar/index.js";
import { AuthWidget } from "../../widgets/auth/index.js";
import { userApi } from "../../shared/api/users.js";

export const profilePage = (parent) => {
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
        const user = await (await userApi.getMe()).json();

        const info = document.createElement('h3');
        info.innerText = `Имя: ${user.username} \n Адрес: ${user.email}`;

        const annGroup = document.createElement('div');
        annGroup.classList.add('announcement-group');

        user.anns.forEach(ann => {
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

        content.appendChild(info);
        content.appendChild(annGroup);
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

    return {
        render,
    }
}