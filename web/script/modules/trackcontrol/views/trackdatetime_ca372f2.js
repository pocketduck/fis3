define('script/modules/trackcontrol/views/trackdatetime', function(require, exports, module) {

  /**
   * @file 轨迹查询时间选择entity部分 Reflux View
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
  
  var _commonCommonfun = require('script/common/commonfun');
  
  var _commonCommonfun2 = _interopRequireDefault(_commonCommonfun);
  
  var Trackdatetime = _react2['default'].createClass({
      displayName: 'Trackdatetime',
  
      getInitialState: function getInitialState() {
          return {
              defaultDatetime: ''
          };
      },
      componentDidMount: function componentDidMount() {
          this.initTrackDatetime();
      },
      /**
       * view内部 初始化时间选择插件
       *
       */
      initTrackDatetime: function initTrackDatetime() {
          var that = this;
          $('#datetimepicker').datetimepicker({
              language: 'zh-CN',
              weekStart: 1,
              todayBtn: 1,
              autoclose: 1,
              todayHighlight: 1,
              startView: 2,
              forceParse: 0,
              minView: 2,
              pickerPosition: 'bottom-left'
          });
          $('#datetimepicker').on('changeDate', function (e) {
              that.setState({ defaultDatetime: _commonCommonfun2['default'].getCurrentDate(e.date) });
              _actionsTrackAction2['default'].changedatetime(_commonCommonfun2['default'].getCurrentDate(e.date));
              _actionsTrackAction2['default'].tracklist();
          });
          $('#datetimepicker').datetimepicker('setEndDate', _commonCommonfun2['default'].getCurrentDate());
          that.setState({ defaultDatetime: _commonCommonfun2['default'].getCurrentDate() });
          _actionsTrackAction2['default'].changedatetime(_commonCommonfun2['default'].getCurrentDate());
      },
      /**
       * DOM操作回调，这里没有实际作用，主要为了防止react报错
       *
       * @param {object} event 事件对象 
       */
      handleChangeDate: function handleChangeDate(e) {
          _actionsTrackAction2['default'].changedatetime(this.state.defaultDatetime);
      },
      render: function render() {
          var defaultDatetime = this.state.defaultDatetime;
          return _react2['default'].createElement(
              'div',
              { className: 'trackDatetime' },
              _react2['default'].createElement(
                  'div',
                  { className: 'input-append date', id: 'datetimepicker', 'data-date-format': 'yyyy-mm-dd' },
                  _react2['default'].createElement('input', { className: 'datetimeInput', size: '16', type: 'text', value: defaultDatetime, onChange: this.handleChangeDate }),
                  _react2['default'].createElement(
                      'span',
                      { className: 'add-on datetimeBtn' },
                      _react2['default'].createElement('i', { className: 'icon-th' })
                  )
              )
          );
      }
  });
  
  exports['default'] = Trackdatetime;
  module.exports = exports['default'];

});
