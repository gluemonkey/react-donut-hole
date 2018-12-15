import React, { Component } from 'react';

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
      dasharray = _ref.dasharray,
      dashoffset = _ref.dashoffset,
      props = objectWithoutProperties(_ref, ['children', 'dasharray', 'dashoffset']);

  var activeStyles = {
    transitionProperty: 'all, opacity',
    transitionDuration: '0.3s, 0s',
    transitionDelay: '0s, 0s',
    transitionTimingFunction: 'linear, linear',
    strokeDasharray: dasharray,
    strokeDashoffset: dashoffset
  };
  var inactiveStyles = {
    transitionProperty: 'all, opacity',
    transitionDuration: '0.3s, 0s',
    transitionDelay: '0s, 0.3s',
    transitionTimingFunction: 'linear, linear',
    strokeDasharray: dasharray,
    strokeDashoffset: dashoffset
  };
  var calcStyles = props.opacity === 1 ? activeStyles : inactiveStyles;
  return React.createElement('circle', _extends({}, props, {
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
        transformOrigin: 'center 50%',
        transitionProperty: 'all',
        transitionDuration: '0.3s',
        transitionDelay: '0s',
        transitionTimingFunction: 'linear',
        // opacity: (shown ? 1 : 0),
        opacity: 1,
        transform: 'rotate(' + mainSegmentConfig.rotation + 'deg)'
      };

      console.log(mainSegmentConfig.rotation);

      return React.createElement(
        'g',
        { style: segmentContainerStyle },
        React.createElement(CircleElement, {
          cx: '21',
          cy: '21',
          r: '15.91549430918953357688837633725143',
          fill: 'transparent',
          stroke: mainSegmentConfig.color,
          strokeWidth: lineWidth
          // opacity={segmentShown ? 1 : 0}
          , dasharray: mainSegmentConfig.dasharray,
          dashoffset: mainSegmentConfig.dashoffset }),
        React.createElement(CircleElement, {
          cx: '21',
          cy: '21'
          // opacity={segmentShown ? 1 : 0}
          , r: '15.91549430918953357688837633725143',
          fill: 'transparent',
          stroke: 'url(#grad1)',
          strokeWidth: lineWidth,
          dasharray: mainSegmentConfig.dasharray,
          dashoffset: mainSegmentConfig.dashoffset })
      );
    }
  }]);
  return DoughnutChartSegment;
}(Component);

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

var LabelContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  color: '#333333',
  position: 'absolute',
  top: '0',
  left: '0',
  width: '100%',
  height: '100%'
};

var CircleBoxStyle = {
  position: 'relative',
  padding: '14px 30px 75% 30px'
};

var SVGStyle = {
  position: 'absolute',
  top: 0,
  left: 0
};

var segmentShown = function segmentShown(segment, props) {
  return segment.value === 0 || props.filters.includes(segment.key);
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

  segments.forEach(function (segment) {
    var value = segment.value;

    var percent = value / total * 100;
    if (segmentShown(segment, props)) {
      remainderPercentage += percent;
      unshown += 1;
    }
  });

  var eachSectionGets = remainderPercentage / (segments.length - unshown);

  segments.forEach(function (segment) {
    var value = segment.value,
        color = segment.color;

    var percent = value / total * 100;
    var segPercent = eachSectionGets + percent;
    if (segmentShown(segment, props)) {
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
          show = _props.show,
          lineWidth = _props.lineWidth,
          dropShadow = _props.dropShadow;


      var segmentObjects = getSegmentConfigs(this.props);

      return React.createElement(
        'div',
        { className: className },
        React.createElement(
          'div',
          { style: ContainerStyle },
          React.createElement(
            'div',
            { style: CircleBoxStyle },
            dropShadow && React.createElement(
              'svg',
              { width: '100%', height: '100%', viewBox: '0 0 42 46', style: SVGStyle },
              React.createElement(
                'defs',
                null,
                React.createElement(
                  'radialGradient',
                  { id: 'drop', cx: '50%', cy: '50%', r: '100%', fx: '50%', fy: '50%' },
                  React.createElement('stop', { offset: '0%', stopColor: '#000', stopOpacity: '0.4' }),
                  React.createElement('stop', { offset: '40%', stopColor: '#000', stopOpacity: '0' })
                )
              ),
              React.createElement('circle', {
                cx: '16.4',
                cy: '206',
                className: 'shadow',
                r: '15.91549430918954',
                fill: 'url(#drop)',
                stroke: 'transparent',
                strokeWidth: '0',
                transform: 'scale(1.3,0.2)',
                style: {
                  transition: 'opacity 0.5s ease-in-out',
                  opacity: show ? 1 : 0
                } })
            ),
            React.createElement(
              'svg',
              { width: '100%', height: '100%', viewBox: '0 0 42 42', style: SVGStyle },
              React.createElement(
                'defs',
                null,
                React.createElement(
                  'radialGradient',
                  { id: 'grad1', cx: '50%', cy: '50%', r: '100%', fx: '50%', fy: '50%' },
                  React.createElement('stop', { offset: '20%', stopColor: '#000', stopOpacity: '0.5' }),
                  React.createElement('stop', { offset: '50%', stopColor: '#000', stopOpacity: '0' }),
                  React.createElement('stop', { offset: '80%', stopColor: '#000', stopOpacity: '0.5' })
                )
              ),
              segmentObjects.map(function (segmentObject) {
                return React.createElement(DoughnutChartSegment, {
                  segmentShown: segmentObject.shown,
                  percent: segmentObject.percent,
                  offset: segmentObject.offset,
                  delay: segmentObject.delay,
                  color: segmentObject.color,
                  showSeperator: segmentObject.showSeperator,
                  lineWidth: lineWidth });
              })
            ),
            React.createElement(
              'div',
              { style: LabelContainerStyle },
              React.createElement(
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
}(Component);

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
  dropShadow: true,
  percentSpacing: 10
};

export default DoughnutChart;
//# sourceMappingURL=index.es.js.map
