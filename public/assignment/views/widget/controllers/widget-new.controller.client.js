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
            model.widgets = WidgetService.findWidgetsByPageId(model.pageId);
        }
        init();

        function createWidget(widgetType) {
            var widget = { widgetType: widgetType };
            WidgetService.createWidget(model.pageId, widget);
            $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page/'+model.pageId+'/widget/'+widget._id);
        }
    }
})();
