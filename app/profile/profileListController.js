let controllerFunction = ['$scope', '$timeout', '$state', '$stateParams', 'dataService', function ($scope, $timeout, $state, $stateParams, dataService) {
    var vm = this;
    var graphDataUrl = '/api/profile/graphData.json';

    vm.profileData = {};
    vm.profileData.quote = [];
    vm.profileData.listNews = [];

    if ($stateParams.profileId) {
        getProfileData(profileId);
       

    }
    getProfileList();
    
    var profileId = $stateParams.profileId;

    vm.dropDownOptions = {
        dataSource: [],
        optionLabel: 'انتخاب کنید...',
        dataTextField: "value",
        dataValueField: "value"
    };
    function getProfileList() {
        dataService.getProfileList().then(function (result) {
            $timeout(function () {
                $scope.$apply(function () {
                    var select = $("#profile-dropdown").data("kendoDropDownList");
                    var text = result.data;
                    var res = new Array();
                    text.map(function(value){
res.push({
    "value":value
});
                    });
                    select.dataSource.data(res);
                });
            });
        }, function (error) {
            alertify.error(error.data);
        });
    };
    vm.chartOptions = {
        dataSource: {
            data: vm.profileData.chartData
        },
        legend: {
            visible: false
        },
        chartArea: {
            background: ""
        },
        seriesDefaults: {
            labels: {
                visible: true,
                background: "transparent",
                template: "#= category #: \n #= value#%"
            }
        },
        series: [{
            type: "pie",
            startAngle: 100,
            data: vm.profileData.chartData
        }],
        tooltip: {
            visible: true,
            format: "{0}%"
        }
    };
    function toChartData(data) {
        var chartData = {topics: [], numbers: []};
    
        const keys = Object.keys(data);
        for (const key of keys) {
            chartData.topics.push(key);
            chartData.numbers.push(data[key]);
        }
    
        return chartData;
    }
 //topics
 function getProfileTopics (keyword) {
    dataService.getProfileTopicsData(keyword).then(function (result) {
        $timeout(function () {
            $scope.$apply(function () {

               var data = toChartData(result.data);
                $("#today-topics").kendoChart({
                    title: {
                        text: "تعداد خبر بر حسب زمان"
                    },
                    legend: {
                        // visible: false,
                        position: "top"
                    },
                    seriesDefaults: {
                        type: "column"
                    },
                    seriesColors: ["#E3E7DE", "#E3E7DE"],
                    series: [{
                        name: "خبرهای این موضوع",
                        data: angular.copy(data.numbers)
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
                            rotation: "60"
                        }
                    },
                    categoryAxis: {
                        categories: angular.copy(data.topics),
                        majorGridLines: {
                            visible: false
                        },
                        labels: {
                            rotation: "60"
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





    vm.search = function () {
        if (!vm.searchKeyword || vm.searchKeyword.length < 2) {
            alertify.error("تعداد حروف جستجو نمی تواند کمتر از دو حرف باشد.")
            return;
        }

        // dataService.searchProfile(vm.searchKeyword).then(function (result) {
        //     $timeout(function () {
        //         $scope.$apply(function () {
        //             getProfileData(result.data.id);
        //         });
        //     });
        // }, function (error) {
        //     alertify.error(error.data);
        // });
        
            dataService.getProfileData(vm.searchKeyword).then(function (result) {
                $timeout(function () {
                    $scope.$apply(function () {
                        
                        angular.copy(result.data, vm.profileData);
                        getProfileTopics(vm.searchKeyword);
                        constructor();
                        var chart = $('#chart-elem').data('kendoChart');
                        chart.setOptions({
                            series: [{
                                type: "pie",
                                startAngle: 100,
                                data: vm.profileData.chartData
                            }]
                        });
                        chart.refresh();
                    });
                });
                
            }, function (error) {
                alertify.error(error.message);
            });
        


            
    }
    function getQuote () {
        vm.profileData.quote = [];

        // dataService.searchProfile(vm.searchKeyword).then(function (result) {
        //     $timeout(function () {
        //         $scope.$apply(function () {
        //             getProfileData(result.data.id);
        //         });
        //     });
        // }, function (error) {
        //     alertify.error(error.data);
        // });
        
            dataService.getQuoteData(vm.searchKeyword).then(function (result) {
                $timeout(function () {
                    $scope.$apply(function () {
                        vm.profileData.quote  = result.data;
                        // angular.copy(result.data, vm.profileData.quote );
                       
                       
                    });
                });
            }, function (error) {
                alertify.error(error.message);
            });
        


            
    }

    //call them
    function constructor() {
        getQuote( );
        var g = document.querySelector("#sigma-container");
        var p = g.parentNode;
        p.removeChild(g);
        var c = document.createElement('div');
        c.setAttribute('id', 'sigma-container');
        p.appendChild(c);

        var s = new sigma({
            graph: vm.profileData.graphData,
            container: 'sigma-container',
            settings: {
                defaultNodeColor: '#ec5148'
            }
        });
        s.refresh();
    }


    // function getProfileData(id) {
    //     dataService.getProfileData(id).then(function (result) {
    //         $timeout(function () {
    //             $scope.$apply(function () {
    //                 angular.copy(result.data, vm.profileData);
    //                 constructor();
    //                 var chart = $('#chart-elem').data('kendoChart');
    //                 chart.setOptions({
    //                     series: [{
    //                         type: "pie",
    //                         startAngle: 100,
    //                         data: vm.profileData.chartData
    //                     }]
    //                 });
    //                 chart.refresh();
    //             });
    //         });
    //     }, function (error) {
    //         alertify.error(error.message);
    //     })
    // }


}];


let ProfileListController = controllerFunction;

export {
    ProfileListController
}