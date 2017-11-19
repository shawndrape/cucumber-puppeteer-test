const {defineSupportCode} = require('cucumber');
const puppeteer = require('puppeteer');

defineSupportCode(({Before, Then, When}) => {
    Before({}, async() => {
        this.browser = await puppeteer.launch({
            // headless: false,
            // slowMo: 150
        });
    })
    When(/I navigate to (.*)$/, async(location) => {
        this.page = await this.browser.newPage();
        return this.page.goto(location);
    })
    When(/I type \"(.*)\"/, async(message) => {
        await this.page.keyboard.type(message);
    })
    When(/I hit (.*)/, async(keyName) => {
        await this.page.keyboard.press(keyName)
    })
    Then(/I should see text \"(.*)\"/, async(text) => {
        await this.page.waitForNavigation({
            waitUnitl: 'load'
        });
        const title = await this.page.title();
        console.assert(title == 'Random String - Google Search')
    })
    Then(/the number (\d*) link should be for \"(.*)\"/, async(position, expectedTitle) => {
        await this.page.waitForNavigation({
            waitUnitl: 'load'
        });
        const linkSelector = `div.srg > div.g:nth-child(${position}) h3 > a`
        const linkTitle = await this.page.$eval(linkSelector, elem => elem.innerText)
        console.assert(linkTitle == expectedTitle)
    })
});