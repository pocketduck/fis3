define('script/modules/trackcontrol/views/managetitle', function(require, exports, module) {

  /**
   * @file 轨迹管理台头部标题 Reflux View
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
  
  var Managetitle = _react2['default'].createClass({
      displayName: 'Managetitle',
  
      getInitialState: function getInitialState() {
          return {
              // 当前service名
              serviceName: '',
              // 当前toggle状态class名
              toggleClass: 'toggleInManage'
          };
      },
      componentDidMount: function componentDidMount() {
          _actionsTrackAction2['default'].getservicename();
          _storesTrackStore2['default'].listen(this.onStatusChange);
      },
      onStatusChange: function onStatusChange(type, data) {
          switch (type) {
              case 'servicename':
                  this.lisenUpdateServiceName(data);
                  break;
          }
      },
      /**
       * 响应Store servicename事件，更新service名称
       *
       * @param {data} 标签页标识
       */
      lisenUpdateServiceName: function lisenUpdateServiceName(data) {
          this.setState({ serviceName: data + '管理' });
      },
      /**
       * DOM操作回调，点击收起放开按钮
       *
       * @param {object} event 事件对象 
       */
      handleToggle: function handleToggle(event) {
          if (this.state.toggleClass === 'toggleInManage') {
              this.setState({ toggleClass: 'toggleOutManage' });
          } else {
              this.setState({ toggleClass: 'toggleInManage' });
          }
      },
      render: function render() {
          var serviceName = this.state.serviceName;
          var toggleClass = this.state.toggleClass;
          return _react2['default'].createElement(
              'div',
              { className: 'manageTop' },
              _react2['default'].createElement(
                  'div',
                  { className: 'serviceName' },
                  serviceName
              ),
              _react2['default'].createElement('div', { className: toggleClass, 'data-toggle': 'collapse', 'data-target': '#manageBottom', onClick: this.handleToggle })
          );
      }
  });
  
  exports['default'] = Managetitle;
  module.exports = exports['default'];

});
