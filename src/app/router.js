import { userApi } from "../shared/api/users.js";
import store from "../modules/state-manager.js";

export const Router = (parent) => {
    const routes = [];

    /**
     * Регистрация публичной страницы
     * @param {string} route - url-адрес
     * @param {Function} page - страница
     */
    const register = (route, page, name, isPrivate = false, redirect = '/') => {
        const routeRegex = new RegExp(`^${route.replace(/{\w+}/g, '(.*)')}$`);

        routes.push({ regex: routeRegex, page, isPrivate, redirect, name, paramNames: route.match(/{\w+}/g) });
    }

    /**
     * Поиск страницы по url-адресу
     * @param {string} path - url-адрес
     * @param {Array} routes - массив роутов
     * @returns {Object} - объект с информацией о странице
     */
    const findRoute = (path) => {
        for (const route of routes) {
            const matches = path.match(route.regex);
            if (matches) {
                const params = {};
                if (route.paramNames) {
                    route.paramNames.map(param => param.slice(1, -1))
                        .forEach((paramName, index) => {
                            params[paramName] = matches[index + 1];
                        });
                }
                return { ...route, params };
            }
        }
        throw new Error(`No route found for path ${path}`);
    }    
    

    /**
     * Переход на страницу по url-адресу
     * @param {string} path - url-адрес
     */
    const goTo = (path) => {
        // убираем слэш в конце адреса
        if (path !== '/' && path[path.length - 1] === '/') path = path.slice(0, path.length - 1);

        const route = findRoute(path);
        const { page, params, redirect, name } = route;
        window.history.pushState({ params }, name, path);

        if (!route.isPrivate ||
            route.isPrivate && store.getState('user')) {
            const instancePage = page(parent, params);
            instancePage.render();
        } else {
            goTo(redirect);
        }
    }

    /**
     * Запуск роутера
     */
    const start = async () => {
        // проверяем авторизацию пользователя
        const user = await userApi.getMe();
        store.setState('user', user);

        // изменяем историю браузера при клике по ссылке
        parent.addEventListener('click', (event) => {
            let link = event.target.closest('a');
            if (link && parent.contains(link)) {
                event.preventDefault();
                
                if (link.href !== window.location.href) {
                    goTo(link.pathname);
                }
            }
        });

        // изменяем содержимое страницы при переходе по истории (назад/вперед)
        window.addEventListener('popstate', function(e) {
            const pageObj = findRoute(window.location.pathname);
            const params = e.state ? e.state.params : null;

            if (pageObj) {
                if (pageObj.isPrivate) {
                    if (store.getState('user')) {
                        pageObj.page(parent, params).render(); 
                    } else {
                        const redirectPage = findRoute(pageObj.redirect);
                        redirectPage.page(parent, params).render();
                    }
                } else {
                    pageObj.page(parent, params).render(); 
                }
            }
        });

        // начальная страница
        goTo(window.location.pathname);        
    }

    return {
        start,
        register,
    }
}
