import { baseUrl } from "../config";

export class sellerApi {
    static async GetSellerById(id) {
        let sellerInfo = await fetch(`${baseUrl}/api/sellers/${id}`);
        console.log(sellerInfo);
        sellerInfo = await sellerInfo.json();
        console.log(sellerInfo);

        sellerInfo.avatar = `${baseUrl}/static/images/anns/${sellerInfo.avatar}`;

        return sellerInfo;
    };
};