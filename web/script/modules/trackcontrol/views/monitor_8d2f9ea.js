define('script/modules/trackcontrol/views/monitor', function(require, exports, module) {

  /**
   * @file 实时监控 Reflux View
   * @author 崔健 cuijian03@baidu.com 2016.08.23
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
  
  var _commonStoresCommonStore = require('script/modules/common/stores/commonStore');
  
  var _commonStoresCommonStore2 = _interopRequireDefault(_commonStoresCommonStore);
  
  var _monitorsearch = require('script/modules/trackcontrol/views/monitorsearch');
  
  var _monitorsearch2 = _interopRequireDefault(_monitorsearch);
  
  var _monitortab = require('script/modules/trackcontrol/views/monitortab');
  
  var _monitortab2 = _interopRequireDefault(_monitortab);
  
  var _monitorallcontent = require('script/modules/trackcontrol/views/monitorallcontent');
  
  var _monitorallcontent2 = _interopRequireDefault(_monitorallcontent);
  
  var _monitoronlinecontent = require('script/modules/trackcontrol/views/monitoronlinecontent');
  
  var _monitoronlinecontent2 = _interopRequireDefault(_monitoronlinecontent);
  
  var _monitorofflinecontent = require('script/modules/trackcontrol/views/monitorofflinecontent');
  
  var _monitorofflinecontent2 = _interopRequireDefault(_monitorofflinecontent);
  
  var _actionsTrackAction = require('script/modules/trackcontrol/actions/trackAction');
  
  var _actionsTrackAction2 = _interopRequireDefault(_actionsTrackAction);
  
  var Monitor = _react2['default'].createClass({
      displayName: 'Monitor',
  
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
       * 响应Store list事件，设置标签页
       *
       * @param {data} 标签页标识
       */
      listenSwitchmanageTab: function listenSwitchmanageTab(data) {
          this.setState({ tabIndex: data });
          if (data === 0) {} else {}
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
              { className: tabIndex === 1 ? 'monitor hidden' : 'monitor visible', style: parentVisible },
              _react2['default'].createElement(_monitorsearch2['default'], null),
              _react2['default'].createElement(_monitortab2['default'], null),
              _react2['default'].createElement(_monitorallcontent2['default'], null),
              _react2['default'].createElement(_monitoronlinecontent2['default'], null),
              _react2['default'].createElement(_monitorofflinecontent2['default'], null)
          );
      }
  });
  
  exports['default'] = Monitor;
  module.exports = exports['default'];

});
