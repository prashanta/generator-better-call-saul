'use strict';

var request = require('request');

module.exports = function (grunt) {
   // show elapsed time at the end
   require('time-grunt')(grunt);
   // load all grunt tasks
   require('load-grunt-tasks')(grunt);

   var reloadPort = 35729, files;

   grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),

      bowercopy: {
         options: {
            clean: true, // Do not remove bower components folder
         },
         // CSS files
         css: {
            options: {
               destPrefix: 'public/css'
            },
            files: {
               'bootstrap.min.css': 'bootstrap/dist/css/bootstrap.min.css',
            }
         },
         js: {
            options: {
               destPrefix: 'public/js/lib'
            },
            files: {
               'bootstrap.min.js': 'bootstrap/dist/js/bootstrap.min.js',
            }
         }
      },

      browserify: {
         dist:{
            options:{
               transform:[['babelify']]
            },
            files:{
               'public/build/bundle.js': ['public/js/index.js']
            }
         }
      },

      develop: {
         server: {
            file: './server.js'
         }
      },

      watch: {
         options: {
            nospawn: true,
            livereload: reloadPort
         },
         server: {
            files: [
               'app/*.js',
            ],
            tasks: ['develop', 'delayed-livereload']
         },
         js: {
            files: ['./public/js/*.js'],
            //tasks: ['browserify'],
            //files: ['public/build/*.js'],
            // options: {
            //    livereload: reloadPort
            // }
            tasks: ['delayed-livereload']
         },
         css: {
            files: [
               'public/css/*.css'
            ],
            options: {
               livereload: reloadPort
            }
         }
      }
   });

   grunt.config.requires('watch.server.files');
   files = grunt.config('watch.server.files');
   files = grunt.file.expand(files);

   grunt.registerTask('delayed-livereload', 'Live reload after the node server has restarted.', function () {
      var done = this.async();
      setTimeout(function () {
         request.get('http://localhost:' + reloadPort + '/changed?files=' + files.join(','),  function (err, res) {
            var reloaded = !err && res.statusCode === 200;
            if (reloaded) {
               grunt.log.ok('Delayed live reload successful.');
            } else {
               grunt.log.error('Unable to make a delayed live reload.');
            }
            done(reloaded);
         });
      }, 500);
   });

   grunt.registerTask('default', [
      'browserify',
      'develop',
      'watch'
   ]);

   grunt.registerTask('build', [
    'bowercopy'
  ]);
};
