/*app.service('reedUKService', function() {
    return {
        getJobs: function(params) {
            // http://www.reed.co.uk/api/1.0/search?keywords=.net&location=london&distancefromlocation=15
            var username = "fa36c066-d576-469d-8bc8-46e925397fcc";
            var authdata = Base64.encode(username + ':' + password);
            $http.defaults.headers.common['Authorization'] = 'Basic ' + authdata; // jshint ignore:line
            var url = "http://www.reed.co.uk/api/1.0/search?keywords=.net&location=london&distancefromlocation=15"
            return $http({ url: url, method: "GET", params: params });
        }
    }
})
*/




app.service('reedUKService', function($http) {

    this.getJobs = function(x) {
        // http://www.reed.co.uk/api/1.0/search?keywords=.net&location=london&distancefromlocation=15
        // headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        var username = "fa36c066-d576-469d-8bc8-46e925397fcc";
        // var authdata = Base64.encode(username + ':' + password);
        username = "dXNlcm5hbWUgOiBmYTM2YzA2Ni1kNTc2LTQ2OWQtOGJjOC00NmU5MjUzOTdmY2M=";
        $http.defaults.headers.common['Authorization'] = 'Basic ZmEzNmMwNjYtZDU3Ni00NjlkLThiYzgtNDZlOTI1Mzk3ZmNjOg==';
        $http.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded';
        var url = "http://www.reed.co.uk/api/1.0/search?keywords=.net&location=london&distancefromlocation=15"
        $http.get(url).then(function(response) {
            jobs = response;
            return jobs;
        });;
    }


});