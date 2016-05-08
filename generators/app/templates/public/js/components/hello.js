'use strict';

var React = require('react');
var Backbone = require('backbone');
var backboneMixin = require('backbone-react-component');

var Hello = React.createClass({

   mixins: [backboneMixin],

   render: function() {
      return (
         <div>
         	<nav className="navbar navbar-default">
         		<div className="container-fluid">
         			<div className="navbar-header">
                  	<div className="navbar-brand">{this.state.model.title}&nbsp;&nbsp;<sup>{this.state.model.version}</sup></div>
         			</div>
         			<div className="navbar-right">
                     <span className="logo"></span>
         			</div>
         		</div>
         	</nav>

            <div>

            </div>

         </div>
      );
   }
});

module.exports = Hello;
