'use strict';

/* Filters */ 
angular.module('app')
  .filter('type', function() {
    let typeLists = [{value:"1",name:"生活类"},
    {value:"2",name:"文章类"},
    {value:"3",name:"技术类"},
    {value:"4",name:"译文类"}]
    return function(value){
      let newType = "";
      typeLists.map(type=>{
        if(type.value === value){
          newType = type.name;
        }
      })
      return newType;
    }
  });