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
            model.websites = WebsiteService.findWebsitesByUser(model.userId);
        }
        init();

        function createWebsite(website) {
            WebsiteService.createWebsite(model.userId, website);
            $location.url('/user/'+model.userId+'/website');
        }
    }
})();
