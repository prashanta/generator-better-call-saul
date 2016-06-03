'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var _ = require('lodash');
var path = require('path');
var mkdirp = require('mkdirp');

module.exports = yeoman.Base.extend({

   prompting: {
      app: function(){
         this.log(yosay('Welcome to ' + chalk.red('generator-better-call-saul') + ' generator!'));

         var currentDir = _.split(process.cwd(), path.sep, -1);
         currentDir = currentDir[currentDir.length-1];
         var done = this.async();
         var prompt = [{
            type: 'input',
            name: 'appName',
            message: 'Enter app name:',
            default: currentDir
         },
         {
            type: 'input',
            name: 'desc',
            message: 'Enter brief description:',
            default: 'Replace this later.'
         },
         {
            type: 'confirm',
            name: 'run',
            message: 'Would you like to run npm and bower install?:'
         }
      ];

      this.prompt(prompt, function (response) {
         this.options.appName = response.appName;
         this.options.appDesc = response.desc;
         this.options.run = response.run;
         done();
      }.bind(this));
   }
},


writing: {

   /*
   env: function(){
   // package.json
   this.copy(path.join(__dirname, 'templates', 'basic', '_package.json'), 'package.json');

   // Gruntfile.js
   this.copy(path.join(__dirname, 'templates', 'basic', '_Gruntfile.js'), 'Gruntfile.js');

   // bower.js
   this.copy(path.join(__dirname, 'templates', 'basic', '_bower.json'), 'bower.json');
   this.copy(path.join(__dirname, 'templates', 'basic', '_.bowerrc'), '.bowerrc');
},

js: function(){
this.copy(path.join(__dirname, 'templates', 'basic','_server.js'), 'server.js');
},
*/
dir: function(){
   this.sourceRoot(path.join(__dirname, 'templates', 'root'));
   this.directory('.', '.');

   this.sourceRoot(path.join(__dirname, 'templates', 'public'));
   this.directory('.', 'public');

   this.sourceRoot(path.join(__dirname, 'templates', 'app'));
   this.directory('.', 'app');
}
},

createDir: function(){
   // Create empty dirs
   mkdirp.sync('public/build');
   mkdirp.sync('public/js/lib');
},

install: function () {
   if(this.options.run)
      this.installDependencies();   // run: 'npm install' & 'bower install'
}
});
