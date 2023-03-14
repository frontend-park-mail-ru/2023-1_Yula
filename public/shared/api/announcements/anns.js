export async function getAll() {
    let res = await fetch('/board')
    return res.json();
}