import { Navbar } from "@widgets/navbar";
import { AuthWidget } from "@widgets/auth";
import { PurchCard } from "@entities/announcement/ui";
import store from "@modules/state-manager";
import { purchApi } from "@shared/api/purch.js";
import { Button } from "../../shared/ui";
import { Price } from "@widgets/price";

export const bucketPage = (parent) => {
    const header = document.createElement('header')
    const content = document.createElement('main')

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
        const priceWidget = Price(content);
        content.innerHTML = '';

        const purchGroup = document.createElement('div');
        purchGroup.classList.add('purchase-group');
        content.appendChild(purchGroup);

        const purchases = await purchApi.getPurchases();

        purchases.forEach(purch => {
            console.log(purch.images);
            const purchCard = PurchCard(purchGroup, {
                id: purch.id,
                category: purch.category,
                title: purch.title,
                price: purch.price,
                address: purch.address,
                src: purch.images[0],
            });
            
            // const btn = Button(parent, {
            //     id: `delete${purch.id}`,
            //     type: "submit",
            //     color: 'red',
            //     size: "small",
            // });
            // btn.setActions({
            //     click: () => {
            //         console.log("asd")
            //     }
            // })
            purchCard.render();
            // btn.render();
        });

        priceWidget.render();
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