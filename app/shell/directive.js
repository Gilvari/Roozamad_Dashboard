let tagCloud = ['$parse', function ($parse) {
    var defaults = jQuery.fn.jQCloud.defaults.get(),
        jqcOptions = [];

    for (var opt in defaults) {
        if (defaults.hasOwnProperty(opt)) {
            jqcOptions.push(opt);
        }
    }

    return {
        restrict: 'E',
        template: '<div></div>',
        replace: true,
        scope: {
            words: '=words',
            afterCloudRender: '&'
        },
        link: function ($scope, $elem, $attr) {
            var options = {};

            for (var i = 0, l = jqcOptions.length; i < l; i++) {
                var opt = jqcOptions[i];
                var attr = $attr[opt] || $elem.attr(opt);
                if (attr !== undefined) {
                    options[opt] = $parse(attr)();
                }
            }

            if ($scope.afterCloudRender) {
                options.afterCloudRender = $scope.afterCloudRender;
            }

            angular.element(document).ready(function () {

                jQuery($elem).jQCloud($scope.words, options);

                $scope.$watchCollection('words', function () {
                    $scope.$evalAsync(function () {
                        var words = [];
                        $.extend(words, $scope.words);
                        jQuery($elem).jQCloud('update', words);
                    });
                });

                $elem.bind('$destroy', function () {
                    jQuery($elem).jQCloud('destroy');
                });

            });
        }
    };
}];

let uploadFile =  ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var model = $parse(attrs.ngFileModel);
            var isMultiple = attrs.multiple;
            var modelSetter = model.assign;
            element.bind('change', function () {
                var values = [];
                angular.forEach(element[0].files, function (item) {
                    var value = {
                       // File Name 
                        name: item.name,
                        //File Size 
                        size: item.size,
                        //File URL to view 
                        url: URL.createObjectURL(item),
                        // File Input Value 
                        _file: item
                    };
                    values.push(value);
                });
                scope.$apply(function () {
                    if (isMultiple) {
                        modelSetter(scope, values);
                    } else {
                        modelSetter(scope, values[0]);
                    }
                });
            });
        }
    };
}];
//export
export {
    tagCloud,
    uploadFile
}