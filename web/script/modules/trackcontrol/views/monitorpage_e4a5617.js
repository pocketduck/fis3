define('script/modules/trackcontrol/views/monitorpage', function(require, exports, module) {

  /**
   * @file 轨迹监控页码翻页部分 Reflux View
   * @author 崔健 cuijian03@baidu.com 2016.08.24
   */
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
      value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _react = require('components/react/react');
  
  var _react2 = _interopRequireDefault(_react);
  
  var _reactDom = require('components/react-dom/react-dom');
  
  var _actionsTrackAction = require('script/modules/trackcontrol/actions/trackAction');
  
  var _actionsTrackAction2 = _interopRequireDefault(_actionsTrackAction);
  
  var _storesTrackStore = require('script/modules/trackcontrol/stores/trackStore');
  
  var _storesTrackStore2 = _interopRequireDefault(_storesTrackStore);
  
  var Monitorpage = _react2['default'].createClass({
      displayName: 'Monitorpage',
  
      getInitialState: function getInitialState() {
          return {
              // 当前页码
              currentPage: 1,
              // 输入框中的页码
              inputPage: 1,
              // 总页码
              totalPage: 0,
              // 上一页按钮的样式，分为lasepageon&lastPageOff两种
              lastPage: 'lastPageOff',
              // 下一页按钮的样式，分为nextPageOn&nextPageOff两种
              nextPage: 'nextPageOff',
              // 翻页状态，当正在翻页过程中，翻页按钮不可点
              cliking: 0
          };
      },
      componentDidMount: function componentDidMount() {
          _storesTrackStore2['default'].listen(this.onStatusChange);
      },
      onStatusChange: function onStatusChange(type, data) {
          switch (type) {
              case 'totalpage':
                  this.listenTotalpage(data);
                  break;
              case 'listcomplete':
                  this.listenListcomplete();
                  break;
          }
      },
      /**
       * 响应Store totalpage事件，设置总数量量
       *
       * @param {data} 总页数
       */
      listenTotalpage: function listenTotalpage(data) {
          this.setState({ totalPage: data });
          this.setSwichPageStyle(this.state.currentPage);
      },
      /**
       * 响应Store listcomplete事件，开启翻页按钮可点
       *
       */
      listenListcomplete: function listenListcomplete() {
          this.setState({ cliking: 0 });
      },
      /**
       * DOM操作回调，页码输入value变化
       *
       * @param {object} event 事件对象 
       */
      handleChange: function handleChange(event) {
          this.setState({ inputPage: parseInt(event.target.value) });
      },
      /**
       * DOM操作回调，点击跳转页面按钮
       *
       * @param {object} event 事件对象 
       */
      handleJumppage: function handleJumppage(event) {
          var jumpPage = this.state.inputPage;
          this.setState({ currentPage: jumpPage });
          _actionsTrackAction2['default'].list(jumpPage);
      },
      /**
       * DOM操作回调，点击上一页
       *
       * @param {object} event 事件对象 
       */
      handleLastpage: function handleLastpage(event) {
          if (this.state.currentPage === 1 || this.state.cliking === 1) {
              return;
          } else {
              var lastPage = this.state.currentPage - 1;
              this.setState({ currentPage: lastPage });
              this.setState({ inputPage: lastPage });
              _actionsTrackAction2['default'].list(lastPage);
              this.setState({ cliking: 1 });
          }
      },
      /**
       * DOM操作回调，点击下一页
       *
       * @param {object} event 事件对象 
       */
      handleNextpage: function handleNextpage(event) {
          if (this.state.currentPage === this.state.totalPage || this.state.cliking === 1) {
              return;
          } else {
              var nextPage = this.state.currentPage + 1;
              this.setState({ currentPage: nextPage });
              this.setState({ inputPage: nextPage });
              _actionsTrackAction2['default'].list(nextPage);
              this.setState({ cliking: 1 });
          }
      },
      /**
       * view内部，设置翻页按钮样式
       *
       * @param {number} jumpPage 要跳转到的页 
       */
      setSwichPageStyle: function setSwichPageStyle(jumpPage) {
          if (jumpPage === 1) {
              this.setState({ lastPage: 'lastPageOff' });
          } else {
              this.setState({ lastPage: 'lastPageOn' });
          }
          if (jumpPage === this.state.totalPage) {
              this.setState({ nextPage: 'nextPageOff' });
          } else {
              this.setState({ nextPage: 'nextPageOn' });
          }
          this.setState({ currentPage: jumpPage });
      },
      render: function render() {
          var currentPage = this.state.currentPage;
          var totalPage = this.state.totalPage;
          var lastPage = this.state.lastPage;
          var nextPage = this.state.nextPage;
          var inputPage = this.state.inputPage;
          return _react2['default'].createElement(
              'div',
              { className: 'monitorPage' },
              _react2['default'].createElement(
                  'div',
                  { className: 'jumpPage' },
                  _react2['default'].createElement('input', { type: 'number', className: 'inputPage', value: inputPage, onChange: this.handleChange, min: '0', max: totalPage }),
                  _react2['default'].createElement(
                      'span',
                      { className: 'pageNumber' },
                      '/',
                      '    ' + totalPage,
                      '页'
                  ),
                  _react2['default'].createElement(
                      'span',
                      { className: 'goPage', onClick: this.handleJumppage },
                      'GO'
                  )
              ),
              _react2['default'].createElement(
                  'div',
                  { className: 'switchPage' },
                  _react2['default'].createElement('span', { className: lastPage, onClick: this.handleLastpage }),
                  _react2['default'].createElement('span', { className: nextPage, onClick: this.handleNextpage })
              )
          );
      }
  });
  
  exports['default'] = Monitorpage;
  module.exports = exports['default'];

});
