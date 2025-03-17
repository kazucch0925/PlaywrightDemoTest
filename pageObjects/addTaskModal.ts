import { Locator, Page } from '@playwright/test';

export class AddTaskModal{

    private page: Page;

    /** 入力フォーム */
    readonly taskNameInput: Locator;
    readonly prioritySelect: Locator;
    readonly dueDateInput: Locator;
    readonly tagsInput: Locator;
    readonly imageFileInput: Locator;

    /** 追加ボタン */
    readonly addButton: Locator;

    
    constructor(page: Page){
        this.page = page;

        this.taskNameInput = this.page.locator('//input[@id="task"]');
        this.prioritySelect = this.page.getByLabel('優先度:');
        this.dueDateInput = this.page.locator('//input[@id="due_date"]');
        this.tagsInput = this.page.locator('//input[@id="tags"]');
        this.imageFileInput = this.page.locator('//*[@id="image"]');

        this.addButton = this.page.locator('//button[@onclick="addTask()"]');

    };


}