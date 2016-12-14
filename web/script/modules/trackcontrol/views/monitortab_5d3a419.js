define('script/modules/trackcontrol/views/monitortab', function(require, exports, module) {

  /**
   * @file 实时监控页签头部分 Reflux View
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
  
  var _actionsTrackAction = require('script/modules/trackcontrol/actions/trackAction');
  
  var _actionsTrackAction2 = _interopRequireDefault(_actionsTrackAction);
  
  var Monitortab = _react2['default'].createClass({
      displayName: 'Monitortab',
  
      getInitialState: function getInitialState() {
          return {
              // 所有entity数量
              all: 0,
              // 在线entity数量
              online: 0,
              // 离线entity数量
              offline: 0,
              // 当前选中的实时监控列表
              monitorListTab: 'monitorBottomLineLeft'
          };
      },
      componentDidMount: function componentDidMount() {
          _storesTrackStore2['default'].listen(this.onStatusChange);
      },
      onStatusChange: function onStatusChange(type, data) {
          switch (type) {
              case 'totalall':
                  this.listenTotalAll(data);
                  break;
              case 'totaloffline':
                  this.listenTotalOffline(data);
                  break;
              case 'totalonline':
                  this.listenTotalOnline(data);
                  break;
          }
      },
      /**
       * 响应Store totalall事件，设置全部entity总数
       *
       * @param {data} 总页数
       */
      listenTotalAll: function listenTotalAll(data) {
          this.setState({ all: data });
      },
      /**
       * 响应Store totaloffline事件，设置全部entity总数
       *
       * @param {data} 总页数
       */
      listenTotalOffline: function listenTotalOffline(data) {
          this.setState({ offline: data });
      },
      /**
       * 响应Store totalonline事件，设置全部entity总数
       *
       * @param {data} 总页数
       */
      listenTotalOnline: function listenTotalOnline(data) {
          this.setState({ online: data });
      },
      /**
       * DOM操作回调，切换实时监控三种列表
       *
       * @param {object} event 事件对象 
       */
      handleChangeMonitorList: function handleChangeMonitorList(event) {
          if (event.target.className === 'monitorAll') {
              this.setState({ monitorListTab: 'monitorBottomLineLeft' });
              _actionsTrackAction2['default'].switchmonitortab(0);
          } else if (event.target.className === 'monitorOnline') {
              this.setState({ monitorListTab: 'monitorBottomLineMid' });
              _actionsTrackAction2['default'].switchmonitortab(1);
          } else if (event.target.className === 'monitorOffline') {
              this.setState({ monitorListTab: 'monitorBottomLineRight' });
              _actionsTrackAction2['default'].switchmonitortab(2);
          }
      },
      render: function render() {
          var all = this.state.all;
          var online = this.state.online;
          var offline = this.state.offline;
          var monitorListTab = this.state.monitorListTab;
          return _react2['default'].createElement(
              'div',
              { className: 'monitorList' },
              _react2['default'].createElement(
                  'div',
                  { className: 'monitorAll', style: { color: monitorListTab === 'monitorBottomLineLeft' ? '#0a8cff' : '' }, onClick: this.handleChangeMonitorList },
                  '全部(',
                  all,
                  ')'
              ),
              _react2['default'].createElement(
                  'div',
                  { className: 'monitorOnline', style: { color: monitorListTab === 'monitorBottomLineMid' ? '#0a8cff' : '' }, onClick: this.handleChangeMonitorList },
                  '在线(',
                  online,
                  ')'
              ),
              _react2['default'].createElement(
                  'div',
                  { className: 'monitorOffline', style: { color: monitorListTab === 'monitorBottomLineRight' ? '#0a8cff' : '' }, onClick: this.handleChangeMonitorList },
                  '离线(',
                  offline,
                  ')'
              ),
              _react2['default'].createElement('div', { className: monitorListTab })
          );
      }
  });
  
  exports['default'] = Monitortab;
  module.exports = exports['default'];

});
