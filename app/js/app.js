'use strict';


// Declare app level module which depends on filters, and services
var app = angular.module('fastPanel', [
  'ngRoute',
  'ngCookies',
  'xeditable',
  'fastPanel.filters',
  'fastPanel.services',
  'fastPanel.directives',
  'fastPanel.controllers'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {templateUrl: 'views/welcome.html', controller: 'WelcomeCtrl'});
  $routeProvider.when('/dns/', {templateUrl: 'views/dns.html', controller: 'DnsCtrl'});
  $routeProvider.when('/test/', {templateUrl: 'views/test.html', controller: 'TestCtrl'});
  $routeProvider.otherwise({redirectTo: '/'});
}]);


app.run(function(editableOptions) {
  editableOptions.theme = 'bs3';
});
