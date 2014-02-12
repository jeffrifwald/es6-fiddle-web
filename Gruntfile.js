module.exports = function(grunt) {
    var jsFiles = [
            'static/lib/codemirror/**/*.js',
            'src/es6-fiddle.js',
            'src//*-example.js'
        ],
        styleFiles = ['static/lib/**/*.css', 'style/*.styl'],
        lintFiles = ['Gruntfile.js', 'src/*.js'],
        pkg = grunt.file.readJSON('package.json'),
        npmTasks = [
            'grunt-contrib-jshint',
            'grunt-contrib-stylus',
            'grunt-contrib-uglify',
            'grunt-contrib-watch',
            'grunt-jscs-checker'
        ];

    grunt.initConfig({
        pkg: pkg,
        jscs: {
            all: lintFiles,
            options: {
                config: '.jscs.json'
            }
        },
        jshint: {
            all: lintFiles,
            options: {
                jshintrc: '.jshintrc'
            }
        },
        uglify: {
            compile: {
                files: {
                    'static/src/es6-fiddle.js': jsFiles
                }
            }
        },
        stylus: {
            compile: {
                files: {
                    'static/style/es6-fiddle.css': styleFiles
                }
            }
        },
        watch: {
            options: {
                atBegin: true
            },
            src: {
                files: jsFiles,
                tasks: ['uglify']
            },
            style: {
                files: styleFiles,
                tasks: ['stylus']
            }
        }
    });

    npmTasks.forEach(function(task) {
        grunt.loadNpmTasks(task);
    });

    grunt.registerTask('default', ['watch']);
    grunt.registerTask('test', ['jshint', 'jscs']);
    grunt.registerTask('build', ['stylus', 'uglify']);
};
