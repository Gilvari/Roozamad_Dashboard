let controllerFunction = ['$scope', '$timeout', 'dataService', function ($scope, $timeout, dataService) {
    var vm = this;
    vm.bulletinModel = {};
    vm.selectedModel = null;
    var jalaali = require('jalaali-js');
    function getLastWeek() {
        var today = new Date();
        var lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
        return lastWeek;
      }
      
      var lastWeek = getLastWeek();
      var lastWeekMonth = lastWeek.getMonth() + 1;
      var lastWeekDay = lastWeek.getDate();
      var lastWeekYear = lastWeek.getFullYear();
      vm.lastWeekDisplay = jalaali.toJalaali(lastWeekYear, lastWeekMonth, lastWeekDay);
      vm.lastWeekDisplayPadded = vm.lastWeekDisplay.jy+"/" +vm.lastWeekDisplay.jm+"/" +vm.lastWeekDisplay.jd ;
      

    //kendo options
    vm.dropDownOptions = {
        dataSource: [],
        optionLabel: 'انتخاب کنید...',
        dataTextField: "value",
        dataValueField: "value"
    };

    vm.multiOptions = {
        placeholder: "خبرگزاری را انتخاب کنید...",
        dataTextField: "name",
        dataValueField: "name",
        dataSource: []
    };

    vm.mainGridOptions = {
        dataSource: [],
        columns: [{
            field: "title",
            title: "عنوان",
            width: 300
        }, {
            field: "category",
            title: "دسته",
            width: 300
        }, {
            field: "agency",
            title: "خبرگزاری",
            width: 300
        }, {
            field: "keyword",
            title: "کلمه کلیدی",
            width: 300
        }],
        height: 500,
        sortable: false,
        filterable: false,
        scrollable: false,
        selectable: "row",
        pageable: {
            refresh: false,
            pageSizes: [5, 10, 20, 50, 100, 1000],
            messages: {
                    itemsPerPage: 'تعداد اقلام در هر صفحه',
                    display: '{2} آیتم {0} الی {1} از',
                    empty: 'اطلاعاتی جهت نمایش یافت نشد',
                    first: 'حرکت به اولین صفحه',
                    previous: 'حرکت به صفحه قبل',
                    next: 'حرکت به صفحه بعد',
                    last: 'حرکت به آخرین صفحه'
                }
        },
        change: function () {
            var selectedRow = this.select();
            vm.selectedModel = this.dataItem(selectedRow[0]);
        }
    };

    vm.agencyGridOptions = {
        dataSource: [],
        columns: [{
            field: "title",
            title: "عنوان",
            width: 400
        }, {
            field: "agency",
            title: "خبرگزاری",
            width: 400
        }, {
            field: "description",
            title: "توضیحات",
            width: 400
        }],
        height: 542,
        sortable: false,
        filterable: false,
        scrollable: false,
        selectable: "row",
        pageable: {
            refresh: false,
            pageSizes: [5, 10, 20, 50, 100, 1000],
            messages: {
                    itemsPerPage: 'تعداد اقلام در هر صفحه',
                    display: '{2} آیتم {0} الی {1} از',
                    empty: 'اطلاعاتی جهت نمایش یافت نشد',
                    first: 'حرکت به اولین صفحه',
                    previous: 'حرکت به صفحه قبل',
                    next: 'حرکت به صفحه بعد',
                    last: 'حرکت به آخرین صفحه'
                }
        },
    };



    constructor();

    function constructor() {
        getData();
        getAgencyData();
        getCategoryList();
    }



    //methods
    function getData() {
        var username = dataService.username;
        dataService.getBulletinSet(username).then(function (result) {
            $timeout(function () {
                $scope.$apply(function () {
                    var grid = $("#bulletin-result").data("kendoGrid");
                    grid.dataSource.data(result.data);
                    grid.refresh();
                });
            });
        }, function (error) {
            alertify.error(error.data);
        });
    };

    function getAgencyData() {
        dataService.getAgencyData().then(function (result) {
            $timeout(function () {
                $scope.$apply(function () {
                    var select = $("#agency-select").data("kendoMultiSelect");
                    select.dataSource.data(result.data);
                });
            });
        }, function (error) {
            alertify.error(error.data);
        });
    };

    function getCategoryList() {
        dataService.getCategoryList().then(function (result) {
            $timeout(function () {
                $scope.$apply(function () {
                    var select = $("#category-dropdown").data("kendoDropDownList");
                    select.dataSource.data(result.data);
                });
            });
        }, function (error) {
            alertify.error(error.data);
        });
    };



    //shared
    vm.addBulletin = function () {
        vm.bulletinModel = {};
    };

    vm.editBulletin = function () {
        if (vm.selectedModel == null) {
            alertify.error("هیچ آیتمی انتخاب نشده است.");
            return;
        }
        vm.bulletinModel = angular.copy(vm.selectedModel);

        $timeout(function () {
            $("#category-dropdown").data("kendoDropDownList").select(function (dataItem) {
                return dataItem.value == vm.selectedModel.category;
            });

            $("#agency-select").data("kendoMultiSelect").value(vm.selectedModel.agency.split(';'));

        }, 300);
    };

    vm.deleteBulletin = function () {
        var username = dataService.username;
        if (vm.selectedModel == null) {
            alertify.error("هیچ آیتمی انتخاب نشده است.");
            return;
        }
        dataService.deleteBulletin(username, vm.selectedModel).then(function (result) {
            getData();
        }, function (error) {
            alertify.error(error.data);
        });
    };



    //update
    vm.update = function (data) {
        var username = dataService.username;
        selectAgency();
        if (!vm.bulletinModel || !vm.bulletinModel.title || !vm.bulletinModel.agency || !vm.bulletinModel.keyword) {
            alertify.error("اطلاعات صحیح نیست.");
            return;
        }
        dataService.update(username, data).then(function (result) {
            getData();
        }, function (error) {
            alertify.error(error.data);
        });
    }


    vm.searchBulletin = function (data) {
        var username = dataService.username;
        selectAgency();
        if (!vm.bulletinModel || !vm.bulletinModel.title || !vm.bulletinModel.agency || !vm.bulletinModel.keyword) {
            alertify.error("اطلاعات صحیح نیست.");
            return;
        }
        dataService.searchBulletin(username, data).then(function (result) {
            $timeout(function () {
                $scope.$apply(function () {
                    var grid = $("#bulletin-agency").data("kendoGrid");
                    grid.dataSource.data(result.data);
                    grid.refresh();
                });
            });
        }, function (error) {
            alertify.error(error.data);
        });
    }




    //helper
    function selectAgency() {
        var agencies = $("#agency-select").data("kendoMultiSelect").dataItems();
        if (agencies.length == 0)
        {
            vm.bulletinModel.agency = undefined;
            return;
        }
        vm.bulletinModel.agency = '';
        angular.forEach(agencies, function (value, key) {
            if (agencies.length - 1 === key)
                vm.bulletinModel.agency += value.name;
            else
                vm.bulletinModel.agency += value.name; + ';';
        });
    }

}];

let BuletinController = controllerFunction;
export {
    BuletinController
}