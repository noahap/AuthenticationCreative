angular.module('voting',[])//javascript
.controller('MainCtrl',[//This function connects to the body of Admin.html
  '$scope','$http',
  function($scope,$http) {
    $scope.candidates = [];
    $scope.ballot = [];
    $scope.getAll = function() {
			return $scope.candidates;
			
    };
    $scope.getAll();
    $scope.create = function(candidate) {
				$scope.candidates.push(candidate);
    };
    $scope.dovote = function() {
      console.log("In Dovote");
      angular.forEach($scope.candidates, function(value,key) {
        if(value.selected) {
          $scope.upvote(value);
          $scope.ballot.push(value);
        }
      });
    }

    
    $scope.addCandidate = function() {
      var newObj = {Name:$scope.formContent, Price:$scope.cost, votes:0, Picture_URL:$scope.CoolPic};
      $scope.create(newObj);//create is default javascript function
      $scope.formContent = '';
    }
    
   
    
  }
]);
