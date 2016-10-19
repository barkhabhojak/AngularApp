var myPage = angular.module('myPage', ['ui.router']);

myPage.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/home');

    $stateProvider

        .state('room', {
            url: '/room',
            templateUrl: 'pages/list.html'
        })


        .state('home', {
            url: '/home',
            views: {
                '': { templateUrl: 'pages/rooms.html' },
            }
        });

});

myPage.controller('RoomsCtrl', function ($scope) {
  $scope.rooms = [
    {text:'Room', id:'1'},
    {text:'Room', id:'2'},
    {text:'Room', id:'3'}
  ];

  $scope.getTotalRooms = function () {
    return $scope.rooms.length;
  };

  $scope.addRoom = function () {
    $scope.rooms.push({text:'Room',id:this.getTotalRooms()+1});
  }
});



myPage.controller('TodoCtrl', function ($scope) {

  $scope.place1 = 'I need to..';

  $scope.todos = [
    {text:'Task 1', done:false},
    {text: 'Task 2', done:false}
  ];

  $scope.getTotalTodos = function () {
    return $scope.todos.length;
  };


  $scope.addTodo = function () {
    if ($scope.formTodoText===""){
      $scope.place1 = 'Please enter something';
    }
    else {
      $scope.place1 = 'I need to..';
      $scope.todos.push({text:$scope.formTodoText, done:false});
      $scope.formTodoText = '';
    }
  };

    $scope.clearCompleted = function () {
        console.log("hello")
        $scope.todos = _.filter($scope.todos, function(todo){
            return !todo.done;
        });
    };
});
