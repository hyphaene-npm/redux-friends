'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.withToggle = exports.toggleHandler = exports.styleTabHandler = exports.withData = exports.withStateOpen = exports.withStateActiveTab = undefined;

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _recompose = require('recompose');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var withStateActiveTab = exports.withStateActiveTab = function withStateActiveTab(defaultTab) {
	return (0, _recompose.withState)('activeTab', 'setActiveTab', defaultTab);
};
var withStateOpen = exports.withStateOpen = (0, _recompose.withState)('isOpen', 'setIsOpen', false);
var withData = exports.withData = (0, _recompose.withState)('data', 'setData', null);

var styleTabHandler = exports.styleTabHandler = function styleTabHandler(props) {
	return function (tabId) {
		return (0, _classnames2.default)({ active: props.activeTab === tabId });
	};
};
var toggleHandler = exports.toggleHandler = function toggleHandler(props) {
	return function (tab) {
		return function () {
			if (props.activeTab !== tab) {
				props.setActiveTab(tab);
			}
		};
	};
};

var withToggle = exports.withToggle = (0, _recompose.withHandlers)({
	onToggle: toggleHandler,
	onStyleTab: styleTabHandler
});