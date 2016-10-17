(function() {
'use strict';

angular.module("MenuApp")

.component("categories", {
  templateUrl: "src/categories.list.html",
  restrict: "AE",
  bindings: {
    catList: "<"
  }
});

})();
