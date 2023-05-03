import { baseUrl } from "../config";

function lowerKeys(obj) {
    const keys = Object.keys(obj);
    const newKeys = keys.map(key => key[0].toLowerCase() + key.slice(1));
    const newObj = {};

    for (let i = 0; i < keys.length; i++) {
        newObj[newKeys[i]] = obj[keys[i]];
    }

    return newObj;
}

function upperKeys(obj) {
    const keys = Object.keys(obj);
    const newKeys = keys.map(key => key[0].toUpperCase() + key.slice(1));
    const newObj = {};

    for (let i = 0; i < keys.length; i++) {
        newObj[newKeys[i]] = obj[keys[i]];
    }

    return newObj;
}

export class basketApi {
    static async getBasket() {
        const token = localStorage.getItem('token');

        const response = await fetch(`${baseUrl}/api/cart`, {
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                Authorization: `Bearer ${token}`
            }
        });

        if (!response.ok) {
            return []
        } else {
            const anns =  await response.json();

            return anns.map(ann => {
                ann.images = ann.PathImages.map(img => `${baseUrl}/static/images/anns/${img}`);
                return lowerKeys(ann);
            });
        }
    }

    static async addToBasket(id) {
        const token = localStorage.getItem('token');

        return await fetch(`${baseUrl}/api/cart/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                Authorization: `Bearer ${token}`
            }
        });
    }

    static async deleteFromBasket(id) {
        const token = localStorage.getItem('token');

        return await fetch(`${baseUrl}/api/cart/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                Authorization: `Bearer ${token}`
            },
        });
    }

    static async clearBasket() {
        const token = localStorage.getItem('token');

        return await fetch(`${baseUrl}/api/cart/clear`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                Authorization: `Bearer ${token}`
            }
        });
    }
}