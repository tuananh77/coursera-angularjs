(function() {
'use strict';

angular.module("MenuApp")

.controller("CategoriesController", CategoriesController);

CategoriesController.$inject = ["$q", "menuCategories"];
function CategoriesController($q, menuCategories) {
  var ctrl = this;
  ctrl.categories = menuCategories;

  // MenuDataService.getAllCategories()
  // .then(function (result) {
  //   ctrl.categories = result;
  //   console.log('in controller:', result);
  // });
}

})();
