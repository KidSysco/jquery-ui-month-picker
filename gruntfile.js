'use strict';

module.exports = function (grunt) {
  // Project Configuration
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      production: {
        files: {
          'MonthPicker.min.js': 'MonthPicker.js'
        }
      }
    },
    qunit: {
    	all: ['test/test.html']
  	}
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-qunit');

  grunt.registerTask('default', ['qunit', 'uglify']);
  grunt.registerTask('test', ['qunit']);
};