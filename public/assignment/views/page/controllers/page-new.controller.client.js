(function () {
    angular
        .module('WebAppMaker')
        .controller('PageNewController', PageNewController);

    function PageNewController($routeParams, PageService, $location) {

        var model = this;
        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams['websiteId'];

        // event handlers
        model.createPage = createPage;

        function init() {
            PageService
                .findPagesByWebsiteId(model.websiteId)
                .then(function(pages) {
                    model.pages = pages;
                });
        }
        init();

        function createPage(page) {
            PageService
                .createPage(model.websiteId, page)
                .then(function() {
                    $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page');
                });
        }
    }
})();
