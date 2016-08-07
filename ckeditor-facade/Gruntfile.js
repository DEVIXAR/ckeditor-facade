module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        uglify: {
            options: {
                banner: '/*! \nCopyright (c) 2016, <%= pkg.name %> - v<%= pkg.version %>. All rights reserved.' +
                '\n<%= grunt.template.today("yyyy-mm-dd") %>' +
                '\ndev Didyk Mikhail (DEVIXAR).' +
                '\nFor licensing, see LICENSE.md' +
                '\nhttp://devixar.com */\n'
            },
            build: {
                src: 'app/*.js',
                dest: 'plugin.js'
            }
        },

        watch: {
            scripts: {
                files: ['app/*.js'],
                tasks: ['uglify'],
                options: {
                    spawn: false,
                },
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', ['watch']);
};