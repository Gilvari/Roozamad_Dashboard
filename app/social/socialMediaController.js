let controllerFunction = ['$scope', '$timeout', 'dataService', function ($scope, $timeout, dataService) {
    var vm = this;
    vm.listNews = [];
    vm.infoData = {};
    vm.socialSelect = [];

    vm.buttonGroupOptions = {
        selection: "multiple",
        select: function (e) {
            var buttonGroup = e.sender;
            var current = buttonGroup.current();
            $scope.$apply(function () {

                vm.socialSelect = [];
                vm.infoData = {};
            });
            angular.forEach(current, function (value) {
                vm.socialSelect.push({
                    id: value.id,
                    title: value.innerText
                });
            });
            getData(vm.socialSelect);
        }
    }

    vm.dropDownOptions = {
        dataSource: [],
        dataTextField: "name",
        dataValueField: "id",
        index: 0,
        //change: onChange,
        noDataTemplate: 'داده ای وجود ندارد!',
        optionLabel: {
            name: "یک آیتم انتخاب کنید ...",
            id: ""
        }
    }

    constructor();

    //call them
    function constructor() {
        //getListNews();
    }

    function getData(data) {
        if (!data || data.length == 0)
            return {};
        dataService.getSocialInfo(data).then(function (result) {
            angular.copy(result.data, vm.infoData);
        }, function (error) {
            throw error;
        });
    }

    function getListNewsBySearch(key) {
        //listNews
        dataService.getListNewsBySearch(key).then(function (result) {
            angular.copy(result.data, vm.listNews);
        }, function (error) {
            throw error;
        })
    }



    //shared functions
    vm.search = function (frm) {
        if (!vm.searchKeyword || vm.searchKeyword.length < 0)
            alertify.error("حداقل سه حرف برای جستجو لازم است");

        else
            getListNewsBySearch(vm.searchKeywork);

    }

}];


let SocialMediaController = controllerFunction;

export {
    SocialMediaController
}