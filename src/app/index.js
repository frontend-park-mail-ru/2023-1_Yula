import { boardPage, profilePage, bucketPage, announcementPage, sellerPage, createAnnPage } from "@pages/index";
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
    router.register('/sellers/{id}', sellerPage, 'seller-page');
    router.register('/seller', sellerPage, 'my-seller-page', true);
    router.register('/create', createAnnPage, 'create-ann', true);

    return {
        render: () => {
            router.start();
        }
    }
}
