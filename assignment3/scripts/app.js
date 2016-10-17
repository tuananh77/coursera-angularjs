(function () {
  'use strict';

  angular.module("NarrowItDownApp", [])
  .controller("NarrowItDownController", NarrowItDownController)
  .service("MenuSearchService", MenuSearchService)
  .directive("foundItems", FoundItemsDirective)
  .constant("ApiBasePath", "https://davids-restaurant.herokuapp.com");

  function FoundItemsDirective() {
    var ddo = {
      templateUrl: 'itemList.html',
      restrict: 'E',
      scope: {
        matched: '<',
        showMsg: '<',
//        myTitle: '@title',
        onRemove: '&'
      },
      controller: FoundItemsDirectiveController,
      controllerAs: 'list',
      bindToController: true
    };

    return ddo;
  }

  function FoundItemsDirectiveController() {
    var dir = this;
  }

  NarrowItDownController.$inject = ["MenuSearchService"];
  function NarrowItDownController(MenuSearchService) {
    var ctrl = this;

    ctrl.found = [];
    ctrl.showMsg = false;

    ctrl.getMatchedMenuItems = function(searchTerm) {
      if (typeof(searchTerm) === "string" && searchTerm.trim() === "") {
        ctrl.showMsg = true;
        return (ctrl.found = []);
      }
      var promise = MenuSearchService.getMatchedMenuItems(searchTerm);

      return promise.then(function(result) {
        ctrl.found = result;
        ctrl.showMsg = true;
        return result;
      });
    }

    ctrl.removeItem = function (index) {
      ctrl.found.splice(index, 1);
      ctrl.showMsg = false;
    }
  }

  MenuSearchService.$inject = ['$http', 'ApiBasePath']
  function MenuSearchService($http, ApiBasePath) {
    var service = this;

    this.getMatchedMenuItems = function (searchTerm) {
      return $http({
        method: 'GET',
        url: ApiBasePath + "/menu_items.json"
      })
      .then(function (result) { //if success
        // process result and only keep items that match
        var items = result.data.menu_items;
        var foundItems = [];
        // console.log(result.data.menu_items);
        for (var i in items) {
          if (items[i].description.indexOf(searchTerm) !== -1)
            foundItems.push(items[i]);
        }
        // return processed items
        // console.log(foundItems);
        return foundItems;
      });
      // .catch(function (result) { //if fail
      //     console.log("Failed to retrieve menu items.");
      //     return null;
      // });

      // return foundItems;
    };
  }

})();
