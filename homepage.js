/* globals gauge*/
"use strict";
const DomParser = require('dom-parser');
const {
    text,
    evaluate
} = require('taiko');
global.iframeIndex1 = 0;
const assert = require("assert");
const homePageTestData = require('../testData/homePage-testData.json');
var log4jsGen = require("../util/helper.js");

let HomePage = function () {
    this.isProjectDashboardExists = async () => {
        try {
            const isDashboardExists = await text(homePageTestData.projectTitle).exists();
            log4jsGen.getLogger().info("isDashboardExists ::"+isDashboardExists);
            return isDashboardExists;
            
        } catch (e) {
            log4jsGen.getLogger().error('Exception occurred: ' + e);
        }
    };

    
    this.isDelMetricHeaderExists = async () => {
        try {
            const isDeliveryMetricsExists = await text(homePageTestData['delivery Metrics']).exists();
            return isDeliveryMetricsExists;
        } catch (e) {
            log4jsGen.getLogger().error('Exception occurred: ' + e);
        }
    };
    this.isDelMetricsPanelsAvail = async () => {
        try {
            var delMetricsPanelCount = await evaluate(() => { let d = document.getElementsByClassName('panel'); return d.length });
            return delMetricsPanelCount;
        } catch (e) {
            logger.error('exception occurred: ' + e.log);
        }
    };

    this.isLast30DaysDisplayed = async () => {
        try {

            const isDeliveryMetricsExists = await text("Last 30 days").exists();
            return isDeliveryMetricsExists;
        } catch (e) {
            log4jsGen.getLogger().error('Exception occurred: ' + e);
        }
    };
 
    this.getIframeContent = async(iframeIndex) => {
        const iframeContent = await evaluate((element, index) => {
            const myIframe = document.getElementsByTagName("iframe")[index];
            const contentWinDoc = myIframe.contentWindow.document.body.outerHTML;
            return contentWinDoc;
        }, { args: iframeIndex });
        return iframeContent;
    };

    this.isYaxisHeaderMatchesWithTestData = async(iframeIndex,yaxisHeader) => {
        console.log("index:::"+iframeIndex+"yaxisHeader::"+yaxisHeader);
        let f = await evaluate((element, index) => {
            const myIframe = document.getElementsByTagName("iframe")[index];
            const leadTimeCusIFrame = myIframe.contentWindow.document.body.outerHTML;
            return leadTimeCusIFrame;
        }, { args: iframeIndex});
        console.log("Yaxis value:"+parseAndVerifyYaxisHeader(f));
        assert.strictEqual(parseAndVerifyYaxisHeader(f),yaxisHeader);

    };


    this.parseAndVerifyInfoIconExists= async(f) =>{
        var infoIconSize = 0;
        try {
            var doc = new DomParser().parseFromString(f, 'text/html');
            infoIconSize = doc.getElementsByClassName("panel-info-corner-inner").length;
            console.log("infoIconSize::" +infoIconSize);
        } catch (e) {
            log4jsGen.getLogger().error('Exception occurred: ' + e);
        }
        return infoIconSize;

    };


    this.parseAndVerifyCustomPanelHeader= async(f) =>{
        var headerText = "";
        try {

            var doc = new DomParser().parseFromString(f, 'text/html');
            headerText =  doc.getElementsByClassName("panel-title-text")[0].innerHTML;
        } catch (e) {
            log4jsGen.getLogger().error('Exception occurred: ' + e);
        }
        return headerText;
    };

    this.parseAndVerifyCustomPanelData= async(f) => {
        var panelDataSize = 0;
        try {
            var doc = new DomParser().parseFromString(f, 'text/html');
            panelDataSize= doc.getElementsByTagName("h5")[0].innerHTML.length;
            
        } catch (e) {
            log4jsGen.getLogger().error('Exception occurred: ' + e);
        }
        return panelDataSize;
    };

    this.parseAndVerifyYaxisHeader= async(f) => {
        var yaxisData = "";
        try {
            var doc = new DomParser().parseFromString(f, 'text/html');
            yaxisData = doc.getElementsByClassName("axisLabel left-yaxis-label flot-temp-elem")[0].innerHTML;
            
            
        } catch (e) {
            log4jsGen.getLogger().error('Exception occurred: parseAndVerifyYaxisHeader ' + e);
        }
        return yaxisData;
    }
    

};


module.exports = HomePage;