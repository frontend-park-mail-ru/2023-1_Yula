import { baseUrl } from "../config";

export class sellerApi {
    static async GetSellerById(id) {
        const seller = await fetch(`${baseUrl}/api/seller/${id}`);

        if (!seller.ok) {
            return null;
        }

        sellerInfo = await sellerInfo.json();

        // sellerInfo.avatar = `${baseUrl}/static/images/anns/${sellerInfo.avatar}`;

        return sellerInfo;
    };
};