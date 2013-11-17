module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            dist: {
                files: {
                    'dist/<%= pkg.name %>.min.no-header.js': ['dist/angular-mm-swipe.ngmin.js']
                }
            }
        },

        jshint: {
            options: {
                jquery: true,
                smarttabs: true,
                curly: true,
                eqeqeq: true,
                immed: true,
                latedef: false,
                newcap: true,
                noarg: true,
                sub: true,
                undef: true,
                boss: true,
                eqnull: true,
                unused: false,
                browser: true,
                globals: {
                    angular: true,
                    console: true,
                    module: true,
                    L: true,
                }
            },
            source: {
                src: ['src/directives/*.js', 'src/services/*.js']
            },
            tests: {
                src: ['test/unit/*.js', 'test/e2e/*.js'],
            },
            grunt: {
                src: ['Gruntfile.js']
            }
        },
        connect: {
            options: {
                port: 8000,
                base: './'
            },
            server: {
                options: {
                    keepalive: true
                }
            },
            testserver: {}
        },
        karma: {
            unit: {
                configFile: 'config/karma.conf.js',
            },
            e2e: {
                configFile: 'config/karma-e2e.conf.js'
            },
            background: {
                configFile: 'config/karma.conf.js',
                background: true,
                autoWatch: false,
                singleRun: false,
                browsers: ['PhantomJS']
            }
        },
        ngmin: {
            directives: {
                expand: true,
                cwd: 'dist',
                src: ['angular-mm-swipe.js'],
                dest: 'dist',
                ext: '.ngmin.js',
                flatten: 'src/'
            }
        },
        watch: {
            source: {
                files: [
                        'src/**/*.js',
                        'test/unit/*.js',
                        'test/e2e/*.js'
                       ],
                tasks: [
                        'jshint',
                        'concat:dist',
                        'ngmin',
                        'uglify',
                        'karma:background:run',
                        'concat:license'
                       ]
            },
            grunt: {
                files: ['Gruntfile.js'],
                tasks: ['jshint:grunt']
            }
        },
        concat: {
            dist: {
                options: {
                    banner: '(function() {\n\n"use strict";\n\n',
                    footer: '\n}());'
                },
                src: [
                      'src/directives/mm-swipe.js'
                     ],
                dest: 'dist/angular-mm-swipe.js',
            },
            license: {
                src: [
                      'src/header-MIT-license.txt',
                      'dist/angular-mm-swipe.min.no-header.js'
                     ],
                dest: 'dist/angular-mm-swipe.min.js',
            }
        },
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-ngmin');

    grunt.registerTask('test:e2e', ['connect:testserver', 'karma:e2e']);
    grunt.registerTask('test', ['karma:unit', 'test:e2e']);
    grunt.registerTask('server', ['connect:server']);
    grunt.registerTask('default', ['karma:background', 'watch']);
    grunt.registerTask('travis', 'test');
};
