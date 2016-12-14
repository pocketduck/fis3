define('script/modules/trackcontrol/views/managetab', function(require, exports, module) {

  /**
   * @file 轨迹管理台Tab切换 Reflux View
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
  
  var _actionsTrackAction = require('script/modules/trackcontrol/actions/trackAction');
  
  var _actionsTrackAction2 = _interopRequireDefault(_actionsTrackAction);
  
  var _storesTrackStore = require('script/modules/trackcontrol/stores/trackStore');
  
  var _storesTrackStore2 = _interopRequireDefault(_storesTrackStore);
  
  var Managetab = _react2['default'].createClass({
      displayName: 'Managetab',
  
      getInitialState: function getInitialState() {
          return {
              pointerTab: 'pointerTabLeft',
              pointerTabIndex: 0
          };
      },
      /**
       * DOM操作回调，切换标签页
       *
       * @param {object} event 事件对象 
       */
      handleToggle: function handleToggle(event) {
          if (event.target.className === 'trackTab') {
              this.setState({ pointerTab: 'pointerTabRight' });
              this.setState({ pointerTabIndex: 1 });
              _actionsTrackAction2['default'].switchmanagetab(1);
          } else {
              this.setState({ pointerTab: 'pointerTabLeft' });
              this.setState({ pointerTabIndex: 0 });
              _actionsTrackAction2['default'].switchmanagetab(0);
          }
      },
      render: function render() {
          var pointerTab = this.state.pointerTab;
          return _react2['default'].createElement(
              'div',
              { className: 'manageTab' },
              _react2['default'].createElement(
                  'div',
                  { className: 'monitorTab', onClick: this.handleToggle },
                  '实时监控',
                  _react2['default'].createElement('div', { className: 'monitorTabIcon' })
              ),
              _react2['default'].createElement(
                  'div',
                  { className: 'trackTab', onClick: this.handleToggle },
                  '轨迹查询',
                  _react2['default'].createElement('div', { className: 'trackTabIcon' })
              ),
              _react2['default'].createElement('div', { className: pointerTab })
          );
      }
  });
  
  exports['default'] = Managetab;
  module.exports = exports['default'];

});
