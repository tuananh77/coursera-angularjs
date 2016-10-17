(function () {
'use strict';

angular.module('MenuApp')
.controller("ItemDetailController", ItemDetailController);

ItemDetailController.$inject = ["itemsByCat", "itemShortName"];
function ItemDetailController(itemsByCat, itemShortName) {
  var ctrl = this;
  for (var i in itemsByCat) {
    if (itemsByCat[i].short_name === itemShortName)
      ctrl.name = items[i].name;
      ctrl.description = items[i].description;
      ctrl.price_large = items[i].price_large;
      ctrl.price_small = items[i].price_small;
      console.log(items[i]);
      break;
  }
}

})();
