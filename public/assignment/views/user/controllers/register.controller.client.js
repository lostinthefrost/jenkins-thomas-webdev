(function() {
    angular
        .module('WebAppMaker')
        .factory('RegisterController', RegisterController);
    function RegisterController() {
        var users = [ ... ];
        var api = {
	        'register' : register
        };
        return api;

        function register(username, password, password2) {
            if (password !== password2) {
                model.error = 'Passwords must match';
                return;
            }

            var found = userService.findUserByUsername(username);

            if (found !== null) {
                model.error = 'Username is not available';
            } else {
                var user = {
                    username: username,
                    password: password
                };
                userService.createUser(user);
            }
        }
    }
})();
