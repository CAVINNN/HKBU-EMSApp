angular.module('app.routes', ['ionicUIRouter'])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider


      .state('tabsController.starEvents', {
    url: '/starEvents',
    views: {
      'tab1': {
        templateUrl: 'templates/starEvents.html',
        controller: 'starEventsCtrl'
      }
    }
  })

  .state('tabsController.organizers', {
    url: '/organizers',
    views: {
      'tab2': {
        templateUrl: 'templates/organizers.html',
        controller: 'organizersCtrl'
      }
    }
  })

  .state('tabsController.venues', {
    url: '/venues',
    views: {
      'tab3': {
        templateUrl: 'templates/venues.html',
        controller: 'venuesCtrl'
      }
    }
  })

  .state('tabsController', {
    url: '/tab',
    templateUrl: 'templates/tabsController.html',
    abstract:true
  })

  .state('tabsController.me', {
    url: '/me',
    views: {
      'tab4': {
        templateUrl: 'templates/me.html',
        controller: 'meCtrl'
      }
    }
  })

  /*
    The IonicUIRouter.js UI-Router Modification is being used for this route.
    To navigate to this route, do NOT use a URL. Instead use one of the following:
      1) Using the ui-sref HTML attribute:
        ui-sref='tabsController.register'
      2) Using $state.go programatically:
        $state.go('tabsController.register');
    This allows your app to figure out which Tab to open this page in on the fly.
    If you're setting a Tabs default page or modifying the .otherwise for your app and
    must use a URL, use one of the following:
      /tab/tab1/register
      /tab/tab2/register
      /tab/tab3/register
      /tab/tab4/register
  */
  .state('tabsController.register', {
    url: '/register/:id',
    views: {
      'tab1': {
        templateUrl: 'templates/register.html',
        controller: 'registerCtrl'
      },
      'tab2': {
        templateUrl: 'templates/register.html',
        controller: 'registerCtrl'
      },
      'tab3': {
        templateUrl: 'templates/register.html',
        controller: 'registerCtrl'
      },
      'tab4': {
        templateUrl: 'templates/register.html',
        controller: 'registerCtrl'
      }
    }
  })

  /*
    The IonicUIRouter.js UI-Router Modification is being used for this route.
    To navigate to this route, do NOT use a URL. Instead use one of the following:
      1) Using the ui-sref HTML attribute:
        ui-sref='tabsController.events'
      2) Using $state.go programatically:
        $state.go('tabsController.events');
    This allows your app to figure out which Tab to open this page in on the fly.
    If you're setting a Tabs default page or modifying the .otherwise for your app and
    must use a URL, use one of the following:
      /tab/tab2/filterEvents
      /tab/tab3/filterEvents
  */
  .state('tabsController.events', {
    url: '/filterEvents/:organizer/:venue',
    views: {
      'tab2': {
        templateUrl: 'templates/events.html',
        controller: 'eventsCtrl'
      },
      'tab3': {
        templateUrl: 'templates/events.html',
        controller: 'eventsCtrl'
      }
    }
  })

  /*
    The IonicUIRouter.js UI-Router Modification is being used for this route.
    To navigate to this route, do NOT use a URL. Instead use one of the following:
      1) Using the ui-sref HTML attribute:
        ui-sref='tabsController.map'
      2) Using $state.go programatically:
        $state.go('tabsController.map');
    This allows your app to figure out which Tab to open this page in on the fly.
    If you're setting a Tabs default page or modifying the .otherwise for your app and
    must use a URL, use one of the following:
      /tab/tab1/map
      /tab/tab2/map
      /tab/tab3/map
      /tab/tab4/map
  */
  .state('tabsController.map', {
    url: '/map/:venueName',
    views: {
      'tab1': {
        templateUrl: 'templates/map.html',
        controller: 'mapCtrl'
      },
      'tab2': {
        templateUrl: 'templates/map.html',
        controller: 'mapCtrl'
      },
      'tab3': {
        templateUrl: 'templates/map.html',
        controller: 'mapCtrl'
      },
      'tab4': {
        templateUrl: 'templates/map.html',
        controller: 'mapCtrl'
      }
    }
  })

  .state('tabsController.login', {
    url: '/login',
    views: {
      'tab4': {
        templateUrl: 'templates/login.html',
        controller: 'loginCtrl'
      }
    }
  })

  .state('tabsController.registeredEvents', {
    url: '/registered',
    views: {
      'tab4': {
        templateUrl: 'templates/registeredEvents.html',
        controller: 'registeredEventsCtrl'
      }
    }
  })

$urlRouterProvider.otherwise('/tab/starEvents')


});
