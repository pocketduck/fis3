define('script/modules/trackcontrol/views/track', function(require, exports, module) {

  /**
   * @file 实时监控 Reflux View
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
  
  var _commonStoresCommonStore = require('script/modules/common/stores/commonStore');
  
  var _commonStoresCommonStore2 = _interopRequireDefault(_commonStoresCommonStore);
  
  var _tracksearch = require('script/modules/trackcontrol/views/tracksearch');
  
  var _tracksearch2 = _interopRequireDefault(_tracksearch);
  
  var _trackdatetime = require('script/modules/trackcontrol/views/trackdatetime');
  
  var _trackdatetime2 = _interopRequireDefault(_trackdatetime);
  
  var _trackcontent = require('script/modules/trackcontrol/views/trackcontent');
  
  var _trackcontent2 = _interopRequireDefault(_trackcontent);
  
  var _actionsTrackAction = require('script/modules/trackcontrol/actions/trackAction');
  
  var _actionsTrackAction2 = _interopRequireDefault(_actionsTrackAction);
  
  var Track = _react2['default'].createClass({
      displayName: 'Track',
  
      getInitialState: function getInitialState() {
          return {
              // 页签编码 0为实时监控 1为轨迹查询
              tabIndex: 0,
              // 父容器可见性
              parentVisible: {}
          };
      },
      componentDidMount: function componentDidMount() {
          _storesTrackStore2['default'].listen(this.onStatusChange);
          _commonStoresCommonStore2['default'].listen(this.onStatusChange);
      },
      onStatusChange: function onStatusChange(type, data) {
          switch (type) {
              case 'switchmanagetab':
                  this.listenSwitchmanageTab(data);
                  break;
              case 'switchtab':
                  this.listenSwitchTab(data);
                  break;
          }
      },
      /**
       * 响应Store switchmanagetab事件，设置标签页
       *
       * @param {data} 标签页标识
       */
      listenSwitchmanageTab: function listenSwitchmanageTab(data) {
          this.setState({ tabIndex: data });
          if (data === 1) {
              _actionsTrackAction2['default'].hideselectcar();
              mapControl.showSpeedControl();
              mapControl.removeTrafficControl();
          } else {
              _actionsTrackAction2['default'].selectcar();
              mapControl.showTrafficControl();
              mapControl.removeSpeedControl();
              var overlays = map.getOverlays();
              map.clearOverlays();
          }
      },
      /**
       * 响应Store switchtab事件，隐藏manage
       *
       * @param {data} 标签页标识
       */
      listenSwitchTab: function listenSwitchTab(data) {
          if (data === 0) {
              this.setState({ parentVisible: {} });
          } else {
              this.setState({ parentVisible: { visibility: 'inherit' } });
          }
      },
      render: function render() {
          var tabIndex = this.state.tabIndex;
          var parentVisible = this.state.parentVisible;
          return _react2['default'].createElement(
              'div',
              { className: tabIndex === 0 ? 'track hidden' : 'track visible', style: parentVisible },
              _react2['default'].createElement(_trackdatetime2['default'], null),
              _react2['default'].createElement(_tracksearch2['default'], null),
              _react2['default'].createElement(_trackcontent2['default'], null)
          );
      }
  });
  
  exports['default'] = Track;
  module.exports = exports['default'];

});
