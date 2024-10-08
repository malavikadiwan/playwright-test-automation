export class MiscUtils {

    async generateRandomString(length) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        return Array.from({ length }, () => characters.charAt(Math.floor(Math.random() * characters.length))).join('');
    }

    async generateRandomEmail(firstName) {
        if (typeof firstName !== 'string') {
            throw new TypeError('firstName must be a string');
        }
        const emailProviders = ['gmail.com', 'yahoo.com', 'outlook.com', 'example.com'];
        const emailProvider = emailProviders[Math.floor(Math.random() * emailProviders.length)];
        return `${firstName.toLowerCase()}${Math.floor(Math.random() * 1000)}@${emailProvider}`;
    }

    async getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}
