'use strict';

import React  from 'react';
import Backbone  from 'backbone';

export default class Header extends React.Component{

   constructor(props) {
      super(props);
   }

   render(){
      return (
         <div>
            <div className="appbar">
               <div className="navbar-left">
                  <span className="navbar-brand" >
                     <b>{this.props.title}</b>&nbsp;
                     <sup className='ver'>{this.props.ver}</sup>
                  </span>
               </div>
            </div>
         </div>
      );
   }
}
