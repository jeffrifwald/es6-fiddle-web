module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);
    var jsSrcFiles = [
            'src/*.js',
            'src/examples/*.js',
            'src/add-examples.js'
        ],
        jsLibFiles = [
            'static/lib/jshint/**/*.js',
            'static/lib/codemirror/**/*.js'
        ],
        styleFiles = ['static/lib/**/*.css', 'style/**/*.less'],
        pkg = grunt.file.readJSON('package.json'),
        npmTasks = [
            'grunt-contrib-jshint',
            'grunt-contrib-uglify',
            'grunt-contrib-watch',
            'grunt-jscs',
            'grunt-contrib-imagemin',
            'grunt-inline',
            'grunt-browser-sync',
            'grunt-express-server',
            'grunt-githooks'
        ];

    grunt.initConfig({
        pkg: pkg,
        githooks: {
            all: {
                'pre-push': 'test'
            }
        },
        babel: {
            options: {
                sourceMap: false,
                presets: ['es2015']
            },
            dist: {
                files: [{
                    'expand': true,
                    'src': jsSrcFiles,
                    'dest': 'dist/'
                }]
            }
        },
        uglify: {
            compile: {
                files: {
                    'static/src/es6-fiddle.js': [jsLibFiles, 'dist/src/**/*.js'],
                    'static/lib/babel/babel.min.js' : ['static/lib/babel/*.js', '!static/lib/babel/babel.min.js']
                }
            }
        },
        less: {
            production: {
                files: {
                    'static/style/es6-fiddle.css': ['static/lib/**/*.css', 'style/main.less']
                }
            }
        },
        watch: {
            options: {
                reload: true
            },
            style: {
                files: styleFiles,
                tasks: ['less', 'inline']
            },
            src: {
                files: jsSrcFiles,
                tasks: ['babel', 'uglify', 'eslint']
            },
            html: {
                files: 'src/index.html',
                tasks: ['inline']
            }
        },
        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    src: ['**/*.{png,jpg,gif}'],
                }]
            }
        },
        inline: {
            index: {
                src: 'src/index.html',
                dest: 'static/index.html'
            },
            about: {
                src: 'src/about.html',
                dest: 'static/about.html'
            }
        },
        eslint: {
            options: {
                config: '.eslintrc'
            },
            target: ['src/**/*.js', 'Gruntfile.js']
        },
        lesslint: {
            options: {
                imports: ['style/**/*.less'],
                csslint: {
                    'box-sizing': false,
                    'adjoining-classes': false,
                    'universal-selector': false,
                    'font-sizes': false,
                    'box-model': false
                }
            },
            target: ['style/main.less']
        },
        browserSync: {
            bsFiles: {
                src: [jsSrcFiles, styleFiles],
            },
            options: {
                watchTask: true,
                proxy: 'http://localhost:3000',
                reloadOnRestart: true
            }
        },
        express: {
            dev: {
                options: {
                    script: 'app.js'
                }
            }
        }
    });

    npmTasks.forEach(function(task) {
        grunt.loadNpmTasks(task);
    });

    grunt.registerTask('default', ['githooks', 'watch']);
    grunt.registerTask('test', ['lesslint', 'eslint']);
    grunt.registerTask('build', ['less', 'babel', 'uglify','imagemin', 'inline']);
    grunt.registerTask('dev', ['express:dev', 'browserSync', 'watch']);
};
