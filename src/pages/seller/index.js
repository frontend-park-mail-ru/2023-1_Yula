import { userApi } from "@shared/api/users";
import { Navbar } from "@widgets/navbar/index.js";
import { AuthWidget } from "@widgets/auth/index.js";
import { PurchCard } from "@entities/announcement/ui";
import { annApi } from "@shared/api/anns";
import store from "@modules/state-manager.js";

import { SellerPanel } from "@/widgets/sellerpanel/SellerPanel";

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

        const userPanel = SellerPanel(content, user);
        userPanel.render();

        const annGroup = document.createElement('div');
        annGroup.classList.add('purchase-group');

        const purchases = await annApi.getFromUser(user.id);

        if (purchases) {
            purchases.forEach(purch => {
                const purchCard = PurchCard(annGroup, {
                    id: purch.name,
                    tags: purch.tags,
                    title: purch.title,
                    price: purch.price,
                    src: purch.images[0],
                });
                purchCard.render();
            });
        }

        content.appendChild(annGroup);
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
