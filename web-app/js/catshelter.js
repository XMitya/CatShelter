var URL_PREFIX = '/CatShelter/';

var catShelter = angular.module('catShelter', []);

function apiRequest(method, url, $http, callback) {
    $http({method: method, url: URL_PREFIX + url}).
        success(function(data, status, headers, config){
            callback(data, status, headers, config);
        }).
        error(function() {
            console.log("Error was occured");
        });
}

function getUrlId() {
    return (RegExp('[^/]+(?=/$|$)').exec(location.href));
}

// controllers
var controllers = {
    catController: {
        CatsCtrl: function($scope, $http, CatService) {

            $scope.remove = function(index) {
                if (confirm("Do you really want to delete " + $scope.cats[index].name + "?")) {
                    CatService.deleteCat($http, $scope, $scope.cats[index]);
                    $scope.cats.splice(index, 1);
                }
            };

            $scope.reloadData = function() {
                CatService.loadCats($http, $scope);
            };

            $scope.reloadData();
        },

        CatEditAddCtrl: function($scope, $http, CatService, CoatService, BreedService) {
            var catId = getUrlId();
            if (catId !== 'undefined') {
                catId = parseInt(catId);
            }

            // this awful amount of code written because I still haven't figured out
            // how to force it do this automatically, for ng-model we must use exactly
            // the same object
            // todo simplify
            if (!isNaN(catId)) {
                CatService.loadCat($http, $scope, catId, function($http, $scope){
                    CoatService.loadCoats($http, $scope, function($http, $scope, data){
                        for (i in data) {
                            if (angular.equals($scope.cat.coat, data[i])) {
                                $scope.cat.coat = data[i];
                                break;
                            }
                        }
                    });

                    BreedService.loadBreeds($http, $scope, function($http, $scope, data){
                        for (i in data) {
                            if (angular.equals($scope.cat.breed, data[i])) {
                                $scope.cat.breed = data[i];
                            }
                        }
                    });
                });

            } else {
                CoatService.loadCoats($http, $scope);
                BreedService.loadBreeds($http, $scope);
            }

            $scope.save = function() {
                CatService.saveCat($http, $scope, $scope.cat, function(success){
                    if (success) {
                        location.pathname = URL_PREFIX + 'cat/list';
                    }
                });
            }
        }
    },
    coatController: {
        CoatsCtrl: function($scope, $http, CoatService) {
            CoatService.loadCoats($http, $scope);
        }
    },
    breedController: {
        BreedsCtrl: function($scope, $http, BreedService) {
            BreedService.loadBreeds($http, $scope);
        }
    }
};

// registering the controllers
catShelter.controller('CatsCtrl', controllers.catController.CatsCtrl);
catShelter.controller('CatEditAddCtrl', controllers.catController.CatEditAddCtrl);
catShelter.controller('CoatsCtrl', controllers.coatController.CoatsCtrl);
catShelter.controller('BreedsCtrl', controllers.breedController.BreedsCtrl);

// services

catShelter.factory('CatService', function(){
    return {
        loadCats: function($http, $scope, callback) {
            apiRequest('GET', 'cat/listApi', $http, function(data) {
                $scope.cats = data;
                if (typeof callback === "function") {
                    callback($http, $scope, data);
                }
            })
        },

        loadCat: function($http, $scope, catId, callback) {
            apiRequest('GET', 'cat/loadCatApi?catId=' + catId, $http, function(data) {
                $scope.cat = data;
                if (typeof callback === "function") {
                    callback($http, $scope, data);
                }
            });
        },

        saveCat: function($http, $scope, cat, callback) {
            $http({
                url: URL_PREFIX +'cat/saveApi',
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                data: cat
            }).success(function(){
                if (typeof callback === "function") {
                    callback(true);
                }
                }).
                error(function() {
                    if (typeof callback === "function") {
                        callback(false);
                    }
                });
        },

        deleteCat: function($http, $scope, cat) {
            $http({
                url: URL_PREFIX + 'cat/deleteApi',
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                data: cat
            });
        }
    };
});

catShelter.factory('CoatService', function(){
    return {
        loadCoats: function($http, $scope, callback) {
            apiRequest('GET', 'coat/listApi', $http, function(data) {
                $scope.coats = data;
                if (typeof callback === "function") {
                    callback($http, $scope, data);
                }
            });
        }
    }
});

catShelter.factory('BreedService', function() {
    return {
        loadBreeds: function($http, $scope, callback) {
            apiRequest('GET', 'breed/listApi', $http, function(data) {
                $scope.breeds = data;
                if (typeof callback === "function") {
                    callback($http, $scope, data);
                }
            });
        }
    }
});