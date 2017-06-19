(function () {
    angular
        .module('WebAppMaker')
        .controller('WebsiteListController', WebsiteListController);

    function WebsiteListController($routeParams, WebsiteService) {

        var model = this;
        model.userId = $routeParams['userId'];

        function init() {
            WebsiteService
                .findWebsitesByUserId(model.userId)
                .then(function(websites) {
                    model.websites = websites
                });
        }
        init();
    }
})();
