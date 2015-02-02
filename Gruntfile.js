module.exports = function(grunt) {
  'use strict';
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    meta: {
      banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - built on <%= grunt.template.today("dd-mm-yyyy") %> */\n',
      views: 'source/views/',
      assets: 'source/assets/',
      build: 'public/',
      reports: 'reports/'
    },
    jade: {
      compile: {
        options: {
          pretty: true
        },
        files: [{
          expand: true,
          cwd: '<%= meta.views %>',
          src: ['*.jade'],
          dest: '<%= meta.build %>',
          ext: '.html'
        }]
      }
    },
    less: {
      build: {
        options: {
          compress: false
        },
        files: [{
          '<%= meta.build %>css/style.css': '<%= meta.assets %>css/style.less',
          '<%= meta.build %>css/ie.css': '<%= meta.assets %>css/ie.less',
          '<%= meta.build %>css/print.css': '<%= meta.assets %>css/print.less'
        }]
      }
    },
    concat: {
      dist: {
        files: [{
          '<%= meta.build %>js/modernizr.js': '<%= meta.assets %>js/libs/modernizr-2.7.1.js',
          '<%= meta.build %>js/libs.js': ['<%= meta.assets %>js/libs/jquery-1.11.1.js', '<%= meta.assets %>js/libs/plugins/*.js'],
          '<%= meta.build %>js/bootstrap.js': '<%= meta.assets %>js/libs/bootstrap.js',
          '<%= meta.build %>js/respond.js': '<%= meta.assets %>js/libs/respond.js',
          '<%= meta.build %>js/l10n.js': '<%= meta.assets %>js/l10n.js',
          '<%= meta.build %>js/script.js': ['<%= meta.assets %>js/settings.js', '<%= meta.assets %>js/plugins/*.js']
        }]
      }
    },
    copy: {
      data: {
        files: [{
          expand: true,
          cwd: '<%= meta.views %>data/',
          src: '**/*',
          dest: '<%= meta.build %>data/'
        }]
      },
      images: {
        files: [{
          expand: true,
          cwd: '<%= meta.assets %>images/',
          src: '**/*',
          dest: '<%= meta.build %>images/'
        }]
      },
      icons: {
        files: [{
          expand: true,
          cwd: '<%= meta.assets %>icons/',
          src: '**/*',
          dest: '<%= meta.build %>'
        }]
      },
      videos: {
        files: [{
          expand: true,
          cwd: '<%= meta.assets %>videos/',
          src: '**/*',
          dest: '<%= meta.build %>videos/'
        }]
      },
      xml: {
        files: [{
          expand: true,
          cwd: '<%= meta.assets %>xml/',
          src: '**/*',
          dest: '<%= meta.build %>xml/'
        }]
      },
      fonts: {
        files: [{
          expand: true,
          cwd: '<%= meta.assets %>fonts/',
          src: '**/*',
          dest: '<%= meta.build %>fonts/'
        }]
      }
    },
    jshint: {
      options: {
        devel: false,
        curly: true,
        eqeqeq: true,
        immed: false,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: false,
        boss: true,
        eqnull: true,
        browser: true,
        expr: true,
        globals: {
          Modernizr: true,
          jQuery: true,
          $: true,
          console: true
        }
      },
      files: ['package.json', 'Gruntfile.js', '<%= meta.assets %>js/plugins/*.js', '<%= meta.assets %>js/*.js']
    },
    htmlhint: {
      options: {
        'tagname-lowercase': true,
        'attr-lowercase': true,
        'attr-value-double-quotes': true,
        'spec-char-escape': true,
        'id-unique': true,
        'src-not-empty': true,
        'img-alt-require': true
      },
      files: ['<%= meta.build %>*.html']
    },
    watch: {
      options: {
        livereload: true
      },
      scripts: {
        options: {
          spawn: false
        },
        files: ['package.json', 'Gruntfile.js', 'source/server.js', 'source/routes.js'],
        tasks: ['jshint']
      },
      js: {
        files: ['<%= meta.assets %>js/plugins/*.js', '<%= meta.assets %>js/*.js'],
        tasks: ['jshint', 'concat']
      },
      jade: {
        files: ['<%= meta.views %>**/*.jade'],
        tasks: ['jade', 'htmlhint']
      },
      data: {
        files: ['<%= meta.views %>data/**/*.*'],
        tasks: ['copy:data']
      },
      less: {
        files: ['<%= meta.assets %>css/**/*.less'],
        tasks: ['less', 'autoprefixer']
      },
      fonts: {
        files: ['<%= meta.assets %>fonts/**/*'],
        tasks: ['copy:fonts']
      },
      images: {
        files: ['<%= meta.assets %>images/**/*'],
        tasks: ['copy:images']
      },
      videos: {
        files: ['<%= meta.assets %>videos/**/*'],
        tasks: ['copy:videos']
      },
      xml: {
        files: ['<%= meta.assets %>xml/**/*'],
        tasks: ['copy:xml']
      }
    },
    imagemin: {
      dist: {
        options: {
          optimizationLevel: 3,
          progressive: true
        },
        files: [{
          expand: true,
          cwd: '<%= meta.build %>images/',
          src: '**/*.{png,jpg,gif}',
          dest: '<%= meta.build %>images/'
        }]
      }
    },
    cssmin: {
      options: {
        banner: '<%= meta.banner %>'
      },
      compress: {
        files: [{
          '<%= meta.build %>css/style.css': '<%= meta.build %>css/style.css',
          '<%= meta.build %>css/ie.css': '<%= meta.build %>css/ie.css',
          '<%= meta.build %>css/print.css': '<%= meta.build %>css/print.css'
        }]
      }
    },
    uglify: {
      options: {
        banner: '<%= meta.banner %>',
        compress: true,
        beautify: false,
        preserveComments: false
      },
      dist: {
        files: [{
          '<%= meta.build %>js/modernizr.js': '<%= meta.assets %>js/libs/modernizr-2.7.1.js',
          '<%= meta.build %>js/libs.js': ['<%= meta.assets %>js/libs/jquery-1.11.1.js', '<%= meta.assets %>js/libs/plugins/*.js'],
          '<%= meta.build %>js/bootstrap.js': '<%= meta.assets %>js/libs/bootstrap.js',
          '<%= meta.build %>js/respond.js': '<%= meta.assets %>js/libs/respond.js',
          '<%= meta.build %>js/l10n.js': '<%= meta.assets %>js/l10n.js',
          '<%= meta.build %>js/script.js': ['<%= meta.assets %>js/settings.js', '<%= meta.assets %>js/plugins/*.js']
        }]
      }
    },
    autoprefixer: {
      options: {
        browsers: ['last 3 versions']
      },
      files: {
        expand: true,
        src: '<%= meta.build %>css/*.css'
      }
    },
    accessibility: {
      options: {
        accessibilityLevel: 'WCAG2A'
      },
      dist: {
        files: [{
          expand: true,
          cwd: '<%= meta.build %>',
          src: ['*.html'],
          dest: '<%= meta.reports %>',
          ext: '-report.txt'
        }]
      }
    },
    'html-validation': {
      options: {
        reset: true,
        stoponerror: false,
        reportpath: '<%= meta.reports %>html-validation-report.json',
        path: '<%= meta.reports %>html-validation-status.json',
        relaxerror: [],
        charset: 'utf-8',
        doctype: 'HTML5'
      },
      files: {
        src: ['<%= meta.build %>**/*.html']
      }
    },
    'css-validation': {
      options: {
        reset: true,
        stoponerror: false,
        reportpath: '<%= meta.reports %>css-validation-report.json',
        path: '<%= meta.reports %>css-validation-status.json',
        profile: 'css3',
        medium: 'all',
        warnings: '0'
      },
      files: {
        src: ['<%= meta.build %>css/style.css']
      }
    },
    open: {
      options: {
        delay: 10
      },
      dev: {
        path: 'http://localhost:3000'
      }
    },
    nodemon: {
      local: {
        script: 'source/server.js'
      }
    },
    concurrent: {
      options: {
        limit: 4
      },
      local: {
        tasks: ['nodemon:local', 'watch', 'open'],
        options: {
          logConcurrentOutput: true
        }
      }
    },
    qunit: {
      options: {
        timeout: 10000,
        '--cookies-file': 'test/cookies.txt'
      },
      all: {
        options: {
          urls: [
            'http://localhost:8000/test/test.html'
          ]
        }
      }
    },
    connect: {
      server: {
        options: {
          port: 8000,
          base: '.'
        }
      }
    },
    clean: {
      build: ['public']
    }
  });
  grunt.file.expand('./node_modules/grunt-*/tasks').forEach(grunt.loadTasks);
  require('time-grunt')(grunt);
  grunt.registerTask('build', ['clean', 'concat', 'less', 'jade', 'copy', 'autoprefixer', 'htmlhint']);
  grunt.registerTask('default', ['build', 'concurrent:local']);
  grunt.registerTask('test', ['connect:server', 'qunit']);
  grunt.registerTask('wa', ['accessibility']);
  grunt.registerTask('html', ['html-validation']);
  grunt.registerTask('css', ['css-validation']);
  grunt.registerTask('report', ['plato:local']);
  grunt.registerTask('release', ['build', 'test', 'html', 'css', 'imagemin', 'uglify', 'cssmin']);
};
