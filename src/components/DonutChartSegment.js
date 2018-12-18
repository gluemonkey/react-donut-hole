import React, { Component } from 'react'

import PropTypes from 'prop-types'

import DonutChartSegmentElement from './DonutChartSegmentElement'

const calcSegmentConfig = (percent, offset, props) => {
  const { color, showSeperator } = props
  const segmentOffset = 25
  const seperatorPercentage = showSeperator ? 0.7 : 0
  const mainSegPercentage = Math.max(0, (percent - seperatorPercentage))

  return {
    dasharray: `${mainSegPercentage} ${100 - mainSegPercentage}`,
    rotation: ((offset + segmentOffset) / 100) * 360,
    dashoffset: `0`,
    color: color
  }
}

class DonutChartSegment extends Component {
  static propTypes = {
    percent: PropTypes.number.isRequired,
    fromPercent: PropTypes.number.isRequired,
    offset: PropTypes.number.isRequired,
    fromOffset: PropTypes.number.isRequired,
    lineWidth: PropTypes.number,
    animationDuration: PropTypes.string,
    segmentStyle: PropTypes.oneOf(['flat', 'raised'])
  }

  constructor(props) {
    super(props)
    this.state = {
      animate: false
    }
  }

  componentDidMount() {
    const { percent, fromPercent } = this.props

    if (percent !== fromPercent) {
      setTimeout(() => {
        this.setState({ animate: true })
      }, 0)
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.percent !== prevProps.percent && this.props.percent !== this.props.fromPercent) {
      setTimeout(() => {
        this.setState({ animate: true })
      }, 0)
    }
  }

  render() {
    const {
      percent,
      fromPercent,
      fromOffset,
      offset,
      lineWidth,
      animationDuration,
      segmentStyle
    } = this.props
    const { animate } = this.state

    const initialSegmentConfig = calcSegmentConfig(fromPercent, fromOffset, this.props)
    const toSegmentConfig = calcSegmentConfig(percent, offset, this.props)

    const groupRotate = animate ? toSegmentConfig.rotation : initialSegmentConfig.rotation

    const segmentContainerStyle = {
      transformOrigin: 'center 50%',
      transitionProperty: 'all',
      transitionDuration: animationDuration,
      transitionDelay: '0s',
      transitionTimingFunction: 'linear',
      opacity: 1,
      transform: animate ? `rotate(${toSegmentConfig.rotation}deg)` : `rotate(${initialSegmentConfig.rotation}deg)`
    }

    return (
      <g style={segmentContainerStyle} transform={`rotate(${groupRotate} 21 21)`}>
        <DonutChartSegmentElement
          cx='21'
          cy='21'
          r='15.91549430918953357688837633725143'
          fill='transparent'
          stroke={toSegmentConfig.color}
          animatedIn={animate}
          strokeWidth={lineWidth}
          initalSegmentConfig={initialSegmentConfig}
          animationDuration={animationDuration}
          animatedSegmentConfig={toSegmentConfig} />
        {segmentStyle === 'raised' &&
          <DonutChartSegmentElement
            cx='21'
            cy='21'
            r='15.91549430918953357688837633725143'
            fill='transparent'
            stroke='url(#grad1)'
            animatedIn={animate}
            strokeWidth={lineWidth}
            initalSegmentConfig={initialSegmentConfig}
            animationDuration={animationDuration}
            animatedSegmentConfig={toSegmentConfig} />
        }
      </g>
    )
  }
}

export default DonutChartSegment
