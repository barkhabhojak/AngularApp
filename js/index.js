function TodoCtrl($scope) {
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
}

function Rooms($scope){
  $scope.rooms = [
    {text:'Room 1'},
    {text:'Room 1'},
    {text:'Room 1'}
  ];

  $scope.addRoom = function () {
    $scope.rooms.push({text:'Room'});
    console.log($scope.rooms.length);
  }
}
