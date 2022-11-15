let routeConfig = function routing($stateProvider, $urlRouterProvider) {

	$urlRouterProvider.otherwise("/login");
	$stateProvider
		.state('login', {
			url: "/login",
			templateUrl: "./app/login/loginTemplate.html",
		})
		.state('shell', {
			url: "/",
			templateUrl: "./app/shell/shellTemplate.html",
		})
		.state('dashboard', {
			url: "dashboard",
			templateUrl: "./app/dashboard/dashboardTemplate.html",
			parent: "shell"
		})
		.state('article', {
			url: "article",
			templateUrl: "./app/article/articleTemplate.html",
			parent: "shell",
			params: {
				newsId: null
			}
		})
		.state('search', {
			url: "search",
			templateUrl: "./app/search/searchTemplate.html",
			parent: "shell"
		})
		.state('profilelist', {
			url: "profilelist",
			templateUrl: "./app/profile/profileListTemplate.html",
			parent: "shell",
			params: {
				profileId: null
			}
		})
		.state('newsmap', {
			url: "newsmap",
			templateUrl: "./app/newsMap/newsMapTemplate.html",
			parent: "shell"
		})
		.state('socialmedia', {
			url: "socialmedia",
			templateUrl: "./app/social/socialMediaTemplate.html",
			parent: "shell"
		})
		.state('buletin', {
			url: "buletin",
			templateUrl: "./app/buletin/buletinTemplate.html",
			parent: "shell"
		})
		.state('setting', {
			url: "setting",
			templateUrl: "./app/setting/settingTemplate.html",
			parent: "shell"
		})
		.state('support', {
			url: "support",
			templateUrl: "./app/support/supportTemplate.html",
			parent: "shell"
		})


};



let runConfig = function ($locationProvider) {
	$locationProvider.html5Mode(true);
};

let datePickerConfig = ['ADMdtpProvider', function (ADMdtp) {
	ADMdtp.setOptions({
		calType: 'gregorian',
		format: 'YYYY/MM/DD hh:mm',
		default: 'today'
	});
}];




let extendExceptionHandler = ['$delegate', function ($delegate) {
	return function (exception, cause) {
		$delegate(exception, cause);
		var errorData = {
			exception: exception,
			cause: cause
		};
		/**
		 * Could add the error to a service's collection,
		 * add errors to $rootScope, log errors to remote web server,
		 * or log locally. Or throw hard. It is entirely up to you.
		 * throw exception;
		 */
		alertify.error(exception.message, errorData);
	};
}];

let errorConfig = ['$provide', function ($provide) {
	$provide.decorator('$exceptionHandler', extendExceptionHandler);
}];


let handleRoutingErrors = function handleRoutingErrors() {
	$rootScope.$on('$routeChangeError',
		function (event, current, previous, rejection) {
			var destination = (current && (current.title || current.name || current.loadedTemplateUrl)) ||
				'unknown target';
			var msg = 'Error routing to ' + destination + '. ' + (rejection.message || '');
			/**
			 * Optionally log using a custom service or $log.
			 * (Don't forget to inject custom service)
			 */
			alertify.warning(msg, [current]);
		}
	);
};

let spinerConfig = ['$httpProvider', function ($httpProvider) {
	$httpProvider.responseInterceptors.push('myHttpInterceptor');
	var spinnerFunction = function (data, headersGetter) {
		$('#global-spinner').show();
		return data;
	};
	$httpProvider.defaults.transformRequest.push(spinnerFunction);
}];



export {
	routeConfig,
	runConfig,
	datePickerConfig,
	errorConfig,
	handleRoutingErrors,
	spinerConfig
};