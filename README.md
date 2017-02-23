
# web-parent-app-v2


*** installl ***

sudo npm install

bower install (if propmted always choose the 1.6 angularjs)

run/watch -> gulp (launch it again if throws an eception the first time)

build -> gulp dev

*** code *** 

routes are defined into app.js
to preload services etc into routes use:

files: {

    s:	"serviceFileName", //service, defaults to "js/services/" 
    f:	["filterFileOne","filterFileOne"],  //filter, defaults to  "js/filters/" 
    d:	["directiveFileName"] //directive, defaults to "js/directives/" 
    
}

more info on routing and lazy load here: https://www.npmjs.com/package/generator-angularify

page transitions:
the library is angular-ui-router-anim-in-out and you can customize it at will within the Main controller.
There are already event handlers and checks for the screen resolution

media queries: 
there are event handlers in the main controller

PACE.JS is the preloader

there is a toast component already installed and tested

the library necessaries are copied altogether from bower_components to /lib

azoomee-web-components is slightly modified in order to run this flavour of requirejs. Source files are now within /app

*** Gulpfile.js ***

r.js is the RequireJS optimizer , which can combine the modules that are specifies in the build profile's file , just like this:
{
    mainConfigFile: "build/main.js",
    optimize: "uglify2",
    baseUrl: "build",
    name: "main",
    out: "build/bundle.js",  //output file 
    removeCombined: true,
    generateSourceMaps: true,
    preserveLicenseComments: false,
    findNestedDependencies: true
}





