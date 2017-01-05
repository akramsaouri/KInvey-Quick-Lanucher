var config;

(function() {
    var url = 'https://gist.githubusercontent.com/akramsaouri/f947115549a0b041b94fe407b5b4f273/raw/d172b61dce928476e38cc48526608d25451d7731/kql.json';
    var MainController = ['$scope', '$http', function($scope, $http) {

        (function() {
            // NOTE
            // $scope.input = "dev:profiles"
            // fetch kql config
            $http.get(url)
                .then(function(res) {
                    config = res.data;
                })
                .catch(function(err) {
                    console.log(err);
                    return alert("error while fetching kql file")
                })
        })();

        $scope.filter = function(e) {
            if (e.which !== 13) return;
            if (config === undefined || config === null) return;
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
    if (!input) return;

    input = input.split(":");

    var environment = getEnvironment(input[0]);
    if (environment === null) return;

    var component = getComponent(input[1]);
    if (component === null) return;

    var links = buildLinks(environment, component);
    console.log(links);

    if (links === null) return;
    return links
}

function getEnvironment(environment) {
    try {
        return config.environments.find(e => e.name === environment).kid
    } catch (e) {
        return null;
    }
}

function getComponent(component) {
    var exists = config.collections.find(k => k.name === component)
    if (exists) return {
        type: "collection",
        component: exists
    }
    exists = config.endpoints.find(k => k === component)
    if (exists) return {
        type: "endpoint",
        component: exists
    }
    exists = config.commons.find(k => k === component)
    if (exists) return {
        type: "common",
        component: exists
    }
    return null;
}

function buildLinks(environment, component) {
    var url = config.url + "/" + environment;
    var type = component.type;
    component = component.component;
    switch (type) {
        case 'collection':
            return {
                name: component.name,
                url: url + "/data/collection/" + component.name,
                bls: component.bls.map(function(k) {
                    return {
                        name: k,
                        url: url + "/business-logic/collections/" + component.name + "/" + k + "/editor"
                    }
                })
            }
        case 'endpoint':
            return {
                name: component,
                url: url + "/business-logic/endpoint/" + component + "/editor"

            }
        case 'common':
            return {
                name: component,
                url: url + "/business-logic/common/" + component + "/editor"

            }
    }
}
