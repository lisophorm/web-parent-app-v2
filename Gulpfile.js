'use strict';

var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    rjs = require("requirejs"),
    concat = require('gulp-concat'),
    rimraf = require('gulp-rimraf'),
    minifyCSS = require("gulp-minify-css"),
    sass = require('gulp-sass'),
    runSequence = require('run-sequence'),
    notify = require("gulp-notify"),
    uglify = require('gulp-uglify'),
    compression = require("compression"),
    karma = require("gulp-karma"),
    inject = require("gulp-inject"),
    exec = require('child_process').exec,
    annotate = require('gulp-ng-annotate'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer');

// Modules for webserver and livereload
var express = require('express'),
    refresh = require('gulp-livereload'),
    livereload = require('connect-livereload'),
    livereloadport = 35729,
    serverport = 5000;


var rjsConfig = {
    mainConfigFile: "build/main.js",
    //optimize: "none",
    optimize: "none",
    baseUrl: "build",
    name: "main",
    out: "build/bundle.js",
    removeCombined: false,
    generateSourceMaps: true,
    preserveLicenseComments: true,
    findNestedDependencies: true
};
// Set up an express server (not starting it yet)
var server = express();

//gzip / deflate
server.use(compression());

// Add live reload
server.use(livereload({port: livereloadport}));

// Use our 'build' folder as rootfolder
server.use(express.static('./build'));
// Because I like HTML5 pushstate .. this redirects everything back to our index.html

server.all('/*', function (req, res) {
    res.sendFile('index.html', {root: 'build'});
});

// Dev task
gulp.task('dev', function (cb) {
    runSequence('clean', ['inject', 'lint', 'copy', 'rjs'], cb);
});

// Clean task
gulp.task('clean', function (cb) {
    return gulp.src("build/*", {read: false})
        .pipe(rimraf());
});

// JSHint task
gulp.task('lint', function () {
    return gulp.src(['app/*.js', 'app/scripts/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(notify("jsHint ok!"));
});

gulp.task('entry', function () {
    return gulp.src(['app/*.js'])
    // .pipe(annotate())
    //.pipe(gulp.dest('app'))
    //  .pipe(annotate())
    //   .pipe(sourcemaps.init())

        // .pipe(uglify())
    //   .pipe(sourcemaps.write('maps'))
        .pipe(gulp.dest('./build/'))
        .pipe(notify("entry ok!"));
});

gulp.task('libScripts', function () {
    // temporary. will try to get something more performant
    return gulp.src([
        'bower_components/angular-animate/**.js',
        'bower_components/angular-cookies/**.js',
        'bower_components/angular-resource/**.js',
        'bower_components/angular-sanitize/**.js',
        'bower_components/angular-touch/**.js',
        'bower_components/angular-mocks/**.js',
        'bower_components/angular-scenario/**.js',
        'bower_components/angular/**.js',
        'bower_components/requirejs/**.js',
        'bower_components/angular-ui-router/release/**.js',
        'bower_components/ngToast/dist/ngToast.js',
        'bower_components/angular-strap/dist/angular-strap.js',
        'bower_components/angular-ui-router-anim-in-out/anim-in-out.js',
        'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
        'bower_components/angular-strap/dist/angular-strap.js',
        'bower_components/angular-strap/dist/angular-strap.tpl.js',

        'bower_components/angular-media-queries/match-media.js',

        'bower_components/azoomee.web-components-jwt/userSession.js',
        'bower_components/azoomee.web-components-jwt/httpProviderConfig.js',
        'bower_components/azoomee.web-components-jwt/Base64.js',
        'bower_components/crypto-js/crypto-js.js',
        'bower_components/moment/moment.js',
        'bower_components/angular-scroll/angular-scroll.js',
        'bower_components/jquery/dist/jquery.min.js',
        'bower_components/underscore/underscore.js',
        'bower_components/slick-carousel/slick/slick.js',
        'bower_components/slick-carousel/slick/slick.css',
        'bower_components/angular-modal-service/dst/angular-modal-service.js',

    ])
        .pipe(gulp.dest('build/lib'));

});

gulp.task('copy', function () {
    return gulp.src('app/images/**/*.*').pipe(gulp.dest('build/images'));
});

gulp.task('scripts', ['libScripts'], function () {
    return gulp.src(['app/scripts/**/*.js', 'app/scripts/**/**/*.js'])
    //   .pipe(annotate())
    //   .pipe(gulp.dest('app/scripts'))
    //  .pipe(annotate())
    //  .pipe(sourcemaps.init())
        //    .pipe(uglify())
    //    .pipe(sourcemaps.write('maps'))
        .pipe(gulp.dest('./build/js/'))
        .pipe(notify("scripts ok!"));
});

gulp.task('test', function () {
    var files = ["undefined.js"];
    return gulp.src(files)
        .pipe(karma({
            configFile: 'karma.conf.js',
            action: 'run'
        }))
        .pipe(notify("test ok!"));
});

// Styles task
gulp.task('styles', ['libStyles'], function () {
    return gulp.src(['app/styles/*.scss', 'app/styles/*.css'])
    // The onerror handler prevents Gulp from crashing when you make a mistake in your SASS
        .pipe(sass({
            onError: function (e) {
                console.log(e);
            }
        }))
        // Optionally add autoprefixer
        .pipe(autoprefixer('last 2 versions', '> 1%', 'ie 8'))
        .pipe(minifyCSS({keepBreaks: true}))
        // These last two should look familiar now :)
        .pipe(gulp.dest('build/css/'))
        .pipe(notify("styles ok!"));

});

gulp.task('libStyles', function () {
    return gulp.src('bower_components/bootstrap/dist/css/*.css')
    // And put it in the build folder
        .pipe(gulp.dest('build/lib'))
        .pipe(notify("libStyles ok!"));

});

// requirejs task
gulp.task('rjs', ['entry', 'scripts'], function () {
    rjs.optimize(rjsConfig, function (buildresponse) {
        console.log("[r.js] requirejs combo files successful");
    }, function (err) {
        console.log(err);
    })
});


// Views task, inject assets to html
gulp.task('inject', ['styles', 'views'], function () {
    // Any other view files from app/views
    var target = gulp.src('app/index.html'),
        sources = gulp.src(['build/css/*.css', 'build/lib/*.min.css'], {read: false});
    return target.pipe(inject(sources, {ignorePath: '/build'}))
        .pipe(gulp.dest('build/'))
        .pipe(notify("inject ok!"));
});

gulp.task('views', function () {
    return gulp.src('app/views/**/*.html')
        .pipe(gulp.dest('build/views'));
});


gulp.task('watch', ['lint'], function () {
    // Start webserver
    server.listen(serverport);
    // Start live reload
    refresh.listen(livereloadport);

    // Watch bower scripts, and when they change run lint and requirejs
    gulp.watch(['bower_components/**/*.js', 'bower_components/**/release/*.js'], [
        'rjs'
    ]);
    gulp.watch(['app/images/**/*.*'], {debounceDelay: 1000}, ['copy']);

    //watch our scripts, and when they change run lint and requirejs
    gulp.watch(['app/*.js', 'app/scripts/**/*.js', 'app/scripts/controllers/**/*.js'], {debounceDelay: 2000}, ['rjs']);

    // Watch our sass files
    gulp.watch(['app/styles/*.scss', 'app/styles/*.css', 'app/styles/**/*.scss', 'app/styles/**/*.css', 'app/*.html', 'app/**/*.html'], {debounceDelay: 3000}, [
        'inject'
    ]);

    // gulp.watch(['app/*.html', 'app/**/*.html'], [
    //     'inject'
    // ]);

    gulp.watch(['./build/**/*.html', './build/**/*.js'], {debounceDelay: 4000}).on('change', refresh.changed);

});

gulp.task('server', function () {
    exec('open "http://localhost:' + serverport + '" -a "Google Chrome"', function (er) {
        if (er) {
            console.log(er)
        } else {
            console.log("the preview url:  http://localhost:" + serverport);
        }
    });
});

gulp.task('default', ['dev', 'watch']);
