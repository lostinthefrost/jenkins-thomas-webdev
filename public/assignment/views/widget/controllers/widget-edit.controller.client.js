(function () {
    angular
        .module('WebAppMaker')
        .controller('WidgetEditController', WidgetEditController);

    function WidgetEditController($routeParams, WidgetService, $location) {

        var model = this;
        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams['websiteId'];
        model.pageId = $routeParams['pageId'];
        model.widgetId = $routeParams['widgetId'];

        // event handlers
        model.createWidget = createWidget;
        model.updateWidget = updateWidget;
        model.deleteWidget = deleteWidget;

        function init() {
            WidgetService
                .findWidgetsByPageId(model.pageId)
                .then(function(widgets) {
                    model.widgets = widgets;
                });
            WidgetService
                .findWidgetById(model.widgetId)
                .then(function(widget) {
                    model.widget = widget;
                });
        }
        init();

        function createWidget(widget) {
            WidgetService
                .createWidget(model.pageId, widget)
                .then(function() {
                    $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page/'+model.pageId+'/widget');
                });
        }

        function updateWidget(widget) {
            WidgetService
                .updateWidget(model.widgetId, widget)
                .then(function() {
                    $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page/'+model.pageId+'/widget');
                });
        }

        function deleteWidget(widgetId) {
            WidgetService
                .deleteWidget(widgetId)
                .then(function() {
                    $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page/'+model.pageId+'/widget');
                });
        }
    }
})();
