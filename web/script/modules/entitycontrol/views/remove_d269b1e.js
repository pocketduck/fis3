define('script/modules/entitycontrol/views/remove', function(require, exports, module) {

  /**
   * @file 删除entity Reflux View
   * @author 崔健 cuijian03@baidu.com 2016.08.20
   */
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
      value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _react = require('components/react/react');
  
  var _react2 = _interopRequireDefault(_react);
  
  var _reactDom = require('components/react-dom/react-dom');
  
  var _actionsEntityAction = require('script/modules/entitycontrol/actions/entityAction');
  
  var _actionsEntityAction2 = _interopRequireDefault(_actionsEntityAction);
  
  var _storesEntityStore = require('script/modules/entitycontrol/stores/entityStore');
  
  var _storesEntityStore2 = _interopRequireDefault(_storesEntityStore);
  
  var Remove = _react2['default'].createClass({
      displayName: 'Remove',
  
      getInitialState: function getInitialState() {
          return {};
      },
      componentDidMount: function componentDidMount() {
          _storesEntityStore2['default'].listen(this.onStatusChange);
      },
      onStatusChange: function onStatusChange(type, data) {
          switch (type) {}
      },
      /**
       * DOM操作回调，点击删除按钮
       *
       * @param {object} event 事件对象 
       */
      handleClick: function handleClick(event) {
          if (window.confirm("确定要删除选定的设备么?")) {
              _actionsEntityAction2['default'].remove();
          }
      },
      render: function render() {
          return _react2['default'].createElement(
              'div',
              { className: 'remove', onClick: this.handleClick },
              '删除'
          );
      }
  });
  
  exports['default'] = Remove;
  module.exports = exports['default'];

});
