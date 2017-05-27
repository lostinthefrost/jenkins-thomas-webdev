(function() {
    angular
        .module('WebAppMaker')
        .config(Config);
    function Config($routeProvider) {
        $routeProvider
            .when('/login', {
                templateUrl: '/views/user/templates/login.view.client.html'
            })
            .when('/register', {
                templateUrl: '/views/user/templates/register.view.client.html'
            })
            .when('/user/:userId', {
                templateUrl: '/views/user/templates/profile.view.client.html'
            })
            .when('/user/:userId/website', {
                templateUrl: '/views/website/templates/website-list.view.client.html'
            })
            .when('/user/:userId/website/new', {
                templateUrl: '/views/website/templates/website-new.view.client.html'
            })
            .when('/user/:userId/website/:websiteId', {
                templateUrl: '/views/website/templates/website-edit.view.client.html'
            })
            .when('/user/:userId/website/:websiteId/page', {
                templateUrl: '/views/page/templates/page-list.view.client.html'
            })
            .when('/user/:userId/website/:websiteId/page/new', {
                templateUrl: '/views/page/templates/page-new.view.client.html'
            })
            .when('/user/:userId/website/:websiteId/page/:pageId', {
                templateUrl: '/views/page/templates/page-edit.view.client.html'
            })
            .when('/user/:userId/website/:websiteId/page/:pageId/widget', {
                templateUrl: '/views/widget/templates/widget-list.view.client.html'
            });
    }
})();
