/** 実行コマンド
 * playwright % npx playwright test --workers=1 tests/testScenario.spec.ts --headed
 */

import { test, expect, type Page } from '@playwright/test';
import { LoginPage } from '../pageObjects/loginPage.ts';
import { AddTaskModal } from '../pageObjects/addTaskModal.ts'; 
import { ToDoListPage } from '../pageObjects/todoListPage.ts'; 
import * as helper from '../heplers/helper.ts'
import { EditTaskPage } from '../pageObjects/editTaskPage.ts';

test.setTimeout(1*60*1000);

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  await page.goto('https://todolist-sample.com/login');
  await loginPage.login("testUser@example.com", "testtesttest");
  
});

interface taskData {
  taskName: string;
  priority: string;
  expectedPriority: string;
  dueDate: string;
  expectedDueDate: string;
  tags: string;
  imageFilePath: string;
  expectedImageFilePath: string;
}


test.describe('タスクの新規作成/編集/削除のシナリオテスト', () => {

  /** 登録時間を保持するための変数 */
  let taskAddDate : string;
  
  /** 登録するデータと登録後の期待値 */
  const registerData: taskData = {
    taskName: "タスク_自動テストで登録",
    priority: "2",
    expectedPriority: "中",
    dueDate: "2025-04-25",
    expectedDueDate: "2025/4/25",
    tags: "テストタグ1, テストタグ2",
    imageFilePath: "./tests/testImageFiles/sampleImage1.png",
    expectedImageFilePath: "./tests/expectedTestImageFiles/newTaskImageExpected.png",
  };
  
  /** 編集のデータと更新後の期待値 */
  const editData: taskData = {
    taskName: "タスク_自動テストで編集",
    priority: '3',
    expectedPriority: "高",
    dueDate: "2025-04-28",
    expectedDueDate: "2025/4/28",
    tags: "テストタグ2, テストタグ3",
    imageFilePath: "./tests/testImageFiles/sampleImage2.jpg",
    expectedImageFilePath: "./tests/expectedTestImageFiles/editTaskImageExpected.png",
  };


  test('タスクの新規登録', async ({ page }) => {

    /** 使用するページのページオブジェクトのインスタンス生成 */
    const todoListPage = new ToDoListPage(page);
    const addTaskModal = new AddTaskModal(page);

    /** タスクの新規登録 */

      /** タスク追加モーダルを表示 */
    await todoListPage.addTaskButton.click();
    await page.waitForLoadState();

      /** タスク名入力 */
    await addTaskModal.taskNameInput.fill(registerData.taskName);
      /** 優先度を選択 */
    await addTaskModal.prioritySelect.selectOption(registerData.priority);
      /** 期限を設定 */
    await addTaskModal.dueDateInput.fill(registerData.dueDate);
      /** タグを入力 */
    await addTaskModal.tagsInput.fill(registerData.tags);
      /** 画像ファイルをセット */
    await addTaskModal.imageFileInput.setInputFiles(registerData.imageFilePath);
      /** タスクの追加を実行 */
    taskAddDate = await helper.getDate(); //登録実行時の日時を取得
    await addTaskModal.addButton.click();

      /** 追加完了メッセージが表示されることを確認 */
    await expect.soft(todoListPage.toast).toContainText('タスクが正常に追加されました。');


    /** 登録されたことを確認 */

      /** 登録したタスクを検索 */
    await todoListPage.searchTask(registerData.taskName);
      /** 検索結果が1件になっていることを確認 */
    expect(String(await todoListPage.resultCount.innerText()) == "1").toBeTruthy();
      /** タスク名が登録した内容通りかを確認 */
    await expect.soft(todoListPage.taskName).toContainText(registerData.taskName);
      /** 作成日が正しいか確認 */
    await expect.soft(todoListPage.createdDate).toContainText(taskAddDate);
      /** 優先度が登録した内容通りかを確認 */
    await expect.soft(todoListPage.priority).toContainText(registerData.expectedPriority);
      /** 期限が期待値通りの表示か確認 */
    await expect.soft(todoListPage.dueDate).toContainText(registerData.expectedDueDate);
      /** タグが登録した内容通りかを確認 */
    await expect.soft(todoListPage.tags).toContainText(registerData.tags);
      /** 画像を拡大表示 */
    await todoListPage.image.click();

    await helper.sleep(3);
    
      /** 画像がアップロードした通りのものであるか見た目を比較 */
    // await page.screenshot({ path: registerData.expectedImageFilePath }); //期待値撮影用
    await expect.soft(page).toHaveScreenshot(registerData.expectedImageFilePath);;
    
      /** 画像のフルサイズ表示を閉じる */
    await todoListPage.closeFullImage.click();

      /** ログアウト */
    await todoListPage.logoutButton.click();
    
  });

  test('タスクの編集', async ({ page }) => {

    /** 使用するページのページオブジェクトのインスタンス生成 */
    const todoListPage = new ToDoListPage(page);
    const editTaskPage = new EditTaskPage(page);

    /** タスクの編集 */

      /** 登録したタスクを検索 */
    await todoListPage.searchTask(registerData.taskName);
  
      /** タスクの編集ボタンをクリック */
    await todoListPage.editButton.click();

      /** タスク名入力 */
    await editTaskPage.taskNameInput.fill(editData.taskName);
      /** 優先度を選択 */
    await editTaskPage.prioritySelect.selectOption(editData.priority);
      /** 期限を設定 */
    await editTaskPage.dueDateInput.fill(editData.dueDate);
      /** タグを入力 */
    await editTaskPage.tagsInput.fill(editData.tags);

      /** 画像ファイルをセット */
    await editTaskPage.imageFileInput.setInputFiles(editData.imageFilePath);

    
      /** タスクの更新を実行 */
    await editTaskPage.upadateButton.click();


    /** 更新されたことを確認 */

      /** 更新したタスクを検索 */
    await todoListPage.searchTask(editData.taskName);

      /** 検索結果が1件になっていることを確認 */
    expect(String(await todoListPage.resultCount.innerText()) == "1").toBeTruthy();

      /** タスク名が更新した内容通りかを確認 */
    await expect.soft(todoListPage.taskName).toContainText(editData.taskName);
      /** 作成日が正しいか確認 */
    await expect.soft(todoListPage.createdDate).toContainText(taskAddDate);
      /** 優先度が更新した内容通りかを確認 */
    await expect.soft(todoListPage.priority).toContainText(editData.expectedPriority);
      /** 期限が更新した通りの表示か確認 */
    await expect.soft(todoListPage.dueDate).toContainText(editData.expectedDueDate);
      /** タグが更新した内容通りかを確認 */
    await expect.soft(todoListPage.tags).toContainText(editData.tags);
      /** 画像を拡大表示 */
    await todoListPage.image.click();

    await helper.sleep(3);

      /** 画像がアップロードした通りのものであるか見た目を比較 */
    await expect.soft(page).toHaveScreenshot(editData.expectedImageFilePath);

      /** 画像のフルサイズ表示を閉じる */
    await todoListPage.closeFullImage.click();

      /** ログアウト */
    await todoListPage.logoutButton.click();
    
  });

  test('タスクの削除', async ({ page }) => {

    /** 使用するページのページオブジェクトのインスタンス生成 */
    const todoListPage = new ToDoListPage(page);

  /** タスクを削除 */

    /** 更新したタスクを検索 */
  await todoListPage.searchTask(editData.taskName);

    /** 検索結果が1件になっていることを確認 */
  expect(String(await todoListPage.resultCount.innerText()) == "1").toBeTruthy();

    /** タスクの削除ボタンをクリック */
  await todoListPage.deleteButton.click();


  /** 削除されたことを確認 */

    /** 削除完了メッセージが表示されることを確認 */
    await expect.soft(todoListPage.toast).toContainText('タスクが正常に削除されました。');

      /** 更新したタスクを再度検索 */
    await todoListPage.searchTask(editData.taskName);

    /** 検索結果が0件になっていることを確認 */
    expect(String(await todoListPage.resultCount.innerText()) == "0").toBeTruthy();

      /** ログアウト */
    await todoListPage.logoutButton.click();
    
  });

})