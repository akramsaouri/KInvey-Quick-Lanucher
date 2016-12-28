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
 * [getEnvironment map human/short version to kid version]
 * @param  {string} name
 * @return {string} environment
 */
function getEnvironment(name) {
    var environments = {
        dev: "kid_Zk-fAAEhwg",
        uat: "kid_Hy7Pxmhs",
        prod: "kid_Z1EUc88ual"
    };

    name = name.toLowerCase();

    if (name === 'all') console.log('here all'); // TODO: all

    return environments[name] || null;
}

/**
 * [getComponent find component then attach links to it]
 * @param  {string} collection
 * @param {string} environment
 * @return {object} component
 */
function getComponent(collection, environment) {
    collection = collection.toLowerCase();

    var component = components.find(function(c) {
        return c.collection === collection;
    });

    if (!component) return null;

    var URL = BASE_URL + "/" + environment;

    // attach link to business logics name
    component.business_logics = component.business_logics.map(function(bl) {

        // store name
        var name = (typeof bl === 'string') ? bl : bl.name;

        // attach link to bl
        bl = {};
        bl.url = URL + "/business-logic/collections/" + component.collection + "/" + name + "/editor";
        bl.name = name;

        return bl;
    });

    // attach link to collection name
    component.url = URL + "/data/collection/" + component.collection;
    component.name = component.collection;

    return component;
}


/**
 * TODO : all components
 */

var BASE_URL = "https://se-console.kinvey.com/environments";

var components = [{
    "collection": "profiles",
    "business_logics": ["onPostFetch"]
}, {
    "collection": "countries",
    "business_logics": []
}, {
    "collection": "retailors",
    "business_logics": ["onPreFetch"]
}, {
    "collection": "publicPrices",
    "business_logics": ["onPreFetch"]
}, {
    "collection": "phoneNumbers",
    "business_logics": []
}, {
    "collection": "orderChanges",
    "business_logics": ["onPreFetch"]
}];
