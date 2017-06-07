(function () {
    angular
        .module('WebAppMaker')
        .factory('WidgetService', WidgetService);

    function WidgetService($http) {

        return {
            createWidget        : createWidget,
            findWidgetsByPageId : findWidgetsByPageId,
            findWidgetById      : findWidgetById,
            updateWidget        : updateWidget,
            deleteWidget        : deleteWidget,
            sortWidget          : sortWidget
        };

        function createWidget(pageId, widget) {
            var url = '/api/page/'+pageId+'/widget';
            return $http.post(url, widget)
                        .then(function(response) {
                            return response.data
                        });
        }

        function findWidgetsByPageId(pageId) {
            var url = '/api/page/'+pageId+'/widget';
            return $http.get(url)
                        .then(function(response) {
                            return response.data
                        });
        }

        function findWidgetById(widgetId) {
            var url = '/api/widget/'+widgetId;
            return $http.get(url)
                        .then(function(response) {
                            return response.data
                        });
        }

        function updateWidget(widgetId, widget) {
            var url = '/api/widget/'+widgetId;
            return $http.put(url, widget)
                        .then(function(response) {
                            return response.data
                        });
        }

        function deleteWidget(widgetId) {
            var url = '/api/widget/'+widgetId;
            return $http.delete(url)
                        .then(function(response) {
                            return response.data
                        });
        }

        function sortWidget(pageId, old_index, new_index) {
            var url = '/api/page/'+pageId+'/widget?initial='+old_index+'&final='+new_index;
            return $http.put(url)
                        .then(function(response) {
                            return response.data
                        });
        }
    }
})();
