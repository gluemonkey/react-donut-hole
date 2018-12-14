'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

var objectWithoutProperties = function (obj, keys) {
  var target = {};

  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }

  return target;
};

var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

var CircleElement = function CircleElement(_ref) {
  var children = _ref.children,
      props = objectWithoutProperties(_ref, ['children']);

  var activeStyles = {
    transitionProperty: 'all, opacity',
    transitionDuration: '0.5s, 0s',
    transitionDelay: '0s, 0s',
    transitionTimingFunction: 'ease-in-out, ease-in-out'
  };
  var inactiveStyles = {
    transitionProperty: 'all, opacity',
    transitionDuration: '0.5s, 0s',
    transitionDelay: '0s, 0.5s',
    transitionTimingFunction: 'ease-in-out, ease-in-out'
  };
  var calcStyles = props.opacity === 1 ? activeStyles : inactiveStyles;
  return React__default.createElement('circle', _extends({}, props, {
    style: calcStyles }));
};

var DoughnutChartSegment = function (_Component) {
  inherits(DoughnutChartSegment, _Component);

  function DoughnutChartSegment(props) {
    classCallCheck(this, DoughnutChartSegment);

    var _this = possibleConstructorReturn(this, (DoughnutChartSegment.__proto__ || Object.getPrototypeOf(DoughnutChartSegment)).call(this, props));

    _this.state = {
      isVisible: false,
      shown: false,
      percentage: 0
    };
    return _this;
  }

  createClass(DoughnutChartSegment, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          percent = _props.percent,
          offset = _props.offset,
          color = _props.color,
          lineWidth = _props.lineWidth,
          shown = _props.shown,
          delay = _props.delay,
          showSeperator = _props.showSeperator,
          segmentShown = _props.segmentShown;

      var segmentOffset = 25;
      var seperatorPercentage = showSeperator ? 0.7 : 0;
      var mainSegPercentage = Math.max(0, percent - seperatorPercentage);

      var mainSegmentConfig = {
        dasharray: mainSegPercentage + ' ' + (100 - mainSegPercentage),
        rotation: (offset + segmentOffset) / 100 * 360,
        dashoffset: '0',
        color: color
        // delay: delay,
      };

      var segmentContainerStyle = {
        transformOrigin: 'center 45.8%',
        transitionProperty: 'all',
        transitionDuration: '0.5s',
        transitionDelay: '0s',
        transitionTimingFunction: 'ease-in-out',
        // opacity: (shown ? 1 : 0),
        opacity: 1,
        transform: 'scale(0.8) rotate(' + mainSegmentConfig.rotation + 'deg)'
      };

      return React__default.createElement(
        'g',
        { style: segmentContainerStyle },
        React__default.createElement(CircleElement, {
          cx: '21',
          cy: '21',
          r: '15.91549430918953357688837633725143',
          fill: 'transparent',
          stroke: mainSegmentConfig.color,
          strokeWidth: lineWidth
          // opacity={segmentShown ? 1 : 0}
          , strokeDasharray: mainSegmentConfig.dasharray,
          strokeDashoffset: mainSegmentConfig.dashoffset }),
        React__default.createElement(CircleElement, {
          cx: '21',
          cy: '21'
          // opacity={segmentShown ? 1 : 0}
          , r: '15.91549430918953357688837633725143',
          fill: 'transparent',
          stroke: 'url(#grad1)',
          strokeWidth: lineWidth,
          strokeDasharray: mainSegmentConfig.dasharray,
          strokeDashoffset: mainSegmentConfig.dashoffset })
      );
    }
  }]);
  return DoughnutChartSegment;
}(React.Component);

var add = function add(a, b) {
  return a + b;
};
var sum = function sum(value) {
  return value.reduce(add);
};

var ContainerStyle = {
  position: 'relative',
  maxWidth: '260px',
  color: 'white',
  border: '1px solid #cccccc',
  borderRadius: '6px',
  overflow: 'hidden',
  margin: '18px'
};

var LabelStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  color: '#333333',
  position: 'absolute',
  top: '0',
  left: '0',
  width: '100%',
  height: '92%'
};

var CircleBoxStyle = {
  position: 'relative',
  padding: '14px 30px 0 30px'
};

var getSegmentConfigs = function getSegmentConfigs(props) {
  var segments = props.segments;


  var segmentObjects = [];
  var segmentPercentage = 0;
  var remainderPercentage = 0;
  var unshown = 0;
  var int = 0;

  var total = sum(segments.map(function (seg) {
    return seg.value;
  }));

  segments.forEach(function (_ref) {
    var key = _ref.key,
        value = _ref.value,
        color = _ref.color;

    var percent = value / total * 100;
    if (percent === 0) {
      remainderPercentage += percent;
      unshown += 1;
    }
  });

  var eachSectionGets = remainderPercentage / (segments.length - unshown);

  segments.forEach(function (_ref2) {
    var key = _ref2.key,
        value = _ref2.value,
        color = _ref2.color;

    var percent = value / total * 100;
    var segPercent = eachSectionGets + percent;
    if (value === 0) {
      segPercent = 0;
    }
    segmentObjects.push({
      percent: segPercent,
      offset: segmentPercentage,
      color: color,
      delay: int * 0.3 + 0.1,
      showSeperator: unshown < 2,
      shown: percent !== 0
    });

    int += 1;
    segmentPercentage += segPercent;
  });

  return segmentObjects;
};

var DoughnutChart = function (_Component) {
  inherits(DoughnutChart, _Component);

  function DoughnutChart(props) {
    classCallCheck(this, DoughnutChart);

    var _this = possibleConstructorReturn(this, (DoughnutChart.__proto__ || Object.getPrototypeOf(DoughnutChart)).call(this, props));

    _this.state = {
      isVisible: false,
      shown: false,
      percentage: 0
    };
    return _this;
  }

  createClass(DoughnutChart, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          className = _props.className,
          shown = _props.shown,
          lineWidth = _props.lineWidth;


      var segmentObjects = getSegmentConfigs(this.props);

      return React__default.createElement(
        'div',
        { className: className },
        React__default.createElement(
          'div',
          { style: ContainerStyle },
          React__default.createElement(
            'div',
            { style: CircleBoxStyle },
            React__default.createElement(
              'svg',
              { width: '100%', height: '100%', viewBox: '0 0 42 46', className: 'donut' },
              React__default.createElement(
                'defs',
                null,
                React__default.createElement(
                  'radialGradient',
                  { id: 'grad1', cx: '50%', cy: '50%', r: '100%', fx: '50%', fy: '50%' },
                  React__default.createElement('stop', { offset: '20%', stopColor: '#000', stopOpacity: '0.5' }),
                  React__default.createElement('stop', { offset: '50%', stopColor: '#000', stopOpacity: '0' }),
                  React__default.createElement('stop', { offset: '80%', stopColor: '#000', stopOpacity: '0.5' })
                ),
                React__default.createElement(
                  'radialGradient',
                  { id: 'drop', cx: '50%', cy: '50%', r: '100%', fx: '50%', fy: '50%' },
                  React__default.createElement('stop', { offset: '0%', stopColor: '#000', stopOpacity: '0.4' }),
                  React__default.createElement('stop', { offset: '40%', stopColor: '#000', stopOpacity: '0' })
                )
              ),
              React__default.createElement('circle', {
                cx: '19.4',
                cy: '206',
                className: 'shadow',
                r: '15.91549430918954',
                fill: 'url(#drop)',
                stroke: 'transparent',
                strokeWidth: '0',
                transform: 'scale(1.1,0.2)',
                style: {
                  transition: 'opacity 0.5s ease-in-out',
                  opacity: 1
                  // opacity: shown ? 1 : 0
                } }),
              segmentObjects.map(function (segmentObject) {
                return React__default.createElement(DoughnutChartSegment, {
                  shown: shown,
                  segmentShown: segmentObject.shown,
                  percent: segmentObject.percent,
                  offset: segmentObject.offset,
                  delay: segmentObject.delay,
                  color: segmentObject.color,
                  showSeperator: segmentObject.showSeperator,
                  lineWidth: lineWidth });
              })
            ),
            React__default.createElement(
              'div',
              { style: LabelStyle },
              React__default.createElement(
                'p',
                null,
                'Label Here'
              )
            )
          )
        )
      );
    }
  }]);
  return DoughnutChart;
}(React.Component);

// DoughnutChart.propTypes = {
//   // segments: PropTypes.array
// }

DoughnutChart.defaultProps = {
  progress: 0,
  animate: true,
  animationDuration: '1s',
  showPercentage: true,
  showPercentageSymbol: true,
  progressColor: '#000',
  bgColor: '#000',
  textColor: '#6b778c',
  size: '400',
  lineWidth: '9',
  percentSpacing: 10
};

module.exports = DoughnutChart;
//# sourceMappingURL=index.js.map
