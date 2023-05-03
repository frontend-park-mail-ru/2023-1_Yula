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

export class annApi {
    static async getAll() {
        let anns = await fetch(`${baseUrl}/api/sort/new/1`);
        if (!anns.ok) {
            return []
        }
        anns = await anns.json();
        
        anns = anns.map(ann => {
            // ann.images = ann.PathImages.map(img => `${baseUrl}/static/images/anns/${img}`);
            ann.images = ann.PathImages;
            return lowerKeys(ann);
        });

        return anns;
    }

    static async getFromUser(id) {
        let anns = await fetch(`${baseUrl}/api/post/user/${id}`);
        
        if (!anns.ok) {
            return null;
        }

        anns = await anns.json();

        anns = anns.map(ann => {
            // ann.images = ann.PathImages.map(img => `${baseUrl}/static/images/anns/${img}`);
            ann.images = ann.PathImages;
            return lowerKeys(ann);
        });

        return anns;
    }

    static async getById(id) {
        let ann = await fetch(`${baseUrl}/api/post/${id}`);

        if (!ann.ok) {
            return null;
        }
        ann = await ann.json();
    
        // const imageUrls = ann.PathImages.map(img => `${baseUrl}/static/images/anns/${img}`);
        const imageUrls = ann.PathImages;
        ann.images = imageUrls;
    
        return lowerKeys(ann);
    }

    static async create(data) {
        const token = localStorage.getItem('token');

        return await fetch(`${baseUrl}/api/post`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(upperKeys(data))
        });
    }

    static async update(id, data) {
        const token = localStorage.getItem('token');

        return await fetch(`${baseUrl}/api/post/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(upperKeys(data))
        });
    }

    static async delete(id) {
        const token = localStorage.getItem('token');

        return await fetch(`${baseUrl}/api/post/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': `Bearer ${token}`
            }
        });
    }

    static async close(id) {
        const token = localStorage.getItem('token');

        return await fetch(`${baseUrl}/api/post/close/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': `Bearer ${token}`
            }
        });
    }

    static async search(query) {
        const url = new URL(`${baseUrl}/api/search/?query=${query.query}`);
        let anns = await fetch(url);

        if (!anns.ok) {
            return [];
        }

        anns = await anns.json();

        anns = anns.map(ann => {
            // ann.images = ann.PathImages.map(img => `${baseUrl}/static/images/anns/${img}`);
            ann.images = ann.PathImages;
            return lowerKeys(ann);
        });

        return anns;
    }

    static async getByTag(tag, pageNum) {
        const url = new URL(`${baseUrl}/api/post/${tag}/${pageNum}`);
        let anns = await fetch(url);

        if (!anns.ok) {
            return [];
        }

        anns = await anns.json();

        anns = anns.map(ann => {
            ann.images = ann.PathImages;
            return lowerKeys(ann);
        });

        return anns;
    }

}
