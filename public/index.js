import { boardPage } from "./pages/board/index.js";
import { profilePage } from "./pages/profile/index.js";
import { App } from "./app/index.js";

const rootElement = document.getElementById('root');

const app = App(rootElement);
app.render();
