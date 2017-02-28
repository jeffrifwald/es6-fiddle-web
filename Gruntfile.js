/* eslint-disable */
  module.exports = (grunt) => {
    require('load-grunt-tasks')(grunt);
    const jsSrcFiles = [
        'src/**/*.js',
        '!src/authenticated.js'
      ],
      jsFiles = 'src/**/*.js',
      styleFiles = ['static/lib/**/*.css', 'style/**/*.less'],
      pkg = grunt.file.readJSON('package.json'),
      npmTasks = [
        'grunt-contrib-uglify',
        'grunt-contrib-watch',
        'grunt-jscs',
        'grunt-contrib-imagemin',
        'grunt-inline',
        'grunt-browser-sync',
        'grunt-express-server',
        'grunt-githooks',
        'grunt-browserify',
      ];

    grunt.initConfig({
      pkg,
      githooks: {
        all: {
          'pre-push': 'test',
        },
      },
      browserify: {
        prod: {
          src: ['src/examples/*.js', 'src/index.js'],
          dest: 'static/src/es6-fiddle.js',
          options: {
            browserifyOptions: { debug: true },
            transform: [['babelify', { presets: ['es2015'] }]],
          },
        },
      },
      uglify: {
        compile: {
          files: {
            'static/lib/babel/babel.min.js': ['static/lib/babel/*.js', '!static/lib/babel/babel.min.js'],
          },
        },
      },
      less: {
        production: {
          files: {
            'static/style/es6-fiddle.css': ['static/lib/**/*.css', 'style/main.less'],
            'static/style/profile.css': ['style/profile.less'],
            'static/style/blog.css': ['style/blog.less'],
          },
        },
      },
      watch: {
        options: {
          reload: true,
        },
        style: {
          files: styleFiles,
          tasks: ['less', 'inline'],
        },
        src: {
          files: jsFiles,
          tasks: ['browserify', 'uglify', 'eslint'],
        },
        html: {
          files: 'src/index.html',
          tasks: ['inline'],
        },
      },
      imagemin: {
        dynamic: {
          files: [{
            expand: true,
            src: ['**/*.{png,jpg,gif}'],
          }],
        },
      },
      inline: {
        index: {
          src: 'src/index.html',
          dest: 'static/index.html',
        },
        about: {
          src: 'src/about.html',
          dest: 'static/about.html',
        },
      },
      eslint: {
        options: {
          config: '.eslintrc',
        },
        target: ['src/**/*.js', 'Gruntfile.js'],
      },
      lesslint: {
        options: {
          imports: ['style/**/*.less'],
          csslint: {
            'box-sizing': false,
            'adjoining-classes': false,
            'universal-selector': false,
            'font-sizes': false,
            'box-model': false,
            'unique-headings': false,
          },
        },
        target: ['style/main.less'],
      },
      browserSync: {
        bsFiles: {
          src: [jsSrcFiles, styleFiles],
        },
        options: {
          watchTask: true,
          proxy: 'http://localhost:3000',
          reloadOnRestart: true,
        },
      },
      express: {
        dev: {
          options: {
            script: 'app.js',
          },
        },
      },
    });

    npmTasks.forEach(task => grunt.loadNpmTasks(task));

    grunt.registerTask('default', ['githooks', 'watch']);
    grunt.registerTask('test', ['lesslint', 'eslint']);
    grunt.registerTask('build', ['less', 'browserify', 'uglify', 'imagemin', 'inline']);
    grunt.registerTask('dev', ['express:dev', 'browserSync', 'watch']);
  };
