import { baseUrl } from "../config";
import { lowerKeys } from "../lib";

export class favoritesApi {
    static async getFavorites() {
        const token = localStorage.getItem('token');

        const response = await fetch(`${baseUrl}/api/favorite`, {
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': `bearerAuth ${token}`
            }
        });

        if (!response) {
            return []
        } else {
            const anns =  await response.json();

            if (!anns) {
                return [];
            }

            return anns.map(ann => {
                // ann.images = ann.PathImages.map(img => `${baseUrl}/static/images/anns/${img}`);
                ann.images = ann.PathImages;
                return lowerKeys(ann);
            });
        }
    }

    static async addToFavorites(id) {
        const token = localStorage.getItem('token');

        return await fetch(`${baseUrl}/api/favorite/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                Authorization: `bearerAuth ${token}`
            }
        });
    }

    static async deleteFromFavorites(id) {
        const token = localStorage.getItem('token');

        return await fetch(`${baseUrl}/api/favorite/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                Authorization: `bearerAuth ${token}`
            },
        });
    }
}