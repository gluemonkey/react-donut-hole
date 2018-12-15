import React, { Component } from 'react'

const CircleElement = ({children, dasharray, dashoffset, ...props}) => {
  const activeStyles = {
    transitionProperty: 'all, opacity',
    transitionDuration: '0.3s, 0s',
    transitionDelay: '0s, 0s',
    transitionTimingFunction: 'linear, linear',
    strokeDasharray: dasharray,
    strokeDashoffset: dashoffset
  }
  const inactiveStyles = {
    transitionProperty: 'all, opacity',
    transitionDuration: '0.3s, 0s',
    transitionDelay: '0s, 0.3s',
    transitionTimingFunction: 'linear, linear',
    strokeDasharray: dasharray,
    strokeDashoffset: dashoffset
  }
  const calcStyles = props.opacity === 1 ? activeStyles : inactiveStyles
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
      isVisible: false,
      shown: false,
      percentage: 0
    }
  }

  render() {
    const { percent, offset, color, lineWidth, delay, showSeperator, segmentShown} = this.props;
    const segmentOffset = 25
    const seperatorPercentage = showSeperator ? 0.7 : 0
    const mainSegPercentage = Math.max(0, (percent - seperatorPercentage))

    const mainSegmentConfig = {
      dasharray: `${mainSegPercentage} ${100 - mainSegPercentage}`,
      rotation: ((offset + segmentOffset) / 100) * 360,
      dashoffset: `0`,
      color: color
      // delay: delay,
    }

    const segmentContainerStyle = {
      transformOrigin: 'center 50%',
      transitionProperty: 'all',
      transitionDuration: '0.3s',
      transitionDelay: '0s',
      transitionTimingFunction: 'linear',
      // opacity: (shown ? 1 : 0),
      opacity: 1,
      transform: `rotate(${mainSegmentConfig.rotation}deg)`
    }

    console.log(mainSegmentConfig.rotation);

    return (
      <g style={segmentContainerStyle}>
        <CircleElement
          cx='21'
          cy='21'
          r='15.91549430918953357688837633725143'
          fill='transparent'
          stroke={mainSegmentConfig.color}
          strokeWidth={lineWidth}
          // opacity={segmentShown ? 1 : 0}
          dasharray={mainSegmentConfig.dasharray}
          dashoffset={mainSegmentConfig.dashoffset} />
        <CircleElement
          cx='21'
          cy='21'
          // opacity={segmentShown ? 1 : 0}
          r='15.91549430918953357688837633725143'
          fill='transparent'
          stroke='url(#grad1)'
          strokeWidth={lineWidth}
          dasharray={mainSegmentConfig.dasharray}
          dashoffset={mainSegmentConfig.dashoffset} />
      </g>
    )
  }
}

export default DoughnutChartSegment
