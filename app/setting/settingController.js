let controllerFunction = ['$scope', 'dataService', function ($scope, dataService) {
    var vm = this;


    vm.tabOptions = {
        animation: {
            open: {
                effects: "fadeIn"
            }
        }
    }





    vm.agencyGridOptions = {
        dataSource: [],
        columns: [{
            field: "row",
            title: "ردیف",
            width: 55
        }, {
            field: "title",
            title: "عنوان",
            width: 160
        }, {
            field: "category",
            title: "دسته",
            width: 100
        }, {
            field: "address",
            title: "خبرگزاری",
            width: 100
        }],
        height: 400,
        sortable: false,
        filterable: false,
        scrollable: false,
        type: "compact",
        selectable: "row",
        pageable: false
    };

    vm.profileGridOptions = {
        dataSource: [],
        columns: [{
            field: "row",
            title: "ردیف",
            width: 55
        }, {
            field: "title",
            title: "عنوان",
            width: 160
        }],
        height: 400,
        sortable: false,
        filterable: false,
        scrollable: false,
        type: "compact",
        selectable: "row",
        pageable: false
    };

    vm.telegramGridOptions = {
        dataSource: [],
        columns: [{
            field: "row",
            title: "ردیف",
            width: 55
        }, {
            field: "title",
            title: "عنوان",
            width: 160
        }, {
            field: "address",
            title: "آدرس",
            width: 100
        }],
        height: 400,
        sortable: false,
        filterable: false,
        scrollable: false,
        type: "compact",
        selectable: "row",
        pageable: false
    };

    vm.userGridOptions = {
        dataSource: [],
        columns: [{
            field: "row",
            title: "ردیف",
            width: 55
        }, {
            field: "title",
            title: "نام و نام خانوادگی",
            width: 160
        }, {
            field: "email",
            title: "آدرس ایمیل",
            width: 100
        }],
        height: 400,
        sortable: false,
        filterable: false,
        scrollable: false,
        type: "compact",
        selectable: "row",
        pageable: false
    };




    //agency
    vm.updateAgency = function () {

    }

    vm.editAgency = function () {

    }

    vm.deleteAgency = function () {

    }





    //profile
    vm.updateProfile = function () {

    }

    vm.editProfile = function () {
        
    }

    vm.deleteProfile = function () {

    }





    //Telegram
    vm.updateTelegram = function () {

    }

    vm.editTelegram = function () {
        
    }

    vm.deleteTelegram = function () {

    }





    //Telegram
    vm.updateUser = function () {

    }

    vm.editUser = function () {
        
    }

    vm.deleteUser = function () {

    }





}];

let SettingController = controllerFunction;

export {
    SettingController
}