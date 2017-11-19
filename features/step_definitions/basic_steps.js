const {defineSupportCode} = require('cucumber');
const {expect} = require('chai');
const puppeteer = require('puppeteer');

defineSupportCode(({After, Before, Then, When}) => {
    Before({}, async() => {
        this.browser = await puppeteer.launch({
            // headless: false,
            // slowMo: 150
        });
        const pages = await this.browser.pages();
        this.page = pages[0]
    })
    After({}, async() => {
        this.browser.close()
    })
    When(/I navigate to (.*)$/, async(location) => {
        // this.page = await this.browser.newPage();
        return this.page.goto(location);
    })
    When(/I type \"(.*)\"/, async(message) => {
        await this.page.keyboard.type(message);
    })
    When(/I hit (.*)/, async(keyName) => {
        await this.page.keyboard.press(keyName)
    })
    Then(/the number (\d*) link should be for \"(.*)\"/, {timeout: 30 * 1000}, async(position, expectedTitle) => {
        const linkSelector = `div.srg > div.g:nth-child(${position}) h3 > a`
        await this.page.waitFor(linkSelector);
        const linkTitle = await this.page.$eval(linkSelector, elem => elem.innerText)
        expect(linkTitle).to.eql(expectedTitle)
    })
});