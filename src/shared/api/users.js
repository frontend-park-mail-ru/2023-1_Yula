import { baseUrl } from '../config';
import { deleteCookie } from '../lib';

function lowerKeys(obj) {
    const keys = Object.keys(obj);
    const newKeys = keys.map(key => key[0].toLowerCase() + key.slice(1));
    const newObj = {};

    for (let i = 0; i < keys.length; i++) {
        if (keys[i] === 'ID') {
            newKeys[i] = 'id';
        }
        newObj[newKeys[i]] = obj[keys[i]];
    }

    return newObj;
}

function upperKeys(obj) {
    const keys = Object.keys(obj);
    const newKeys = keys.map(key => key[0].toUpperCase() + key.slice(1));
    const newObj = {};

    for (let i = 0; i < keys.length; i++) {
        if (keys[i] === 'id') {
            newKeys[i] = 'ID';
        }
        newObj[newKeys[i]] = obj[keys[i]];
    }

    return newObj;
}

function parseJwt (token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
} 

export class userApi {
    static async getMe() {
        const token = localStorage.getItem('token');
        let user = await fetch(`${baseUrl}/api/user`, {
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': `bearerAuth ${token}`
            }
        });

        if (user.ok) {
            user = lowerKeys(await user.json());

            // const imageUrl = `${baseUrl}/static/images/users/${user.avatar}`;
            // user.avatar = imageUrl;
            user.id = parseJwt(token).id;
            console.log(user);
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
        return await fetch(`${baseUrl}/api/user`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(upperKeys(data))
        });
    }

    /**
     * Авторизация
     * @param {object} data
     * @param {string} data.login
     * @param {string} data.password
     */
    static async authByLogin(data) {
        return await fetch(`${baseUrl}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(upperKeys(data))
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
            user = lowerKeys(await user.json());
            // user.avatar = `${baseUrl}/static/images/users/${user.avatar}`;
            return user;
        } else {
            user = null;
        }

        return user;
    }
}
