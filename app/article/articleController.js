let controllerFunction = ['$scope', '$state', '$timeout', '$stateParams', 'dataService', function ($scope, $state, $timeout, $stateParams, dataService) {
    var vm = this;
    if (!$stateParams.newsId) {
        alertify.error('اطلاعات صحیح نیست.');
        $state.go("dashboard");
    }
   
    var html = "",
    i=0;
    var newsId = $stateParams.newsId;
    var colors = ['#EBD49Ea3', '#C2465Ca3', '#7e6c88a3', '#8EA3A0a3', '#AFC3B8a3'];
    getArticleData(newsId);
    getPheraseData(newsId);
    getNerData(newsId);
  function brFixer(){
    var stringA = $("#matn").html();
    stringA = stringA.replace(/&lt;br&gt;/g, ' <br> ');
    $("#matn").html(stringA);
    
  }
  
    //methods
    function getArticleData(id) {
        dataService.getArticleData(id).then(function (result) {
            $timeout(function(){
                $scope.$apply(function(){
                     vm.news = angular.copy(result.data);
                     getSimilarData(vm.news.cluster);
                });
            }, 500);
            setTimeout(() => {
                brFixer();
              }, 1000);
        }, function (error) {
            alertify.error(error.data);
        });
       
    };
    function getPheraseData(id) {
    dataService.getArticleKeyPhrease(id).then(function (result) {
        $timeout(function(){
            $scope.$apply(function(){
                // vm.KeyPhrease[0].value;
                var text= angular.copy(result.data);
                text = text[0].value;
                vm.KeyPhrease = text.replace(/,/g, ', ');
            });
        }, 500);
    }, function (error) {
        alertify.error(error.data);
    });
};
function getNerData(id) {
    dataService.getArticleNer(id).then(function (result) {
        $timeout(function(){
            $scope.$apply(function(){
                vm.Ner = angular.copy(result.data[0].value[0]);
                FilterdNerData(vm.Ner,vm.news);
            });
        }, 500);
    }, function (error) {
        alertify.error(error.data);
    });
};
function getSimilarData(id) {
    dataService.getArticleSimilar(id).then(function (result) {
        $timeout(function(){
            $scope.$apply(function(){
                vm.Similar = angular.copy(result.data);
                
            });
        }, 500);
    }, function (error) {
        alertify.error(error.data);
    });
};
function FilterdNerData(x,matn){
    $.each(x, function (k, v) {
        var color = colors[i++];
        html +="<div>"+k+": </div>";
        $.each(v, function (phrase, location) {
         
            html += "<button data-entity='" + k + "' class='ner'style='padding: 5px;display: inline-block;background-color:" + color + ";  font-family: 'b Yekan';font-size: 13px;' >" + phrase + "</button>";
        });
        x[k]['color'] = color;
    });
     
    $('#nerList').append(html);

    // $('#newsBody').html("<div id='matn'>" + matn + "</div><br><br><br>" + html);
    $(".ner").click(function () {
        var entity = $(this).attr("data-entity");
        var phrase = $(this).text();
        var stringA = $("#matn").html().split(' ');
        var i =0;
       angular.forEach(stringA,function(s){
if(s=="<span"){
stringA.splice(i, 1);
var temp = stringA[i];
stringA[i] = "<span "+temp;
}
i++;
        });
        var filtered = stringA.filter(function (el) {
            return el != "";
          });
          
          stringA = filtered;
        $.each(x[entity][phrase], function (k, location) {
            if(!stringA[location.start].includes("<span")){
            stringA[location.start] = "<span\tstyle='background-color:" + x[entity]['color'] + "'>" + stringA[location.start];
            stringA[location.end] = stringA[location.end] + "</span>";
            }
        });

        $("#matn").html(stringA.join(' '));
    });
}

    vm.loadNews = function (id) {
        getArticleData(id);
        getPheraseData(id);
        getNerData(id);
    }

    vm.loadEntity = function (id) {
        $state.go("profilelist", {
            profileId: id
        });
    }

}];

let ArticleController = controllerFunction;

export {
    ArticleController
}