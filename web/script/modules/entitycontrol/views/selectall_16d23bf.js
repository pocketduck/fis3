define('script/modules/entitycontrol/views/selectall', function(require, exports, module) {

  /**
   * @file 全选当前页entity Reflux View
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
  
  var Selectall = _react2['default'].createClass({
      displayName: 'Selectall',
  
      getInitialState: function getInitialState() {
          return {};
      },
      componentDidMount: function componentDidMount() {
          var self = this;
          _storesEntityStore2['default'].listen(self.onStatusChange);
          this.setCheckboxStyle();
      },
      onStatusChange: function onStatusChange(type, data) {
          switch (type) {
              case 'listcomplete':
                  this.listenListcomplete();
                  break;
          }
      },
      /**
       * 响应Store listcomplete事件，取消所有checkbox选中状态
       *
       */
      listenListcomplete: function listenListcomplete() {
          $('#checkAll').iCheck('uncheck');
      },
      /**
       * view内部，初始化checkbox样式，添加监听
       *
       */
      setCheckboxStyle: function setCheckboxStyle() {
          $('#checkAll').iCheck({
              checkboxClass: 'icheckbox_square-blue',
              radioClass: 'iradio_square',
              increaseArea: '20%' // optional
          });
          $('#checkAll').on('ifChecked', function (event) {
              _actionsEntityAction2['default'].checkall();
          });
          $('#checkAll').on('ifUnchecked', function (event) {
              _actionsEntityAction2['default'].uncheckall();
          });
      },
      render: function render() {
          return _react2['default'].createElement(
              'div',
              { className: 'selectAll' },
              _react2['default'].createElement(
                  'label',
                  null,
                  _react2['default'].createElement('input', { type: 'checkbox', id: 'checkAll' }),
                  _react2['default'].createElement(
                      'span',
                      { className: 'allCheck' },
                      '全选'
                  )
              )
          );
      }
  });
  
  exports['default'] = Selectall;
  module.exports = exports['default'];

});
