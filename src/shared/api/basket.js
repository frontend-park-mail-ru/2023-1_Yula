import { baseUrl } from "../config";

export class basketApi {
    static async getBasket() {
        const token = localStorage.getItem('token');

        const response = await fetch(`${baseUrl}/api/basket`, {
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
                ann.images = ann.images.map(img => `${baseUrl}/static/images/anns/${img}`);
                return ann;
            });
        }
    }

    static async addToBasket(id) {
        const token = localStorage.getItem('token');

        return await fetch(`${baseUrl}/api/basket`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ annId: id })
        });
    }

    static async deleteFromBasket(id) {
        const token = localStorage.getItem('token');

        return await fetch(`${baseUrl}/api/basket`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ annId: id })
        });
    }

    static async clearBasket() {
        const token = localStorage.getItem('token');

        return await fetch(`${baseUrl}/api/basket/clear`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                Authorization: `Bearer ${token}`
            }
        });
    }
}