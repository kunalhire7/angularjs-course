(function () {
  'use strict';

  angular.module("LunchCheck", [])
          .controller("LunchCheckController", LunchCheckController)

  LunchCheckController.$inject = ["$scope", "$filter"];

  function LunchCheckController ($scope, $filter) {

    $scope.checkIfTooMuch = function () {
      // Split input by comma
      var favouriteFoods = splitByComma($scope.myFavouriteFood);
      // Filter blank value in array
      var filteredList = $filter('filter')(favouriteFoods, blankValueFilter);
      // Determine final status
      $scope.status = determineStatus(filteredList);
    }

    function splitByComma(listOfFood) {
      return !!listOfFood ? listOfFood.split(",") : [];
    }

    function determineStatus(favouriteFoods) {
      var status = {
        message: "",
        class: ""
      };
      if(favouriteFoods.length == 0) {
        status.message = "Please enter data first";
        status.class = "green-border";
        return status;
      } else if (favouriteFoods.length > 3) {
        status.message = "Too Much!";
        status.class = "red-border";
        return status;
      } else {
        status.message = "Enjoy";
        status.class = "green-border";
        return status;
      }
    }

    function blankValueFilter(value) {
      return !!value;
    }

  };
})();
