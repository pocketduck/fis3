define('script/modules/trackcontrol/views/managetoggle', function(require, exports, module) {

  /**
   * @file 轨迹管理台收缩部分 Reflux View
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
  
  var _storesTrackStore = require('script/modules/trackcontrol/stores/trackStore');
  
  var _storesTrackStore2 = _interopRequireDefault(_storesTrackStore);
  
  var _managetab = require('script/modules/trackcontrol/views/managetab');
  
  var _managetab2 = _interopRequireDefault(_managetab);
  
  var _monitor = require('script/modules/trackcontrol/views/monitor');
  
  var _monitor2 = _interopRequireDefault(_monitor);
  
  var _track = require('script/modules/trackcontrol/views/track');
  
  var _track2 = _interopRequireDefault(_track);
  
  var Managetoggle = _react2['default'].createClass({
      displayName: 'Managetoggle',
  
      getInitialState: function getInitialState() {
          return {};
      },
      render: function render() {
          return _react2['default'].createElement(
              'div',
              { className: 'collapse in', id: 'manageBottom' },
              _react2['default'].createElement(
                  'div',
                  { className: 'manageBottom' },
                  _react2['default'].createElement(_managetab2['default'], null),
                  _react2['default'].createElement(_monitor2['default'], null),
                  _react2['default'].createElement(_track2['default'], null)
              )
          );
      }
  });
  
  exports['default'] = Managetoggle;
  module.exports = exports['default'];

});
