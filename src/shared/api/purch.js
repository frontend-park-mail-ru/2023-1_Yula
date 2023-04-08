export class purchApi {
    static async getPurchases() {
        let purchs = await fetch('api/bucket');
        purchs = await purchs.json();

        const promises = purchs.map(async pur => {
            const response = await fetch("data:image/jpeg;base64," + pur.img);
            const imageBlob = await response.blob();
            const imageUrl = URL.createObjectURL(imageBlob);
            pur.src = imageUrl;
        });
        await Promise.all(promises);

        return purchs
    }
}