(function() {
    angular
        .module('WebAppMaker')
        .directive('wbdvSortable', wbdvSortable);

    function wbdvSortable(WidgetService, $routeParams) {
        var start = -1;
        var stop = -1;

        function linkFunction(scope, element) {
            jQuery(element).sortable({
                axis: 'y',

                start: function(e, ui) {
                    start = (jQuery(ui.item).index)();
                },

                stop: function(e, ui) {
                    pageId = $routeParams['pageId'];
                    stop = (jQuery(ui.item).index)();
                    WidgetService.sortWidget(pageId, start, stop);
                }
            });
        }

        return {
            link: linkFunction
        }
    }
})();
