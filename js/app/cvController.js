var cvApp = angular.module("cvApp", ['ngDialog']);
cvApp.config(['$qProvider', function ($qProvider) {
    $qProvider.errorOnUnhandledRejections(false);
}]);

var cvController = cvApp.controller("cvController",
    ['$scope', '$http', '$q', 'ngDialog',
        function ($scope, $http, $q, ngDialog) {
            $http.get('/cv').then(function (cv) {
                $scope.headerProperties = cv.data.headerProperties;
                $scope.about = cv.data.about;
                $scope.socialNetworks = cv.data.socialNetworks;
                $scope.experience = cv.data.experience;
                $scope.platforms = cv.data.platforms;
                $scope.elementBox1 = cv.data.elementBox1;
                $scope.elementBox2 = cv.data.elementBox2;
                $scope.education = cv.data.education;
            });

            $scope.openEditWindow = function () {
                $scope.dialog = ngDialog.open({
                    scope: $scope,
                    template: 'html/editCV.html',
                });
            };

            $scope.submitEditForm = function () {
                $http.put('/editCv', {
                    headerProperties: $scope.headerProperties,
                    about: $scope.about,
                    socialNetworks: $scope.socialNetworks,
                    experience: $scope.experience,
                    platforms: $scope.platforms,
                    elementBox1: $scope.elementBox1,
                    elementBox2: $scope.elementBox2,
                    education: $scope.education,
                }).then(function(cv){
                    $scope.headerProperties = cv.data.headerProperties;
                    $scope.about = cv.data.about;
                    $scope.socialNetworks = cv.data.socialNetworks;
                    $scope.experience = cv.data.experience;
                    $scope.platforms = cv.data.platforms;
                    $scope.elementBox1 = cv.data.elementBox1;
                    $scope.elementBox2 = cv.data.elementBox2;
                    $scope.education = cv.data.education;
                    $scope.dialog.close();
                });
            }
        }]
);
