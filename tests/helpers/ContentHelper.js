'use strict';

const chalk = require('chalk');

class ContentHelper {

    /**
     *
     * @param box Array
     * @param point {{x:number, y:number}}
     */
    isPointInsideBox(box, point) {
        const topLeft = box[0];
        const topRight = box[1];
        const bottomLeft = box[3];
        const bottomRight = box[2];
        const isTopLeftOk = (point.x >= topLeft.x && point.y >= topLeft.y);
        const isTopRightOk = (point.x <= topRight.x && point.y >= topRight.y);
        const isBottomLeftOk = (point.x >= bottomLeft.x && point.y <= bottomLeft.y);
        const isBottomRightOk = (point.x <= bottomRight.x && point.y <= bottomRight.y);
        const isOk = isTopLeftOk && isTopRightOk && isBottomLeftOk && isBottomRightOk;
        if (!isOk) {
            console.debug(chalk.red(' isPointInsideBox wrong position: '), isTopLeftOk, isTopRightOk, isBottomLeftOk, isBottomRightOk);
        }
        return isOk;
    }

    /**
     * @param page {Page}
     * @param locator {{ path: string, expected_form: {check:boolean, position:{x:number, y:number}, width:number, height:number } }}
     * @returns {Promise}
     */
    async checkElement(page, locator) {
        console.debug(' checkElement', chalk.grey(locator.path));
        const element = await page.$(locator.path);
        if (element === null) {
            throw Error('Не найден локатор: ' + locator.path);
        }
        if (locator.expected_form) {
            const boxModel = await element.boxModel();
            if (boxModel === null) {
                throw Error('Элемент скрыт: ' + locator.path);
            }
            if (!this.isPointInsideBox(boxModel.content, locator.expected_form.position)) {
                console.debug(' boxModel', boxModel.content);
                throw Error('Неожиданная позиция элемента: ' + locator.path);
            }
            if (boxModel.width !== locator.expected_form.width || boxModel.height !== locator.expected_form.height) {
                console.debug(' boxModel', boxModel.width, boxModel.height);
                throw Error('Неожиданный размер элемента: ' + locator.path);
            }
            console.log(chalk.yellow(' checkElement.expected_form correct:'), locator.path);
        }
        return element;
    }

    /**
     * поиск и клик по элементу
     * @param page {Page}
     * @param locator {{ path: string, max_wait:?int, visible:?boolean, hidden:?boolean, expected_form: ?{check:boolean, position:{x:number, y:number}, width:number, height:number } }}
     * @returns {Promise}
     */
    async findElementAndClick(page, locator) {
        const waitTime = locator.max_wait ? (locator.max_wait * 1000) : 10000;
        let props = {
            timeout: waitTime
        };
        if (typeof locator.visible !== 'undefined') {
            props.visible = locator.visible;
        }
        if (typeof locator.hidden !== 'undefined') {
            props.hidden = locator.hidden;
        }
        await page.waitForSelector(locator.path, props);
        await this.checkElement(page, locator);
        console.debug(chalk.yellow('  click to element: '), locator.path, ' >>> OK');
        await page.click(locator.path);
        return true;
    }

    /**
     * поиск и ввод текста
     * @param page {Page}
     * @param locator {{
     *  path: string,
     *  expected_form: {
     *      check:boolean,
     *      position:{x:number, y:number},
     *      width:number,
     *      height:number
     *  },
     *  wait_after_type: number,
     *  max_wait: number
     * }}
     * @param text {string}
     * @param emulateInput {boolean}
     * @returns {Promise<*>}
     */
    async findElementAndType(page, locator, text, emulateInput = false) {
        const waitTime = locator.max_wait ? (locator.max_wait * 1000) : 10000;
        let props = {
            timeout: waitTime
        };
        await page.waitForSelector(locator.path, props);
        const element = await this.checkElement(page, locator);
        console.log('    :type >> ', text);
        if (emulateInput) {
            await element.type(text, {delay: 100});
        } else {
            await element.type(text);
        }
        if (locator.wait_after_type) {
            await page.waitFor(locator.wait_after_type);
        }
        return element;
    }

    /**
     * видимость элемента
     * @param page
     * @param locator
     * @returns {Promise<boolean>}
     */
    async isElementVisible(page, locator) {
        const waitTime = locator.max_wait ? (locator.max_wait * 1000) : 10000;
        let props = {
            timeout: waitTime
        };
        await page.waitForSelector(locator.path, props);
        const element = await page.$(locator.path);
        if (element === null) {
            return false;
        }
        const boxModel = await element.boxModel();
        if (boxModel === null) {
            return false;
        }
        return true;
    }

    /**
     * проверка существования элемента
     * @param page
     * @param locator
     * @returns {Promise<boolean>}
     */
    async isElementExist(page, locator) {
        const element = await page.$(locator.path);
        if (element === null) {
            return false;
        }
        return false;
    }
}

module.exports = new ContentHelper;
