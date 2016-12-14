define('script/modules/entitycontrol/views/entitycontrol', function(require, exports, module) {

  /**
   * @file 设备管理台 Reflux View
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
  
  var _control = require('script/modules/entitycontrol/views/control');
  
  var _control2 = _interopRequireDefault(_control);
  
  var _entitylist = require('script/modules/entitycontrol/views/entitylist');
  
  var _entitylist2 = _interopRequireDefault(_entitylist);
  
  var _bottomcontrol = require('script/modules/entitycontrol/views/bottomcontrol');
  
  var _bottomcontrol2 = _interopRequireDefault(_bottomcontrol);
  
  var _commonStoresCommonStore = require('script/modules/common/stores/commonStore');
  
  var _commonStoresCommonStore2 = _interopRequireDefault(_commonStoresCommonStore);
  
  var Entitycontrol = _react2['default'].createClass({
      displayName: 'Entitycontrol',
  
      getInitialState: function getInitialState() {
          return {
              // 当前页签，0为轨迹监控，1为终端管理
              tabIndex: 0
          };
      },
      componentDidMount: function componentDidMount() {
          _commonStoresCommonStore2['default'].listen(this.onStatusChange);
      },
      onStatusChange: function onStatusChange(type, data) {
          switch (type) {
              case 'switchtab':
                  this.listenSwitchTab(data);
                  break;
          }
      },
      /**
       * 响应Store list事件，设置标签页
       *
       * @param {data} 标签页标识
       */
      listenSwitchTab: function listenSwitchTab(data) {
          this.setState({ tabIndex: data });
      },
      render: function render() {
          var tabIndex = this.state.tabIndex;
          return _react2['default'].createElement(
              'div',
              { className: tabIndex === 0 ? 'entityControl hidden' : 'entityControl visible' },
              _react2['default'].createElement(_control2['default'], null),
              _react2['default'].createElement(_entitylist2['default'], null),
              _react2['default'].createElement(_bottomcontrol2['default'], null)
          );
      }
  });
  
  exports['default'] = Entitycontrol;
  module.exports = exports['default'];

});
