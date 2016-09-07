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
         console.log(__dirname);
         console.log(currentDir);

         var done = this.async();
         var prompt = [{
            type: 'confirm',
            name: 'createDir',
            message: 'Create a new directory for your project',
            default: false
         },
         {
            type: 'input',
            name: 'dirName',
            message: 'Enter name of directory',
            when: function(answers){
               return answers.createDir;
            }
         },
         {
            type: 'input',
            name: 'appName',
            message: 'Enter app name:',
            default: function(answers){
               if(answers.dirName)
                  return answers.dirName;
               else{
                  return currentDir;
               }
            }
         },
         {
            type: 'input',
            name: 'desc',
            message: 'Enter brief description:',
            default: 'Replace this later.'
         },
         // {
         //    type: 'list',
         //    name: 'ui',
         //    message: 'Select your choice of user interface',
         //    choices: ['React-Bootstrap', 'Material-UI', 'Semantic-UI']
         // },
         {
            type: 'confirm',
            name: 'run',
            message: 'Would you like to run npm and bower install?:'
         }];

         this.prompt(prompt, function (response) {
            this.options.appName = response.appName;
            this.options.appDesc = response.desc;
            this.options.run = response.run;
            this.options.dirName = response.dirName;
            // this.includeReactBootstrap = response.ui == 'React-Bootstrap'? true : false;
            // this.includeMaterialUI = response.ui == 'Material-UI'? true : false;
            // this.includeSemanticUI = response.ui == 'Semantic-UI'? true : false;

            done();
         }.bind(this));
      }
   },


   writing: {
      dir: function(){
         this.destinationRoot(this.options.dirName || '.');
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
      mkdirp.sync(path.join(this.options.dirName || '.', 'public/build'));
      mkdirp.sync(path.join(this.options.dirName || '.','public/js/lib'));
   },

   install: function () {
      if(this.options.run){
         this.installDependencies();   // run: 'npm install' & 'bower install'
      }
   }
});
