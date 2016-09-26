(function () {
  angular.module("ShoppingListCheckOff", [])
  .controller("BuyListController", BuyListController)
  .controller("BoughtListController", BoughtListController)
  .provider("ShoppingListService", ShoppingListServiceProvider)
  .config(Initialize);

  //use .config to initialize the ShoppingListServiceProvider
  //by populating the shoppinglist with items needed to buy
  Initialize.$inject = ["ShoppingListServiceProvider"];
  function Initialize(ShoppingListServiceProvider) {
    ShoppingListServiceProvider.defaults.shoppinglist = [
      {name: "apple", quantity: 5},
      {name: "banana", quantity: 7},
      {name: "bread", quantity: 1},
      {name: "egg", quantity: 12},
      {name: "milk", quantity: 1},
      {name: "donut", quantity: 6},
      {name: "pizza", quantity: 1}
    ];
  }

  //controller for the To Buy list
  BuyListController.$inject = ["ShoppingListService"];
  function BuyListController (ShoppingListService) {
    var list = this;

    list.items = ShoppingListService.getToBuyItems();

    //invoked when user clicks on Bought button next to an item in the To Buy list
    list.buyAnItem = function (itemIndex) {
      ShoppingListService.buyAnItem(itemIndex);
    }

    //returns true when the To Buy list is empty
    list.allBought = function () {
      return ShoppingListService.allBought();
    };

  }

  //controller for the Already Bought list
  BoughtListController.$inject = ["ShoppingListService"];
  function BoughtListController (ShoppingListService) {
    var list = this;

    list.items = ShoppingListService.getBoughtItems();

    //returns true is the Already Bought list is empty
    list.nothingBought = function () {
      return ShoppingListService.nothingBought();
    };
  }

  //factory for ShoppingListService
  function ShoppingListServiceProvider () {
    var provider = this;

    provider.defaults = {
      maxItems: 20,
      shoppinglist: []
    };

    provider.$get = function () {
      return new ShoppingListService(provider.defaults.shoppinglist);
    }
  }

  //the actual data model for the app
  //includes two list: To Buy items and Bought items
  //all functions are self-explanatory
  function ShoppingListService (shoppinglist) {
    var service = this;

    var toBuyItems = shoppinglist;
    var boughtItems = [];

    service.buyAnItem = function (itemIndex) {
      boughtItems.push(toBuyItems.splice(itemIndex, 1)[0]);
    };

    service.getToBuyItems = function () {
      return toBuyItems;
    };

    service.getBoughtItems = function () {
      return boughtItems;
    };

    service.allBought = function () {
      return toBuyItems.length == 0;
    };

    service.nothingBought = function () {
      return boughtItems.length == 0;
    };
  }

})();
