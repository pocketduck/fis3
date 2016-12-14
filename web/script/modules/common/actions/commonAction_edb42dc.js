define('script/modules/common/actions/commonAction', function(require, exports, module) {

  /**
   * @file 公共Reflux Actoin
   * @author 崔健 cuijian03@baidu.com 2016.08.20
   */
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  var CommonAction = Reflux.createActions([
  // 切换轨迹管理台和设备管理台
  'switchtab']);
  
  exports['default'] = CommonAction;
  module.exports = exports['default'];

});
