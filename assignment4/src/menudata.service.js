(function() {
'use strict';

angular.module('Data')

.service("MenuDataService", MenuDataService)
.constant("ApiBasePath", "https://davids-restaurant.herokuapp.com");

MenuDataService.$inject = ["$http", "$q", "ApiBasePath"]
function MenuDataService($http, $q, ApiBasePath) {
  var service = this;
  // to keep track of whether categories list has been loaded or not
  service.categoriesLoaded = false;

  service.allItems = [];
  //   { // template, for reference purpose
  //     categoryShortName: "TEST",
  //     items: []
  //   }
  // ];

  service.getAllCategories = function () {
    if (service.categoriesLoaded) {
      var deferred = $q.defer();
      deferred.resolve(service.categories);
      return deferred.promise;
    }
    else {
      return $http({
        method: 'GET',
        url: ApiBasePath + "/categories.json"
      })
      .then(function (result) { // if success
        service.categoriesLoaded = true;
        service.categories = result.data;
        return result.data;
      });
    }
  };

  service.getCategoryName = function (categoryShortName) {
    return service.getAllCategories().then(function(result) {
      for (var i in result) {
        if (result[i].short_name === categoryShortName)
          return result[i].name;
      }
      return undefined;
    })
  }

  // private function
  // retrieve pre-loaded items for the category
  // return undefined if not yet loaded
  function getLoadedItems(categoryShortName) {
    var foundCat = service.allItems.find( function(category) {
      return category.categoryShortName === categoryShortName;
    });

    if (foundCat) {
      return foundCat.items;
    }
    else {
      return undefined;
    }
  }

  service.getItemsForCategory = function (categoryShortName) {
    // Retrieve pre-loaded items for the category, if any
    var items = getLoadedItems(categoryShortName);
    if (items) { // if items for this category have been loaded previously
      var deferred = $q.defer();
      deferred.resolve(items);
      return deferred.promise;
    }
    else { // if not loaded
      return $http({
        method: 'GET',
        url: ApiBasePath + "/menu_items.json?category=" + categoryShortName
      })
      .then(function (result) { // if success
        service.allItems.push({
          categoryShortName: categoryShortName,
          items: result.data.menu_items
        });
        return result.data.menu_items;
      });
    }
  };

  service.getItemDetail= function (categoryShortName, itemShortName) {
    return getItemsForCategory(categoryShortName)
    .then(function(items) { // success
      for (i in items) {
        if (items[i].short_name === itemShortName)
          return items[i];
      }
      return undefined;
    },
    function(result) { // if failed
      return undefined;
    })
  }
}
})();
