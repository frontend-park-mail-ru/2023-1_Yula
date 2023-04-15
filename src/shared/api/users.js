import { baseUrl } from '../config';
import { deleteCookie } from '../lib';

export class userApi {
    static async getMe() {
        let user = await fetch(`${baseUrl}/api/user`);

        if (user.ok) {
            user = await user.json();

            const imageUrl = `${baseUrl}/static/images/users/${user.pathtoavatar}`;
            user.pathtoavatar = imageUrl;

            const purchs = await fetch(`${baseUrl}/api/me/purchs`);
            user.purchs = await purchs.json();

            user.purchs = user.purchs.map(ann => {
                const imageUrl = `${baseUrl}/static/images/anns/${ann.images[0]}`;
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
        data = Object.entries(data).reduce((acc, [key, value]) => {
            acc[key[0].toUpperCase() + key.slice(1)] = value;
            return acc;
        }, {});

        return await fetch(`${baseUrl}/api/user`, {
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
     * @param {string} data.login
     * @param {string} data.password
     */
    static async authByLogin(data) {
        // data = Object.entries(data).reduce((acc, [key, value]) => {
        //     acc[key[0].toUpperCase() + key.slice(1)] = value;
        //     return acc;
        // }, {});

        return await fetch(`${baseUrl}/api/auth/login`, {
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
        // return await fetch(`${baseUrl}/api/logout`, { method: 'POST' });

        deleteCookie('jwt');
    }

    /**
     * Пользователь по id
     * @param {number} id
     * @returns {object}
     */
    static async getById(id) {
        let user = await fetch(`${baseUrl}/api/user/${id}`);

        if (user.ok) {
            user = await user.json();
            user.pathtoavatar = `${baseUrl}/static/images/users/${user.pathtoavatar}`;
             
            return user;
        } else {
            user = null;
        }

        return user;
    }
}
