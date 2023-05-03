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

export class favoritesApi {
    static async getFavorites() {
        const token = localStorage.getItem('token');

        const response = await fetch(`${baseUrl}/api/favorites`, {
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

    static async addToFavorites(id) {
        const token = localStorage.getItem('token');

        return await fetch(`${baseUrl}/api/favorites/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                Authorization: `Bearer ${token}`
            }
        });
    }

    static async deleteFromFavorites(id) {
        const token = localStorage.getItem('token');

        return await fetch(`${baseUrl}/api/favorites/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                Authorization: `Bearer ${token}`
            },
        });
    }
}