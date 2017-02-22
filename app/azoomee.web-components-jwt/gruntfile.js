module.exports = function (grunt) {

    grunt.initConfig({
        jshint: {
            files: ['gruntfile.js', '*.js', '!bower_components/**/*.js'],
        },
        bump: {
            options: {
                files: ['package.json', 'bower.json'],
                updateConfigs: [],
                commit: false,
                createTag: false,
                push: false
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-bump');

    grunt.registerTask('build', ['jshint']);

};
