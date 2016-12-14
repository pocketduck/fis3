define('script/modules/common/views/tabs', function(require, exports, module) {

  /**
   * @file 切换功能页签 Reflux View
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
  
  var _actionsCommonAction = require('script/modules/common/actions/commonAction');
  
  var _actionsCommonAction2 = _interopRequireDefault(_actionsCommonAction);
  
  var _storesCommonStore = require('script/modules/common/stores/commonStore');
  
  var _storesCommonStore2 = _interopRequireDefault(_storesCommonStore);
  
  var Tabs = _react2['default'].createClass({
      displayName: 'Tabs',
  
      getInitialState: function getInitialState() {
          return {
              // 当前tab页签
              currentIndex: 0
          };
      },
      render: function render() {
          var that = this;
          var tabsArray = ['轨迹监控', '终端管理'];
          return _react2['default'].createElement(
              'div',
              { className: 'tab' },
              tabsArray.map(function (tabsName, index) {
                  return _react2['default'].createElement(
                      'div',
                      { className: 'tabItem', key: index },
                      _react2['default'].createElement(
                          'span',
                          { key: index, onClick: function () {
                                  that.setState({ currentIndex: index });_actionsCommonAction2['default'].switchtab(index);
                              }, className: index === that.state.currentIndex ? 'active' : '' },
                          tabsName
                      )
                  );
              })
          );
      }
  });
  
  exports['default'] = Tabs;
  module.exports = exports['default'];

});
