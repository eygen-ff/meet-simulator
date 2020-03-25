'use strict';

class ScenarioParamVo {

    /**
     * 
     * @param {number} index 
     * @param {*} scenario 
     * @param {*} page 
     */
    constructor(index, scenario, page) {
        this.index = index;
        this.scenario = scenario;
        this.page = page;
    }

}

module.exports = {ScenarioParamVo};
