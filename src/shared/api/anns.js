export class annApi {
    static async getAll() {
        let anns = await fetch('api/board');
        anns = await anns.json();
        
        anns = anns.map(ann => {
            ann.images = ann.images.map(img => `http://localhost/static/images/anns/${img}`);
            return ann;
        });

        return anns;
    }

    static async getFromUser(id) {
        
    }

    static async getById(id) {
        let ann = await fetch(`http://localhost:8080/api/board/${id}`);
        ann = await ann.json();
    
        const imageUrls = ann.images.map(img => `http://localhost/static/images/anns/${img}`);
        
        ann.images = imageUrls;
    
        return ann;
    }
    
}
