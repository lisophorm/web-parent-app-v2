define(["angular"], function (angular) {
    /**
     * this service returns a valid route definition object
     * for the angular route 'state' method
     *
     * @type {*|module}
     */
    angular.module('routeResolver', [])
        .provider('routeResolver', function () {

            this.$get = function () {
                return this;
            };

            /**
             * configuration object
             */
            this.routeConfig = (function () {
                var serviceDirectory = 'js/services/',
                    directiveDirectory = 'js/directives/',
                    filterDirectory = 'js/filters/',
                    controllerDirectory = 'js/controllers/',
                    viewsDirectory = 'views/',

                    setServiceDirectory = function (serviceDir) {
                        serviceDirectory = serviceDir + '/';
                    },

                    getServiceDirectory = function () {
                        return serviceDirectory;
                    },

                    setDirectiveDirectory = function (directiveDir) {
                        directiveDirectory = directiveDir + '/';
                    },

                    getDirectiveDirectory = function () {
                        return directiveDirectory;
                    },

                    setFilterDirectory = function (filterDir) {
                        filterDirectory = filterDir + '/';
                    },

                    getFilterDirectory = function () {
                        return filterDirectory;
                    },

                    setViewsDirectory = function (viewsDir) {
                        viewsDirectory = viewsDir + '/';
                    },

                    getViewsDirectory = function () {
                        return viewsDirectory;
                    },

                    setControllerDirectory = function (controllerDir) {
                        controllerDirectory = controllerDir + '/';
                    },
                    getControllerDirectory = function () {
                        return controllerDirectory;
                    };

                return {
                    setServiceDirectory: setServiceDirectory,
                    getServiceDirectory: getServiceDirectory,
                    setViewsDirectory: setViewsDirectory,
                    getViewsDirectory: getViewsDirectory,
                    setControllerDirectory: setControllerDirectory,
                    getControllerDirectory: getControllerDirectory,
                    setDirectiveDirectory: setDirectiveDirectory,
                    getDirectiveDirectory: getDirectiveDirectory,
                    setFilterDirectory: setFilterDirectory,
                    getFilterDirectory: getFilterDirectory
                };
            }());

            /**
             * build and return the route defniation object
             */
            this.route = function (routeConfig) {
                var wrapResolve = function (route) {
                    var customCtrl = false;
                    if (route) {
                        // if loader provide check(), then check it


                        var files = route.files;

                        var state = route.name,
                            viewDir = routeConfig.getViewsDirectory() + state + "/",
                            controllDir = routeConfig.getControllerDirectory() + state + "/";

                        if (typeof route.templateUrl === 'undefined') {
                            route.templateUrl = viewDir + state + ".html";
                            console.log('**** templateUrl was undefined', route.templateUrl);

                        }




                        console.log('**** actual route controller:', route.controller);
                        if (typeof route.controller === 'undefined') {
                            console.log('**** controller is undefined');
                            route.controller = state.charAt(0).toUpperCase() + state.slice(1) + "Ctrl as " + state;
                        } else {
                            customCtrl = true;
                        }

                        route.resolve = angular.extend(route.resolve || {}, {
                            __load__: ['$q', '$rootScope', function ($q, $rootScope) {

                                /**
                                 * init the dependencies array
                                 * @type {Array}
                                 */
                                console.log("*********** controller name", controllDir, customCtrl, route.controllerFile);

                                if (typeof route.controllerFile === 'undefined') {
                                    console.log("*********** controller file is 'undefined'");
                                    var dependencies = [controllDir + state + ".js"];

                                } else {
                                    console.log("*********** controller file", route.controllerFile);

                                    var dependencies = ['js/' + route.controllerFile];
                                }

                                /**
                                 * add services to dependencies array
                                 */
                                if (angular.isArray(files) || typeof files == 'string') {
                                    files = {s: files};
                                }
                                if (files) {
                                    var dirConfig = {
                                        "f": "Filter",
                                        "s": "Service",
                                        "d": "Directive"
                                    };
                                    for (var i in files) {
                                        var dir = routeConfig['get' + dirConfig[i] + 'Directory']();
                                        var _temp = files[i];
                                        files[i] = angular.isArray(_temp) ? _temp : [_temp];
                                        for (var j in files[i]) {
                                            dependencies.push(dir + files[i][j] + '.js');
                                        }
                                    }
                                }
                                return resolveDependencies($q, $rootScope, dependencies);
                            }]
                        });
                    }
                };
                return {
                    wrapResolve: wrapResolve
                }
            }(this.routeConfig);

//
            /**
             * load the required dependencies, resolve
             * a promise on sucsses
             * @param $q
             * @param $rootScope
             * @param dependencies
             * @returns {Function|promise}
             */
            resolveDependencies = function ($q, $rootScope, dependencies) {
                var defer = $q.defer();
                require(dependencies, function () {
                    defer.resolve();
                    $rootScope.$apply()
                });
                return defer.promise;
            };

        })

});
