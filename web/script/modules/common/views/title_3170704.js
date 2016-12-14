define('script/modules/common/views/title', function(require, exports, module) {

  /**
   * @file 页标题 Reflux View
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
  
  var Title = _react2['default'].createClass({
      displayName: 'Title',
  
      render: function render() {
          var logo = '/static/images/logo_2x_df3c72c.png';
          return _react2['default'].createElement(
              'div',
              { className: 'title' },
              _react2['default'].createElement('img', { src: logo, className: 'logo' }),
              _react2['default'].createElement(
                  'span',
                  { className: 'headName' },
                  '百度鹰眼'
              )
          );
      }
  });
  
  exports['default'] = Title;
  module.exports = exports['default'];

});
