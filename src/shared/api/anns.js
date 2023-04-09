export class annApi {
    static async getAll() {
        let anns = await fetch('api/board');
        anns = await anns.json();
        
        const promises = anns.map(async ann => {
            const response = await fetch("data:image/jpeg;base64," + ann.img);
            const imageBlob = await response.blob();
            const imageUrl = URL.createObjectURL(imageBlob);
            ann.src = imageUrl;
        });
        await Promise.all(promises);

        return anns;
    }

    static async getFromUser() {
        
    }

    static async getById(id) {
        let ann = await fetch(`api/board/${id}`);
        ann = await ann.json();
    
        const imageUrls = await Promise.all(
            ann.images.map(async img => {
                const response = await fetch("data:image/jpeg;base64," + img);
                const imageBlob = await response.blob();
                const imageUrl = URL.createObjectURL(imageBlob);
                return imageUrl;
            })
        );
        
        ann.images = imageUrls;
    
        return ann;
    }
    
}
