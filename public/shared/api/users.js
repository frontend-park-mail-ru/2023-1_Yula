export class userApi {
    static async getMe() {
        return await fetch('/me');
    }

    /**
     * 
     * @param {object} data - {username, email, password}
     */
    static async signup(data) {
       return await fetch('/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(data)
        });
    }

    /**
     * 
     * @param {object} data - {email, password}
     */
    static async loginByEmail(data) {
        return await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(data)
        });
    }
}
