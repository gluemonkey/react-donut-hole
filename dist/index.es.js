import React, { Component } from 'react';
import PropTypes from 'prop-types';

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

var CircleElement = function CircleElement(props) {
  var initalSegmentConfig = props.initalSegmentConfig,
      animatedSegmentConfig = props.animatedSegmentConfig,
      animatedIn = props.animatedIn,
      animationDuration = props.animationDuration,
      circleProps = objectWithoutProperties(props, ['initalSegmentConfig', 'animatedSegmentConfig', 'animatedIn', 'animationDuration']);


  var baseStyles = {
    transitionProperty: 'all, opacity',
    transitionDuration: animationDuration + ', 0s',
    transitionDelay: '0s, 0s',
    transitionTimingFunction: 'linear, linear'
  };

  var toStyles = _extends({}, baseStyles, {
    strokeDasharray: animatedSegmentConfig.dasharray,
    strokeDashoffset: animatedSegmentConfig.dashoffset
  });

  var fromStyles = _extends({}, baseStyles, {
    strokeDasharray: initalSegmentConfig.dasharray,
    strokeDashoffset: initalSegmentConfig.dashoffset
  });

  var calcStyles = animatedIn ? toStyles : fromStyles;

  return React.createElement('circle', _extends({}, circleProps, { style: calcStyles }));
};

CircleElement.propTypes = {
  initalSegmentConfig: PropTypes.shape({
    dasharray: PropTypes.string,
    rotation: PropTypes.number,
    dashoffset: PropTypes.string,
    color: PropTypes.string
  }).isRequired,
  animatedSegmentConfig: PropTypes.shape({
    dasharray: PropTypes.string,
    rotation: PropTypes.number,
    dashoffset: PropTypes.string,
    color: PropTypes.string
  }).isRequired,
  animationDuration: PropTypes.string,
  animatedIn: PropTypes.bool.isRequired
};

var calcSegmentConfig = function calcSegmentConfig(percent, offset, props) {
  var color = props.color,
      showSeperator = props.showSeperator;

  var segmentOffset = 25;
  var seperatorPercentage = showSeperator ? 0.7 : 0;
  var mainSegPercentage = Math.max(0, percent - seperatorPercentage);

  return {
    dasharray: mainSegPercentage + ' ' + (100 - mainSegPercentage),
    rotation: (offset + segmentOffset) / 100 * 360,
    dashoffset: '0',
    color: color
  };
};

var DonutChartSegment = function (_Component) {
  inherits(DonutChartSegment, _Component);

  function DonutChartSegment(props) {
    classCallCheck(this, DonutChartSegment);

    var _this = possibleConstructorReturn(this, (DonutChartSegment.__proto__ || Object.getPrototypeOf(DonutChartSegment)).call(this, props));

    _this.state = {
      animate: false
    };
    return _this;
  }

  createClass(DonutChartSegment, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      var _props = this.props,
          percent = _props.percent,
          fromPercent = _props.fromPercent;


      if (percent !== fromPercent) {
        setTimeout(function () {
          _this2.setState({ animate: true });
        }, 0);
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState, snapshot) {
      var _this3 = this;

      if (this.props.percent !== prevProps.percent && this.props.percent !== this.props.fromPercent) {
        setTimeout(function () {
          _this3.setState({ animate: true });
        }, 0);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          percent = _props2.percent,
          fromPercent = _props2.fromPercent,
          fromOffset = _props2.fromOffset,
          offset = _props2.offset,
          lineWidth = _props2.lineWidth,
          animationDuration = _props2.animationDuration,
          segmentStyle = _props2.segmentStyle,
          segmentShown = _props2.segmentShown;
      var animate = this.state.animate;


      var initialSegmentConfig = calcSegmentConfig(fromPercent, fromOffset, this.props);
      var toSegmentConfig = calcSegmentConfig(percent, offset, this.props);

      var groupRotate = animate ? toSegmentConfig.rotation : initialSegmentConfig.rotation;

      var segmentContainerStyle = {
        transformOrigin: 'center 50%',
        transitionProperty: segmentShown ? 'all, opacity' : 'all, opacity',
        transitionDuration: segmentShown ? animationDuration + ', 0s' : animationDuration + ', 0s',
        transitionDelay: segmentShown ? '0s, 0s' : '0s, ' + animationDuration,
        transitionTimingFunction: 'linear',
        opacity: segmentShown ? 1 : 0,
        transform: animate ? 'rotate(' + toSegmentConfig.rotation + 'deg)' : 'rotate(' + initialSegmentConfig.rotation + 'deg)'
      };

      return React.createElement(
        'g',
        { style: segmentContainerStyle, transform: 'rotate(' + groupRotate + ' 21 21)' },
        React.createElement(CircleElement, {
          cx: '21',
          cy: '21',
          r: '15.91549430918953357688837633725143',
          fill: 'transparent',
          stroke: toSegmentConfig.color,
          animatedIn: animate,
          strokeWidth: lineWidth,
          initalSegmentConfig: initialSegmentConfig,
          animationDuration: animationDuration,
          animatedSegmentConfig: toSegmentConfig }),
        segmentStyle === 'raised' && React.createElement(CircleElement, {
          cx: '21',
          cy: '21',
          r: '15.91549430918953357688837633725143',
          fill: 'transparent',
          stroke: 'url(#grad1)',
          animatedIn: animate,
          strokeWidth: lineWidth,
          initalSegmentConfig: initialSegmentConfig,
          animationDuration: animationDuration,
          animatedSegmentConfig: toSegmentConfig })
      );
    }
  }]);
  return DonutChartSegment;
}(Component);

DonutChartSegment.propTypes = {
  percent: PropTypes.number.isRequired,
  fromPercent: PropTypes.number.isRequired,
  offset: PropTypes.number.isRequired,
  fromOffset: PropTypes.number.isRequired,
  lineWidth: PropTypes.number,
  animationDuration: PropTypes.string,
  segmentStyle: PropTypes.oneOf(['flat', 'raised']),
  segmentShown: PropTypes.bool
};

var add = function add(a, b) {
  return a + b;
};
var sum = function sum(value) {
  return value.reduce(add);
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
  padding: '14px 30px 94% 30px'
};

var SVGStyle = {
  position: 'absolute',
  top: 0,
  left: 0
};

var segmentShown = function segmentShown(segment, filters) {
  return segment.value === 0 || filters.includes(segment.key);
};

var getSegmentConfigs = function getSegmentConfigs(segments, filters) {
  var segmentObjects = [];
  var segmentPercentage = 0;
  var remainderPercentage = 0;
  var hiddenSegmentCount = 0;

  var total = sum(segments.map(function (seg) {
    return seg.value;
  }));

  segments.forEach(function (segment) {
    var value = segment.value;

    var percent = value / total * 100;
    if (segmentShown(segment, filters)) {
      remainderPercentage += percent;
      hiddenSegmentCount += 1;
    }
  });

  var eachSectionGets = remainderPercentage / (segments.length - hiddenSegmentCount);

  segments.forEach(function (segment) {
    var value = segment.value,
        color = segment.color;

    var percent = value / total * 100;
    var segPercent = eachSectionGets + percent;
    if (segmentShown(segment, filters)) {
      segPercent = 0;
    }
    segmentObjects.push({
      percent: segPercent,
      offset: segmentPercentage,
      color: color,
      showSeperator: hiddenSegmentCount < segments.length - 1,
      shown: !segmentShown(segment, filters)
    });

    segmentPercentage += segPercent;
  });

  return segmentObjects;
};

var DonutChart = function (_Component) {
  inherits(DonutChart, _Component);

  function DonutChart(props) {
    classCallCheck(this, DonutChart);

    var _this = possibleConstructorReturn(this, (DonutChart.__proto__ || Object.getPrototypeOf(DonutChart)).call(this, props));

    _this.state = {
      segments: props.segments,
      oldSegments: props.segments,
      filters: [],
      isInital: true
    };
    return _this;
  }

  createClass(DonutChart, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          className = _props.className,
          lineWidth = _props.lineWidth,
          dropShadow = _props.dropShadow,
          filters = _props.filters,
          segmentStyle = _props.segmentStyle,
          animationDuration = _props.animationDuration,
          children = _props.children;


      var newsegmentObjects = getSegmentConfigs(this.state.segments, filters);
      var oldSegmentObjects = getSegmentConfigs(this.state.oldSegments, filters);

      var segmentObjects = [];

      // this means one was removed or it stayed same so merge new into old with old getting 0 percent
      segmentObjects = oldSegmentObjects.length >= newsegmentObjects.length ? oldSegmentObjects.map(function (seg, idx) {
        var relatedNewObj = newsegmentObjects[idx] || _extends({}, seg, {
          offset: 100,
          percent: 0,
          shown: false
        });

        return _extends({}, seg, relatedNewObj, {
          fromOffset: seg.offset,
          fromPercent: seg.percent
        });
      }) : newsegmentObjects.map(function (seg, idx) {
        var relatedOldObj = oldSegmentObjects[idx] || _extends({}, seg, {
          offset: 100,
          percent: 0
        });

        return _extends({}, seg, {
          fromOffset: relatedOldObj.offset,
          fromPercent: relatedOldObj.percent
        });
      });

      return React.createElement(
        'div',
        { className: className },
        React.createElement(
          'div',
          { style: CircleBoxStyle },
          dropShadow && React.createElement(
            'svg',
            { width: '100%', viewBox: '0 0 42 46', style: SVGStyle },
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
              transform: 'scale(1.3,0.2)' })
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
              return React.createElement(DonutChartSegment, {
                segmentShown: segmentObject.shown,
                percent: segmentObject.percent,
                fromPercent: segmentObject.fromPercent,
                offset: segmentObject.offset,
                fromOffset: segmentObject.fromOffset,
                delay: segmentObject.delay,
                color: segmentObject.color,
                segId: segmentObject.segId,
                isInital: _this2.state.isInital,
                segmentStyle: segmentStyle,
                showSeperator: segmentObject.showSeperator,
                lineWidth: lineWidth,
                animationDuration: animationDuration });
            })
          ),
          React.createElement(
            'div',
            { style: LabelContainerStyle },
            children
          )
        )
      );
    }
  }], [{
    key: 'getDerivedStateFromProps',
    value: function getDerivedStateFromProps(props, state) {
      return _extends({}, state, {
        filters: props.filters,
        segments: props.segments,
        oldSegments: state.segments
      });
    }
  }]);
  return DonutChart;
}(Component);

DonutChart.defaultProps = {
  animationDuration: '0.2s',
  lineWidth: 9,
  dropShadow: false,
  segmentStyle: 'flat',
  filters: []
};
DonutChart.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object, PropTypes.string]),
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
  segments: PropTypes.array.isRequired,
  lineWidth: PropTypes.number,
  dropShadow: PropTypes.bool,
  filters: PropTypes.array,
  animationDuration: PropTypes.string,
  segmentStyle: PropTypes.oneOf(['flat', 'raised'])
};

export default DonutChart;
//# sourceMappingURL=index.es.js.map
