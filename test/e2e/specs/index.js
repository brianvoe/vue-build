module.exports = {
  'Example vue': function (browser) {
    browser
      .url(browser.launchUrl)
      .waitForElementVisible('body', 1000)
      .assert.containsText('#app', 'ue-Build')
      .end()
  }
}
