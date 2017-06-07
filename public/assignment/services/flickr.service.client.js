(function () {
    angular
        .module('WebAppMaker')
        .service('FlickrService', FlickrService);

    function FlickrService($http) {

        this.searchPhotos = searchPhotos;

        var key = '8366d4b3fa408ff9e94f56b9c271bc67';
        var secret = 'aa2fa991987bd8ce';
        var urlBase = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT';

        function searchPhotos(searchTerm) {
            var url = urlBase
                .replace('API_KEY', key)
                .replace('TEXT', searchTerm);
            return $http.get(url);
        }
    }
})();
