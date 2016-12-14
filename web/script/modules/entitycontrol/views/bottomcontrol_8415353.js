define('script/modules/entitycontrol/views/bottomcontrol', function(require, exports, module) {

  /**
   * @file 页面底部 Reflux View
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
  
  var _selectall = require('script/modules/entitycontrol/views/selectall');
  
  var _selectall2 = _interopRequireDefault(_selectall);
  
  var _remove = require('script/modules/entitycontrol/views/remove');
  
  var _remove2 = _interopRequireDefault(_remove);
  
  var _page = require('script/modules/entitycontrol/views/page');
  
  var _page2 = _interopRequireDefault(_page);
  
  var Bottomcontrol = _react2['default'].createClass({
      displayName: 'Bottomcontrol',
  
      render: function render() {
          return _react2['default'].createElement(
              'div',
              { className: 'bottomControl' },
              _react2['default'].createElement(_selectall2['default'], null),
              _react2['default'].createElement(_remove2['default'], null),
              _react2['default'].createElement(_page2['default'], null)
          );
      }
  });
  
  exports['default'] = Bottomcontrol;
  module.exports = exports['default'];

});
