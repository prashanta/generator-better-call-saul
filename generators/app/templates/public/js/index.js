'use strict';

window.$ = window.jQuery = require('jquery')
var Backbone = require('backbone');
var React = require('react');
var ReactDOM = require('react-dom');
var bootstrap = require('bootstrap');
var Hello = require('./components/hello');

var model = new Backbone.Model({
   title: 'APP TITLE',
   version: '1.0.0'
});

ReactDOM.render(
   <Hello model={model} />,
   document.getElementById('container')
);
