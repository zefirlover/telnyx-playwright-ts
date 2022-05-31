import { Page } from '@playwright/test';
import { MainPage } from '../pages/mainpage/Main.page';

class Helper {
    static makeLorem() {
        let text = "";
        let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (let i = 0; i < 5; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    }

    static async goToPowerfulProducts(page: Page) {
        let mainPage = new MainPage(page);
        await mainPage.checkCookiesMessageBox();
        await mainPage.scrollToPowerfulProducts();
    }
}

export default Helper;