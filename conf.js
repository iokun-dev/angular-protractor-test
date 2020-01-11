"use strict";
let SpecReporter = require('jasmine-spec-reporter').SpecReporter;

exports.config = {
    framework: 'jasmine',
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: ['spec.js', 'items.js', 'assessments.js'],
    // specs: ['assessments.js'],
    capabilities: {
      'browserName': 'chrome'     
    },
    // directConnect: true,
    getPageTimeout: 200000,
    allScriptsTimeout: 200000,
    jasmineNodeOpts: {
      showColors: true,
      silent: true,
      defaultTimeoutInterval: 999999,
      print: function () {
      }
    },
    SELENIUM_PROMISE_MANAGER: false,
    logLevel: 'WARN', 
    onPrepare: function () {
      browser.driver.manage().window().maximize();
      jasmine.getEnv().clearReporters(); 
      jasmine.getEnv().addReporter(new SpecReporter({
        displayFailuresSummary: true,
        displayFailuredSpec: true,
        displaySuiteNumber: true,
        displaySpecDuration: true,
        spec: {
          displayStacktrace: true,
          displayPending: true,
        },
        summary: {
          displayDuration: true
        }
      }));
    }
  }