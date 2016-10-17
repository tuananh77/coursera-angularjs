(function () {
'use strict';

angular.module("MenuApp")
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');

  $stateProvider
  .state('home', {
    url: '/',
    templateUrl: 'src/home.template.html'
  })

  .state('categories', {
    url: '/categories',
    templateUrl: 'src/categories.template.html',
    controller: "CategoriesController as catList",
    resolve: {
      menuCategories: ["MenuDataService",
        function(MenuDataService) {
          return MenuDataService.getAllCategories()
          .then(function (result) {
            return result;
          },
          function (result) {
            alert("Could not load categories list from Heroku!")
          });
        }]
    }
  })

  .state('items', {
    url: '/cat:{categoryShortName}/items',
    templateUrl: 'src/items.template.html',
    controller: "ItemsController as itemList",
    resolve: {
      itemsByCat: ["$stateParams", "MenuDataService",
        function($stateParams, MenuDataService) {
          return MenuDataService.getItemsForCategory($stateParams.categoryShortName)
          .then(function (result) {
            return result;
          },
          function (result) {
            alert("Could not load menu item for category '" + $stateParams.categoryShortName + "' from Heroku!")
          });
        }]
    }
  })

  // .state('items.item-detail', {
  //   url: '/detail:{itemShortName}',
  //   templateUrl: 'src/itemdetail.template.html',
  //   controller: "ItemDetailController as itemDetail",
    // resolve: {
    //   itemDetail: ["$stateParams", "MenuDataService",
    //     function($stateParams, MenuDataService) {
    //       // console.log("items: in resolve: catname = ", $stateParams.categoryShortName);
    //       return MenuDataService.getItemDetail($stateParams.categoryShortName, $stateParams.itemShortName)
    //       .then(function (result) {
    //         console.log("item detail: in resolve - then: ", result);
    //         return result;
    //       });
    //     }]
    // }
  // });
}

})();
