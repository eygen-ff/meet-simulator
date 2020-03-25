const fs = require('fs');
const TestHelper = require('./helpers/TestHelper.js');
const ScenarioParser = require('./helpers/ScenarioParser.js');

const scenarioFile = process.argv[2];

const TestRunner = async(scenario) => {
    const {page, browser} = await TestHelper.prepareTest(scenario);
    try {
        await ScenarioParser.execute(scenario, page);
        browser.close();

    } catch (e) {
        await TestHelper.errorHandler(page, scenario, e);
        browser.close();
    }
}


if (!fs.existsSync(__dirname + '/scenarios/' + scenarioFile)) {
    console.error('test scenario not found',  __dirname + '/scenarios/');
    fs.readdir( __dirname + '/scenarios/', function(err, items) {
        if (err) {
            console.error('Read dir error', err);
            process.exit(-1);
        } 
        console.log('Available scenarios', items);
    });
    //

} else {
    const scenario = require(__dirname + '/scenarios/' + scenarioFile);
    TestRunner(scenario);
}