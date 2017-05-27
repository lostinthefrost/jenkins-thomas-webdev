(function() {
    angular
        .module('WebAppMaker')
        .factory('WebsiteListController', WebsiteListController);
    function WebsiteListController() {
        var model = this;

        var websites = [
            [
              { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
              { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
              { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
              { "_id": "890", "name": "Go",          "developerId": "123", "description": "Lorem" },
              { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
              { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
              { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
            ]
        ];
        var api = {
	        'findAllWesbiteForUser' : findAllWesbiteForUser
        };
        return api;

        function init() {
            model.web = findAllWesbiteForUser(model.userId);
        }
        init();

        function findAllWesbiteForUser(userId) {
            var resultSet = [];
            for (var w in websites) {
                var website = websites[w];
                if (website.developerId === userId) {
                    website.created = new Date();
                    website.updated = new Date();
                    resultSet.push(website);
                }
            }

        }
    }
})();
