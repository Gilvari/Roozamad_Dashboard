//core modules
import {routeConfig, runConfig, datePickerConfig, errorConfig, spinnerConfig} from './shell/config'; 



//internal component
import {HeaderComponent} from './shell/headerComponent';
import {SidebarComponent} from './shell/sidebarComponent';
import {BodyComponent} from './shell/bodyComponent';
//directive
import {tagCloud} from './shell/directive';
import {uploadFile} from './shell/directive';


//controller
import {DashboardController} from './dashboard/dashboardController';
import {ArticleController} from './article/articleController';
import {SearchController} from './search/searchController';
import {NewsMapController} from './newsMap/newsMapController';
import {ProfileListController} from './profile/profileListController';
import {SocialMediaController} from './social/socialMediaController';
import {BuletinController} from './buletin/buletinController'
import {SettingController} from './setting/settingController'
import {SupportController} from './support/supportController'
import {LoginController} from './login/loginController';



//service
import {DataService} from './shell/dataService';
import { fromJson } from '@uirouter/core';



//app
angular.module('angular-jqcloud', []).directive('tagCloud', tagCloud);
angular.module('ngFileModel', []).directive('ngFileModel', uploadFile);
var app = angular.module('jahadNews',
		[
			'kendo.directives',
			'ui.router',
			'angular-jqcloud',
			'ADM-dateTimePicker',
			'ngFileModel'
		]
	)


	//config
	.config(routeConfig)
	.config(datePickerConfig)
	.config(errorConfig)
	//.config(spinnerConfig)


	//.run(runConfig)



	//components
	.component('headerComponent', HeaderComponent)
	.component('sidebarComponent', SidebarComponent)
	.component('bodyComponent', BodyComponent)



	//services
	.factory('dataService', DataService)



	//directive
	


	//controllers
	.controller('dashboardController', DashboardController)
	.controller('articleController', ArticleController)
	.controller('searchController', SearchController)
	.controller('newsMapController', NewsMapController)
	.controller('profileListController', ProfileListController)
	.controller('socialMediaController', SocialMediaController)
	.controller('buletinController', BuletinController)
	.controller('settingController', SettingController)
	.controller('supportController', SupportController)
	.controller('loginController', LoginController)




;


// handleRoutingErrors();