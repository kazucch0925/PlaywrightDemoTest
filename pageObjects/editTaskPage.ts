import { Locator, Page } from '@playwright/test';

export class EditTaskPage{

    private page: Page;

    /** 入力フォーム */
    readonly taskNameInput: Locator;
    readonly prioritySelect: Locator;
    readonly dueDateInput: Locator;
    readonly tagsInput: Locator;
    readonly imageFileInput: Locator;

    /** 追加ボタン */
    readonly upadateButton: Locator;


    constructor(page: Page){
        this.page = page;

        this.taskNameInput = this.page.locator('//input[@id="task"]');
        this.prioritySelect = this.page.getByLabel('優先度');
        this.dueDateInput = this.page.getByRole('textbox', { name: '期限' });
        this.tagsInput = this.page.locator('//input[@id="tags"]');
        this.imageFileInput = this.page.locator('//*[@id="image"]');

        this.upadateButton = this.page.locator('//button[@type="submit"]');

    };


}