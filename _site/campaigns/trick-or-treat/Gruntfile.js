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
					'stylesheets/app.css': 'scss/app.scss'
				}
			}
		},
//    shell: {
//       jekyllBuild: {
//         command: 'jekyll build'
//       }
//    },
//    connect: {
//        server: {
//            options: {
//                port: 4000,
//                base: '_site'
//            }
//        }
//    },
		watch: {
				grunt: { files: ['Gruntfile.js'] },
				sass: {
						files: 'scss/**/*.scss',
						tasks: ['sass']
				},
				livereload: {
						files: [
//                '_config.yml',
								'index.html',
								'form/**',
								'cases/**',
								'tracker/**',
								'thank-you/**',
								'scss/**/*.scss'
						],
//            tasks: ['shell:jekyllBuild'],
//            options: {
//              livereload: true
//            },
					},
				}
	});

	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
//  grunt.loadNpmTasks('grunt-contrib-connect');
//  grunt.loadNpmTasks('grunt-shell');

	grunt.registerTask('build', ['sass']);
//  grunt.registerTask('default', ['build', 'shell', 'connect', 'watch']);
		grunt.registerTask('default', ['build', 'watch']);
}
