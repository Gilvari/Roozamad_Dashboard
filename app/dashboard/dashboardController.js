let controllerFunction = ['$scope', '$timeout', '$state', 'dataService', function ($scope, $timeout, $state, dataService) {
    var vm = this;


    $scope.colors = ["#800026", "#bd0026", "#e31a1c", "#fc4e2a", "#fd8d3c", "#feb24c", "#fed976"];
    $scope.todayWords = [];
    $scope.weekWords = [];
    $scope.monthWords = [];
    $scope.listNews = [];
    vm.dashboardSummery = {};

    var jalaali = require('jalaali-js');
    function getLastWeek() {
        var today = new Date();
        var lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
        return lastWeek;
      }
      function getToday() {
        var today = new Date();
        var lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() );
        return lastWeek;
      }
      function getlastDay() {
        var today = new Date();
        var lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() -1 );
        return lastWeek;
      }
      function getLastMount() {
        var today = new Date();
        var lastWeek = new Date(today.getFullYear(), today.getMonth()-1 , today.getDate() );
        return lastWeek;
      }
      var lastWeek = getLastWeek();
      var lastWeekMonth = lastWeek.getMonth() + 1;
      var lastWeekDay = lastWeek.getDate();
      var lastWeekYear = lastWeek.getFullYear();
      
      vm.lastWeekDisplayPadded = lastWeekYear+"-" +lastWeekMonth+"-" +lastWeekDay ;
     
      var LastMount = getLastMount();
      var lastMonthMonth = LastMount.getMonth() ;
      var lastMonthDay = LastMount.getDate();
      var lastMonthYear = LastMount.getFullYear();
   
      vm.lastMonthDisplayPadded = lastMonthYear+"-" +lastMonthDay+"-" +lastMonthMonth ;


      

      var today = getToday();
      var todayMonth = today.getMonth() + 1;
      var todayDay = today.getDate();
      var todayYear = today.getFullYear();
      vm.todayDisplayPadded = todayYear+"-" +todayMonth+"-" +todayDay ;


      var today = getlastDay();
      var todayMonth = today.getMonth() + 1;
      var todayDay = today.getDate();
      var todayYear = today.getFullYear();
      vm.lastDayDisplayPadded = todayYear+"-" +todayMonth+"-" +todayDay ;
    //options
    vm.mainGridOptions = {

        // dataSource: {
        //     transport: {
        //         read: {
        //             url: apis.recentNews,
        //         }
        //         //parameterMap: function (data, type) {
        //         //    return kendo.stringify(data);
        //         //}
        //     },
        //     schema: {
        //         data: "data",
        //         total: "total"
        //     },
        //     serverPaging: true,
        //     pageSize: 10
        // },
        dataSource: [],
        columns: [{
            field: "topic",
            title: "عنوان",
            width: 600
        }, { width: 1},{
            field: "publishDate",
            title: "تاریخ",
            width: 130
        },
        {
            field: "publishTime",
            title: "زمان",
            width: 80
        }, {
            field: "agency",
            title: "خبرگزاری",
            width: 200
        }],
        height: 478,
        
        sortable: false,
        filterable: false,
        scrollable: true,
        type: "compact",
        selectable: "row",
        change: onChangeGrid
    };

    vm.tabOptions = {
        animation: {
            open: {
                effects: "fadeIn"
            }
        }
    };



    //shared functions
    vm.refresh = function () {
        getTodayCloudWord();
        getWeekCloudWord();
        getMonthCloudWord();
        getRecentlyNews();
        getListNews();
        getNewsInformation();
        getAgencies();
        getTodayTopics();
        getWeekTopics();
        getMonthTopics();
    };


    //call them
    vm.refresh();


    function getNewsInformation() {
        dataService.getNewsInformation().then(function (result) {
            angular.copy(result.data, vm.dashboardSummery);
        }, function (error) {
            alertify.error(error.data);
        })
    }



    //cloud words
    function getTodayCloudWord() {
        
        dataService.getCloudWord(vm.todayDisplayPadded,vm.lastDayDisplayPadded).then(function (result) {
            $timeout(function () {
                var res = new Array();
            $.each(result.data,(key,value)=>{
res.push({
    "text":key,
    "weight":value
});
            });

      
               
                $scope.$apply(function () {
                    angular.copy(res, $scope.todayWords);
                });
            }, 500);
        }, function (error) {
            alertify.error(error.data);
        });
    }

    function getWeekCloudWord() {
        dataService.getCloudWord(vm.todayDisplayPadded,vm.lastWeekDisplayPadded).then(function (result) {
            
            $timeout(function () {
                var res = new Array();
            $.each(result.data,(key,value)=>{
res.push({
    "text":key,
    "weight":value
});
            });

      
               
                $scope.$apply(function () {
                    angular.copy(res, $scope.weekWords);
                });
            }, 500);
        }, function (error) {
            alertify.error(error.data);
        });
    }

    function getMonthCloudWord() {
        dataService.getCloudWord(vm.todayDisplayPadded,vm.lastMonthDisplayPadded).then(function (result) {

            $timeout(function () {
                var res = new Array();
            $.each(result.data,(key,value)=>{
res.push({
    "text":key,
    "weight":value
});
            });

      
               
                $scope.$apply(function () {
                    angular.copy(res, $scope.monthWords);
                });
            }, 500);

        }, function (error) {
            alertify.error(error.data);
        });
    }


    function toChartData(data) {


var provincis = [
    '\"استان ها\"',
    '\"خراسان رضوی\"',
    '\"کرمان\"',
    '\"البرز\"',
    '\"گیلان\"',
    '\"زنجان\"',
    '\"آبادان\"',
    '\"آذربایجان شرقی\"',
    '\"اصفهان\"',
    '\"قزوین\"',
    '\"کهگیلویه و بویراحمد\"',
    '\"کردستان\"',
    '\"اردبیل\"',
    '\"کیش\"',
    '\"تهران\"',
    '\"هرمزگان\"',
    '\"مرکزی\"',
    '\"مازندران\"',
    '\"کرمانشاه\"',
    '\"قم\"',
    '\"بوشهر\"',
    '\"خراسان جنوبی\"',
    '\"آذربایجان غربی\"',
    '\"ایلام\"',
    '\"چهارمحال و بختیاری\"',
    '\"مهاباد\"',
    '\"یزد\"',
    '\"فارس\"',
    '\"سمنان\"',
    '\"گلستان\"',
    '\"خراسان شمالی\"',
    '\"همدان\"',
    '\"لرستان\"',
    '\"خوزستان\"',
    '\"سیستان و بلوچستان\"'
]

        var chartData = {topics: [], numbers: []};
    
        const keys = Object.keys(data);
        var provincisCount =0;
        for (const key of keys) {
            if(provincis.includes(key))
            {
                  provincisCount += data[key];
continue;
            }

            chartData.topics.push(key);
            chartData.numbers.push(data[key]);
        }
     chartData.topics.push("استانها");
            chartData.numbers.push(provincisCount);
        return chartData;
    }

    //topics
    function getTodayTopics () {
        dataService.getTopicsData(vm.todayDisplayPadded,vm.lastDayDisplayPadded).then(function (result) {
            $timeout(function () {
                $scope.$apply(function () {
                    var ChartData = toChartData(result.data);
                    $("#today-topics").kendoChart({
                        title: {
                            text: "خبرهای هر موضوع"
                        },
                        legend: {
                            visible: false
                        },
                        seriesDefaults: {
                            type: "bar"
                        },
                        seriesColors: ["#E3E7DE", "#E3E7DE"],
                        series: [{
                            name: "خبرهای این موضوع",
                            data: angular.copy(ChartData.numbers)
                        }],
                        valueAxis: {
                            max: 1000,
                            line: {
                                visible: false
                            },
                            minorGridLines: {
                                visible: true
                            },
                            labels: {
                                rotation: "auto"
                            }
                        },
                        categoryAxis: {
                            categories: angular.copy(ChartData.topics),
                            majorGridLines: {
                                visible: false
                            }
                        },
                        tooltip: {
                            visible: true,
                            template: "#= series.name #: #= value #"
                        }
                    });
        
                });
            }, 500);
        }, function (error) {
            alertify.error(error.data);
        });
    }

    function getWeekTopics () {
        dataService.getTopicsData(vm.todayDisplayPadded,vm.lastWeekDisplayPadded).then(function (result) {
            $timeout(function () {
                $scope.$apply(function () {
                    var ChartData = toChartData(result.data);
                    $("#week-topics").kendoChart({
                        title: {
                            text: "خبرهای هر موضوع"
                        },
                        legend: {
                            visible: false
                        },
                        seriesDefaults: {
                            type: "bar"
                        },
                        seriesColors: ["#E3E7DE", "#E3E7DE"],
                        series: [{
                            name: "خبرهای این موضوع",
                            data: angular.copy(ChartData.numbers)
                        }],
                        valueAxis: {
                            max: 140000,
                            line: {
                                visible: false
                            },
                            minorGridLines: {
                                visible: true
                            },
                            labels: {
                                rotation: "auto"
                            }
                        },
                        categoryAxis: {
                            categories: angular.copy(ChartData.topics),
                            majorGridLines: {
                                visible: false
                            }
                        },
                        tooltip: {
                            visible: true,
                            template: "#= series.name #: #= value #"
                        }
                    });                });
            }, 500);
        }, function (error) {
            alertify.error(error.data);
        });
    }

    function getMonthTopics () {
        dataService.getTopicsData(vm.todayDisplayPadded,vm.lastMonthDisplayPadded).then(function (result) {
            $timeout(function () {
                var ChartData = toChartData(result.data);
                $("#month-topics").kendoChart({
                    title: {
                        text: "خبرهای هر موضوع"
                    },
                    legend: {
                        visible: false
                    },
                    seriesDefaults: {
                        type: "bar"
                    },
                    seriesColors: ["#E3E7DE", "#E3E7DE"],
                    series: [{
                        name: "خبرهای این موضوع",
                        data: angular.copy(ChartData.numbers)
                    }],
                    valueAxis: {
                        max: 140000,
                        line: {
                            visible: false
                        },
                        minorGridLines: {
                            visible: true
                        },
                        labels: {
                            rotation: "auto"
                        }
                    },
                    categoryAxis: {
                        categories: angular.copy(ChartData.topics),
                        majorGridLines: {
                            visible: false
                        }
                    },
                    tooltip: {
                        visible: true,
                        template: "#= series.name #: #= value #"
                    }
                });
            }, 500);
        }, function (error) {
            alertify.error(error.data);
        });
    }






    function getRecentlyNews() {
        dataService.getRecentlyNews().then(function (result) {
            var grid = angular.element("#recent-news").data("kendoGrid");
            grid.setDataSource(new kendo.data.DataSource({
                data: result.data
            }));
        }, function (error) {
            alertify.error(error.data);
        });
    }




    function getListNews() {
        //listNews
        dataService.getListNews().then(function (result) {
            angular.copy(result.data, $scope.listNews);
        }, function (error) {
            throw error;
        })
    }

    function onChangeGrid(e) {
        var selectedRow = this.select();
        vm.selectedNews = this.dataItem(selectedRow[0]);
        $state.go("article", {
            newsId: vm.selectedNews.id
        });
    }


    function getAgencies() {
        if (agencies.length > 0)
            return;
            
        dataService.getAgencies().then(function (result) {
            agencies = [];
            angular.forEach(result.data, function(value){
                agencies.push(value);
            });
        }, function (error) {
            throw error;
        })
    }


}];

let DashboardController = controllerFunction;

export {
    DashboardController
}