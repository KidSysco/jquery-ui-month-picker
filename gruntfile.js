'use strict';

module.exports = function (grunt) {
  // Project Configuration
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    qunit: {
    	all: ['test/test.html']
  	},
    
    uglify: {
      production: {
        files: {
          'MonthPicker.min.js': 'MonthPicker.js'
        }
      },
      
      demo: {
	    files: {
	      'demo/Demo.min.js': ['test/jquery-1.9.1.js', 'test/jquery-ui.js', 'test/jquery.maskedinput.min.js', 'MonthPicker.js']
	    }
      }
    },
    
    cssmin: {
	  demo: {
	     files: {
		   'demo/Demo.css': ['test/jquery-ui.css', 'css/MonthPicker.css', 'test/test.css']
	     }
	  }
  	}
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  grunt.registerTask('default', ['qunit', 'uglify', 'cssmin']);
  grunt.registerTask('test', ['qunit']);
};