define('script/modules/trackcontrol/stores/trackStore', function(require, exports, module) {

  /**
   * @file 轨迹管理台Reflux Store
   * @author 崔健 cuijian03@baidu.com 2016.08.23
   */
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
      value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _actionsTrackAction = require('script/modules/trackcontrol/actions/trackAction');
  
  var _actionsTrackAction2 = _interopRequireDefault(_actionsTrackAction);
  
  var _commonUrls = require('script/common/urls');
  
  var _commonUrls2 = _interopRequireDefault(_commonUrls);
  
  var _commonCommonfun = require('script/common/commonfun');
  
  var _commonCommonfun2 = _interopRequireDefault(_commonCommonfun);
  
  var TrackStore = Reflux.createStore({
      listenables: [_actionsTrackAction2['default']],
      init: function init() {},
      data: {
          // service名称
          service_name: '',
          // sercice类型
          service_type: 0,
          // 当前全部页码
          currentAllPage: 0,
          // 当前在线页码
          currentOnlinePage: 0,
          // 当前离线页码
          currentOfflinePage: 0,
          // 当前全部适配view entity数据
          allEntities: [],
          // 当前在线适配view entity数据
          onlineEntities: [],
          // 当前离线适配view entity数据
          offlineEntities: [],
          // 当前全部完整entity数据
          allCompleteEntities: [],
          // 当前在线完整entity数据
          onlineCompleteEntities: [],
          // 当前离线完整entity数据
          offlineCompleteEntities: [],
          // 当前检索关键字
          searchQuery: '',
          // 轨迹查询检索当前关键字
          searchQueryTrack: '',
          // 当前service自定义字段描述
          column: [],
          // 当前service自定字段key
          column_key: [],
          // // 当前地图中选中车辆
          selectCar: {},
          // 当前track列表
          trackList: [],
          // 当前track页码
          currentTrackPageIndex: 0,
          // 当前选中开始时间
          start_time: 0,
          // 当前结束时间
          end_time: 0,
          // 当前时间往前十分钟，作为检测在线离线时间
          onlineTime: Math.ceil(new Date().getTime() / 1000) - 600,
          // 异步加载轨迹总长计数
          tracklistloadedConunt: 0,
          // 异步加载的选中的轨迹排序数据
          trackRouteSortData: [],
          // 实际返回给view的轨迹数据
          trackRoutePointData: [],
          // 实际返回过滤掉00点
          trackRouteNoZero: [],
          //标记正在轨迹检索 0未检索 1正在检索
          trackSearching: 0,
          //标记正在停留点检索 0未检索 1正在检索
          staypointSearching: 0,
          //标记正在轨迹分析检索 0未检索 1正在检索
          analysisbehaviorSearching: 0,
          // 异步加载的选中的轨迹数据计数
          trackRouteDataCount: 0,
          // 当前选中的轨迹
          selectTrack: '',
          // 异步加载的停留点排序数据
          trackStayRouteSortData: [],
          // 实际返回给view的停留点数据
          trackStayRoutePointData: [],
          // 异步加载的停留点数据计数
          trackStayRouteDataCount: 0,
          // 轨迹纠偏状态对象
          trackProcess: {
              is_processed: '0',
              need_denoise: '1',
              need_vacuate: '1',
              need_mapmatch: '0'
          },
          // 异步加载的驾驶分析排序数据
          trackBehaviorSortData: [],
          // 实际返回给view的驾驶分析数据
          trackBehaviorPointData: {
              harsh_acceleration: [],
              harsh_breaking: [],
              harsh_steering: [],
              speeding: []
          },
          // 异步加载的驾驶分析数据计数
          trackBehaviorDataCount: 0,
          // 标记当前是否正在检索 0在检索 1否
          searchingAll: 0,
          searchingOnline: 0,
          searchingOffline: 0,
          selectCompleteEntities: []
      },
      /**
       * 响应Action switchtab，变更页签
       *
       * @param {number} index 要变更到的tab
       */
      onSwitchmanagetab: function onSwitchmanagetab(index) {
          this.trigger('switchmanagetab', index);
      },
      onGetservicename: function onGetservicename() {
          this.trigger('servicename', '示例DEMO');
          // 车辆行业0，
          this.trigger('servicetype', 0);
      },
      /**
       * 响应Action switchmonitortab，变更实时监控中的列表
       *
       * @param {number} index 要变更到的tab
       */
      onSwitchmonitortab: function onSwitchmonitortab(index) {
          this.trigger('switchmonitortab', index);
      },
      /**
       * 响应Action searchallentity，查询所有entity
       *
       * @param {number} index页码
       */
      onSearchallentity: function onSearchallentity(index) {
          this.updateOnlineTime();
          var that = this;
          if (that.data.searchingAll === 1) {
              return;
          }
          that.data.searchingAll = 1;
          index = index || that.data.currentAllPage;
          that.data.currentAllPage = index;
          that.data.allEntities = [];
          that.data.allCompleteEntities = [];
          var params = {
              'query': that.data.searchQuery,
              'page_index': index,
              'page_size': 10
          };
  
          _commonUrls2['default'].jsonp(_commonUrls2['default'].searchEntity, params, (function (data) {
              if (data.status === 0) {
                  that.setAllEntities(data);
                  that.setallCompleteEntities(data);
                  this.trigger('totalall', data.total);
                  var allpage = Math.ceil(data.total / 10);
                  this.trigger('totalallpage', allpage);
                  that.data.searchingAll = 0;
              } else {
                  that.setAllEntities([]);
                  that.setallCompleteEntities([]);
                  this.trigger('totalall', 0);
                  // this.trigger('totalallpage', 0);
                  this.trigger('initallpage');
                  that.data.searchingAll = 0;
              }
          }).bind(this));
      },
      /**
       * 响应Action searchofflineentity，查询所有entity
       *
       * @param {number} index页码
       */
      onSearchofflineentity: function onSearchofflineentity(index) {
          var that = this;
          if (that.data.searchingOffline === 1) {
              return;
          }
          that.data.searchingOffline = 1;
          index = index || that.data.currentOfflinePage;
          that.data.currentOfflinePage = index;
          that.data.offlineEntities = [];
          that.data.offlineCompleteEntities = [];
          var params = {
              'filter': 'inactive_time:' + that.data.onlineTime,
              'query': that.data.searchQuery,
              'page_index': index,
              'page_size': 10
          };
          _commonUrls2['default'].jsonp(_commonUrls2['default'].searchEntity, params, (function (data) {
              if (data.status === 0) {
                  that.setOfflineEntities(data);
                  that.setOfflineCompleteEntities(data);
                  this.trigger('totaloffline', data.total);
                  this.trigger('totalofflinepage', Math.ceil(data.total / 10));
                  that.data.searchingOffline = 0;
              } else {
                  that.setOfflineEntities([]);
                  that.setOfflineCompleteEntities([]);
                  this.trigger('totaloffline', 0);
                  this.trigger('totalofflinepage', 0);
                  this.trigger('initofflinepage');
                  that.data.searchingOffline = 0;
              }
          }).bind(this));
      },
      /**
       * 响应Action searchofflineentity，查询所有entity
       *
       * @param {number} index页码
       */
      onSearchonlineentity: function onSearchonlineentity(index) {
          var that = this;
          if (that.data.searchingOnline === 1) {
              return;
          }
          that.data.searchingOnline = 1;
          index = index || that.data.currentOnlinePage;
          that.data.currentOnlinePage = index;
          that.data.onlineEntities = [];
          that.data.onlineCompleteEntities = [];
          var params = {
              'filter': 'active_time:' + that.data.onlineTime,
              'query': that.data.searchQuery,
              'page_index': index,
              'page_size': 10
          };
          _commonUrls2['default'].jsonp(_commonUrls2['default'].searchEntity, params, (function (data) {
              if (data.status === 0) {
                  that.setOnlineEntities(data);
                  that.setonlineCompleteEntities(data);
                  this.trigger('totalonline', data.total);
                  this.trigger('totalonlinepage', Math.ceil(data.total / 10));
                  that.data.searchingOnline = 0;
              } else {
                  that.setOnlineEntities([]);
                  that.setonlineCompleteEntities([]);
                  this.trigger('totalonline', 0);
                  this.trigger('totalonlinepage', 0);
                  this.trigger('initonlinepage');
                  that.data.searchingOnline = 0;
              }
          }).bind(this));
      },
      /**
       * 响应Action listcolumn 同时Store内部调用，查询当前service_id的自定义字段
       *
       */
      onListcolumn: function onListcolumn() {
          var that = this;
          var params = {};
          _commonUrls2['default'].jsonp(_commonUrls2['default'].columnsList, params, (function (data) {
              if (data.status === 0) {
                  data.columns.map(function (item) {
                      that.data.column.push(item.column_desc !== '' ? item.column_desc : item.column_key);
                      that.data.column_key.push(item.column_key);
                  });
                  this.trigger('listcolumn');
              }
          }).bind(this));
      },
      /**
       * 响应Action selectallcar 返回选中车辆具体信息
       *
       */
      onSelectcar: function onSelectcar(entity_name, entity_status, entity_type) {
          var that = this;
          if (that.data.selectCar.entity_name === undefined && entity_name === undefined) {
              return;
          }
          entity_name = entity_name || that.data.selectCar.entity_name;
          entity_status = entity_status || that.data.selectCar.entity_status;
          entity_type = entity_type || that.data.selectCar.entity_type;
          that.data.selectCompleteEntities = [];
          var params = {
              'query': entity_name,
              'page_index': 1
          };
  
          _commonUrls2['default'].jsonp(_commonUrls2['default'].searchEntity, params, (function (data) {
              if (data.status === 0) {
                  data.entities.map(function (item) {
                      if (item.entity_name === entity_name) {
                          var point = data.entities[0].latest_location;
                          var paramsGeo = {
                              location: point.latitude + ',' + point.longitude,
                              output: 'json'
                          };
                          _commonUrls2['default'].jsonp(_commonUrls2['default'].getAddress, paramsGeo, function (dataGeo) {
                              var temp = [];
                              that.data.column_key.map(function (keyitem, index) {
                                  if (keyitem === '_provider') {} else {
                                      temp[index] = [that.data.column[index] + ':', item[keyitem] !== undefined ? item[keyitem] : '无'];
                                  }
                              });
                              temp = temp.filter(function (item) {
                                  return item;
                              });
                              var lnglat = item.latest_location.longitude.toFixed(2) + ',' + item.latest_location.latitude.toFixed(2);
                              that.data.selectCompleteEntities.push({
                                  point: [item.latest_location.longitude, item.latest_location.latitude],
                                  entity_name: item.entity_name,
                                  direction: item.latest_location.direction,
                                  infor: [['状态:', _commonCommonfun2['default'].getInfoWindowStatus(item.latest_location.speed, item.latest_location.loc_time, item.latest_location.direction)], ['地址:', dataGeo.result.formatted_address === '' ? '无' : dataGeo.result.formatted_address], ['定位:', lnglat], ['时间:', _commonCommonfun2['default'].getLocalTime(item.latest_location.loc_time)]].concat(temp)
                              });
                              that.data.selectCompleteEntities[0].entity_status = entity_status;
                              that.data.selectCompleteEntities[0].entity_type = entity_type;
                              that.data.selectCar = that.data.selectCompleteEntities[0];
                              that.trigger('selectcardata', that.data.selectCompleteEntities[0]);
                          });
                      }
                  });
              } else {}
          }).bind(this));
      },
      /**
       * 响应Action hideselectcar 返回选中车辆具体信息
       *
       */
      onHideselectcar: function onHideselectcar() {
          this.trigger('hideselectcar');
      },
      /**
       * Store内部，根据查询结果设置entity格式
       *
       * @param {array} data entity数据
       */
      setAllEntities: function setAllEntities(data) {
          var that = this;
          var descIndex = 0;
          if (data.length === 0) {
              return;
          }
          data.entities.map(function (item) {
              var desc = '';
              if (_commonCommonfun2['default'].getOnlineStatus(item.latest_location.loc_time) === 0) {
                  item.latest_location.speed = item.latest_location.speed || 0;
                  desc = _commonCommonfun2['default'].getSpeed(item.latest_location.speed);
                  descIndex = desc === '静止' ? 1 : 0;
              } else {
                  desc = '离线';
                  descIndex = 2;
              }
              that.data.allEntities.push([item.entity_name, desc, descIndex]);
          });
      },
      /**
       * Store内部，根据查询结果设置完整entity格式
       *
       * @param {array} data entity数据
       */
      setallCompleteEntities: function setallCompleteEntities(data) {
          // that.data.allCompleteEntities = data.entities;
          var that = this;
          if (data.length === 0) {
              that.trigger('alllist', that.data.allEntities);
              return;
          }
          that.data.allSize = data.size;
          that.trigger('alllist', that.data.allEntities);
      },
      /**
       * Store内部，根据查询结果设置entity格式
       *
       * @param {array} data entity数据
       */
      setOfflineEntities: function setOfflineEntities(data) {
          var that = this;
          if (data.length === 0) {
              return;
          }
          var descIndex = 0;
          data.entities.map(function (item) {
              var desc = '';
              if (_commonCommonfun2['default'].getOnlineStatus(item.latest_location.loc_time) === 0) {
                  item.latest_location.speed = item.latest_location.speed || 0;
                  desc = _commonCommonfun2['default'].getSpeed(item.latest_location.speed);
                  descIndex = desc === '静止' ? 1 : 0;
              } else {
                  desc = '离线';
                  descIndex = 2;
              }
              that.data.offlineEntities.push([item.entity_name, desc, descIndex]);
          });
      },
      /**
       * Store内部，根据查询结果设置离线entity格式
       *
       * @param {array} data entity数据
       */
      setOfflineCompleteEntities: function setOfflineCompleteEntities(data) {
          // that.data.allCompleteEntities = data.entities;
          var that = this;
          if (data.length === 0) {
              that.trigger('offlinelist', that.data.offlineEntities);
              return;
          }
          that.data.offlineSize = data.size;
          that.trigger('offlinelist', that.data.offlineEntities);
      },
      /**
       * Store内部，根据查询结果设置entity格式
       *
       * @param {array} data entity数据
       */
      setOnlineEntities: function setOnlineEntities(data) {
          var that = this;
          if (data.length === 0) {
              return;
          }
          var descIndex = 0;
          data.entities.map(function (item) {
              var desc = '';
              if (_commonCommonfun2['default'].getOnlineStatus(item.latest_location.loc_time) === 0) {
                  item.latest_location.speed = item.latest_location.speed || 0;
                  desc = _commonCommonfun2['default'].getSpeed(item.latest_location.speed);
                  descIndex = desc === '静止' ? 1 : 0;
              } else {
                  desc = '离线';
                  descIndex = 2;
              }
              that.data.onlineEntities.push([item.entity_name, desc, descIndex]);
          });
      },
      /**
       * Store内部，根据查询结果设置离线entity格式
       *
       * @param {array} data entity数据
       */
      setonlineCompleteEntities: function setonlineCompleteEntities(data) {
          // that.data.allCompleteEntities = data.entities;
          var that = this;
          if (data.length === 0) {
              that.trigger('onlinelist', that.data.onlineEntities);
              return;
          }
          that.data.onlineSize = data.size;
          that.trigger('onlinelist', that.data.onlineEntities);
      },
      /**
       * 响应Action tracklist，查询所有tracklist
       *
       * @param {number} index页码
       */
      onTracklist: function onTracklist(index) {
          // this.trigger('tracklist', []);
          var that = this;
          index = index || that.data.currentTrackPageIndex;
          that.data.currentTrackPageIndex = index;
          that.data.trackList = [];
          var params = {
              'query': that.data.searchQueryTrack,
              'page_size': 10,
              'page_index': index
          };
          _commonUrls2['default'].jsonp(_commonUrls2['default'].searchEntity, params, (function (data) {
              if (data.status === 0) {
                  that.setTracklist(data);
                  this.trigger('tracklist', that.getTracklist());
                  this.trigger('tracklistpage', Math.ceil(data.total / 10));
                  that.data.trackListSize = data.entities.length;
                  data.entities.map(function (item) {
                      var paramsd = {
                          'start_time': that.data.start_time,
                          'end_time': that.data.end_time,
                          'entity_name': item.entity_name,
                          'simple_return': 2,
                          'is_processed': that.data.trackProcess.is_processed.toString(),
                          'process_option': 'need_denoise=' + that.data.trackProcess.need_denoise + ',' + 'need_vacuate=' + that.data.trackProcess.need_vacuate + ',' + 'need_mapmatch=' + that.data.trackProcess.need_mapmatch
                      };
                      _commonUrls2['default'].jsonp(_commonUrls2['default'].trackList, paramsd, function (datad) {
                          if (datad.status === 0) {
                              var trackDistance = (datad.distance / 1000).toFixed(1);
                              that.setTracklistDistance(trackDistance, item.entity_name);
                              that.trigger('tracklist', that.getTracklist());
                              if (++that.data.tracklistloadedConunt === that.data.trackListSize) {
                                  that.trigger('tracklistloaded');
                                  that.data.tracklistloadedConunt = 0;
                              }
                          } else if (datad.status === 3006) {
  
                              var tempTimeArr = [];
                              var partTime = Math.floor((that.data.end_time - that.data.start_time) / 6);
                              for (var i = 0; i < 6; i++) {
                                  tempTimeArr[i] = {
                                      start_time: that.data.start_time + i * partTime,
                                      end_time: that.data.start_time + (i + 1) * partTime - 1,
                                      index: i
                                  };
                              }
                              tempTimeArr[5].end_time = that.data.end_time;
                              var distance_time = [{
                                  total: 0,
                                  distance: []
                              }];
                              tempTimeArr.map(function (item_time) {
                                  var param_time = {
                                      'service_id': that.data.serviceId,
                                      'start_time': item_time.start_time,
                                      'end_time': item_time.end_time,
                                      'entity_name': item.entity_name,
                                      'simple_return': 2,
                                      'is_processed': that.data.trackProcess.is_processed.toString(),
                                      'process_option': 'need_denoise=' + that.data.trackProcess.need_denoise + ',' + 'need_vacuate=' + that.data.trackProcess.need_vacuate + ',' + 'need_mapmatch=' + that.data.trackProcess.need_mapmatch + ',' + 'transport_mode=' + that.data.trackProcess.transport_mode
                                  };
                                  _commonUrls2['default'].jsonp(_commonUrls2['default'].trackList, param_time, function (data_time) {
                                      if (data_time.status === 0) {
                                          if (!distance_time[key]) {
                                              distance_time[key] = {};
                                              distance_time[key].total = 0;
                                              distance_time[key].distance = [];
                                          }
                                          distance_time[key].distance.push(data_time.distance);
                                          distance_time[key].total = distance_time[key].total + data_time.distance;
                                          if (distance_time[key].distance.length === 6) {
                                              var trackDistance = (distance_time[key].total / 1000).toFixed(1);
                                              that.setTracklistDistance(trackDistance, item.entity_name);
                                              that.trigger('tracklist', that.getTracklist());
                                              if (++that.data.tracklistloadedConunt === that.data.trackListSize) {
                                                  that.trigger('tracklistloaded');
                                                  that.data.tracklistloadedConunt = 0;
                                              }
                                          }
                                      }
                                  });
                              });
                          } else {
                              var trackDistance = '数据异常';
                              that.setTracklistDistance(trackDistance, item.entity_name);
                              that.trigger('tracklist', that.getTracklist());
                              if (++that.data.tracklistloadedConunt === that.data.trackListSize) {
                                  that.trigger('tracklistloaded');
                                  that.data.tracklistloadedConunt = 0;
                              }
                          }
                      });
                  });
              } else {
                  that.trigger('tracklist', []);
                  that.trigger('tracklistloaded');
              }
          }).bind(this));
      },
      /**
       * Store内部，根据查询结果设置tracklist数据
       *
       * @param {array} data entity数据
       */
      setTracklist: function setTracklist(data) {
          var that = this;
          that.data.trackList = [];
          data.entities.map(function (item) {
              if (item.trackDistance != undefined) {
                  that.data.trackList.push([item.entity_name, item.trackDistance, item.trackDistance > 0 ? 0 : 1]);
              } else {
                  that.data.trackList.push({ name: item.entity_name, distance: -1, style: 1 });
              }
          });
      },
      /**
       * Store内部，设置tracklist里程数
       *
      * @param {string} data entity数据
       * @param {string} name entity名称
       */
      setTracklistDistance: function setTracklistDistance(data, name) {
          var that = this;
          that.data.trackList.map(function (item) {
              if (item.name === name) {
                  item.distance = data;
                  item.style = data > 0 ? 0 : 1;
              }
          });
      },
      /**
       * Store内部，获取tracklist数据
       *
       * @param {array} data entity数据
       */
      getTracklist: function getTracklist() {
          return this.data.trackList;
      },
      /**
       * 响应Action changedatetime，修改起止时间
       *
       * @param {string} data 选择日期
       */
      onChangedatetime: function onChangedatetime(data) {
          var date = new Date(Date.parse(data.replace(/-/g, "/")));
          date = date.getTime() / 1000;
          this.data.start_time = date;
          this.data.end_time = date + 86399;
      },
      /**
       * store内部 pdateonlinetime，修改判断在线离线时间
       *
       */
      updateOnlineTime: function updateOnlineTime() {
          this.data.onlineTime = Math.ceil(new Date().getTime() / 1000) - 600;
      },
      /**
       * 响应Action setsearchentity，设置检索关键字
       *
       * @param {string} data 检索关键字
       */
      onSetsearchentity: function onSetsearchentity(data) {
          this.data.searchQuery = data;
      },
      /**
       * 响应Action setsearchentitytrack，设置轨迹查询检索关键字
       *
       * @param {string} data 检索关键字
       */
      onSetsearchentitytrack: function onSetsearchentitytrack(data) {
          this.data.searchQueryTrack = data;
      },
      /**
       * 响应Action selecttrack，选中某个轨迹
       *
       * @param {string} data entity name
       */
      onSelecttrack: function onSelecttrack(data) {
          var that = this;
          if (that.data.selectTrack === '' && !data) {
              return;
          }
          if (that.data.trackSearching === 1) {
              return;
          }
          that.data.trackSearching = 1;
          var tempTimeArr = [];
          that.data.selectTrack = data || that.data.selectTrack;
          that.data.trackRouteData = [];
          that.data.trackRoutePointData = [];
          that.data.trackRouteSortData = [];
          that.data.trackRouteNoZero = [];
          var partTime = Math.floor((that.data.end_time - that.data.start_time) / 6);
          for (var i = 0; i < 6; i++) {
              tempTimeArr[i] = {
                  start_time: that.data.start_time + i * partTime,
                  end_time: that.data.start_time + (i + 1) * partTime - 1,
                  index: i
              };
          }
          tempTimeArr[5].end_time = that.data.end_time;
          var params = {
              'entity_name': that.data.selectTrack,
              'simple_return': 0,
              'page_size': 5000,
              'is_processed': that.data.trackProcess.is_processed.toString(),
              'process_option': 'need_denoise=' + that.data.trackProcess.need_denoise + ',' + 'need_vacuate=' + that.data.trackProcess.need_vacuate + ',' + 'need_mapmatch=' + that.data.trackProcess.need_mapmatch
          };
          var count = 1;
          var reTrackRoute = function reTrackRoute(paramsr, page_index) {
  
              var newParams = {
                  'service_id': paramsr.service_id,
                  'entity_name': paramsr.entity_name,
                  'simple_return': paramsr.simple_return,
                  'page_size': paramsr.page_size,
                  'page_index': page_index,
                  'start_time': paramsr.start_time,
                  'end_time': paramsr.end_time,
                  'is_processed': paramsr.is_processed,
                  'process_option': paramsr.process_option,
                  'sort_type': 1
              };
  
              var search = function search(paramsearch, counta, countb) {
                  _commonUrls2['default'].jsonp(_commonUrls2['default'].trackList, paramsearch, function (data) {
                      if (data.status === 0) {
                          that.data.trackRouteSortData.push({ index: counta, data: data });
                          if (++that.data.trackRouteDataCount === 12) {
                              that.data.trackRouteDataCount = 0;
                              that.data.trackRouteSortData.sort(function (a, b) {
                                  return a.index - b.index;
                              });
  
                              for (var i = 0; i < 12; i++) {
                                  that.data.trackRoutePointData = that.data.trackRoutePointData.concat(that.data.trackRouteSortData[i].data.points);
                              }
                              that.data.trackRoutePointData.map(function (item) {
                                  if (item.location[0] > 1 && item.location[1] > 1) {
                                      that.data.trackRouteNoZero.push(item);
                                  }
                              });
                              that.trigger('trackroute', that.data.trackRouteNoZero);
                              that.data.trackSearching = 0;
                          }
                      }
                  });
              };
              search(newParams, count++);
          };
          tempTimeArr.map(function (item) {
              params.start_time = item.start_time;
              params.end_time = item.end_time;
              reTrackRoute(params, 1);
              reTrackRoute(params, 2);
          });
      },
      /**
       * 响应Action initpageset，初始化页码
       *
       */
      onInitpageset: function onInitpageset() {
          this.data.currentAllPage = 0;
          this.data.currentOnlinePage = 0;
          this.data.currentOfflinePage = 0;
          this.trigger('initallpage');
          this.trigger('initonlinepage');
          this.trigger('initofflinepage');
      },
      /**
       * 响应Action initpagesettrack，初始化页码
       *
       */
      onInitpagesettrack: function onInitpagesettrack() {
          this.data.currentTrackPageIndex = 0;
          this.trigger('initpagetrack');
      },
      /**
       * 响应Action getstaypoint，获取停留点
       *
       */
      onGetstaypoint: function onGetstaypoint() {
          var that = this;
          if (that.data.selectTrack === '') {
              return;
          }
          if (that.data.staypointSearching === 1) {
              return;
          }
          that.data.staypointSearching = 1;
          var entity_name = that.data.selectTrack;
          var tempTimeArr = [];
          that.data.trackStayRouteSortData = [];
          that.data.trackStayRoutePointData = [];
          var partTime = Math.floor((that.data.end_time - that.data.start_time) / 6);
          for (var i = 0; i < 6; i++) {
              tempTimeArr[i] = {
                  start_time: that.data.start_time + i * partTime,
                  end_time: that.data.start_time + (i + 1) * partTime - 1,
                  index: i
              };
          }
          tempTimeArr[5].end_time = that.data.end_time;
          var params = {
              'entity_name': that.data.selectTrack
          };
          var count = 1;
          var reTrackRoute = function reTrackRoute(paramsr) {
  
              var newParams = {
                  'service_id': paramsr.service_id,
                  'entity_name': paramsr.entity_name,
                  'start_time': paramsr.start_time,
                  'end_time': paramsr.end_time
              };
              var search = function search(paramsearch, counta) {
                  _commonUrls2['default'].jsonp(_commonUrls2['default'].getstaypoint, paramsearch, function (data) {
                      if (data.status === 0) {
                          that.data.trackStayRouteSortData.push({ index: counta, data: data });
                          if (++that.data.trackStayRouteDataCount === 6) {
                              that.data.trackStayRouteDataCount = 0;
                              that.data.trackStayRouteSortData.sort(function (a, b) {
                                  return a.index - b.index;
                              });
  
                              for (var i = 0; i < 6; i++) {
                                  if (that.data.trackStayRouteSortData[i].data.stay_points !== undefined) {
                                      that.data.trackStayRoutePointData = that.data.trackStayRoutePointData.concat(that.data.trackStayRouteSortData[i].data.stay_points);
                                  }
                              }
                              that.trigger('staypoint', that.data.trackStayRoutePointData);
                              that.data.staypointSearching = 0;
                          }
                      }
                  });
              };
              search(newParams, count++);
          };
          tempTimeArr.map(function (item) {
              params.start_time = item.start_time;
              params.end_time = item.end_time;
              reTrackRoute(params);
          });
      },
      /**
       * 响应Action behavioranalysis，驾驶分析
       *
       */
      onBehavioranalysis: function onBehavioranalysis() {
          var that = this;
          if (that.data.selectTrack === '') {
              return;
          }
          if (that.data.analysisbehaviorSearching === 1) {
              return;
          }
          that.data.analysisbehaviorSearching = 1;
          var entity_name = that.data.selectTrack;
          var tempTimeArr = [];
          that.data.trackBehaviorSortData = [];
          // 实际返回给view的驾驶分析数据
          that.data.trackBehaviorPointData = {
              harsh_acceleration: [],
              harsh_breaking: [],
              harsh_steering: [],
              speeding: []
          };
          var partTime = Math.floor((that.data.end_time - that.data.start_time) / 6);
          for (var i = 0; i < 6; i++) {
              tempTimeArr[i] = {
                  start_time: that.data.start_time + i * partTime,
                  end_time: that.data.start_time + (i + 1) * partTime - 1,
                  index: i
              };
          }
          tempTimeArr[5].end_time = that.data.end_time;
          var params = {
              'entity_name': that.data.selectTrack
          };
          var count = 1;
          var reBehavior = function reBehavior(paramsr) {
              var newParams = {
                  'service_id': paramsr.service_id,
                  'entity_name': paramsr.entity_name,
                  'start_time': paramsr.start_time,
                  'end_time': paramsr.end_time
              };
              var search = function search(paramsearch, counta) {
                  _commonUrls2['default'].jsonp(_commonUrls2['default'].getBehaviorAnalysis, paramsearch, function (data) {
                      if (data.status === 0) {
                          that.data.trackBehaviorSortData.push({ index: counta, data: data });
                          if (++that.data.trackBehaviorDataCount === 6) {
                              that.data.trackBehaviorDataCount = 0;
                              that.data.trackBehaviorSortData.sort(function (a, b) {
                                  return a.index - b.index;
                              });
  
                              for (var i = 0; i < 6; i++) {
                                  that.data.trackBehaviorPointData.harsh_acceleration = that.data.trackBehaviorPointData.harsh_acceleration.concat(that.data.trackBehaviorSortData[i].data.harsh_acceleration);
                                  that.data.trackBehaviorPointData.harsh_breaking = that.data.trackBehaviorPointData.harsh_breaking.concat(that.data.trackBehaviorSortData[i].data.harsh_breaking);
                                  that.data.trackBehaviorPointData.harsh_steering = that.data.trackBehaviorPointData.harsh_steering.concat(that.data.trackBehaviorSortData[i].data.harsh_steering);
                                  that.data.trackBehaviorPointData.speeding = that.data.trackBehaviorPointData.speeding.concat(that.data.trackBehaviorSortData[i].data.speeding);
                              }
                              that.trigger('analysisbehavior', that.data.trackBehaviorPointData);
                              that.data.analysisbehaviorSearching = 0;
                          }
                      }
                  });
              };
              search(newParams, count++);
          };
          tempTimeArr.map(function (item) {
              params.start_time = item.start_time;
              params.end_time = item.end_time;
              reBehavior(params);
          });
      },
      /**
       * 响应Action updateprocess，驾驶分析
       *
       * @param {object} data 轨迹纠偏选项
       */
      onUpdateprocess: function onUpdateprocess(data) {
          this.data.trackProcess.is_processed = data.is_processed;
          this.data.trackProcess.need_denoise = data.need_denoise;
          this.data.trackProcess.need_vacuate = data.need_vacuate;
          this.data.trackProcess.need_mapmatch = data.need_mapmatch;
      },
      /**
       * 响应Action hidetrackcanvas 隐藏显示路径的canvas层
       *
       */
      onHidetrackcanvas: function onHidetrackcanvas(data) {
          this.trigger('hidetrackcanvas');
      },
      /**
       * 响应Action showtrackcanvas 隐藏显示路径的canvas层
       *
       */
      onShowtrackcanvas: function onShowtrackcanvas(data) {
          this.trigger('showtrackcanvas');
      }
  });
  
  exports['default'] = TrackStore;
  module.exports = exports['default'];

});
