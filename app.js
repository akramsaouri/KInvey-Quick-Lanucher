(function() {
    angular.module('app', []);
})();

(function() {

    var MainController = ['$scope', function($scope) {

        $scope.filter = function(e) {
            if (e.which !== 13) return;
            $scope.components = execCommand($scope.input);
        };

    }];

    angular.module('app').controller('MainController', MainController);

})();


/**
 * [execCommand check if command is a valid component description then execute it]
 * @param  {string} input
 * @return {array} components [matching the pattern]
 */
function execCommand(input) {
    if (!input) return null;
    input = input.split(":");
    var environment = getEnvironment(input[0]);
    if (environment === null) return null;
    var components = getComponents(input[1]);
    if (components.length === 0) return null;
    return components.map(function(c) {
        c.business_logic = c.business_logic.map(function(b) {
            var name = b;
            b = {};
            b.url = config.BASE + "/" + config[environment] + "/business-logic/collections/" + c.collection + "/" + name + "/editor";
            b.name = name;
            return b;

        });
        c.url = config.BASE + "/" + config[environment] + "/data/collection/" + c.collection;
        c.name = c.collection;
        return c;
    });
}

/**
 * [getEnvironment map environment to short version]
 * @param  {string} char
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
 * [getComponents get components from global variable]
 * @param  {string} collection
 * @return {object} component
 */
function getComponents(collection) {
    var matches = components.map(function(c) {
            return (c.collection.indexOf(collection) > -1) ? c : null;
        })
        .filter(function(c) {
            return c !== null;
        });
    return matches;
}
