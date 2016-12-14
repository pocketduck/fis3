define('script/modules/trackcontrol/views/trackcontrol', function(require, exports, module) {

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
  
  var _manage = require('script/modules/trackcontrol/views/manage');
  
  var _manage2 = _interopRequireDefault(_manage);
  
  var _map = require('script/modules/trackcontrol/views/map');
  
  var _map2 = _interopRequireDefault(_map);
  
  var _timeline = require('script/modules/trackcontrol/views/timeline');
  
  var _timeline2 = _interopRequireDefault(_timeline);
  
  var _trackanalysis = require('script/modules/trackcontrol/views/trackanalysis');
  
  var _trackanalysis2 = _interopRequireDefault(_trackanalysis);
  
  var Trackcontrol = _react2['default'].createClass({
      displayName: 'Trackcontrol',
  
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
              { className: tabIndex === 1 ? 'trackControl hidden' : 'trackControl visible' },
              _react2['default'].createElement(_map2['default'], null),
              _react2['default'].createElement(_manage2['default'], null),
              _react2['default'].createElement(_timeline2['default'], null),
              _react2['default'].createElement(_trackanalysis2['default'], null)
          );
      }
  });
  
  exports['default'] = Trackcontrol;
  module.exports = exports['default'];

});
