(function() {
'use strict';

angular.module("MenuApp")

.component("menuItems", {
  templateUrl: "src/items.list.html",
  restrict: "AE",
  bindings: {
    items: "<"
  }
});

})();
