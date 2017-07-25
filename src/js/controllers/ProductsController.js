angular.module('myApp').controller('ProductsCtrl',
        ['$scope', '$location', 'ProductService', 'CartService', '$timeout',
function ($scope, $location,  ProductService, CartService, $timeout) {

    var instance = this;

    ProductService.list()
        .then(function (data) {
                instance.all = data;
                $scope.$emit('event.loadStop');
            },
            function (data) {
                $scope.$emit('event.loadStop');
                instance.error = 'Uh oh! We had a problem loading products list. Try again later.';
                console.error("error loading products list: " + data);
            });

    function addToCart(product) {

        CartService.add(product);
        product.addedToCart = true;

        $timeout(function () {
            product.addedToCart = false;
        }, 700);
    }
    instance.addToCart = addToCart;
}]);