import { boardPage, profilePage, bucketPage, announcementPage, sellerPage, createAnnPage, searchPage } from "@pages/index";
import { Router } from "./router";
import { setTheme } from "@features/theme";
import { defaultTheme } from "@shared/config";
import './index.css';

export const App = (parent) => {
    setTheme(defaultTheme);

    const router = Router(parent);

    router.register('/', boardPage, 'board');
    router.register('/profile', profilePage, 'profile', true);
    router.register('/bucket', bucketPage, 'bucket', true);
    router.register('/ann/{id}', announcementPage, 'announcement');
    router.register('/seller/{id}', sellerPage, 'seller-page');
    router.register('/seller', sellerPage, 'my-seller-page', true);
    router.register('/create', createAnnPage, 'create-ann', true);
    router.register('/edit/{id}', createAnnPage, 'edit-ann', true);
    router.register('/search/{query}', searchPage, 'search-page');

    return {
        render: () => {
            router.start();
        }
    }
}
