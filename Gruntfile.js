
module.exports = function(grunt){
	
	grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
 
    compass: {      
	    dist: {        
	      options: {      
	        sassDir: 'assets/stylesheets/sass',
	        cssDir: 'assets/stylesheets/css',
	        environment: 'production'
	      }
	    },
	    dev: {              
	      options: {
	        sassDir: 'assets/stylesheets/sass',
	        cssDir: 'assets/stylesheets/css'
	      }
	    }
  	},
 
    watch: {
        scss:{
            files: ['assets/stylesheets/sass/*.scss'],
            tasks: ['sass', 'copy']
        },
        
        js:{
        	files: ['assets/javascripts/*.js'],
        	tasks: ['concat']
        }
    },
 
    sass: {
        dist: {
            options: {                 
                compass: true,
            },
            files: {
                'assets/stylesheets/css/application.css' : 'assets/stylesheets/sass/application.scss'
            }
        }
    },
 
    concat: {
        options: {
            separator: ';',
            stripBanners: true,
             banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
        },
 
        js: {
            src: ['assets/javascripts/jquery.min.js', 'assets/javascripts/tether.min.js', 'assets/javascripts/*.js'],
            dest: 'public/javascripts/main.min.js'
        }
    },
 
 
    uglify:{
        options: {
            manage: false,
            preserveComments: false
        },
        my_target:{
            files: {
                'public/javascripts/main.min.js' : ['public/javascripts/main.min.js']
            }
        }
    },
   
 
    cssmin:{
        my_target:{
            files: [{
                expand: true,
                cwd: 'assets/stylesheets/css',
                src: ['*.css', '!*.min.css'],
                dest: 'public/stylesheets',
                ext: '.min.css'
 
            }]
        }
    },
    
	copy:{
		my_target:{
			files:[{
				expand: true,
				cwd: 'assets/stylesheets/css/', 
				src: 'application.css', 
				dest: 'public/stylesheets/',
				rename: function(dest, src) {
	      			return dest + src.replace(/\.css$/, ".min.css")
	      		}
	          	}]
			}	
	}

	});
  

  // Load the plugin that provides the "compass" task.
  grunt.loadNpmTasks('grunt-contrib-compass');
 
     // Load the plugin that provides the "watch" task.
  grunt.loadNpmTasks('grunt-contrib-watch');
 
     // Load the plugin that provides the "sass" task.
  grunt.loadNpmTasks('grunt-contrib-sass');
 
    // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
 
      // Load the plugin that provides the "concat" task.
  grunt.loadNpmTasks('grunt-contrib-concat');
 
   // Load the plugin that provides the "cssmin" task.
  grunt.loadNpmTasks('grunt-contrib-cssmin');
   // Load the plugin that provides the "copy" task.
  grunt.loadNpmTasks('grunt-contrib-copy');
 
   // Default task(s).
  grunt.registerTask('pro', ['sass','cssmin', 'concat', 'uglify']);
  grunt.registerTask('default', ['sass', 'copy', 'concat']);
};
