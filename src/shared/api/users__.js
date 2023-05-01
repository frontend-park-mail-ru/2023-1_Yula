export class userApi {
    static async getMe() {
        let user = await fetch('http://localhost/user');

        // если запрос прошел успешно
        if (user.ok) {
            // получить данные пользователя
            user = await user.json();

            // добавить к user свойство avatar, которое будет содержать путь к аватарке
            user.Avatar = `data:image/jpeg;base64,${user.Avatar}`;

            // изменить свойства у user с заглавной буквы на строчную
            user = Object.entries(user).reduce((acc, [key, value]) => {
                acc[key[0].toLowerCase() + key.slice(1)] = value;
                return acc;
            }, {});            

        } else {
            // если запрос не прошел успешно, то вернуть null
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
        // переводим свойства со строчной буквы на заглавную
        data = Object.entries(data).reduce((acc, [key, value]) => {
            acc[key[0].toUpperCase() + key.slice(1)] = value;
            return acc;
        }, {});
            
        // отправляем запрос на сервер
        return await fetch('http://localhost/user', {
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
