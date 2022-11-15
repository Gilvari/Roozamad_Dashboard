let controllerFunction = ['$scope', '$timeout', 'dataService', function ($scope, $timeout, dataService) {
    var vm = this;


    vm.mapData = {};
    vm.currentTip = '';
    vm.mapData.c51 = 1500;
    vm.mapData.c21 = 2500;
    var jalaali = require('jalaali-js');
    function getLastWeek() {
        var today = new Date();
        var lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
        return lastWeek;
      }
      var today = getToday();
      var todayMonth = today.getMonth() + 1;
      var todayDay = today.getDate();
      var todayYear = today.getFullYear();
      vm.todayDisplayPadded = todayYear+"-" +todayMonth+"-" +todayDay ;

      function getToday() {
        var today = new Date();
        var lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() );
        return lastWeek;
      }

      var lastWeek = getLastWeek();
      var lastWeekMonth = lastWeek.getMonth() + 1;
      var lastWeekDay = lastWeek.getDate();
      var lastWeekYear = lastWeek.getFullYear();
      
      vm.lastWeekDisplayPaddedGEO = lastWeekYear+"-" +lastWeekMonth+"-" +lastWeekDay ;

      var lastWeek = getLastWeek();
      var lastWeekMonth = lastWeek.getMonth() + 1;
      var lastWeekDay = lastWeek.getDate();
      var lastWeekYear = lastWeek.getFullYear();
      vm.lastWeekDisplay = jalaali.toJalaali(lastWeekYear, lastWeekMonth, lastWeekDay);
      vm.lastWeekDisplayPadded = vm.lastWeekDisplay.jy+"/" +vm.lastWeekDisplay.jm+"/" +vm.lastWeekDisplay.jd ;
      init();

    vm.search = function () {
        if (!vm.endDate || vm.endDate.length < 2 || !vm.startDate || vm.startDate.length < 2) {
            alertify.error("اطلاعات صحیح نیست.");
            return;
        }

        dataService.searchForMap(vm.startDate, vm.endDate).then(function (result) {
            $timeout(function () {
                $scope.$apply(function () {
                    vm.mapData = angular.copy(result.data);
                });
            });
        }, function (error) {
            alertify.error(error.data);
        });
    }
function init(){
    dataService.searchForMap(vm.todayDisplayPadded, vm.lastWeekDisplayPaddedGEO).then(function (result) {
        $timeout(function () {
            $scope.$apply(function () {
                vm.mapData = angular.copy(result.data);
            });
        });
    }, function (error) {
        alertify.error(error.data);
    });
}

    vm.showTooltip = function (evt, city, text) {
        let tooltip = document.getElementById("tooltip");
        tooltip.innerHTML = 'تعداد خبرهای ثبت شده: ' + city;
        tooltip.style.display = "block";
        var isToggled = document.getElementById("sidebar").classList.contains("sidebar-toggle");
        var isMoreThan700 = window.innerWidth > 700;
        tooltip.style.right = isToggled && isMoreThan700 ? '150px' : '20px';
        tooltip.style.top = '30%';
    }

    vm.hideTooltip = function (evt, city) {

        var tooltip = document.getElementById("tooltip");
        tooltip.style.display = "none";
    }



}];

let NewsMapController = controllerFunction;

export {
    NewsMapController
}