define('script/modules/entitycontrol/views/search', function(require, exports, module) {

  /**
   * @file 检索entity Reflux View
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
  
  var _storesEntityStore = require('script/modules/entitycontrol/stores/entityStore');
  
  var _storesEntityStore2 = _interopRequireDefault(_storesEntityStore);
  
  var _actionsEntityAction = require('script/modules/entitycontrol/actions/entityAction');
  
  var _actionsEntityAction2 = _interopRequireDefault(_actionsEntityAction);
  
  var Search = _react2['default'].createClass({
      displayName: 'Search',
  
      getInitialState: function getInitialState() {
          return {
              value: '',
              visible: 0,
              cliking: 0
          };
      },
      componentDidMount: function componentDidMount() {
          var self = this;
          _storesEntityStore2['default'].listen(self.onStatusChange);
      },
      onStatusChange: function onStatusChange(type, data) {
          switch (type) {
              case 'listcomplete':
                  this.listenListcomplete(type);
                  break;
  
          }
      },
      listenListcomplete: function listenListcomplete() {
          this.setState({ cliking: 0 });
      },
      /**
       * DOM操作回调，检索框value改变
       *
       * @param {object} event 事件对象 
       */
      handleChange: function handleChange(event) {
          this.setState({ value: event.target.value });
          if (event.target.value != '') {
              this.state.visible = 1;
          } else {
              this.state.visible = 0;
              _actionsEntityAction2['default'].initpageset();
              _actionsEntityAction2['default'].setsearchentity('');
              _actionsEntityAction2['default'].list(1);
              this.setState({ cliking: 1 });
          }
      },
      /**
       * DOM操作回调，检索框value清空
       *
       * @param {object} event 事件对象 
       */
      handleClearClick: function handleClearClick(event) {
          if (this.state.cliking === 1) {
              return;
          }
          _actionsEntityAction2['default'].initpageset();
          this.setState({ value: '', visible: 0 });
          _actionsEntityAction2['default'].setsearchentity('');
          _actionsEntityAction2['default'].list(1);
          this.setState({ cliking: 1 });
      },
      /**
       * DOM操作回调，检索
       *
       * @param {object} event 事件对象 s
       */
      handleClickSearch: function handleClickSearch(event) {
          if (this.state.cliking === 1) {
              return;
          }
          _actionsEntityAction2['default'].initpageset();
          _actionsEntityAction2['default'].setsearchentity(this.state.value);
          _actionsEntityAction2['default'].list(1);
          this.setState({ cliking: 1 });
      },
      /**
       * DOM操作回调，点击回车检索
       *
       * @param {object} event 事件对象 s
       */
      handleKeyBoard: function handleKeyBoard(event) {
          if (this.state.cliking === 1) {
              return;
          }
          if (event.key === 'Enter') {
              _actionsEntityAction2['default'].initpageset();
              _actionsEntityAction2['default'].setsearchentity(this.state.value);
              _actionsEntityAction2['default'].list(1);
              this.setState({ cliking: 1 });
          }
      },
      render: function render() {
          var searchicon = '/static/images/searchicon_2x_a1d099c.png';
          var clearsearch = '/static/images/clearsearch_2x_3dd6011.png';
          return _react2['default'].createElement(
              'div',
              { className: 'searchEntity' },
              _react2['default'].createElement('input', { className: 'searchInput', placeholder: '请输入名称', value: this.state.value, onChange: this.handleChange, onKeyPress: this.handleKeyBoard }),
              _react2['default'].createElement('img', { src: searchicon, className: 'searchBtn', onClick: this.handleClickSearch }),
              _react2['default'].createElement('div', { className: 'line' }),
              _react2['default'].createElement('img', { src: clearsearch, className: this.state.visible === 0 ? 'clearSearchBtn hideCommon' : 'clearSearchBtn', onClick: this.handleClearClick })
          );
      }
  });
  
  exports['default'] = Search;
  module.exports = exports['default'];

});
