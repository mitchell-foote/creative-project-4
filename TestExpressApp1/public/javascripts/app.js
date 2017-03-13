var app = window.angular.module('app', [])

app.controller('mainCtrl', mainCtrl);

function mainCtrl($scope, $http) {

    $scope.CarmenClue = "Ready to begin?";
    $scope.CityGuess = "BYU";

    $scope.CurrentQuestion = -1;
    $scope.CarmenComment = "I hope you're ready detective... Go ahead and search this location.";
    $scope.NumberOfAnswered = 0;
    $scope.CurrentLocation = "BYU";
    $scope.GetNextQuestion = function () {
        var formData = {
            questionNumber: $scope.CurrentQuestion
        }
        var carmenURL = '/carmen';
        $http({
            url: carmenURL,
            method: "GET",
            data: formData
        }).success(function (data, status, headers, config) {
            console.log("Next Question Recieved");
            $scope.CarmenComment = data.message;
            $scope.CarmenClue = data.clue;
        }).error(function (data, status, headers, config) {
            console.log("Next Question Failure");
            alert("Carmen has gone dark. Come back again later");
        })
    }
    $scope.GetQuess = function () {
        debugger;
        var formData = {
            currentQuestion: $scope.CurrentQuestion,
            guess: document.getElementById("location").innerHTML,
            numberCorrect: $scope.NumberOfAnswered
        }
        var URL = '/guess';
        $http({
            url: URL,
            method: "POST",
            data: formData
        }).success(function (data, status, headers, config) {
            console.log("Sent data recieved");
            if (data.isCorrect) {
                $scope.CarmenComment = data.message;
                if (data.continue) {
                    $scope.CurrentQuestion = data.nextQuestion;
                    $scope.NumberOfAnswered = $scope.NumberOfAnswered + 1;
                    $scope.GetNextQuestion();
                }
            }
            else {
                $scope.CarmenComment = data.message;
            }
        }).error(function (data, status, headers, config) {
            debugger;
            console.log("Get failed");
        })
    }

}