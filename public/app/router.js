export const Router = (parent) => {
    const routes = {};

    /**
     * Регистрация страницы
     * @param {string} path - url-адрес
     * @param {Function} page - страница
     */
    const register = (path, page) => {
        routes[path] = page;
    }

    /**
     * Запуск роутера
     */
    const start = () => {
        // изменяем историю браузера при клике по ссылке
        parent.addEventListener('click', (event) => {
            let link = event.target.closest('a');
            if (link && parent.contains(link)) {
                event.preventDefault();
                
                if (link.href === window.location.href) {
                    return;
                }
                history.pushState({}, 'newUrl', link.href);
                routes[window.location.pathname](parent).render();
            }
        });

        // изменяем содержимое страницы при переходе
        window.addEventListener('popstate', function() {
            const page = routes[window.location.pathname](parent);
            page.render();
        });

        // рендерим начальное местонахождение
        routes[window.location.pathname](parent).render();
    }

    return {
        register,
        start,
    }
}
