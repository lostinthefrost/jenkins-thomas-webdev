(function () {
    angular
        .module('WebAppMaker')
        .controller('ProfileController', ProfileController);

    function ProfileController($location, UserService, $routeParams) {

        var model = this;
        model.userId = $routeParams['userId'];
        model.user = UserService.findUserById(model.userId);
    }
})();
