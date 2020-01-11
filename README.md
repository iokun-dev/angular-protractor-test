# angular-protractor-test

## Setup

1. Download or clone repository
2. Run npm install to install dependencies

3. Use npm to install Protractor globally with:
> **npm install -g protractor**

This will install two command line tools, protractor and webdriver-manager. Try running protractor --version to make sure it's working.

The webdriver-manager is a helper tool to easily get an instance of a Selenium Server running. Use it to download the necessary binaries with:

> **webdriver-manager update**

4. Now start up a server with:
> **webdriver-manager start**

This will start up a Selenium Server and will output a bunch of info logs. Your Protractor test will send requests to this server to control a local browser. You can see information about the status of the server at http://localhost:4444/wd/hub.

## Run the test

5. Now run the test with:
> **protractor conf.js**

You should see a Chrome browser window open up and navigate to the todo list in the AngularJS page, then close itself (this should be very fast!). There will be test output.
Congratulations, you've run your test.

> Note: JDK is needed in the system to run selenium webdriver