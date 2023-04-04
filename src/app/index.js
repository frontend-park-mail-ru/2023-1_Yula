import { boardPage, profilePage } from "../pages/index.js";
import { Router } from "./router.js";
import './index.css';

export const App = (parent) => {
    const router = Router(parent);

    router.register('/', boardPage, 'board');
    router.register('/profile', profilePage, 'profile', true);

    return {
        render: () => {
            router.start();
        }
    }
}
