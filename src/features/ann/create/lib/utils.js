export const readFileAsDataURL = (file) => {
    return new Promise(function (resolve, reject) {
        var reader = new FileReader();
        reader.onloadend = function () {
            resolve(reader.result);
        }
        reader.onerror = function () {
            reject(reader.error);
        }
        reader.readAsDataURL(file);
    });
}