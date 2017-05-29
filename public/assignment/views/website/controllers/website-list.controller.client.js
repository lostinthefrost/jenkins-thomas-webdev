(function () {
    angular
        .module('WebAppMaker')
        .controller('WebsiteListController', WebsiteListController);

    function WebsiteListController($routeParams, WebsiteService) {

        var model = this;
        model.userId = $routeParams['userId'];

        function init() {
            model.websites = WebsiteService.findWebsitesByUserId(model.userId);
        }
        init();
    }
})();
