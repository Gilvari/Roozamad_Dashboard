import {GregorianToHijri, FormatHijriDate}      from './common';
import {TraceNodes} 		                    from './common';
import {ToggleSidebar}                          from './common';


let controllerFunction = function () {

    var vm = this;
    vm.toggleSidebar = ToggleSidebar;


    //constructor
    (function(){
        getDate();
        localizeNumbers();
        events();
    })();


    function getDate () {
        var date = new Date();
        var hDate = GregorianToHijri(date);
        var result = FormatHijriDate(hDate);
        document.getElementById('time').innerHTML = result;
    }
    
    function localizeNumbers() {
        TraceNodes(document);
    }
    
    function events() {
        document.getElementById('sidebar-toggle').addEventListener("click", ToggleSidebar);
    }
 
}

let HeaderComponent = {
    templateUrl: './app/shell/headerTemplate.html',
    controller: controllerFunction
}

export {HeaderComponent};