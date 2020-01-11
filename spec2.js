const fs = require('fs');
var rawdata = fs.readFileSync('./cred.json');
const monitorSchema = require('./app/model/monitorSchema');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/local');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
 
db.once('open', function() {
  console.log("Connection Successful!");
});
describe('angular spec2', function() {
    var userData = JSON.parse(rawdata);
    beforeEach(async function() {
        await browser.get('your url');          
    });
    function saveLog(menu,subMenu,userId,isTestPassed,log,testDate) {
         var saveData = {
            "menu": menu,
            "subMenu" : subMenu,
            "userId": userId,
            "isTestPassed": isTestPassed,
            "log": log,
            "testDate": testDate	
        };
        var monitor = mongooseConnections['local'].model('monitor', monitorSchema);
        var newmonitorModel = new monitor(saveData);
        newmonitorModel.save(function (e) {
            if (e) {
               console.log('error in saving log');
            }
            else {
                console.log('log saved successfully!');
            }
        });
    }
    //Test case to login!
    it("should login", async function() {
    var username = await element(by.model('username'));
    var password = await element(by.id('password'));
    await username.sendKeys(userData[0].username);
    await password.sendKeys(userData[0].password);
    var submitButton = await element(by.className('btn-block'));
    await submitButton.click();  
    console.log('user logged in!');
    await browser.driver.sleep(5000);
    });  
    
    //Test case to create assessment!
    xit("should create assessment", async function() {
        await element(by.linkText('Assessments')).click();
        await browser.driver.sleep(2000);     
        await element(by.linkText('Create')).click();
        await browser.driver.sleep(2000);
        var assessDesc = element(by.model('createAssessmentsModel.description'));
        await assessDesc.sendKeys("Test");
        await browser.driver.sleep(2000);
        await element(by.css('[ng-if="contentBanksInput != null"]')).click();
        await browser.driver.sleep(2000);
        //await element(by.css("div[id*=_easyui_combobox_i3_1]")).click();
        var contentBnk = element.all(by.css("div[id^=_easyui_combobox_i3_]"));
        await contentBnk.get(1).click();
        await browser.driver.sleep(2000);
        var type = element.all(by.css("div[id^=_easyui_combobox_i6_]"));
        await type.get(3).click();
        await browser.driver.sleep(2000);
        var type = element.all(by.css("div[id^=_easyui_combobox_i4_]"));
        await type.get(3).click();
        await browser.driver.sleep(2000);
        await element(by.id('contentAreaInput')).click();
        var contentAr = element.all(by.css("ul.select2-results__options"));
        await contentAr.get(7).click();
        await browser.driver.sleep(2000);
        var contType = element.all(by.css("div[id^=_easyui_combobox_i3_]"));
        await contType.get(0).click();
        await browser.driver.sleep(2000);
        await element.all(by.css("[ng-click*=uploadResourceData]")).click;
        console.log('Assessment created');
        await browser.driver.sleep(5000);
    });

    //Test case to search assessment!
    xit("should search assessment", async function() {
        await element(by.linkText('Assessments')).click();
        await browser.driver.sleep(2000);
        await element(by.css('[href="#/assessments/search"]')).click();     
        await browser.driver.sleep(2000);
        await element(by.css('[ng-click*=searchAssessments]')).click();
        console.log('Assessment searched');
        await browser.driver.sleep(5000);
    });

    //Test case to edit assessment!
    xit("should edit assessment", async function() {
        await element(by.linkText('Assessments')).click();
        await browser.driver.sleep(2000);
        await element(by.css('[href="#/assessments/search"]')).click();     
        await browser.driver.sleep(2000);
        await element(by.css('[ng-click*=searchAssessments]')).click();
        console.log('Assessment searched');
        var allAsses = element.all(by.repeater('(rowRenderIndex, row) in rowContainer.renderedRows track by $index'));
        await allAsses.get(0).click();
        await browser.driver.sleep(2000);
        await element(by.css('[ng-click*=switchOnReviewMode]')).click();
        await browser.driver.sleep(2000);
        await element(by.css('[ng-click*=openAddItemModal]')).click();
        await browser.driver.sleep(3000);
        await element(by.css('[ng-click=searchItems(1)]')).click();
        await browser.driver.sleep(3000);
        var itemSrchQues = element.all(by.repeater('currQuestionObj in ItemSearchResult.questions')).row(1);
        await itemSrchQues.element(by.css('button[ng-click="addItemtoAssessment(currQuestionObj,currQuestionObj.standards)"')).click();
        await browser.driver.sleep(3000);
        await element(by.css('[ng-click*=ReloadAssessment]')).click();
        await browser.driver.sleep(2000);
        await element(by.css('[ng-click*=saveAssessment]')).click();
        console.log('Assessment searched');
        await browser.driver.sleep(5000);
    });

    //Test case to show blueprint!
    xit("should show blueprint", async function() {
        await element(by.linkText('Assessments')).click();
        await browser.driver.sleep(2000);
        await element(by.css('[href="#/assessments/search"]')).click();     
        await browser.driver.sleep(2000);
        await element(by.css('[ng-click*=searchAssessments]')).click();
        console.log('Assessment searched');
        var allAsses = element.all(by.repeater('(rowRenderIndex, row) in rowContainer.renderedRows track by $index'));
        await allAsses.get(0).click();
        await browser.driver.sleep(2000);
        await element(by.css("[ng-click=logReportMessage('Accessed Assessments -> Content subtab')]")).click();
        await browser.driver.sleep(2000);
        await element(by.css('[ng-click=printBlueprint(assessment.testId)]')).click();
        await browser.driver.sleep(2000);
        // await element(by.css('[ng-click=std.collapse = !std.collapse]')).click();
        // await browser.driver.sleep(2000);
        var stds = element.all(by.repeater("std in assessment.standards")).row(0);
        await stds.click();
        await browser.driver.sleep(2000);
        var allItem = element.all(by.repeater("currQuestionObj in std.items.questions | orderBy:'itemNo'"));
        await allItem.get(0).click();
        await browser.driver.sleep(5000);
    });

    //Test case to edit settings!
    xit("should edit settings", async function() {
        await element(by.linkText('Assessments')).click();
        await browser.driver.sleep(2000);
        await element(by.css('[href="#/assessments/search"]')).click();     
        await browser.driver.sleep(2000);
        await element(by.css('[ng-click*=searchAssessments]')).click();
        console.log('Assessment searched');
        var allAsses = element.all(by.repeater('(rowRenderIndex, row) in rowContainer.renderedRows track by $index'));
        await allAsses.get(0).click();
        await browser.driver.sleep(2000);
        await element(by.css("[ng-click=logReportMessage('Accessed Assessments -> Settings subtab')]")).click();
        await browser.driver.sleep(2000);
        await element(by.id('calc-scientific')).click();
        await browser.driver.sleep(2000);
        await element(by.id('tool-ruler')).click();
        await browser.driver.sleep(2000);
        await element(by.css('[ng-click*=saveAssessment]')).click();
        console.log('Settings edited');
        await browser.driver.sleep(5000);
    });

    //Test case to edit publish!
    xit("should edit publish", async function() {
        await element(by.linkText('Assessments')).click();
        await browser.driver.sleep(2000);
        await element(by.css('[href="#/assessments/search"]')).click();     
        await browser.driver.sleep(2000);
        await element(by.css('[ng-click*=searchAssessments]')).click();
        console.log('Assessment searched');
        var allAsses = element.all(by.repeater('(rowRenderIndex, row) in rowContainer.renderedRows track by $index'));
        await allAsses.get(0).click();
        await browser.driver.sleep(2000);
        await element(by.css("[ng-click=logReportMessage('Accessed Assessments -> Publish subtab'))]")).click();
        await browser.driver.sleep(2000);
        await element(by.id('MyStudentsGroupOnlyInput')).click();
        await browser.driver.sleep(2000);
        await element(by.id('AdminWindowOpen')).click();
        await browser.driver.sleep(2000);
        await element(by.css('[ng-click*=saveAssessment]')).click();
        console.log('Publish edited');
        await browser.driver.sleep(5000);
    });

    //Test case for administer tab!
    xit("should administer", async function() {
        await element(by.linkText('Assessments')).click();
        await browser.driver.sleep(2000);
        await element(by.css('[href="#/assessments/search"]')).click();     
        await browser.driver.sleep(2000);
        await element(by.css('[ng-click*=searchAssessments]')).click();
        console.log('Assessment searched');
        var allAsses = element.all(by.repeater('(rowRenderIndex, row) in rowContainer.renderedRows track by $index'));
        await allAsses.get(0).click();
        await browser.driver.sleep(2000);
        await element(by.css("[ng-click=logReportMessage('Accessed Assessments -> Administer subtab')]")).click();
        await browser.driver.sleep(2000);
        console.log('Publish edited');
        await browser.driver.sleep(5000);
    });

    //Test case for test manager!
    xit("should manager tests", async function() {
        await element(by.linkText('Assessments')).click();
        await browser.driver.sleep(2000);
        await element(by.css('[href="#/assessments/testmanager"]')).click();     
        await browser.driver.sleep(2000);
        await element(by.id('targetedContentBankInput')).click();
        await browser.driver.sleep(2000);
        var testSrch = element(by.model('searchTargeted.text'));
        await testSrch.sendKeys('Mathematics');
        await browser.driver.sleep(2000);
        console.log('Test managed');
        await browser.driver.sleep(5000);
    });

    //Test case for programs data entry!
    xit("should select data entry in programs", async function() {
        await element(by.linkText('Assessments')).click();
        await browser.driver.sleep(2000);
        await element(by.css('[href="#/assessments/assessments-programs/programs-data-entry"]')).click();     
        await browser.driver.sleep(2000);
        await element(by.id('select2-programsProgramFilter-container')).click();
        await browser.driver.sleep(2000);
        var progFilter = element.all(by.id('select2-programsProgramFilter-results'));
        await progFilter.get(1).click();
        await browser.driver.sleep(2000);
        await element(by.id('select2-programsLevelFilter-container')).click();
        await browser.driver.sleep(2000);
        var levlFilter = element.all(by.id('select2-programsLevelFilter-results'));
        await levlFilter.get(0).click();
        await browser.driver.sleep(2000);
        var schoolFilter = element.all(by.id('select2-programsLevelFilter-results'));
        await schoolFilter.get(0).click();
        await browser.driver.sleep(2000);
        var schoolFilter = element.all(by.id('select2-programsTeacherFilter-container'));
        await schoolFilter.get(0).click();
        await browser.driver.sleep(2000);
        console.log('Data entry seen');
        await browser.driver.sleep(5000);
    });

    //Test case for programs summary!
    xit("should select summary in programs", async function() {
        await element(by.linkText('Assessments')).click();
        await browser.driver.sleep(2000);
        await element(by.css('[href="#/assessments/assessments-programs/programs-summary"]')).click();     
        await browser.driver.sleep(2000);
        await element(by.id('select2-summaryProgramsFilter-container')).click();
        await browser.driver.sleep(2000);
        var progFilter = element.all(by.id('select2-summaryProgramsFilter-results'));
        await progFilter.get(0).click();
        await browser.driver.sleep(2000);
        await element(by.id('select2-summaryProgramsLevelFilter-container')).click();
        await browser.driver.sleep(2000);
        var levlFilter = element.all(by.id('select2-summaryProgramsLevelFilter-results'));
        await levlFilter.get(0).click();
        console.log('Programs summary selected');
        await browser.driver.sleep(5000);
    });
});