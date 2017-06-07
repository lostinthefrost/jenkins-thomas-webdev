(function () {
    angular
        .module('WebAppMaker')
        .controller('ProfileController', ProfileController);

    function ProfileController($location, UserService, $routeParams) {

        var model = this;
        model.userId = $routeParams['userId'];
        model.updateUser = updateUser;
        model.deleteUser = deleteUser;

        UserService
            .findUserById(model.userId)
            .then(renderUser);

        function renderUser(user) {
            model.user = user;
        }

        function deleteUser(user) {
            UserService
                .deleteUser(user._id)
                .then(function () {
                    $location.url('/login');
                });
        }

        function updateUser(user) {
            UserService
                .updateUser(user._id, user)
                .then(function () {
                    model.message = 'User updated successfully';
                });
        }
    }
})();
