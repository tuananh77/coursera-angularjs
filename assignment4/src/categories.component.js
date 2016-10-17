(function() {
'use strict';

angular.module("MenuApp")

.component("categories", {
  templateUrl: "src/categories.template.html",
  restrict: "AE",
  controller: CategoriesController,
  // bindings: {
  //   // categories: "<catList"
  // }
});

CategoriesController.$inject = ["$q", "MenuDataService"];
function CategoriesController($q, MenuDataService) {
  var $ctrl = this;
  $ctrl.categories = []

  $ctrl.$onInit = function () {
    MenuDataService.getAllCategories()
    .then(function (result) {
      $ctrl.categories = result;
    })
  };
}
})();
