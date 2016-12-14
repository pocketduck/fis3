define('script/modules/trackcontrol/views/map', function(require, exports, module) {

  /**
   * @file 轨迹管理台背景地图 Reflux View
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
  
  var Map = _react2['default'].createClass({
      displayName: 'Map',
  
      getInitialState: function getInitialState() {
          return {};
      },
      componentDidMount: function componentDidMount() {
          _commonStoresCommonStore2['default'].listen(this.onStatusChange);
          this.initMapContainer();
      },
      onStatusChange: function onStatusChange(type, data) {
          switch (type) {
              case '':
  
                  break;
          }
      },
      /**
       * 响应Store list事件，设置标签页
       *
       * @param {data} 标签页标识
       */
      listenSwitchTab: function listenSwitchTab(data) {},
      /**
       * view内部，设置map容器尺寸
       *
       */
      initMapContainer: function initMapContainer() {},
      render: function render() {
          return _react2['default'].createElement('div', { className: 'map', id: 'mapContainer' });
      }
  });
  
  exports['default'] = Map;
  module.exports = exports['default'];

});
