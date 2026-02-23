/**
 * @jest-environment node
 */

import puppeteer from 'puppeteer';

describe('Popover DOM testing', () => {
    let browser;
    let page;

    beforeAll(async () => {
        browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
        });
        page = await browser.newPage();
    });

    afterAll(async () => {
        await browser.close();
    });

    test('should toggle popover on button click', async () => {
        await page.goto('http://localhost:8080');

        // Ждем появления кнопки
        await page.waitForSelector('#popover-btn');
        const btn = await page.$('#popover-btn');

        // 1. Проверяем, что поповера изначально нет на странице
        let popover = await page.$('.popover');
        expect(popover).toBeNull();

        // 2. Кликаем по кнопке
        await btn.click();

        // 3. Ждем появления поповера в DOM
        await page.waitForSelector('.popover');

        // 4. Проверяем, правильный ли заголовок и текст внутри
        const title = await page.$eval('.popover-header', el => el.textContent);
        const content = await page.$eval('.popover-body', el => el.textContent);

        expect(title).toBe('Popover title');
        expect(content).toBe("And here's some amazing content. It's very engaging. Right?");

        // 5. Кликаем еще раз по кнопке, чтобы закрыть его
        await btn.click();

        // 6. Ждем, пока поповер исчезнет из DOM (hidden: true)
        await page.waitForSelector('.popover', { hidden: true });
    });
});