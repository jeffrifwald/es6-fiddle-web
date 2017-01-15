module.exports = function(grunt) {
    var jsFiles = [
            'static/lib/jshint/**/*.js',
            'static/lib/codemirror/**/*.js',
            'src/es6-fiddle.js',
            'src/*-example.js',
            'src/add-examples.js',
            'src/redirect_traffic.js'
        ],
        styleFiles = ['static/lib/**/*.css', 'style/*.styl'],
        lintFiles = ['Gruntfile.js', 'app.js', 'api.js', 'src/*.js'],
        pkg = grunt.file.readJSON('package.json'),
        npmTasks = [
            'grunt-contrib-jshint',
            'grunt-contrib-stylus',
            'grunt-contrib-uglify',
            'grunt-contrib-watch',
            'grunt-jscs',
            'grunt-contrib-imagemin'
        ];

    grunt.initConfig({
        pkg: pkg,
        jscs: {
            all: lintFiles,
            options: {
                config: '.jscs.json',
                fix: true
            }
        },
        jshint: {
            all: lintFiles,
            options: {
                jshintrc: '.jshintrc'
            }
        },
        uglify: {
            options: {
                mangle: false
            },
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
                },
                options: {
                    import: ['nib']
                }
            }
        },
        watch: {
            options: {
                atBegin: true
            },
            style: {
                files: styleFiles,
                tasks: ['stylus']
            },
            src: {
                files: jsFiles,
                tasks: ['uglify']
            }
        },
        imagemin: {
          dynamic: {
            files: [{
              expand: true,
//              cwd: 'static/',
              src: ['**/*.{png,jpg,gif}'],
            }]
          }
        }
    });

    npmTasks.forEach(function(task) {
        grunt.loadNpmTasks(task);
    });

    grunt.registerTask('default', ['watch']);
    grunt.registerTask('test', ['jshint', 'jscs']);
    grunt.registerTask('build', ['stylus', 'uglify','imagemin']);
};
