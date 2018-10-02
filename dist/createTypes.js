'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reduxTypes = require('redux-types');

var _reduxTypes2 = _interopRequireDefault(_reduxTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getTypes = function getTypes(reducerKey, types) {
  return (0, _reduxTypes2.default)(reducerKey, types);
};

exports.default = getTypes;