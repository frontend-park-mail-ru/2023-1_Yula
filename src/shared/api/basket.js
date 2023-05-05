import { baseUrl } from "../config";
import { lowerKeys } from "../lib";

export class basketApi {
    static async getBasket() {
        const token = localStorage.getItem('token');

        const response = await fetch(`${baseUrl}/api/cart`, {
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': `bearerAuth ${token}`
            }
        });

        if (!response.ok) {
            return [];
        } else {
            const anns =  await response.json();

            if (!anns) {
                return [];
            }

            return anns.map(ann => {
                // ann.images = ann.PathImages.map(img => `${baseUrl}/static/images/anns/${img}`);
                ann.images = ann.PathImages
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
                'Authorization': `bearerAuth ${token}`
            }
        });
    }

    static async deleteFromBasket(id) {
        const token = localStorage.getItem('token');

        return await fetch(`${baseUrl}/api/cart/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': `bearerAuth ${token}`
            },
        });
    }

    static async clearBasket() {
        const token = localStorage.getItem('token');

        return await fetch(`${baseUrl}/api/cart/clear`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': `bearerAuth ${token}`
            }
        });
    }
}