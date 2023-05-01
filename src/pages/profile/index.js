import { AnnCard } from "@entities/announcement/ui/card/AnnCard.js";
import { Navbar } from "@widgets/navbar/index.js";
import { AuthWidget } from "@widgets/auth/index.js";
import { UserPanel } from "@widgets/userpanel/UserPanel.js";

import { annApi } from "@shared/api/anns";

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
        const userPanel = UserPanel(content);
        userPanel.render();

        const annGroup = document.createElement('div');
        annGroup.classList.add('announcement-group');

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

        content.appendChild(annGroup);
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
