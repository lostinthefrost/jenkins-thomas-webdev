(function () {
    angular
        .module('WebAppMaker')
        .controller('WebsiteNewController', WebsiteNewController);

    function WebsiteNewController($routeParams, websiteService, $location) {

        var model = this;
        model.userId = $routeParams['userId'];

        // event handlers
        model.createWebsite = createWebsite;

        function init() {
            model.websites = websiteService.findAllWebsitesForUser(model.userId);
        }
        init();

        function createWebsite(website) {
            website.developerId = model.userId;
            websiteService.createWebsite(website);
            $location.url('/user/'+model.userId+'/website');
        }
    }
})();
