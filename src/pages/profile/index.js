import { AnnCard } from "@entities/announcement/ui/card/AnnCard.js";
import { Navbar } from "@widgets/navbar/index.js";
import { AuthWidget } from "@widgets/auth/index.js";
import { UserPanel } from "@widgets/userpanel/UserPanel.js";
import store from "@modules/state-manager.js";

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
        const user = store.getState('user');
        
        const userPanel = UserPanel(content);
        userPanel.render();

        const annGroup = document.createElement('div');
        annGroup.classList.add('announcement-group');

        if (user.anns) {
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
        }

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
