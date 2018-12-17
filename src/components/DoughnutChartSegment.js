import React, { Component } from 'react'

const calcSegmentConfig = (percent, offset, props) => {
  const { color, showSeperator} = props
  const segmentOffset = 25
  const seperatorPercentage = showSeperator ? 0.7 : 0
  const mainSegPercentage =  Math.max(0, (percent - seperatorPercentage))

  return {
    dasharray: `${mainSegPercentage} ${100 - mainSegPercentage}`,
    rotation: ((offset + segmentOffset) / 100) * 360,
    dashoffset: `0`,
    color: color
  }
}

const CircleElement = ({children, initalSegmentConfig, animatedSegmentConfig, ...props}) => {
  const activeStyles = {
    transitionProperty: 'all, opacity',
    transitionDuration: '0.3s, 0s',
    transitionDelay: '0s, 0s',
    transitionTimingFunction: 'linear, linear',
    strokeDasharray: animatedSegmentConfig.dasharray,
    strokeDashoffset: animatedSegmentConfig.dashoffset
  }

  const inactiveStyles = {
    transitionProperty: 'all, opacity',
    transitionDuration: '0.3s, 0s',
    transitionDelay: '0s, 0s',
    transitionTimingFunction: 'linear, linear',
    strokeDasharray: initalSegmentConfig.dasharray,
    strokeDashoffset: initalSegmentConfig.dashoffset
  }
  const calcStyles = props.animatedIn ? activeStyles : inactiveStyles
  return (
    <circle
      {...props}
      style={calcStyles} />
  )
}

class DoughnutChartSegment extends Component {
  constructor(props) {
    super(props)
    this.state = {
      animate: false
    }
  }

  componentDidMount() {
    if (this.props.percent !== this.props.fromPercent) {
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
    const { percent, fromPercent, isInital, fromOffset, offset, color, lineWidth, showSeperator, segmentStyle} = this.props
    const { animate } = this.state

    const initialSegmentConfig = calcSegmentConfig(fromPercent, fromOffset, this.props)
    const toSegmentConfig = calcSegmentConfig(percent, offset, this.props)

    const segmentContainerStyle = {
      transformOrigin: 'center 50%',
      transitionProperty: 'all',
      transitionDuration: '0.3s',
      transitionDelay: '0s',
      transitionTimingFunction: 'linear',
      opacity: 1,
      transform: animate ? `rotate(${toSegmentConfig.rotation}deg)` : `rotate(${initialSegmentConfig.rotation}deg)`
    }

    return (
      <g style={segmentContainerStyle}>
        <CircleElement
          cx='21'
          cy='21'
          r='15.91549430918953357688837633725143'
          fill='transparent'
          stroke={toSegmentConfig.color}
          animatedIn={animate}
          strokeWidth={lineWidth}
          initalSegmentConfig={initialSegmentConfig}
          animatedSegmentConfig={toSegmentConfig} />
        {segmentStyle === 'raised' &&
          <CircleElement
            cx='21'
            cy='21'
            r='15.91549430918953357688837633725143'
            fill='transparent'
            stroke='url(#grad1)'
            animatedIn={animate}
            strokeWidth={lineWidth}
            initalSegmentConfig={initialSegmentConfig}
            animatedSegmentConfig={toSegmentConfig} />
        }
      </g>
    )
  }
}

export default DoughnutChartSegment
