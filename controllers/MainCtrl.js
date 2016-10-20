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


myPage.service("serviceID", function () {
var _id = {};
return {
    getID: function () {
        return _id;
    },
    setID: function (value) {
         _id = value;
     }
};
});


myPage.controller('RoomsCtrl', function ($scope,serviceID) {
  $scope.saved1 = localStorage.getItem('rooms');
	$scope.rooms = (localStorage.getItem('rooms')!==null) ? JSON.parse($scope.saved1) : [ {text:'Room', id:'1'},{text:'Room', id:'2'} ];
	localStorage.setItem('todos', JSON.stringify($scope.rooms));


  $scope.getTotalRooms = function () {
    return $scope.rooms.length;
  };

  $scope.addRoom = function () {
    $scope.rooms.push({text:'Room',id:this.getTotalRooms()+1});
    localStorage.setItem('rooms', JSON.stringify($scope.rooms));
  }

  $scope.checkRoom = function (value) {
    serviceID.setID(value);
  }

});

 myPage.controller('TodoCtrl', function ($scope,serviceID) {
  $scope.place1 = 'I need to ...';
	$scope.saved = localStorage.getItem('todos');
	$scope.todos = (localStorage.getItem('todos')!==null) ? JSON.parse($scope.saved) : [ {text: 'Task 1', done: false, id: '1'},
                                                                                        {text: 'Task 1', done: false, id: '2'},
                                                                                        {text: 'Task 2', done: false, id:'3'} ];
	localStorage.setItem('todos', JSON.stringify($scope.todos));
  var id_room = serviceID.getID();

  $scope.getIDRoom = function () {
    return id_room;
  };

	$scope.addTodo = function() {
    if ($scope.formTodoText===""){
          $scope.place1 = 'Please enter something';
       }
		else {
        $scope.todos.push({
  			text: $scope.formTodoText,
  			done: false,
        id: id_room
  		});
  		$scope.formTodoText = ''; //clear the input after adding
  		localStorage.setItem('todos', JSON.stringify($scope.todos));
    }
	};

	$scope.remaining = function() {
		var count = 0;
		angular.forEach($scope.todos, function(todo){
      if (todo.id==id_room){
        count+= todo.done ? 0 : 1;
      }
		});
		return count;
	};

	$scope.archive = function() {
		var oldTodos = $scope.todos;
		$scope.todos = [];
		angular.forEach(oldTodos, function(todo){
			if (!todo.done)
				$scope.todos.push(todo);
		});
		localStorage.setItem('todos', JSON.stringify($scope.todos));
	};

  $scope.$watch(function () { return serviceID.getID(); }, function (newValue, oldValue) {
        if (newValue != null) {
            $scope.id= newValue;
            return newValue;
        }
    }, true);


    $scope.checkValue = function(value) {
      console.log(id_room==2);
      return id_room == 2;
    };
});
