



var _createClass = function () {
  function defineProperties (target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i]
      descriptor.enumerable = descriptor.enumerable || false
      descriptor.configurable = true
      if ('value' in descriptor) descriptor.writable = true
      Object.defineProperty(target, descriptor.key, descriptor)
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps)
    if (staticProps) defineProperties(Constructor, staticProps)
    return Constructor
  }
}()


/*
_createClass(Test, [{
  key: 'render',
  value: function render() {
    return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        'div',
        null,
        'HOLA'
      ),
      _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'div',
          null,
          'INNER HOLA'
        ),
        _react2.default.createElement(
          'div',
          null,
          'INNER HOLA'
        )
      )
    );
  }
}]);
*/
