define('script/modules/trackcontrol/views/monitoronlinecontent', function(require, exports, module) {

  /**
   * @file 实时监控离线 Reflux View
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
  
  var _monitoronlinepage = require('script/modules/trackcontrol/views/monitoronlinepage');
  
  var _monitoronlinepage2 = _interopRequireDefault(_monitoronlinepage);
  
  var _actionsTrackAction = require('script/modules/trackcontrol/actions/trackAction');
  
  var _actionsTrackAction2 = _interopRequireDefault(_actionsTrackAction);
  
  var Monitoronlinecontent = _react2['default'].createClass({
      displayName: 'Monitoronlinecontent',
  
      getInitialState: function getInitialState() {
          return {
              // 页签编码 0为实时监控 1为轨迹查询
              tabIndex: 0,
              // monitor三种列表类型编码 0全部 1在线 2离线
              monitorTabIndex: 0,
              // 父容器可见性
              parentVisible: {},
              // 当前列表内容
              allEntity: [],
              // 当前选中的entityname
              currentEntityName: ''
          };
      },
      componentDidMount: function componentDidMount() {
          _storesTrackStore2['default'].listen(this.onStatusChange);
          _commonStoresCommonStore2['default'].listen(this.onStatusChange);
          // TrackAction.listcolumn();
      },
      onStatusChange: function onStatusChange(type, data) {
          switch (type) {
              case 'switchmanagetab':
                  this.listenSwitchmanageTab(data);
                  break;
              case 'switchtab':
                  this.listenSwitchTab(data);
                  break;
              case 'switchmonitortab':
                  this.listenSwitchMonitorTab(data);
                  break;
              case 'listcolumn':
                  this.listenListColumn();
                  break;
              case 'onlinelist':
                  this.listenOnlineList(data);
                  break;
          }
      },
      /**
       * 响应Store list事件，设置标签页
       *
       * @param {data} 标签页标识
       */
      listenSwitchmanageTab: function listenSwitchmanageTab(data) {
          var that = this;
          if (data === 0) {
              this.setState({ parentVisible: {} });
          } else {
              this.setState({ parentVisible: { visibility: 'inherit' } });
          }
      },
      /**
       * 响应Store switchtab事件，隐藏manage
       *
       * @param {data} 标签页标识
       */
      listenSwitchTab: function listenSwitchTab(data) {
          var that = this;
          if (data === 0) {
              switch (that.state.monitorTabIndex) {
                  case 0:
                      this.setState({ parentVisible: {} });
                      break;
                  case 1:
                      this.setState({ parentVisible: { visibility: 'inherit' } });
                      break;
                  case 2:
                      this.setState({ parentVisible: {} });
                      break;
              }
              this.setState({ tabIndex: 0 });
          } else {
              this.setState({ parentVisible: { visibility: 'inherit' } });
              this.setState({ tabIndex: 1 });
          }
      },
      /**
       * 响应Store switchmonitortab事件,设置标签页
       *
       * @param {data} 标签页标识
       */
      listenSwitchMonitorTab: function listenSwitchMonitorTab(data) {
          this.setState({ parentVisible: {} });
          this.setState({ monitorTabIndex: data });
      },
      /**
       * 响应Store listcolumn事件,设置标签页
       *
       */
      listenListColumn: function listenListColumn() {
          _actionsTrackAction2['default'].searchonlineentity(1);
      },
      /**
       * 响应Store onlinelist事件,设置列表
       *
       * @param {data} entity数据
       */
      listenOnlineList: function listenOnlineList(data) {
          this.setState({ allEntity: data });
      },
      /**
       * DOM操作回调，点击选中一辆车
       *
       * @param {object} event 事件对象 
       */
      handleSelectCar: function handleSelectCar(event) {
          var realTarget = event.target;
          if (event.target.parentElement.className.indexOf('monitorListItem') > -1) {
              realTarget = event.target.parentElement;
          }
          if (event.target.parentElement.parentElement.className.indexOf('monitorListItem') > -1) {
              realTarget = event.target.parentElement.parentElement;
          }
          var entity_name = realTarget.getAttribute('data-entity_name');
          var entity_status = realTarget.getAttribute('data-entity_status');
          this.setState({ currentEntityName: entity_name });
          _actionsTrackAction2['default'].selectcar(entity_name, entity_status, 'onlineCompleteEntities');
      },
      render: function render() {
          var monitorTabIndex = this.state.monitorTabIndex;
          var parentVisible = this.state.parentVisible;
          var allEntity = this.state.allEntity;
          var handleSelectCar = this.handleSelectCar;
          var currentEntityName = this.state.currentEntityName;
          return _react2['default'].createElement(
              'div',
              { className: monitorTabIndex === 1 ? 'monitorOnlineContent visible' : 'monitorOnlineContent hidden', style: parentVisible },
              _react2['default'].createElement(
                  'div',
                  { className: 'monitorFrame' },
                  allEntity.map(function (item, key) {
                      return _react2['default'].createElement(
                          'div',
                          { className: 'monitorListItem' + item[2] + (currentEntityName === item[0] ? ' monitorSelect' : ''), key: key, 'data-entity_name': item[0], 'data-entity_status': item[2], onClick: handleSelectCar },
                          _react2['default'].createElement(
                              'div',
                              { className: 'monitorListItemName' },
                              _react2['default'].createElement(
                                  'abbr',
                                  { title: item[0] },
                                  item[0]
                              )
                          ),
                          _react2['default'].createElement(
                              'div',
                              { className: 'monitorListItemSpeed' },
                              item[1]
                          )
                      );
                  })
              ),
              _react2['default'].createElement(_monitoronlinepage2['default'], null)
          );
      }
  });
  
  exports['default'] = Monitoronlinecontent;
  module.exports = exports['default'];

});
