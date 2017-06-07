(function () {
    angular
        .module('WebAppMaker')
        .controller('WebsiteNewController', WebsiteNewController);

    function WebsiteNewController($routeParams, WebsiteService, $location) {

        var model = this;
        model.userId = $routeParams['userId'];

        // event handlers
        model.createWebsite = createWebsite;

        function init() {
            WebsiteService
                .findWebsitesByUserId(model.userId)
                .then(function(websites) {
                    model.websites = websites;
                });
        }
        init();

        function createWebsite(website) {
            WebsiteService
                .createWebsite(model.userId, website)
                .then(function() {
                    $location.url('/user/'+model.userId+'/website');
                });
        }
    }
})();
