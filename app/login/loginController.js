let controllerFunction = ['$scope', '$state', 'dataService', function ($scope, $state, dataService) {
    var vm = this;

    vm.username = '';
    vm.password = '';


    vm.login = function () {
        if (vm.username.length < 1 || vm.password.length < 1)
        {
            alertify.error('اطلاعات به درستی وارد نشده است.');
            return;
        }



        dataService.login(vm.username, vm.password).then(function (result) {
            $state.go('dashboard');
        }, function (error) {
            alertify.error('اطلاعات به درستی وارد نشده است.');
            return;
            alertify.error(error.data);
        });
    }

}];

let LoginController = controllerFunction;

export {
    LoginController
}