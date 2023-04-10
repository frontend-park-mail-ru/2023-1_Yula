export class userApi {
    static async getMe() {
        let user = await fetch('http://localhost:8080/api/me');

        if (user.ok) {
            user = await user.json();

            const imageUrl = `http://localhost/static/images/users/${user.avatar}`;
            user.avatar = imageUrl;

            const anns = await fetch('http://localhost:8080/api/me/anns');
            user.anns = await anns.json();

            user.anns = user.anns.map(ann => {
                const imageUrl = `http://localhost/static/images/anns/${ann.images[0]}`;
                ann.images = [imageUrl];
                return ann;
            });

            const purchs = await fetch('http://localhost:8080/api/bucket');
            user.purchs = await purchs.json();

            user.purchs = user.purchs.map(ann => {
                const imageUrl = `http://localhost/static/images/anns/${ann.images[0]}`;
                ann.images = [imageUrl];
                return ann;
            });

            return user;
        } else {
            user = null;
        }

        return user;
    }

    /**
     * Регистрация
     * @param {object} data
     * @param {string} data.username
     * @param {string} data.email
     * @param {string} data.password
     */
    static async signup(data) {
       return await fetch('api/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(data)
        });
    }

    /**
     * Авторизация
     * @param {object} data
     * @param {string} data.email
     * @param {string} data.password
     */
    static async loginByEmail(data) {
        return await fetch('api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(data)
        });
    }

    /**
     * Выход из аккаунта
     */
    static async logout() {
        return await fetch('api/logout', {method: 'POST'});
    }
}
