(function() {

    var MainController = ['$scope', function($scope) {

        $scope.filter = function(e) {
            if (e.which !== 13) return;

            $scope.component = execCommand($scope.input);
        };

    }];

    angular.module('app', []).controller('MainController', MainController);

})();

/**
 * [execCommand check if command is a valid component description then execute it]
 * @param  {string} input
 * @return {object} component [matching the pattern]
 */
function execCommand(input) {
    if (!input) return null;

    // extract environment and collection name
    input = input.split(":");

    var environment = getEnvironment(input[0]);
    if (environment === null) return null;

    var collection = input[1];
    if (!collection) return null;

    return getComponent(collection, environment);
}

/**
 * [getEnvironment map human/short version to real version]
 * @param  {string} letter
 * @return {string} environment
 */
function getEnvironment(letter) {
    switch (letter.toLowerCase()) {
        case "dev":
            return "Development";
        case "uat":
            return "UAT";
        case "prod":
            return "Production";
        case "a":
            return "All"; // TODO: All
        default:
            return null;
    }
}

/**
 * [getComponent find component then attach links to it]
 * @param  {string} collection
 * @param {string} environment
 * @return {object} component
 */
function getComponent(collection, environment) {

    var component = components.find(function(c) {
        return c.collection === collection;
    });

    if (!component) return null;

    var BASE = config.BASE + "/" + config[environment];

    // attach link to business logics name
    component.business_logics = component.business_logics.map(function(bl) {

        // store name
        var name = (typeof bl === 'string') ? bl : bl.name;

        // attach link to bl
        bl = {};
        bl.url = BASE + "/business-logic/collections/" + component.collection + "/" + name + "/editor";
        bl.name = name;

        return bl;
    });

    // attach link to collection name
    component.url = BASE + "/data/collection/" + component.collection;
    component.name = component.collection;

    return component;
}


/**
 * TODO : duplicate li
 * TODO : all components
 * TODO : background
 * TODO : styling
 */
