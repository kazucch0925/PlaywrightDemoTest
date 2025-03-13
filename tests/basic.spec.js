const { test, expect } = require('@playwright/test');

test('基本的な接続テスト', async ({ page }) => {
  await page.goto('/');
  // ページが正常に読み込まれることを確認
  expect(await page.title()).not.toBe('');
  // スクリーンショットを撮影
  await page.screenshot({ path: 'test-results/screenshot.png' });
});

// 最低限のテストケースを追加
test('ページが存在することを確認', async ({ page }) => {
  await page.goto('/');
  // ページが200 OKを返すことを確認
  const response = await page.waitForResponse(response => 
    response.url() === page.url() && response.status() === 200
  );
  expect(response.ok()).toBeTruthy();
});
