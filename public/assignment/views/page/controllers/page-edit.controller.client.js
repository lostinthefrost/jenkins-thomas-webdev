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
            model.pages = PageService.findPagesByWebsiteId(model.websiteId);
            model.page = PageService.findPageById(model.pageId);
        }
        init();

        function createPage(page) {
            PageService.createPage(model.websiteId, page);
            $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page');
        }

        function updatePage(page) {
            PageService.updatePage(model.pageId, page);
            $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page');
        }

        function deletePage(pageId) {
            PageService.deletePage(pageId);
            $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page');
        }
    }
})();
