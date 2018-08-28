'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _require = require('redux-actions'),
    handleActions = _require.handleActions;

var reducerBuilder = function reducerBuilder(behaviours) {
  var defaultState = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var handler = handleActions(behaviours, defaultState);

  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultState;
    var action = arguments[1];

    if (action.type in behaviours) {
      return handler(state, action);
    }

    return state;
  };
};

exports.default = reducerBuilder;