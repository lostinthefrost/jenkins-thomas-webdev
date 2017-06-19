(function () {
    angular
        .module('WebAppMaker')
        .controller('ProfileController', ProfileController);

    function ProfileController($location, UserService, $routeParams) {

        var model = this;
        model.userId = $routeParams['userId'];
        model.logout = updateUser;
        model.updateUser = updateUser;
        model.deleteUser = deleteUser;

        function init() {
            UserService
                .findUserById(model.userId)
                .then(function(user) {
                    model.user = user;
                });
        }
        init();

        function logout() {
            UserService
                .logout()
                .then(function() {
                    $location.url('/login');
                });
        }

        function deleteUser(user) {
            UserService
                .deleteUser(user._id)
                .then(function() {
                    $location.url('/login');
                });
        }

        function updateUser(user) {
            UserService
                .updateUser(user._id, user)
                .then(function() {
                    model.message = 'User updated successfully';
                });
        }
    }
})();
