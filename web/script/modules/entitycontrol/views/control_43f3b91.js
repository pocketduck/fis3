define('script/modules/entitycontrol/views/control', function(require, exports, module) {

  /**
   * @file 页面检索添加栏 Reflux View
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
  
  var _search = require('script/modules/entitycontrol/views/search');
  
  var _search2 = _interopRequireDefault(_search);
  
  var Control = _react2['default'].createClass({
      displayName: 'Control',
  
      render: function render() {
          return _react2['default'].createElement(
              'div',
              { className: 'control' },
              _react2['default'].createElement(_search2['default'], null)
          );
      }
  });
  
  exports['default'] = Control;
  module.exports = exports['default'];

});
