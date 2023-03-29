import { boardPage, profilePage } from "../pages/index.js";
import { Router } from "./router.js";

export const App = (parent) => {
    const router = Router(parent);

    router.register('/', boardPage);
    router.register('/profile', profilePage);

    return {
        render: () => {
            router.start();
        }
    }
}
