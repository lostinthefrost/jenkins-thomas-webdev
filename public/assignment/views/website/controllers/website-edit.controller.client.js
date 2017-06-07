(function () {
    angular
        .module('WebAppMaker')
        .controller('WebsiteEditController', WebsiteEditController);

    function WebsiteEditController($routeParams, WebsiteService, $location) {

        var model = this;
        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams['websiteId'];

        // event handlers
        model.createWebsite = createWebsite;
        model.updateWebsite = updateWebsite;
        model.deleteWebsite = deleteWebsite;

        function init() {
            WebsiteService
                .findWebsitesByUserId(model.userId)
                .then(function(websites) {
                    model.websites = websites;
                });
            WebsiteService
                .findWebsiteById(model.websiteId)
                .then(function(website) {
                    model.website = website;
                });
        }
        init();

        function createWebsite(website) {
            WebsiteService
                .createWebsite(website)
                .then(function() {
                    $location.url('/user/'+model.userId+'/website');
                });
        }

        function updateWebsite(website) {
            WebsiteService
                .updateWebsite(model.websiteId, website)
                .then(function() {
                    $location.url('/user/'+model.userId+'/website');
                });
        }

        function deleteWebsite(websiteId) {
            WebsiteService
                .deleteWebsite(websiteId)
                .then(function() {
                    $location.url('/user/'+model.userId+'/website');
                });
        }
    }
})();
