import { AnnCard } from "@entities/announcement/ui/card/AnnCard.js";
import { Navbar } from "@widgets/navbar/index.js";
import { AuthWidget } from "@widgets/auth/index.js";
import { PurchCard } from "@entities/announcement/ui";
import { purchApi } from "@shared/api/purch.js";
import store from "@modules/state-manager.js";

import { SellerPanel } from "@/widgets/sellerpanel/SellerPanel";

export const sellerPage = (parent, params) => {
    console.log(params);
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
        
        const userPanel = SellerPanel(content);
        userPanel.render();

        const annGroup = document.createElement('div');
        annGroup.classList.add('purchase-group');

        // const purchases = await purchApi.getPurchases();

        // purchases.forEach(purch => {
        //     const purchCard = PurchCard(annGroup, {
        //         id: purch.name,
        //         category: purch.category,
        //         title: purch.title,
        //         price: purch.price,
        //         address: purch.address,
        //         src: purch.images[0],
        //     });
        //     purchCard.render();
        // });

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
