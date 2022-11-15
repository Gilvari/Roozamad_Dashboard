let controllerFunction = ['$scope', 'dataService', function ($scope, dataService) {
    var vm = this;


    vm.support = function () {
        if (!vm.title || vm.title.length < 1 || !vm.place || vm.place.length < 1 || !vm.description || vm.description.length < 1) {
            alertify.error("تمام فیلد ها الزامی است.");
            return;
        }


        var ticket = {};
        ticket.title = vm.title;
        ticket.description = vm.description;
        ticket.place = vm.place;
        ticket.file = vm.file;

        dataService.sendTicket(ticket).then(function (result) {
            alertify.success("اطلاعات شما با موفقیت ذخیره شد.");
        }, function (error) {
            alertify.error(error.data);
        });
    }
    $scope.file_changed = function(element) {

        $scope.$apply(function(scope) {
            var photofile = element.files[0];
            var reader = new FileReader();
            reader.onloadend = function(e) {
               // handle onload
               vm.file = reader.result;
            };
            reader.readAsDataURL(photofile);
           
           
           
            
        });
    };  
}];

let SupportController = controllerFunction;

export {
    SupportController
}