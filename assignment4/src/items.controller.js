(function () {
'use strict';

angular.module('MenuApp')
.controller("ItemsController", ItemsController);

ItemsController.$inject = ["itemsByCat", "$stateParams", "MenuDataService"];
function ItemsController(itemsByCat, $stateParams, MenuDataService) {
  var ctrl = this;
  ctrl.items = itemsByCat;
  ctrl.activeItem = "";
  ctrl.categoryShortName = $stateParams.categoryShortName;
  MenuDataService.getCategoryName(ctrl.categoryShortName).
  then(function(result) {
    ctrl.categoryName = result;
  });
  console.log(ctrl.categoryName);

  ctrl.setActiveItem = function(itemShortName) {
    if (ctrl.activeItem !== itemShortName)
      ctrl.activeItem = itemShortName;
    else ctrl.activeItem = "";
  };
}

})();
