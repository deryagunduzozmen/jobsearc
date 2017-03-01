 app.controller('AppCtrl', function($scope, $ionicModal, $timeout, $rootScope) {

     // With the new view caching in Ionic, Controllers are only called
     // when they are recreated or on app start, instead of every page change.
     // To listen for when this page is active (for example, to refresh data),
     // listen for the $ionicView.enter event:
     //$scope.$on('$ionicView.enter', function(e) {
     //});

     // Form data for the login modal
     $scope.loginData = {};

     // Create the login modal that we will use later
     $ionicModal.fromTemplateUrl('templates/login.html', {
         scope: $scope
     }).then(function(modal) {
         $scope.modal = modal;
     });

     // Triggered in the login modal to close it
     $scope.closeLogin = function() {
         $scope.modal.hide();
     };

     // Open the login modal
     $scope.login = function() {
         $scope.modal.show();
     };

     // Perform the login action when the user submits the login form
     $scope.doLogin = function() {
         console.log('Doing login', $scope.loginData);

         // Simulate a login delay. Remove this and replace with your login
         // code if using a login system
         $timeout(function() {
             $scope.closeLogin();
         }, 1000);
     };
 })

 app.controller('SearchCtrl', function($scope, $http, $state, $rootScope) {
     $scope.filter = {};
     $scope.filter.keywords = ".net";
     $scope.filter.location = "london";
     $scope.search = function(filter) {
         $rootScope.filter = filter;
         $state.go('app.joblist', { filter: filter });
     }
 })

 app.controller('JobsCtrl', function($scope, $http, $state, $stateParams, $rootScope, FirebaseDb, $ionicPopover) {

     // http://www.reed.co.uk/api/1.0/search?keywords=.net&location=london&distancefromlocation=15
     // headers: {'Content-Type': 'application/x-www-form-urlencoded'}

     var username = "fa36c066-d576-469d-8bc8-46e925397fcc";
     // var authdata = Base64.encode(username + ':' + password);
     username = "dXNlcm5hbWUgOiBmYTM2YzA2Ni1kNTc2LTQ2OWQtOGJjOC00NmU5MjUzOTdmY2M=";
     $http.defaults.headers.common['Authorization'] = 'Basic ZmEzNmMwNjYtZDU3Ni00NjlkLThiYzgtNDZlOTI1Mzk3ZmNjOg==';
     $http.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded';
     var f = $rootScope.filter;
     var searchUrl = "";
     if (f) {
         var searchUrl = "http://www.reed.co.uk/api/1.0/search?keywords=" + f.keywords + "&location=" + f.location + "&distancefromlocation=15";
     } else {
         var searchUrl = "http://www.reed.co.uk/api/1.0/search";
     }

     $scope.doRefresh = function() {

         if ($state.$current.url.prefix == "/app/savedJobs") {
             $scope.jobs = FirebaseDb.all("SavedJobs");
             return;
         }

         $http.get(searchUrl)
             .success(function(data, status, headers, config) {
                 console.log('data success');
                 console.log(data); // for browser console
                 $scope.jobs = data.results; // for UI
             })
             .error(function(data, status, headers, config) {
                 console.log('data error');
                 var dummyjobs = [{
                         jobId: 31640327,
                         employerId: 91973,
                         employerName: "Wade Macdonald",
                         employerProfileId: null,
                         employerProfileName: null,
                         jobTitle: "Revenue Accountant",
                         locationName: "Reading",
                         minimumSalary: 12,
                         maximumSalary: 14,
                         currency: "GBP",
                         expirationDate: "27/03/2017",
                         date: "13/02/2017",
                         jobDescription: "Assistant Revenue Accountant - Reading - 12 month temporary contract - &#163;12 - &#163;14 per hourWade Macdonald is currently partnering with a market leading business to recruit an Assistant Revenue Accountant to join their team, to cover a period of maternity. The client requires an urgent need for this well-known listed Reading business. The key requirements for this role are:-Processing the revenue recogn... ",
                         applications: 9,
                         jobUrl: "https://www.reed.co.uk/jobs/revenue-accountant/31640327"
                     },

                 ];

                 $scope.jobs = dummyjobs;

             })
             .then(function(result) {

                 things = result.data;
             })
             .finally(function() {
                 // Stop the ion-refresher from spinning
                 $scope.$broadcast('scroll.refreshComplete');
             })

     };
     $scope.changePage = function(jobId) {
         $state.go('app.jobDetail', { jobId: jobId });
     }
     $scope.doRefresh();

     // .fromTemplate() method
     var template = '<ion-popover-view><ion-header-bar> <h1 class="title">My Popover Title</h1> </ion-header-bar> <ion-content> Hello! </ion-content></ion-popover-view>';

     $scope.popover = $ionicPopover.fromTemplate(template, {
         scope: $scope
     });

     // .fromTemplateUrl() method
     $ionicPopover.fromTemplateUrl('my-popover.html', {
         scope: $scope
     }).then(function(popover) {
         $scope.popover = popover;
     });


     $scope.openPopover = function($event) {
         $scope.popover.show($event);
     };
     $scope.closePopover = function() {
         $scope.popover.hide();
     };
     //Cleanup the popover when we're done with it!
     $scope.$on('$destroy', function() {
         $scope.popover.remove();
     });
     // Execute action on hidden popover
     $scope.$on('popover.hidden', function() {
         // Execute action
     });
     // Execute action on remove popover
     $scope.$on('popover.removed', function() {
         // Execute action
     });
 })


 app.controller('JobDetailCtrl', function($scope, $http, $state, $stateParams, FirebaseDb) {

     var username = "fa36c066-d576-469d-8bc8-46e925397fcc";

     username = "dXNlcm5hbWUgOiBmYTM2YzA2Ni1kNTc2LTQ2OWQtOGJjOC00NmU5MjUzOTdmY2M=";
     $http.defaults.headers.common['Authorization'] = 'Basic ZmEzNmMwNjYtZDU3Ni00NjlkLThiYzgtNDZlOTI1Mzk3ZmNjOg==';
     $http.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded';
     var searchUrl = "http://www.reed.co.uk/api/1.0/jobs/";

     $scope.doRefresh = function(jobId) {
         $http.get(searchUrl + jobId)
             .success(function(data, status, headers, config) {
                 console.log('data success');
                 console.log(data); // for browser console
                 $scope.job = data; // for UI
             })
             .error(function(data, status, headers, config) {
                 console.log('data error');
                 $scope.job = {
                     employerId: 91973,
                     employerName: "Wade Macdonald",
                     jobId: 31640327,
                     jobTitle: "Revenue Accountant",
                     locationName: "Reading",
                     minimumSalary: 12,
                     maximumSalary: 14,
                     yearlyMinimumSalary: 23400,
                     yearlyMaximumSalary: 27300,
                     currency: "GBP",
                     salaryType: "per hour",
                     salary: "£12.00 - £14.00 per hour",
                     datePosted: "13/02/2017",
                     expirationDate: "27/03/2017",
                     externalUrl: null,
                     jobUrl: "https://www.reed.co.uk/jobs/revenue-accountant/31640327",
                     partTime: false,
                     fullTime: true,
                     contractType: "Contract",
                     jobDescription: "Assistant Revenue Accountant - Reading - 12 month temporary contract - &#163;12 - &#163;14 per hour<br /><br />Wade Macdonald is currently partnering with a market leading business to recruit an Assistant Revenue Accountant to join their team, to cover a period of maternity. The client requires an urgent need for this well-known listed Reading business. <br /><br />The key requirements for this role are:<br /><br />-Processing the revenue recognition for the sales division.<br />-Invoice raising and setting revenue to recognise in the correct period.<br />-Identify, track and report accounting data accurately and follow-up on routine issues flagging non-standard issues to line manager.<br />- Create document packs for all sales deals.<br />-Provide standard and ad hoc reports as needed.<br /><br />The client will consider both experienced individuals who can hit the ground running and graduates with little experience. You need to be available immediately or be on a week's notice.<br /><br />Assistant Revenue Accountant - Reading - 12 month temporary contract - &#163;12 - &#163;14 per hour<br /><br />Applications are encouraged from all candidates meeting or exceeding the minimum criteria for the role regardless of age, disability, gender, orientation, race, religion or ethnicity.",
                     applicationCount: 9
                 };
             })
             .then(function(result) {

                 things = result.data;
             })
             .finally(function() {
                 // Stop the ion-refresher from spinning
                 $scope.$broadcast('scroll.refreshComplete');
             })

     };

     $scope.swipeleftAction = function() {
         window.history.back();

     };

     $scope.save = function(job) {
         FirebaseDb.save("SavedJobs", job);
     };

     $scope.doRefresh($stateParams.jobId);
 })