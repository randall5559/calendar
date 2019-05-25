/**
 * Utility method to generate a random string id
 *
 * @param {*} yourNumber
 * @returns
 */
export const stringGen = (yourNumber) => {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < yourNumber; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}
