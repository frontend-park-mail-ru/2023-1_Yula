import { baseUrl } from '../config';
import { deleteCookie } from '../lib';

function capitalizeKeys(obj) {
    return Object.entries(obj).reduce((acc, [key, value]) => {
        acc[key[0].toUpperCase() + key.slice(1)] = value;
        return acc;
    }, {});
}

export class userApi {
    static async getMe() {
        const token = localStorage.getItem('token');
        let user = await fetch(`${baseUrl}/api/user`, {
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': `bearer ${token}`
            }
        });

        if (user.ok) {
            user = await user.json();
            console.log(user);

            const imageUrl = `${baseUrl}/static/images/users/${user.pathtoavatar}`;
            user.pathtoavatar = imageUrl;

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
        // data = Object.entries(data).reduce((acc, [key, value]) => {
        //     acc[key[0].toUpperCase() + key.slice(1)] = value;
        //     return acc;
        // }, {});

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

        localStorage.removeItem('token');
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
