module.exports = function(grunt) {
  
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    sass: {
      options: {
        includePaths: ['bower_components/foundation/scss']
      },
      dist: {
        options: {
          outputStyle: 'compressed'
        },
        files: {
          'css/styles.css': 'scss/styles.scss',
          'css/styles-night.css': 'scss/styles-night.scss'
        }
      }
    },

    shell: {
        jekyllBuild: {
          command: 'jekyll build'
        }
    },


    livereloadx: {
      static: true,
      dir: '.'
    },

    watch: {
      jekyll: {
        files: ['**/*.html', '**/*.md', '_layouts/*.html', 'scss/*.scss', 'css/*.css', 'scripts/*.js', 'js/*.js', 'images/*'],
        tasks: ['shell:jekyll_build']
      }
    },

    connect: {
      server: {
        options: {
          port: '4000',
          hostname: 'localhost',
          base: '_site'
        }
      }
    },

   uglify: {
     my_target: {
       files: {
         'js/uglified/output.min.js': [
           'bower_components/jquery/dist/jquery.min.js',
           'bower_components/foundation/js/foundation.min.js',
           'bower_components/foundation/js/foundation.interchange.js',
           'js/app.js',
           'js/time.js',
           'bower_components/modernizr/modernizr.js'
         ]
       }
     }
   },

    watch: {
      grunt: { files: ['Gruntfile.js'] },

  all: {
            files: '**/*.html',
            options: {
                livereload: true
        }
    },


      sass: {
        files: 'scss/**/*.scss',
        tasks: ['sass']
      },
      uglify: {
        files: 'js/*.js',
        tasks: ['uglify']
      },
      livereload: {
        files: [
          '_config.yml',
          'index.html',
          'about/index.html',
          'work/**',
          'contact/index.html',
          'thanks/**',
          'trever/index.html',
          '_layouts/**',
          '_posts/**',
          '_includes/**',
          'scss/**/*.scss',
          'assets/**'
        ],
        tasks: ['shell:jekyllBuild'],
        options: {
          livereload: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-processhtml');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  // grunt.loadNpmTasks('livereloadx');


  grunt.registerTask('build', [
    'sass',
    'uglify'
  ]);
  grunt.registerTask('default', [
    'shell',
    'build',
    // 'livereloadx',
    'connect',
    'watch'
  ]);

};