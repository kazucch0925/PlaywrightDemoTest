import { Locator, Page } from '@playwright/test';
import * as helper from '../heplers/helper.ts'

export class ToDoListPage{

    private page: Page;

    /** 上部メニューバー */
    readonly addTaskButton: Locator;
    readonly deleteSelectedButton: Locator;
    readonly logoutButton: Locator;

    /** タスク検索機能 */
    readonly searchInput: Locator;
    readonly searchButton: Locator;
    readonly resultCount: Locator;

    /** 一行目データの内容表示 */
    readonly taskName: Locator;
    readonly createdDate: Locator;
    readonly priority: Locator;
    readonly tags: Locator;
    readonly dueDate: Locator;
    readonly image: Locator;

    /** 拡大画像 */
    readonly fullImage: Locator;
    readonly closeFullImage: Locator;

    /** 一行目データの操作ボタン */
    readonly deleteButton: Locator;
    readonly editButton: Locator;

    /** 追加や削除時のtoast表示 */
    readonly toast: Locator;
    

    constructor(page: Page){
        this.page = page;

        /** 上部メニューバー */
        this.addTaskButton = this.page.locator('//button[@id="openModalButton"]');
        this.deleteSelectedButton = this.page.locator('//input[@id="deleteSelectedTasks"]');
        this.logoutButton = this.page.locator('//*[@id="logoutButton"]');
        
        /** タスク検索機能 */
        this.searchInput = this.page.getByRole('textbox', { name: 'タスクを検索' });
        this.searchButton = this.page.getByRole('button', { name: '検索' });
        this.resultCount = this.page.locator('//*[@id="resultCount"]');

        /** 一行目データの内容表示 */
        this.taskName = this.page.locator('//*[@id="todoList"]//td[2]');
        this.createdDate = this.page.locator('//*[@id="todoList"]//td[3]');
        this.priority = this.page.locator('//*[@id="todoList"]//td[4]');
        this.dueDate = this.page.locator('//*[@id="todoList"]//td[5]');
        this.tags = this.page.locator('//*[@id="todoList"]//td[6]');
        this.image = this.page.locator('//*[@alt="タスク画像"]');

        /** 拡大画像 */
        this.fullImage = this.page.locator('//*[@class="full-image"]');
        this.closeFullImage = this.page.locator('//*[@class="close-image-modal"]')

        /** 一行目データの操作ボタン */
        this.deleteButton = this.page.locator('//*[text()="削除"]');
        this.editButton = this.page.locator('//*[text()="編集"]');

        this.toast = this.page.locator('#toastContainer');


    };

    async searchTask(keyword: string){
        await helper.sleep(1);
        await this.searchInput.fill(keyword);
        await helper.sleep(1);
        await this.searchButton.click();
        await helper.sleep(1);
        await this.page.waitForLoadState();
    }


}