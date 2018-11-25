angular.module('app.controllers', [])

  .controller('starEventsCtrl', ['$scope', '$stateParams', '$http',
    function ($scope, $stateParams, $http) {

      $http.get("http://localhost:1337/index")
        .then(function (response) {

          let starEvents = response.data.starEvents;
          starEvents.forEach(function(starEvent){
            starEvent.eventDate = new Date(starEvent.eventDate);
          });

          $scope.starEvents = starEvents;

        }, function (error) {
          console.log(error);
        });

    }])

  .controller('organizersCtrl', ['$scope', '$stateParams',
    function ($scope, $stateParams) {


    }])

  .controller('venuesCtrl', ['$scope', '$stateParams', 'Store',
    function ($scope, $stateParams, Store) {

      $scope.venues = Store.getAllVenues();

    }])

  .controller('meCtrl', ['$scope', '$stateParams', '$cookies', '$http', '$window', '$ionicPopup',
    function ($scope, $stateParams, $cookies, $http, $window, $ionicPopup) {

      $scope.isLogined = false;

      if( ($cookies.get('role') !== undefined) && ($cookies.get('username') !== undefined) ) {
        $scope.isLogined = true;
        $scope.username = $cookies.get('username');
      }

      $scope.logout = function() {
        $http.post("http://localhost:1337/mobileLogout")
          .then(function (response) {

            $window.location.reload();

            let alertPopup = $ionicPopup.alert({
              template: 'Logout Successfully.'
            });

          }, function (error) {

            let alertPopup = $ionicPopup.alert({
              title: error.data,
              template: 'Logout failed. Please try again.'
            });

          });
      };

    }])

  .controller('registerCtrl', ['$scope', '$stateParams', '$http', '$cookies', '$ionicPopup',
    function ($scope, $stateParams, $http, $cookies, $ionicPopup) {

      $scope.isLogin = false;

      if( ($cookies.get('role') !== undefined) && ($cookies.get('username') !== undefined) ) {
        $scope.isLogin = true;
      }

      $http.get("http://localhost:1337/detail/" + $stateParams.id)
        .then(function (response) {

          $scope.event = response.data.event;

        }, function (error) {
          console.log(error);
        });


      $scope.register = function (eventId) {

        let confirmPopup = $ionicPopup.confirm({
          title: 'Register the event?',
          template: 'Are you sure?'
        });

        confirmPopup.then(function (res) {
          if (res) {
            $http.post("http://localhost:1337/mobileRegister/" + eventId)
              .then(function (response) {

                $scope.event.isRegistered = true;

                let alertPopup = $ionicPopup.alert({
                  template: 'Register Successfully.'
                });

              }, function (error) {

                let alertPopup = $ionicPopup.alert({
                  title: error.data,
                  template: 'Failed. Please try again.'
                });

              });
          } else {
            console.log('not sure');
          }
        });

      };


      $scope.cancel = function (eventId) {

        let confirmPopup = $ionicPopup.confirm({
          title: 'Cancel the event?',
          template: 'Are you sure?'
        });

        confirmPopup.then(function (res) {
          if (res) {
            $http.delete("http://localhost:1337/mobileCancel/" + eventId)
              .then(function (response) {

                $scope.event.isRegistered = false;

                let alertPopup = $ionicPopup.alert({
                  template: 'Cancel Successfully.'
                });

              }, function (error) {

                let alertPopup = $ionicPopup.alert({
                  title: error.data,
                  template: 'Failed. Please try again.'
                });

              });
          } else {
            console.log('not sure');
          }
        });

      };

    }])

  .controller('eventsCtrl', ['$scope', '$stateParams', '$http',
    function ($scope, $stateParams, $http) {

      if( $stateParams.organizer !== '' ) {
        $http.get("http://localhost:1337/getEventsByOrgan/" + $stateParams.organizer)
          .then(function (response) {
            $scope.events = response.data.events;
          }, function (error) {
            console.log(error);
          });
      }

      if( $stateParams.venue !== '' ) {
        $http.get("http://localhost:1337/getEventsByVenue/" + $stateParams.venue)
          .then(function (response) {
            $scope.events = response.data.events;
          }, function (error) {
            console.log(error);
          });
      }

    }])

  // map
  .controller('mapCtrl', ['$scope', '$stateParams', 'Store',
    function ($scope, $stateParams, Store) {

      let map = L.map('map').setView([22.337827, 114.181962], 17);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);

      let venue = Store.getVenue($stateParams.venueName)[0];

      L.marker([venue.Latitude, venue.Longitude]).addTo(map).bindPopup(venue.VenueID);

    }])

  .controller('loginCtrl', ['$scope', '$stateParams', '$http', '$ionicHistory', '$ionicPopup', '$window',
    function ($scope, $stateParams, $http, $ionicHistory, $ionicPopup, $window) {

      $scope.info = {};

      $scope.login = function () {
        $http.post("http://localhost:1337/mobileLogin", $scope.info)
          .then(function (response) {

            $ionicHistory.goBack();
            $window.location.reload();

            let alertPopup = $ionicPopup.alert({
              template: 'Login Successfully.'
            });

          }, function (error) {

            let alertPopup = $ionicPopup.alert({
              title: error.data,
              template: 'Login failed. Please try again.'
            });

          });
      };

    }])

  .controller('registeredEventsCtrl', ['$scope', '$stateParams', '$http',
    function ($scope, $stateParams, $http) {

      $http.get("http://localhost:1337/registered/")
        .then(function (response) {
          $scope.events = response.data.registeredEvents;
        }, function (error) {
          console.log(error);
        });

    }])
