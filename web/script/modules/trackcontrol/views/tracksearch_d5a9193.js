define('script/modules/trackcontrol/views/tracksearch', function(require, exports, module) {

  /**
   * @file 轨迹查询检索entity部分 Reflux View
   * @author 崔健 cuijian03@baidu.com 2016.08.29
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
  
  var Tracksearch = _react2['default'].createClass({
      displayName: 'Tracksearch',
  
      getInitialState: function getInitialState() {
          return {
              value: '',
              visible: 0,
              cliking: 0
          };
      },
      componentDidMount: function componentDidMount() {
          var self = this;
          _storesTrackStore2['default'].listen(self.onStatusChange);
      },
      onStatusChange: function onStatusChange(type, data) {
          switch (type) {
              case 'tracklistloaded':
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
              _actionsTrackAction2['default'].initpagesettrack();
              _actionsTrackAction2['default'].setsearchentitytrack('');
              _actionsTrackAction2['default'].tracklist(1);
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
          _actionsTrackAction2['default'].initpagesettrack();
          this.setState({ value: '', visible: 0 });
          _actionsTrackAction2['default'].setsearchentitytrack('');
          _actionsTrackAction2['default'].tracklist(1);
          this.setState({ cliking: 1 });
      },
      /**
       * DOM操作回调，检索
       *
       * @param {object} event 事件对象 
       */
      handleClickSearch: function handleClickSearch(event) {
          if (this.state.cliking === 1) {
              return;
          }
          _actionsTrackAction2['default'].initpagesettrack();
          _actionsTrackAction2['default'].setsearchentitytrack(this.state.value);
          _actionsTrackAction2['default'].tracklist(1);
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
              _actionsTrackAction2['default'].initpagesettrack();
              _actionsTrackAction2['default'].setsearchentitytrack(this.state.value);
              _actionsTrackAction2['default'].tracklist(1);
              this.setState({ cliking: 1 });
          }
      },
      render: function render() {
          var searchicon = '/static/images/searchicon_2x_a1d099c.png';
          var clearsearch = '/static/images/clearsearch_2x_3dd6011.png';
          return _react2['default'].createElement(
              'div',
              { className: 'trackSearch' },
              _react2['default'].createElement('input', { className: 'searchInputMonitor', placeholder: '请输入关键字', value: this.state.value, onChange: this.handleChange, onKeyPress: this.handleKeyBoard }),
              _react2['default'].createElement('img', { src: searchicon, className: 'searchBtnMonitor', onClick: this.handleClickSearch }),
              _react2['default'].createElement('div', { className: 'lineMonitor' }),
              _react2['default'].createElement('img', { src: clearsearch, className: this.state.visible === 0 ? 'clearSearchBtnMonitor hideCommon' : 'clearSearchBtnMonitor', onClick: this.handleClearClick })
          );
      }
  });
  
  exports['default'] = Tracksearch;
  module.exports = exports['default'];

});
