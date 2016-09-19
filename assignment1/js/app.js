(function () {
"use strict";

angular.module("LunchCheck", [])
.controller("LunchCheckController", LunchCheckController);

//Self-protect against minification
LunchCheckController.$inject = ["$scope"];
function LunchCheckController($scope) {
  $scope.menu = "";
  $scope.message = "";

  $scope.CheckMenu = function () {
    var items = $scope.menu.split(',');
    var count = 0;

    //Count items in the menu, empty items will not be counted
    for (var i in items) {
      if (items[i].trim().length > 0) {
        count += 1;
      }
    }

    //Set the message according to the number of items in the menu
    if (count == 0) {
      $scope.message = "Your menu is empty.";
    }
    else if (count < 4) {
      $scope.message = "Enjoy!";
    }
    else {
      $scope.message = "Too much!"
    }
  };
}
})();
