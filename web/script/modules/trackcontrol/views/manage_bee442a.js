define('script/modules/trackcontrol/views/manage', function(require, exports, module) {

  /**
   * @file 轨迹管理台 Reflux View
   * @author 崔健 cuijian03@baidu.com 2016.08.22
   */
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
      value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _react = require('components/react/react');
  
  var _react2 = _interopRequireDefault(_react);
  
  var _reactDom = require('components/react-dom/react-dom');
  
  var _commonStoresCommonStore = require('script/modules/common/stores/commonStore');
  
  var _commonStoresCommonStore2 = _interopRequireDefault(_commonStoresCommonStore);
  
  var _managetitle = require('script/modules/trackcontrol/views/managetitle');
  
  var _managetitle2 = _interopRequireDefault(_managetitle);
  
  var _managetoggle = require('script/modules/trackcontrol/views/managetoggle');
  
  var _managetoggle2 = _interopRequireDefault(_managetoggle);
  
  var Manage = _react2['default'].createClass({
      displayName: 'Manage',
  
      render: function render() {
          return _react2['default'].createElement(
              'div',
              { className: 'manage' },
              _react2['default'].createElement(
                  'div',
                  { className: 'manageControl' },
                  _react2['default'].createElement(_managetitle2['default'], null),
                  _react2['default'].createElement(_managetoggle2['default'], null)
              )
          );
      }
  });
  
  exports['default'] = Manage;
  module.exports = exports['default'];

});
