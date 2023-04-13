import { baseUrl } from "../config";

export class annApi {
    static async getAll() {
        let anns = await fetch(`${baseUrl}/api/board`);
        anns = await anns.json();
        
        anns = anns.map(ann => {
            ann.images = ann.images.map(img => `${baseUrl}/static/images/anns/${img}`);
            return ann;
        });

        return anns;
    }

    static async getFromUser(id) {
        
    }

    static async getById(id) {
        // let ann = await fetch(`api/board/${id}`);
        let ann = await fetch(`${baseUrl}/api/board/${id}`);

        console.log(ann);
        ann = await ann.json();
        console.log(ann);
    
        const imageUrls = ann.images.map(img => `${baseUrl}/static/images/anns/${img}`);
        
        ann.images = imageUrls;
    
        return ann;
    }
    
}
