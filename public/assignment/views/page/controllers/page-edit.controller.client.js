(function () {
    angular
        .module('WebAppMaker')
        .controller('PageEditController', PageEditController);

    function PageEditController($routeParams, PageService, $location) {

        var model = this;
        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams['websiteId'];
        model.pageId = $routeParams['pageId'];

        // event handlers
        model.createPage = createPage;
        model.updatePage = updatePage;
        model.deletePage = deletePage;

        function init() {
            PageService
                .findPagesByWebsiteId(model.websiteId)
                .then(function(pages) {
                    model.pages = pages;
                });
            PageService
                .findPageById(model.pageId)
                .then(function(page) {
                    model.page = page;
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

        function updatePage(page) {
            PageService
                .updatePage(model.pageId, page)
                .then(function() {
                    $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page');
                });
        }

        function deletePage(pageId) {
            PageService
                .deletePage(pageId)
                .then(function() {
                    $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page');
                });
        }
    }
})();
