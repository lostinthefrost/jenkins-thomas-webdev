(function () {
    angular
        .module('WebAppMaker')
        .controller('ProfileController', ProfileController);

    function ProfileController($location, userService, $routeParams) {

        var model = this;
        var userId = $routeParams['userId'];

        model.user = userService.findUserById(userId);
    }
})();
