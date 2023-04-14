import { baseUrl } from "../config";

export class annApi {
    static async getAll() {
        let anns = await fetch(`${baseUrl}/api/sort/new/1`);
        anns = await anns.json();
        
        anns = anns.map(ann => {
            ann.images = ann.images.map(img => `${baseUrl}/static/images/anns/${img}`);
            return ann;
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
            ann.images = ann.images.map(img => `${baseUrl}/static/images/anns/${img}`);
            return ann;
        });

        return anns;
    }

    static async getById(id) {
        let ann = await fetch(`${baseUrl}/api/post/${id}`);

        if (!ann.ok) {
            return null;
        }

        ann = await ann.json();
    
        const imageUrls = ann.images.map(img => `${baseUrl}/static/images/anns/${img}`);
        
        ann.images = imageUrls;
    
        return ann;
    }

    static async create(data) {
        return await fetch(`${baseUrl}/api/post`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(data)
        });
    }

    static async getAnnSellerByAnnId(id) {
        let seller = await fetch(`${baseUrl}/api/getseller/${id}`);
        seller = await seller.json();
        return seller;
    }
    
    static async getAllSellerAnns(id) {
        let anns = await fetch(`${baseUrl}/api/anns/${id}`);
        anns = await anns.json();
        anns = anns.map(ann => {
            ann.images = ann.images.map(img => `${baseUrl}/static/images/anns/${img}`);
            return ann;
        });

        return anns;
    }
}
