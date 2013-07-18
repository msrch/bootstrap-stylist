module.exports = function(grunt) {

    // Shorthand Grunt functions
    var file = grunt.file;
    var log = grunt.log;
    var task = grunt.task;
    var _ = grunt.util._;

    // Files to check (very simple test)
    var check_paths = [
        'assets/js/bootstrap/bootstrap.js',
        'assets/js/bootstrap/bootstrap.min.js',
        'assets/less/bootstrap/bootstrap.less',
        'assets/less/bootstrap/responsive.less',
        'assets/imgs/bootstrap/glyphicons-halflings.png',
        'assets/imgs/bootstrap/glyphicons-halflings-white.png'
    ];

    // Grunt configuration.
    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),
        bwr: grunt.file.readJSON('component.json'),

        banner: '/*!\n' +
                ' * Built by <%= pkg.description %> v<%= pkg.version %>\n' +
                ' * (c) <%= grunt.template.today("yyyy") %> <%= pkg.copyright %>\n' +
                ' *',

        // grunt-contrib-less
        // Compile LESS files to CSS.
        // https://npmjs.org/package/grunt-contrib-less
        less: {
            dev: {
                options: {
                    paths: ['assets/less']
                },
                files: {
                    'public/styles/main.css': 'assets/less/main.less'
                }
            },
            release: {
                options: {
                    paths: ['assets/less']
                },
                files: {
                    'release/_temp/css/bootstrap.css': 'assets/less/bootstrap.less',
                    'release/_temp/css/bootstrap-responsive.css': 'assets/less/bootstrap-responsive.less'
                }
            }
        },

        // grunt-bower-task
        // Install Bower packages.
        // https://npmjs.org/package/grunt-bower-task
        bower: {
            install: {
                options: {
                    targetDir: 'assets/',
                    verbose: true,
                    install: true
                }
            }
        },

        // grunt-contrib-clean
        // Clean files and folders.
        // https://npmjs.org/package/grunt-contrib-clean
        clean: {
            assets: ['assets/js/*', 'assets/less/bootstrap', 'assets/imgs/*'],
            public: ['public/img/*', 'public/scripts/*', 'public/styles/*'],
            release: ['release/_temp/'],
            html: ['public/*.html']
        },

        // grunt-contrib-copy
        // Copy files and folders.
        // https://npmjs.org/package/grunt-contrib-copy
        copy: {
            imgs: {
                files: [
                    {
                        expand: true,
                        flatten: true,
                        cwd: 'assets/imgs',
                        src: ['**'],
                        dest: 'public/img',
                        filter: 'isFile'
                    }
                ]
            },
            scripts: {
                expand: true,
                flatten: true,
                src: ['assets/js/html5shiv/html5shiv.js'],
                dest: 'public/scripts/'
            },
            release: {
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: ['assets/js/bootstrap/bootstrap.*'],
                        dest: 'release/_temp/js'
                    },
                    {
                        expand: true,
                        cwd: 'public/img',
                        src: ['**'],
                        dest: 'release/_temp/img'
                    }
                ]
            }
        },

        // grunt-contrib-concat
        // Concatenate files.
        // https://npmjs.org/package/grunt-contrib-concat
        concat: {
            options: {
                separator: ';'
            },
            scripts: {
                src: [
                    'assets/js/jquery/jquery.min.js',
                    'assets/js/isotope/jquery.isotope.min.js',
                    'assets/js/bootstrap/bootstrap.min.js',
                    'assets/js/holderjs/holder.js'
                ],
                dest: 'public/scripts/main.js'
            }
        },

        // grunt-contrib-cssmin
        // Compress CSS files.
        // https://npmjs.org/package/grunt-contrib-cssmin
        cssmin: {
            dist: {
                options: {
                    report: 'min'
                },
                files: [
                    {
                        expand: true,
                        cwd: 'release/_temp/css/',
                        src: ['**/*.css'],
                        dest: 'release/_temp/css/',
                        ext: '.min.css'
                    }
                ]
            }
        },

        // grunt-contrib-jade
        // Compile Jade files to HTML.
        // https://npmjs.org/package/grunt-contrib-jade
        jade: {
            dev: {
                options: {
                    pretty: true,
                    data: {
                        liverelaod_url: 'http://localhost:35729/livereload.js'
                    }
                },
                files: [
                    {
                        expand: true,
                        cwd: 'assets/jade',
                        src: ['*.jade'],
                        dest: 'public/',
                        ext: '.html'
                    }
                ]
            }
        },

        // grunt-contrib-watch
        // Run predefined tasks whenever watched file patterns are added, changed or deleted.
        // https://npmjs.org/package/grunt-contrib-watch
        watch: {
            options: {
                livereload: true
            },
            less: {
                files: 'assets/less/**/*.less',
                tasks: ['less']
            },
            jade: {
                files: 'assets/jade/**/*.jade',
                tasks: ['jade']
            }
        },
        
        // grunt-text-replace
        // Replace text in files using strings, regexs or functions.
        // https://npmjs.org/package/grunt-text-replace
        replace: {
            banner: {
                src: ['release/_temp/css/**/*.css'],
                overwrite: true,
                replacements: [
                    {
                        from: /\/\*!/,
                        to: '<%= banner %>'
                    },
                    {
                        from: /(\/\*[^]*?\*\/)/,
                        to: '$1\n'
                    }
                ]
            }
        },

        // grunt-html-build
        // Appends scripts and styles, removes debug parts and append html partials.
        // https://npmjs.org/package/grunt-html-build
        htmlbuild: {
            dist: {
                src: 'public/index.html',
                dest: 'release/_temp/stylist_sheet.html',
                options: {
                    beautify: true,
                    scripts: {
                        main: 'public/scripts/main.js',
                        html5shiv: 'public/scripts/html5shiv.js'
                    },
                    styles: {
                        main: 'public/styles/main.css'
                    }
                }
            }
        },

        // grunt-image-embed
        // Grunt task for embedding images as base64 data URIs inside your stylesheets.
        // https://npmjs.org/package/grunt-image-embed
        imageEmbed: {
            dist: {
                src: [ "public/styles/main.css" ],
                dest: "public/styles/main.css",
                options: {
                    deleteAfterEncoding : false
                }
            }
        },

        // grunt-zip
        // Zip and unzip files via a grunt plugin
        // https://npmjs.org/package/grunt-zip
        zip: {
            release: {
                cwd: 'release/_temp/',
                src: ['release/_temp/**'],
                dest: 'release/bootstrap.<%= bwr.dependencies.bootstrap %>.custom.<%= grunt.template.today("yyyymmddHHMMss") %>.zip'
            }
        }

    });

    // Load plugins.
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-bower-task');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-zip');
    grunt.loadNpmTasks('grunt-text-replace');
    grunt.loadNpmTasks('grunt-contrib-jade');
    grunt.loadNpmTasks('grunt-html-build');
    grunt.loadNpmTasks("grunt-image-embed");

    // Default task
    grunt.registerTask('default', 'Default Bootstrap Stylist task.', function () {

        // Check the file structure
        var is_initialized = true;
        _.each(check_paths, function (path) {
            if (!file.exists(path)) {
                is_initialized = false;
            }
        });

        // Report and run appropriate tasks
        log.write('Bootstrap Stylist status: ');
        if (is_initialized) {
            log.writeln(('ready to use').green);
            log.writeln('Executing "start"...');
            task.run(['start']);
        } else {
            log.writeln(('not initialized').red);
            log.writeln('Executing "init" and then "start"...');
            task.run(['init', 'start']);
        }
    });

    // Register task(s).
    grunt.registerTask('init', 'Initialize app for usage (run before "start" if not already initialized).', ['clean', 'bower', 'copy:imgs', 'copy:scripts', 'concat', 'jade']);
    grunt.registerTask('start', 'Start styling Bootstrap with live reload.', ['less:dev', 'jade', 'watch']);
    grunt.registerTask('css', 'Recompile LESS files.', ['less:dev']);
    grunt.registerTask('release', 'Release your custom Bootstrap package.', ['clean:release', 'less', 'copy:release', 'cssmin', 'replace:banner', 'imageEmbed', 'htmlbuild', 'zip', 'clean:release']);

};