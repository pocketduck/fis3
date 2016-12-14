define('script/modules/trackcontrol/views/trackcontent', function(require, exports, module) {

  /**
   * @file ¹ì¼£²éÑ¯ÁÐ±í Reflux View
   * @author ´Þ½¡ cuijian03@baidu.com 2016.08.29
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
  
  var _actionsTrackAction = require('script/modules/trackcontrol/actions/trackAction');
  
  var _actionsTrackAction2 = _interopRequireDefault(_actionsTrackAction);
  
  var _trackpages = require('script/modules/trackcontrol/views/trackpages');
  
  var _trackpages2 = _interopRequireDefault(_trackpages);
  
  var Trackcontent = _react2['default'].createClass({
      displayName: 'Trackcontent',
  
      getInitialState: function getInitialState() {
          return {
              // µ±Ç°ÁÐ±íÄÚÈÝ
              trackList: [],
              // µ±Ç°Ñ¡ÖÐ³µµÄ×ø±ê
              currentTrack: {},
              // ¿Õ°×ÁÐ±íÏî
              blankEntityList: [],
              // µ±Ç°Ñ¡ÖÐµÄentityname
              currentEntityName: ''
          };
      },
      componentDidMount: function componentDidMount() {
          _storesTrackStore2['default'].listen(this.onStatusChange);
          _actionsTrackAction2['default'].tracklist(1);
          // this.listenTrackRoute();
      },
      onStatusChange: function onStatusChange(type, data) {
          switch (type) {
              case 'tracklist':
                  this.listenTrackList(data);
                  break;
              case 'trackroute':
                  this.listenTrackRoute(data);
                  break;
          }
      },
      /**
       * ÏìÓ¦Store tracklistÊÂ¼þ£¬ÉèÖÃ¹ì¼£ÁÐ±í
       *
       * @param {data} ±êÇ©Ò³±êÊ¶
       */
      listenTrackList: function listenTrackList(data) {
          this.setState({ trackList: data });
          var tempArray = new Array(10 - data.length);
          tempArray.fill(1);
          this.setState({ blankEntityList: tempArray });
      },
      /**
       * ÏìÓ¦Store trackrouteÊÂ¼þ£¬ÔÚµØÍ¼ÉÏ»æÖÆ¹ì¼£
       *
       * @param {data} ¹ì¼£Êý¾Ý
       */
      listenTrackRoute: function listenTrackRoute(data) {
          var that = this;
          var points = [];
          if (data.length === 0) {
              return;
          }
          for (var i = 0; i < data.length; i++) {
              points[i] = new BMap.Point(data[i].location[0], data[i].location[1]);
              points[i].speed = data[i].speed ? data[i].speed : 0;
              points[i].loc_time = data[i].loc_time;
          }
          map.setViewport(points);
          map.zoomOut();
          var update = function update() {
              var nextArray = [];
              var ctx = this.canvas.getContext("2d");
              if (!ctx) {
                  return;
              }
              ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  
              if (points.length != 0) {
                  var lines = 1;
                  var lineObj = {};
                  var width = [4, 8];
                  for (var i = 0, len = points.length; i < len - 1; i++) {
  
                      var pixel = map.pointToPixel(points[i]);
                      var nextPixel = map.pointToPixel(points[i + 1]);
                      ctx.beginPath();
                      ctx.lineCap = "round";
                      ctx.lineWidth = 6;
                      ctx.moveTo(pixel.x, pixel.y);
                      var grd = ctx.createLinearGradient(pixel.x, pixel.y, nextPixel.x, nextPixel.y);
                      var speed = points[i].speed;
                      var speedNext = points[i + 1].speed;
                      grd.addColorStop(0, that.getColorBySpeed(speed));
                      grd.addColorStop(1, that.getColorBySpeed(speedNext));
                      ctx.strokeStyle = grd;
                      if (points[i + 1].loc_time - points[i].loc_time <= 5 * 60) {
                          ctx.lineTo(nextPixel.x, nextPixel.y);
                      } else {
                          var partImgStart;
                          var partImgEnd;
  
                          (function () {
                              lines = lines + 1;
                              var lineNum = lines;
                              nextArray.push([pixel, nextPixel]);
                              partImgStart = new Image();
  
                              partImgStart.src = "/static/images/startpoint_72bcf14.png";
                              var next = nextPixel;
                              partImgStart.onload = function () {
                                  ctx.drawImage(partImgStart, next.x - 10, next.y - 30);
                                  ctx.font = "lighter 14px arial";
                                  ctx.fillStyle = "white";
                                  ctx.fillText(lineNum, next.x - width[lineNum >= 10 ? 1 : 0], next.y - 15);
                              };
  
                              var current = pixel;
                              partImgEnd = new Image();
  
                              partImgEnd.src = "/static/images/endpoint_1a825d7.png";
                              partImgEnd.onload = function () {
                                  ctx.drawImage(partImgEnd, current.x - 10, current.y - 30);
                                  ctx.font = "lighter 14px arial";
                                  ctx.fillStyle = "white";
                                  ctx.fillText(lineNum - 1, current.x - width[lineNum >= 10 ? 1 : 0], current.y - 15);
                              };
                          })();
                      }
  
                      ctx.stroke();
                  }
              }
              // Ìí¼ÓµÚÒ»¸öÆðµãºÍ×îºóÒ»¸öÖÕµã
  
              var imgStart = new Image();
              imgStart.src = "/static/images/startpoint_72bcf14.png";
              imgStart.onload = function () {
                  ctx.drawImage(imgStart, map.pointToPixel(points[0]).x - 10, map.pointToPixel(points[0]).y - 30);
                  ctx.font = "lighter 14px arial";
                  ctx.fillStyle = "white";
                  ctx.fillText("1", map.pointToPixel(points[0]).x - width[lines >= 10 ? 1 : 0], map.pointToPixel(points[0]).y - 15);
              };
              var imgEnd = new Image();
              imgEnd.src = "/static/images/endpoint_1a825d7.png";
              imgEnd.onload = function () {
                  ctx.drawImage(imgEnd, map.pointToPixel(points[i]).x - 10, map.pointToPixel(points[i]).y - 30);
                  ctx.font = "lighter 14px arial";
                  ctx.fillStyle = "white";
                  ctx.fillText(lines, map.pointToPixel(points[i]).x - width[lines >= 10 ? 1 : 0], map.pointToPixel(points[i]).y - 15);
              };
          };
          if (points.length > 0) {
              if (typeof canvasLayer != "undefined") {
                  map.removeOverlay(canvasLayer);
              }
              window.canvasLayer = new CanvasLayer({
                  map: map,
                  update: update
              });
          }
          _actionsTrackAction2['default'].behavioranalysis();
          _actionsTrackAction2['default'].getstaypoint();
      },
      /**
       * viewÄÚ²¿ ¸ù¾ÝËÙ¶È»ñÈ¡ÑÕÉ«
       * 
       * @param {number} speed ËÙ¶È
       *
       * @return {string} ÑÕÉ«µÄÊ®Áù½øÖÆRGB
       */
      getColorBySpeed: function getColorBySpeed(speed) {
          var color = '';
          var red = 0;
          var green = 0;
          var blue = 0;
          speed = speed > 100 ? 100 : speed;
          switch (Math.floor(speed / 25)) {
              case 0:
                  red = 187;
                  green = 0;
                  blue = 0;
                  break;
              case 1:
                  speed = speed - 25;
                  red = 187 + Math.ceil((241 - 187) / 25 * speed);
                  green = 0 + Math.ceil((48 - 0) / 25 * speed);
                  blue = 0 + Math.ceil((48 - 0) / 25 * speed);
                  break;
              case 2:
                  speed = speed - 50;
                  red = 241 + Math.ceil((255 - 241) / 25 * speed);
                  green = 48 + Math.ceil((200 - 48) / 25 * speed);
                  blue = 48 + Math.ceil((0 - 48) / 25 * speed);
                  break;
              case 3:
                  speed = speed - 75;
                  red = 255 + Math.ceil((22 - 255) / 25 * speed);
                  green = 200 + Math.ceil((191 - 200) / 25 * speed);
                  blue = 0 + Math.ceil((43 - 0) / 25 * speed);
                  break;
              case 4:
                  red = 22;
                  green = 191;
                  blue = 43;
                  break;
          }
  
          red = red.toString(16).length === 1 ? '0' + red.toString(16) : red.toString(16);
          green = green.toString(16).length === 1 ? '0' + green.toString(16) : green.toString(16);
          blue = blue.toString(16).length === 1 ? '0' + blue.toString(16) : blue.toString(16);
          color = '#' + red + green + blue;
          return color;
      },
      /**
       * DOM²Ù×÷»Øµ÷£¬µã»÷Ñ¡ÖÐÒ»¸ö¹ì¼£
       *
       * @param {object} event ÊÂ¼þ¶ÔÏó 
       */
      handleSelectTrack: function handleSelectTrack(event) {
          var realTarget = event.target;
          if (event.target.parentElement.className.indexOf('monitorListItem') > -1) {
              realTarget = event.target.parentElement;
          }
          if (event.target.parentElement.parentElement.className.indexOf('monitorListItem') > -1) {
              realTarget = event.target.parentElement.parentElement;
          }
          var entity_name = realTarget.getAttribute('data-entity_name');
          this.setState({ currentEntityName: entity_name });
          mapControl.removeBehaviorOverlay();
          _actionsTrackAction2['default'].selecttrack(entity_name);
      },
      render: function render() {
          var trackList = this.state.trackList;
          var currentTrack = this.state.currentTrack;
          var handleSelectTrack = this.handleSelectTrack;
          var blankEntityList = this.state.blankEntityList;
          var currentEntityName = this.state.currentEntityName;
          return _react2['default'].createElement(
              'div',
              { className: 'trackContent' },
              _react2['default'].createElement(
                  'div',
                  { className: 'monitorFrame' },
                  trackList.map(function (item, key) {
                      return _react2['default'].createElement(
                          'div',
                          { className: 'monitorListItem' + item.style + (currentEntityName === item.name ? ' monitorSelect' : ''), key: key, 'data-entity_name': item.name, onClick: handleSelectTrack },
                          _react2['default'].createElement(
                              'div',
                              { className: 'monitorListItemName' },
                              _react2['default'].createElement(
                                  'abbr',
                                  { title: item.name },
                                  item.name
                              )
                          ),
                          _react2['default'].createElement(
                              'div',
                              { className: 'monitorListItemSpeed' },
                              item.distance >= 0 ? item.distance + ' km' : _react2['default'].createElement('div', { className: 'loading' })
                          )
                      );
                  }),
                  blankEntityList.map(function (item, key) {
                      return _react2['default'].createElement(
                          'div',
                          { className: 'monitorListItem', key: key },
                          _react2['default'].createElement('div', { className: 'monitorListItemName' }),
                          _react2['default'].createElement('div', { className: 'monitorListItemSpeed' })
                      );
                  })
              ),
              _react2['default'].createElement(_trackpages2['default'], null)
          );
      }
  });
  
  exports['default'] = Trackcontent;
  module.exports = exports['default'];

});
