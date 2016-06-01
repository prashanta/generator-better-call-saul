'use strict';

import React  from 'react';
import Backbone  from 'backbone';
import backboneReact from 'backbone-react-component';
import Header from './header';
import MyModel from '../model/mymodel'
import AppConfig from '../config'

var appconfig = new AppConfig();

export default class Layout extends React.Component{

   constructor(props) {
      super(props);
      this.mymodel = new MyModel();
      this.state = this.mymodel.toJSON();

      this.checkIsNewVersion = this.checkIsNewVersion.bind(this);

      this.mymodel.on('change', function(){
         this.checkIsNewVersion();
         this.setState(this.mymodel.toJSON());
      }, this)

   }

   componentDidMount(){
      this.mymodel.fetch();
   }

   checkIsNewVersion(){
      var newVer = appconfig.ver;
      var oldVer = localStorage.getItem('appver');
      if(oldVer){
         if( oldVer == newVer)
            console.log('Version is same');
         else
            console.log('Version is different!');
      }
      else{
         console.log('Version added');
         localStorage.setItem('appver', newVer);
      }
   }

   render(){
      return (
         <div>
            <Header title={appconfig.title} ver={appconfig.ver}/>
            <div>Name : {this.state.name}</div>
            <div>Location: {this.state.location}</div>
         </div>
      );
   }
}
