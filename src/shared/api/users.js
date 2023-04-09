export class userApi {
    static async getMe() {
        let user = await fetch('http://localhost:8080/api/me');

        if (user.ok) {
            user = await user.json();

            const response = await fetch("data:image/jpeg;base64," + user.avatar);
            const imageBlob = await response.blob();
            const imageUrl = URL.createObjectURL(imageBlob);
            user.avatar = imageUrl;

            const promises = user.anns.map(async ann => {
                const response = await fetch("data:image/jpeg;base64," + ann.img);
                const imageBlob = await response.blob();
                const imageUrl = URL.createObjectURL(imageBlob);
                ann.src = imageUrl;
            });
            await Promise.all(promises);
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
