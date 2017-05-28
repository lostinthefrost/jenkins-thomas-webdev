(function () {
    angular
        .module('WebAppMaker')
        .controller('WebsiteListController', WebsiteListController);

    function WebsiteListController($routeParams, WebsiteService) {

        var model = this;
        model.userId = $routeParams['userId'];

        function init() {
            model.websites = WebsiteService.findAllWebsitesForUser(model.userId);
        }
        init();
    }
})();
