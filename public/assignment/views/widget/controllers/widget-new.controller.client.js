(function () {
    angular
        .module('WebAppMaker')
        .controller('WidgetNewController', WidgetNewController);

    function WidgetNewController($routeParams, WidgetService, $location) {

        var model = this;
        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams['websiteId'];
        model.pageId = $routeParams['pageId'];

        // event handlers
        model.createWidget = createWidget;

        function init() {
            model.widgets = WidgetService.findWidgetsByPage(model.pageId);
        }
        init();

        function createWidget(widget) {
            WidgetService.createWidget(model.pageId, page);
            $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page/'+model.pageId);
        }
    }
})();
