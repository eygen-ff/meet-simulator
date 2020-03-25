'use strict';

const fs = require('fs');
const puppeteer = require('puppeteer');
const chalk = require('chalk');
const dtString = (new Date()).toISOString().replace(/:/g, '');

class TestHelper {
    /**
     *
     * @param scenario {{
     *  locators: String,
     *  screenShotPath: String
     * }}
     * @returns {Promise<{browser: *, page: *}>}
     */
    async prepareTest(scenario) {
        const locators = require( __dirname + '/../' + scenario.locators);
        const viewport = {
            width: locators.SCREEN_SIZE.w,
            height: locators.SCREEN_SIZE.h
        };
        const browser = await puppeteer.launch({
            args: [
                '--disable-extensions',
                `--window-size=${viewport.width},${viewport.height}`
            ],
            defaultViewport: viewport,
            headless: locators.BROWSER.headless ? locators.BROWSER.headless : false
        });
        //await browser.waitForTarget(() => false);
        const page = await browser.newPage();
        page.on('pageerror', async(error) => {
            console.log(chalk.red('pageerror >>>'), error);
            await page.screenshot({path: __dirname + '/../' + scenario.screenshots.path + '/' + scenario.screenshots.prefix + 'error_' + dtString + '.png'});
        });
        //page.on('domcontentloaded', (p) => {
            //console.debug('page domcontentloaded');
        //});
        page.on('console', async msg => {
            if (scenario.ignoreConsoleMessages.types.includes(msg.type())) {
                return;
            }
            const msgString = msg.type() + ' @ ' + msg.text() + ' [' + msg.location().url + ']';
            for (let i in scenario.ignoreConsoleMessages.mask) {
                if (msgString.indexOf(scenario.ignoreConsoleMessages.mask[i]) > -1) {
                    return;
                }
            }
            console.debug(chalk.gray('console message >>>'), msgString);
            await this.screenThis(page, scenario, 'console_error');
            await browser.close();
            throw Error('Get unexpected console message');
        });
        page.on('requestfailed', request => {
            console.log(chalk.red('request failed >>>'), request.url() + ' ' + request.failure().errorText);
        });
        //page.on('request', request => {
            //console.log(chalk.yellow('page request >>>'), request.url());
        //});
        page.on('framenavigated', frame => {
            console.debug('frame navigate >> ', frame.url());
        });
        console.debug('Remove old screenshots');
        fs.readdirSync(__dirname + '/../' + scenario.screenshots.path)
            .filter(f => /\.png$/.test(f))
            .map(f => fs.unlinkSync(__dirname + '/../' + scenario.screenshots.path + '/' + f));
        return {page, browser};
    }

    /**
     * @param page
     * @param scenario
     * @param prefix
     * @returns {Promise<void>}
     */
    async screenThis(page, scenario, prefix = 'screenshot') {
        const path = __dirname + '/../' + scenario.screenshots.path + '/' + dtString + '_' + prefix + '.png';
        await page.screenshot({path: path, fullPage: true});
        console.debug('screen captured to', path);
    }

    async errorHandler(page, testParams, exception) {
        console.error(chalk.red('Error >>'), exception);
        if (page) {
            await this.screenThis(page, testParams, 'error');
        }
    }
}

module.exports = new TestHelper;
