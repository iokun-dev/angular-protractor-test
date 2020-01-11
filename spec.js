const fs = require('fs');
var rawdata = fs.readFileSync('./cred.json');
const monitorSchema = require('./app/model/monitorSchema');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/local', { useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function () {
    console.log("Connection Successfull!");
});
describe('angular Protractor', function () {
    var userData = JSON.parse(rawdata);
    beforeEach(async function () {
        await browser.get('some url');
    });
    function saveLog(menu, subMenu, userId, isTestPassed, log, testDate) {
        //console.log('savelog');
        var saveData = {
            "_id": new mongoose.Types.ObjectId(),
            "menu": menu,
            "subMenu": subMenu,
            "userId": userId,
            "isTestPassed": isTestPassed,
            "log": log,
            "testDate": testDate
        };
        var monitor = mongoose.model('monitor', monitorSchema);
        var newmonitorModel = new monitor(saveData);
        //console.log('newmonitorModel');
        newmonitorModel.save(function (e) {
            if (e) {
                console.log(e);
            }
            else {
                console.log('log saved successfully!');
            }
        });
    }
    // Test case to verify login with correct credential and redirect to help page...
    it('login and redirect dashboard', async function () {
        try {
            var username = await element(by.model('username'));
            var password = await element(by.id('password'));
            await username.sendKeys(userData[0].username);
            await password.sendKeys(userData[0].password);
            var submitButton = await element(by.className('btn-block'));
            await submitButton.click();
            console.log('user logged in!');
            var liLink = element(by.binding('userSettings.userLoggedIn'));
            var aTag = element(by.linkText('Help'));
            //var helpTag = element(by.id('txtHelp')); 
            await liLink.click();
            await aTag.click();
            var allHelp = element.all(by.css('.help-list li'));
            console.log('help page clicked!');
            await allHelp.get(0).click();
            await allHelp.get(1).click();
            await allHelp.get(2).click();
            await allHelp.get(3).click();
            browser.sleep(5000);
            saveLog('Login', 'app Login', userData[0].username, true, "Test Passed", new Date());
        } catch (error) {
            saveLog('Login', 'app Login', userData[0].username, false, error, new Date());
        }
    });

    //Test case to click on dashboards widgets...
    it('dashboard widgets', async function () {

        var allTabs = element.all(by.repeater('layout in layouts'));
        console.log('dashboard loaded!');
        await allTabs.get(0).click();
        await allTabs.get(1).click();
        await allTabs.get(2).click();
        await allTabs.get(3).click();
        await allTabs.get(4).click();
        await allTabs.get(5).click();
        browser.sleep(5000);

    });

    //Test case to click on curriculum and its submenu...
    // it('should click on curriculum and its submenu', async function(){    
    //     var curriculumTab = await element.all(by.linkText('Curriculum'));
    //     await curriculumTab.click();
    //     console.log('curriculum tab clicked!');
    //     await curriculumTab.get(0).click();
    //     await curriculumTab.get(1).click();
    //     await curriculumTab.get(2).click();

    //     browser.sleep(5000);   

    // });

    //Test case to click on standards...
    //  it('should click on standards', async function(){    
    //     var standards = await element.all(by.linkText('Standards'));
    //     await standards.click();
    //     console.log('standards tab clicked!');
    //     browser.sleep(5000);   

    // });

    //Test case to click on create Item sub-menu
    it('create items menu click', async function () {
        var liItem = element(by.partialLinkText('Items'));
        var liSearchItem = element(by.id('itemSearch'));
        var licreateItem = element(by.id('createItem'));
        var licreateRubric = element(by.id('createRubric'));
        var liSearchRubric = element(by.id('searchRubric'));
        var liCreateResource = element(by.id('createResource'));
        var liSearchResource = element(by.id('searchResource'));

        await liItem.click();
        console.log('Item dropdown clicked!')
        await liSearchItem.click();
        console.log('Item search clicked!')
        browser.sleep(3000);
        await liItem.click();
        await licreateItem.click();
        console.log('Create item clicked!')
        browser.sleep(3000);
        await liItem.click();
        await licreateItem.click();
        console.log('Create item clicked!')
        browser.sleep(3000);
        await liItem.click();
        await licreateRubric.click();
        console.log('Create Rubric clicked!')
        browser.sleep(3000);
        await liItem.click();
        await liSearchRubric.click();
        console.log('Search Rubric clicked!')
        browser.sleep(3000);
        await liItem.click();
        await liCreateResource.click();
        console.log('Create Resource clicked!')
        browser.sleep(3000);
        await liItem.click();
        await liSearchResource.click();
        console.log('Search Resource clicked!')
        //    expect(await element(by.className('box-item-name')).getText('Multiple Choice'));
        browser.sleep(5000);
    });

    //Test case to click on assessements menu
    it('assessments menu click', async function () {
        var assessement = element(by.id('assessments'));
        var searchAsses = element(by.id('searchAsses'));
        var createAsses = element(by.id('createAsses'));
        var testManager = element(by.id('testManager'));
        var programs = element(by.id('programs'));

        await assessement.click();
        console.log('Assessment dropdown clicked!')
        browser.sleep(3000);
        await searchAsses.click();
        console.log('Search Assessment clicked!')
        browser.sleep(3000);
        await assessement.click();
        browser.sleep(3000);
        await createAsses.click();
        console.log('Create Assessment clicked!')
        browser.sleep(3000);
        await assessement.click();
        browser.sleep(3000);
        await testManager.click();
        console.log('Test Mmanager clicked!')
        browser.sleep(3000);
        await assessement.click();
        browser.sleep(3000);
        await programs.click();
        console.log('Programs clicked!')
        browser.sleep(3000);
    });

    //Test case to click on reports menu
    it('should click on reports and submenu', async function () {
        var reportsMenu = element(by.id('reportsMenu'));
        var analytics = element(by.id('analytics'));
        var reports = element(by.id('reports'));
        var extracts = element(by.id('extracts'));

        await reportsMenu.click();
        console.log('Reports menu clicked!')
        await analytics.click();
        console.log('Analytics clicked!')
        browser.sleep(3000);
        await reportsMenu.click();
        await reports.click();
        console.log('Reports clicked!')
        browser.sleep(3000);
        await reportsMenu.click();
        await extracts.click();
        console.log('Extracts clicked!')
        browser.sleep(5000);
    });

    //Test case to click on settings menu
    it('should click on settings and submenu', async function () {
        var settingsMenu = element(by.linkText('Settings'));
        var accMgmt = element(by.linkText('Account Management'));
        var permissions = element(by.linkText('Permissions'));
        var branding = element(by.linkText('Branding'));

        await settingsMenu.click();
        console.log('Settings menu clicked!')
        await accMgmt.click();
        console.log('Account Management clicked!')
        browser.sleep(3000);
        await settingsMenu.click();
        await permissions.click();
        console.log('Permissions clicked!')
        browser.sleep(3000);
        await settingsMenu.click();
        await branding.click();
        console.log('Branding clicked!')
        browser.sleep(5000);
    });

    //Test case to click on more menu
    it('should click on more and submenu', async function () {
        var moreMenu = element(by.linkText('More'));
        var classes = element(by.linkText('Classes'));
        var courseCatalog = element(by.linkText('Course Catalog'));
        var schools = element(by.linkText('Schools'));
        var staff = element(by.linkText('Staff'));
        var students = element(by.linkText('Students'));
        var grp = element(by.linkText('Groups'));
        var announce = element(by.linkText('Announcements'));
        var log = element(by.linkText('Logging'));

        await moreMenu.click();
        console.log('More menu clicked!')
        await classes.click();
        console.log('Classes clicked!')
        browser.sleep(3000);
        await moreMenu.click();
        await courseCatalog.click();
        console.log('Course catalog clicked!')
        browser.sleep(3000);
        await moreMenu.click();
        await schools.click();
        console.log('Schools clicked!')
        browser.sleep(3000)
        await moreMenu.click();
        await staff.click();
        console.log('Staff clicked!')
        browser.sleep(3000);
        await moreMenu.click();
        await students.click();
        console.log('Students clicked!')
        browser.sleep(3000);
        await moreMenu.click();
        await grp.click();
        console.log('Groups clicked!')
        browser.sleep(3000);
        await moreMenu.click();
        await announce.click();
        console.log('Announcements clicked!')
        browser.sleep(3000);
        await moreMenu.click();
        await log.click();
        console.log('Logging clicked!')
        browser.sleep(5000);
    });

    //Test case to click on user menu
    it('should click on usermenu and submenu', async function () {
        var userMenu = element(by.id('user'));
        var help = element(by.id('help'));
        var imprsnte = element(by.id('imprsnte'));
        var preference = element(by.id('preference'));

        await userMenu.click();
        console.log('User menu clicked!')
        await help.click();
        console.log('Help link clicked!')
        browser.sleep(3000);
        await userMenu.click();
        await imprsnte.click();
        console.log('Impersonate user clicked!')
        browser.sleep(3000);
        await userMenu.click();
        await preference.click();
        console.log('Preferences clicked!')
        browser.sleep(5000);
    });
});