'use strict';

angular.
  module('bookApp').
  config(['$routeProvider',
    function config($routeProvider) {
      $routeProvider.
        when('/', {
          template: '<book-list></book-list>'
        }).
        otherwise('/');
    }
  ]);
