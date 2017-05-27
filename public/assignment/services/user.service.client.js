(function() {
    angular
        .module('WebAppMaker')
        .factory('UserService', UserService);
    function UserService() {
        var users = [ ... ];
        var api = {
	        'createUser'            : createUser,
	        'findUserById'          : findUserById,
	        'findUserByUsername'    : findUserByUsername,
	        'findUserByCredentials' : findUserByCredentials,
	        'updateUser'            : updateUser,
	        'deleteUser'            : deleteUser
        };
        return api;
        function createUser(user) {
            user._id = (new Date()) + '';
            users.push(user);
        }
        function findUserById(id) {

        }
        function findUserByUsername(username) {
            return users.find(function(user) {
                return user.username === username;
            }) || null;
        }
        function findUserByCredentials(username, password) {
            for (var u in users) {
                var user = users[u];
            }
        }
        function updateUser(userId, userd) {

        }
        function deleteUser(userId) {
            var user = users.find(function(user) {
                return user._id === userId;
            });
            var index = users.indexOf(user);
            users.splice(index, 1);
        }
    }
})();

