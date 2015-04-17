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
					'css/styles.css': 'scss/styles.scss'
				}
			}
		},

		shell: {
				jekyllBuild: {
					command: 'jekyll build'
				}
		},

		connect: {
			server: {
				options: {
					port: 4000,
					base: '_site'
				}
			}
		},
   uglify: {
     my_target: {
       files: {
         'js/output.min.js': [
           'bower_components/jquery/dist/jquery.min.js',
           'bower_components/foundation/js/foundation.min.js',
           'bower_components/modernizr/modernizr.js',
           'js/capture.js',
           'js/app.js',
           'js/jquery.validate.js',
           'js/additional-methods.js',
           'js/validation-rules.js'
         ]
       }
     }
   },		
		watch: {
			grunt: { files: ['Gruntfile.js'] },
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
					'about-us/index.html',
					'case-studies/index.html',
					'contact-us/index.html',
					'privacy-policy/index.html',
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
	grunt.loadNpmTasks('grunt-contrib-uglify');

	grunt.registerTask('build', [
		'sass',
		'uglify'
	]);
	grunt.registerTask('default', [
		'shell',
		'build',
		'connect',
		'watch'
	]);

};