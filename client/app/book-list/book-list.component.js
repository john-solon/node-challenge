'use strict';

angular.module('bookList').component('bookList', {
  templateUrl: 'book-list/book-list.template.html',
  controller: ['Book', '$scope',
    function BookListController(Book, $scope) {
      $scope.books = Book.query();      
    }
  ]
});