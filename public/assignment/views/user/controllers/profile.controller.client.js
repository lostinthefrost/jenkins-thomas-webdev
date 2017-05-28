(function () {
    angular
        .module('WebAppMaker')
        .controller('ProfileController', ProfileController);

    function ProfileController($location, UserService, $routeParams) {

        var model = this;
        var userId = $routeParams['userId'];

        model.user = UserService.findUserById(userId);
    }
})();
