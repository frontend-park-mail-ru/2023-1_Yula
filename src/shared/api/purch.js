export class purchApi {
    static async getPurchases() {
        let purchs = await fetch('api/bucket');
        purchs = await purchs.json();
        purchs = purchs.map(purch => {
            purch.images = purch.images.map(img => `http://localhost/static/images/anns/${img}`);
            return purch;
        });

        return purchs
    }
}