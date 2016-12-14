/**
 * @file 页面主 Reflux View
 * @author 崔健 cuijian03@baidu.com 2016.08.20
 */
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('components/react/react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('components/react-dom/react-dom');

var _header = require('script/modules/common/views/header');

var _header2 = _interopRequireDefault(_header);

var _entitycontrolViewsEntitycontrol = require('script/modules/entitycontrol/views/entitycontrol');

var _entitycontrolViewsEntitycontrol2 = _interopRequireDefault(_entitycontrolViewsEntitycontrol);

var _trackcontrolViewsTrackcontrol = require('script/modules/trackcontrol/views/trackcontrol');

var _trackcontrolViewsTrackcontrol2 = _interopRequireDefault(_trackcontrolViewsTrackcontrol);

var _storesCommonStore = require('script/modules/common/stores/commonStore');

var _storesCommonStore2 = _interopRequireDefault(_storesCommonStore);

var _commonMapControlJs = require('script/common/mapControl');

var _commonMapControlJs2 = _interopRequireDefault(_commonMapControlJs);

var Content = _react2['default'].createClass({
    displayName: 'Content',

    render: function render() {
        return _react2['default'].createElement(
            'div',
            { className: 'main' },
            _react2['default'].createElement(
                'div',
                { className: 'trunk', id: 'trunk' },
                _react2['default'].createElement(_header2['default'], null),
                _react2['default'].createElement(_trackcontrolViewsTrackcontrol2['default'], null),
                _react2['default'].createElement(_entitycontrolViewsEntitycontrol2['default'], null)
            )
        );
    }
});

(0, _reactDom.render)(_react2['default'].createElement(Content, null), $('#content')[0]);