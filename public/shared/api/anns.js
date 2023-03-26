export class annApi {
    static async getAll() {
        let anns = await fetch('/board');
        return anns.json();
    }
}
