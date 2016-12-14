define('script/modules/common/stores/commonStore', function(require, exports, module) {

  /**
   * @file 公共Reflux Store
   * @author 崔健 cuijian03@baidu.com 2016.08.20
   */
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
      value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _actionsCommonAction = require('script/modules/common/actions/commonAction');
  
  var _actionsCommonAction2 = _interopRequireDefault(_actionsCommonAction);
  
  var _commonUrls = require('script/common/urls');
  
  var _commonUrls2 = _interopRequireDefault(_commonUrls);
  
  var CommonStore = Reflux.createStore({
      listenables: [_actionsCommonAction2['default']],
      data: {
          // 当前标签页 0为轨迹监控，1为终端管理
          currentIndex: 0
      },
      /**
       * 响应Action switchtab，变更页签
       *
       * @param {number} index 要变更到的tab
       */
      onSwitchtab: function onSwitchtab(index) {
          this.trigger('switchtab', index);
      },
      /**
       * 响应Action access，检查登录状态
       *
       */
      onAccess: function onAccess() {
          var that = this;
          _commonUrls2['default'].get(_commonUrls2['default'].statusCheck, {}, function (data) {
              if (data.isOnline === 1) {
                  _commonUrls2['default'].jsonp(_commonUrls2['default'].access, {}, function (data) {
                      that.trigger('access', data);
                  });
              } else {
                  that.onLogin();
              }
          });
      },
      /**
       * 响应Action login，跳转到登陆页
       *
       */
      onLogin: function onLogin() {
          location.href = _commonUrls2['default'].login + '&u=' + location.href;
      },
      /**
       * 响应Action logout，登出账号
       *
       */
      onLogout: function onLogout() {
          location.href = _commonUrls2['default'].logout + '&u=' + location.href;
      },
      /**
       * 响应Action setting，跳转到账号设置页
       *
       */
      onSetting: function onSetting() {
          location.href = _commonUrls2['default'].setting;
      }
  });
  
  exports['default'] = CommonStore;
  module.exports = exports['default'];

});
