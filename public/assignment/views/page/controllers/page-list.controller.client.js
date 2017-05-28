(function () {
    angular
        .module('WebAppMaker')
        .controller('PageListController', PageListController);

    function PageListController($routeParams, PageService) {

        var model = this;
        model.websiteId = $routeParams['websiteId'];

        function init() {
            model.pages = PageService.findPagesByWebsiteId(model.websiteId);
        }
        init();
    }
})();
