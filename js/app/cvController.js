var cvApp = angular.module("cvApp", ['ngDialog']);
cvApp.config(['$qProvider', function ($qProvider) {
    $qProvider.errorOnUnhandledRejections(false);
}]);

var cvController = cvApp.controller("cvController",
    ['$scope', '$http', 'ngDialog',
        function ($scope, $http, ngDialog) {
            //here starts the initialization of the scope/controller
            $http.get('/cv').then(function (cv) {
                //after getting response from the server - defining the scope properties, after each, angular will put the properties on the html
                $scope.headerProperties = cv.data.headerProperties;
                $scope.about = cv.data.about;
                $scope.socialNetworks = cv.data.socialNetworks;
                $scope.experience = cv.data.experience;
                $scope.platforms = cv.data.platforms;
                $scope.elementBox1 = cv.data.elementBox1;
                $scope.elementBox2 = cv.data.elementBox2;
                $scope.education = cv.data.education;
            });
            
            //declaring functions we will use later

            $scope.openEditWindow = function () {
                $scope.dialog = ngDialog.open({//opening a dialog (modal)
                    scope: $scope,
                    template: 'html/editCV.html',
                });
                $scope.dialog.closePromise.then(function() {
                    $http.get('/cv').then(function (cv) {
                        //after getting response from the server - defining the scope properties, after each, angular will put the properties on the html
                        $scope.headerProperties = cv.data.headerProperties;
                        $scope.about = cv.data.about;
                        $scope.socialNetworks = cv.data.socialNetworks;
                        $scope.experience = cv.data.experience;
                        $scope.platforms = cv.data.platforms;
                        $scope.elementBox1 = cv.data.elementBox1;
                        $scope.elementBox2 = cv.data.elementBox2;
                        $scope.education = cv.data.education;
                    });
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
                }).then(function(cv){//got response from the server
                    $scope.headerProperties = cv.data.headerProperties;
                    $scope.about = cv.data.about;
                    $scope.socialNetworks = cv.data.socialNetworks;
                    $scope.experience = cv.data.experience;
                    $scope.platforms = cv.data.platforms;
                    $scope.elementBox1 = cv.data.elementBox1;
                    $scope.elementBox2 = cv.data.elementBox2;
                    $scope.education = cv.data.education;
                    
                    $scope.dialog.close();//after finishiing to update the scope, close the dialog
                })
            }
        }]
);
