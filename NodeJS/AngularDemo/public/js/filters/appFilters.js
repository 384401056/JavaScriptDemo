'use strict';
/**
 * 常用过滤器
 */
angular.module('app')
  .filter('isOrBoot', function() {
    return function(isEnabled) {
      return isEnabled === 1 ? '启用' : '禁用';
    }
  })
  .filter('isOrNo',function(){
      return function(isEnabled) {
        return isEnabled === 1 ? '是' : '否';
      }
    })