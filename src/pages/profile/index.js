import { AnnCard } from "@entities/announcement/ui/card/AnnCard.js";
import { Navbar } from "@widgets/navbar/index.js";
import { AuthWidget } from "@widgets/auth/index.js";
import { UserPanel } from "@widgets/userpanel/UserPanel.js";
import { annApi } from "@shared/api/anns";
import { favoritesApi } from "@shared/api/favorites";
import { Button } from "@shared/ui";
import store from "@modules/state-manager";

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

    const renderAnn = async () => {
        const annGroup = content.querySelector('.announcement-group');
        annGroup.innerHTML = '';

        const user = await store.getState('user');
        const anns = await annApi.getFromUser(user.id);

        anns.forEach(ann => {
            const annCard = AnnCard(annGroup, {
                tag: ann.tag,
                title: ann.title,
                price: ann.price,
                images: ann.images,
                link: `/ann/${ann.postId}`,
                views: ann.views,
            });
            annCard.render();
        });

        content.appendChild(annGroup);
    }

    const renderFavAnn = async () => {
        const annGroup = content.querySelector('.announcement-group');
        annGroup.innerHTML = '';

        const anns = await favoritesApi.getFavorites();

        anns.forEach(ann => {
            const annCard = AnnCard(annGroup, {
                tag: ann.tag,
                title: ann.title,
                price: ann.price,
                images: ann.images,
                link: `/ann/${ann.postId}`,
                views: ann.views,
            });
            annCard.render();
        });

        content.appendChild(annGroup);
    }

    const contentFilling = async () => {
        const userPanel = UserPanel(content);
        userPanel.render();

        const annGroup = document.createElement('div');
        annGroup.classList.add('announcement-group');

        const buttonGroup = document.createElement('div');
        buttonGroup.style.display = 'flex';
        buttonGroup.style.justifyContent = 'space-around';
        buttonGroup.style.margin = '20px';

        content.appendChild(buttonGroup);
        content.appendChild(annGroup);

        const myAnnBtn = Button(buttonGroup, {
            id: 'myAnn',
            text: 'Мои объявления',
        });
        myAnnBtn.setActions({
            click: () => {
                myAnnBtn.self().disabled = true;
                myAnnBtn.self().style.outline = 'none';
                myAnnBtn.self().style.backgroundColor = 'var(--primary-color)';
                myAnnBtn.self().querySelector('.button__text').style.color = 'var(--bg-color)';

                favAnnBtn.self().disabled = false;
                favAnnBtn.self().style.outline = 'solid 1px var(--success-color)';
                favAnnBtn.self().style.backgroundColor = 'var(--bg-color)';
                favAnnBtn.self().querySelector('.button__text').style.color = 'var(--success-color)';

                annGroup.innerHTML = '';
                renderAnn();
            }
        });
        myAnnBtn.render();
        myAnnBtn.self().disabled = true;

        const favAnnBtn = Button(buttonGroup, {
            id: 'favAnn',
            text: 'Избранные объявления',
            color: 'tertiary',
            textColor: 'success',
        });
        favAnnBtn.setActions({
            click: () => {
                favAnnBtn.self().disabled = true;
                favAnnBtn.self().style.outline = 'none';
                favAnnBtn.self().style.backgroundColor = 'var(--success-color)';
                favAnnBtn.self().querySelector('.button__text').style.color = 'var(--bg-color)';

                myAnnBtn.self().disabled = false;
                myAnnBtn.self().style.outline = 'solid 1px var(--primary-color)';
                myAnnBtn.self().style.backgroundColor = 'var(--bg-color)';
                myAnnBtn.self().querySelector('.button__text').style.color = 'var(--primary-color)';

                annGroup.innerHTML = '';
                renderFavAnn();
            }
        });
        favAnnBtn.render();
        favAnnBtn.self().style.outline = 'solid 1px var(--success-color)'

        renderAnn();
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
