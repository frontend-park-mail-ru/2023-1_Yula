import { Carousel, Icon, Button, Alert } from "@shared/ui";
import { Navbar } from "@widgets/navbar";
import { AuthWidget } from "@widgets/auth";
import { annApi } from "@shared/api/anns";
import { userApi } from "@shared/api/users";
import { basketApi } from "@shared/api/basket";
import { favoritesApi } from "@shared/api/favorites";
import store from "@modules/state-manager";
import { goTo } from "@shared/lib";

import './announcement.scss';
import charackteristics from "./ann-characteristics.handlebars";

/**
 * Страница объявления
 * @param {HTMLElement} parent - родительский элемент
 * @param {Object} params
 * @param {string} params.id - id объявления 
 * @returns 
 */
export const announcementPage = (parent, params) => {
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
        content.classList.add('announcement-content');

        const annCarousel = document.createElement('div');
        annCarousel.classList.add('announcement-carousel');
        content.appendChild(annCarousel);

        const basket = store.getState("basket");
        const ann = await annApi.getById(params.id);
        console.log(ann);
        const seller = await userApi.getById(ann.userId);
        
        const title = document.createElement('h1');
        title.classList.add('announcement-title');
        title.innerText = ann.title;
        content.appendChild(title);

        const carousel = Carousel(annCarousel, { 
            images: ann.images,
            outbound: true,
        });
        carousel.render();

        const annCharacteristics = document.createElement('div');
        annCharacteristics.classList.add('announcement-characteristics');

        annCharacteristics.innerHTML = charackteristics({
            price: ann.price,
            description: ann.description,
            views: ann.views,
            viewDict: ann.views % 10 === 1 && ann.views % 100 !== 11 ? 'человек' : 
                ann.views % 10 >= 2 && ann.views % 10 <= 4 && (ann.views % 100 < 10 || ann.views % 100 >= 20) ? 'человека' : 'человек',
            close: ann.close,
            sellerName: seller.name,
            sellerAvatar: seller.avatar,
            sellerId: ann.userId,
        });
        content.appendChild(annCharacteristics);

        const buyButton = Button(content.querySelector('.button-place'), {
            id: "buy",
            text: "В корзину"
        });

        buyButton.setActions({
            click: async () => {
                if (!basket.find(item => item.postId === ann.postId)) {
                    const response = await basketApi.addToBasket(ann.userId);

                    if (response.ok) {
                        Alert(parent, {
                            id: 'add-to-cart',
                            title: 'Успешно',
                            text: 'Товар добавлен в корзину',
                            timer: 2000,
                        }).render();
                        store.setState("basket", [...basket, ann]);
                        buyButton.destroy();
                    } else {
                        const { message } = await response.json();
                        Alert(parent, { 
                            id: 'add-to-cart',
                            title: 'Неудача',
                            text: message,
                            timer: 2000,
                        }).render();
                    }
                }
            }
        });

        if (store.getState('user')?.id !== ann.userId &&
            !basket.find(item => item.postId === ann.postId)) {
            buyButton.render();
            buyButton.self().style.marginLeft = 0;
        }

        const addFavButton = Button(content.querySelector('.button-place'), {
            id: "addFav",
            color: "success",
            text: "В избранное",
        });
        addFavButton.setActions({
            click: async () => {
                ///
                const response = await favoritesApi.addToFavorites(ann.userId);

                if (response.ok) {
                    delFavButton.render();
                    addFavButton.destroy();
                } else {
                    const { message } = await response.json();
                    Alert(parent, {
                        id: 'add-to-fav',
                        title: 'Неудача',
                        text: message,
                        timer: 2000,
                    }).render();
                }
            }
        });

        const delFavButton = Button(content.querySelector('.button-place'), {
            id: "delFav",
            text: "Удалить из избранного",
            color: "danger",
        });
        delFavButton.setActions({
            click: async () => {
                const response = await favoritesApi.deleteFromFavorites(ann.postId);
                
                if (response.ok) {
                    addFavButton.render();
                    delFavButton.destroy();
                } else {
                    const { message } = await response.json();
                    Alert(parent, {
                        id: 'del-from-fav',
                        title: 'Неудача',
                        text: message,
                        timer: 2000,
                    }).render();
                }
            }
        });

        if (store.getState('user')?.id !== ann.userId) {
            const favorites = await favoritesApi.getFavorites();
            if (!favorites.find(item => item.postId === ann.postId)) {
                addFavButton.render();
                addFavButton.self().style.marginLeft = 0;
            } else {
                delFavButton.render();
                delFavButton.self().style.marginLeft = 0;
            }
        }

        if (store.getState('user')?.id === ann.userId) {
            const buttonGroup = content.querySelector('.button-place');
            // buttonGroup.style

            const closeBtn = Button(buttonGroup, {
                id: "close",
                text: "Закрыть",
                color: "tertiary",
                textColor: "primary",
            });
            closeBtn.setActions({
                click: async () => {
                    const response = await annApi.close(ann.postId);
                    closeBtn.destroy();
                },
            });
            if (!ann.close) {
                closeBtn.render();
                closeBtn.self().style.outline = "1px solid var(--primary-color)";
            }

            const editBtn = Button(buttonGroup, {
                id: "edit",
                type: "Submit",
                text: "Изменить",
            });
            editBtn.setActions({
                click: () => goTo(`/edit/${ann.postId}`),
            });
            editBtn.render();

            const deleteBtn = Button(buttonGroup, {
                id: "delete",
                text: "Удалить",
                color: "danger"
            });
            deleteBtn.setActions({
                click: async () => {
                    const response = await annApi.delete(ann.postId);
                    goTo('/profile');
                }
            });
            deleteBtn.render();
        }
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

    // подписываемся на изменения в сторе (вынести в роутер)
    store.subscribe('user', () => {
        contentFilling();
        render();
    });

    return {
        render,
    }
}