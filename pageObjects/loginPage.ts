import { Locator, Page } from '@playwright/test';
import * as helper from '../heplers/helper.ts';

export class LoginPage{

    private page: Page;

    /** ログインフォーム */
    readonly userIdInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;

    /** 新規ユーザー登録画面へのリンク */
    readonly registerLink: Locator;

    constructor(page: Page){
        this.page = page;

        /** ログインフォーム */
        this.userIdInput = this.page.locator('//input[@id="identifier"]');
        this.passwordInput = this.page.locator('//input[@id="password"]');
        this.loginButton = this.page.locator('//button[@type="submit"]');
        
        /** 新規ユーザー登録画面へのリンク */
        this.registerLink = this.page.locator('//*[@href="/register"]');

    }

    /** ログイン操作 */
    async login(userId: string, password: string){
        await this.userIdInput.fill(userId);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
        await this.page.waitForLoadState();
        await helper.sleep(2);// 動画で説明用に間をとる（項目ごと赤枠で順に囲うなどする）

    }


}