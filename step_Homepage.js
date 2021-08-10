/* globals gauge*/
"use strict";
const path = require("path");
const { openBrowser, closeBrowser, goto, screenshot } = require("taiko");
const homePageTestData = require("../testData/homePage-testData.json");
const HomePage = require("../pageActions/homepage.js");
const assert = require("assert");
let homePageActions = new HomePage();
var log4jsGen = require("../util/helper.js");

step("Open application when Valid application URL hits", async () => {
  await goto(process.env.browserUrl, {
    navigationTimeout: 1800000,
  });
});

step("Homepage Must display", async () => {
      assert.strictEqual(
    await homePageActions.isProjectDashboardExists(),
    true,
    "Project Dashbord not Exists"
  );
});

step("And Delivery Metrics Panels available", async () => {
  assert.strictEqual(
    await homePageActions.isDelMetricsPanelsAvail(),
    homePageTestData["del Metrics Panels Count"],
    "Number of Delivery Metrics Panels expected not matched"
  );
});

step("And Delivery Metrics header display", async () => {
  assert.strictEqual(
    await homePageActions.isDelMetricHeaderExists(),
    true,
    "Delivery Metrics Header not Exists"
  );
});
step("Then Last 30 days must be displayed in date filter", async function () {
  assert.strictEqual(
    await homePageActions.isLast30DaysDisplayed(),
    true,
    "Last 30days not displayed"
  );
});

step("Then info icon available for <metrics>", async (metrics) => {
  var iframeIndex = homePageTestData[metrics].customPanel.iframeIndex;
   const frameContent = await homePageActions.getIframeContent(iframeIndex);
   assert.ok(
     await homePageActions.parseAndVerifyInfoIconExists(frameContent) > 0,
     "Info Icon with given Xpath is not Seen in the page"
   );
});
 step("And MetricHeader for <metrics> available", async (metrics) => {
  var iframeIndex = homePageTestData[metrics].customPanel.iframeIndex;
  var expectedMetricsTitle = homePageTestData[metrics].customPanel.title;
  const frameContent = await homePageActions.getIframeContent(iframeIndex);
  var actualMetricsHeader = await homePageActions.parseAndVerifyCustomPanelHeader(frameContent);
  assert.strictEqual(actualMetricsHeader, expectedMetricsTitle, metrics+" Header Title not Matches!");

});
step("And DisplayData for <metrics> available", async (metrics) => {

  var iframeIndex = homePageTestData[metrics].customPanel.iframeIndex;
  const frameContent = await homePageActions.getIframeContent(iframeIndex);
  console.log("displaydata :: "+await homePageActions.parseAndVerifyCustomPanelData(frameContent) );
  assert.ok(
    await homePageActions.parseAndVerifyCustomPanelData(frameContent) >= 0,
    "Custom Panel Data for "+metrics +"not available as expected"
  );

});

step("Then Yaxis info matches with TestData for <metrics>", async (metrics) => {
  var iframeIndex = homePageTestData[metrics].chartPanel.iframeIndex;
  const frameContent = await homePageActions.getIframeContent(iframeIndex);
  var expectedYaxisHeader = homePageTestData[metrics].chartPanel.yaxis;
  assert.strictEqual(
      await homePageActions.parseAndVerifyYaxisHeader(frameContent),
      expectedYaxisHeader,
      "Yaxis Header for "+metrics+" not matched");

});
