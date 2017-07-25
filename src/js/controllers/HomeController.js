angular.module('myApp').controller('HomeCtrl',
    ['$scope', '$rootScope', '$location', '$timeout', 'ProductService', 'CartService', 'AuthService',
function ($scope, $rootScope, $location, $timeout, ProductService, CartService, AuthService) {

    var instance = this;

    instance.show_featured = false;
    instance.addedToCart = false;

    ProductService.featured().then(
        function (data) {

            instance.show_featured = true;
            instance.featured = data;
            $scope.$emit('event.loadStop');
        },
        function (data) {

            $scope.$emit('event.loadStop');
            instance.error = 'Uh oh! We had a problem loading featured products. Try again later.';
            console.error("error loading featured products: " + data);
        });

    function addToCart(product, $event) {

        $event.stopPropagation();
        CartService.add(product);

        product.addedToCart = true;
        $timeout(function () {
            product.addedToCart = false;
        }, 700);
    }

    instance.addToCart = addToCart;

    function isAuthenticated() {
        return AuthService.isAuthenticated();
    }

    instance.isAuthenticated = isAuthenticated;
}]);