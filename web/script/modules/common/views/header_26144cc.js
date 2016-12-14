define('script/modules/common/views/header', function(require, exports, module) {

  /**
   * @file 设备管理台头部 Reflux View
   * @author 崔健 cuijian03@baidu.com 2016.08.20
   */
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
      value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _react = require('components/react/react');
  
  var _react2 = _interopRequireDefault(_react);
  
  var _reactDom = require('components/react-dom/react-dom');
  
  var _title = require('script/modules/common/views/title');
  
  var _title2 = _interopRequireDefault(_title);
  
  var _tabs = require('script/modules/common/views/tabs');
  
  var _tabs2 = _interopRequireDefault(_tabs);
  
  var Header = _react2['default'].createClass({
      displayName: 'Header',
  
      render: function render() {
          return _react2['default'].createElement(
              'div',
              { className: 'header' },
              _react2['default'].createElement(_title2['default'], null),
              _react2['default'].createElement(_tabs2['default'], null)
          );
      }
  });
  
  exports['default'] = Header;
  module.exports = exports['default'];

});
