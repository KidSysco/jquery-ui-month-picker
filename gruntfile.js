'use strict';

module.exports = function (grunt) {
  // Project Configuration
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    qunit: {
      all: ['test/test.html']
    },

    uglify: {
      demo: {
        files: {
          'demo/MonthPicker.min.js': 'src/MonthPicker.js'
        }
      }
    },

    cssmin: {
	  demo: {
	     files: {
           'demo/MonthPicker.min.css': 'src/MonthPicker.css'
	     }
	  }
    },

    'gh-pages': {
       options: {
         base: 'demo',
         add: true
       },

       src: ['**']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-gh-pages');

  grunt.registerTask('default', ['qunit', 'uglify', 'cssmin']);
  grunt.registerTask('test', ['qunit']);
};
