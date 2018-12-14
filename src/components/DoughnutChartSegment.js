import React, { Component } from 'react'

const CircleElement = ({children, ...props}) => {
  const activeStyles = {
    transitionProperty: 'all, opacity',
    transitionDuration: '0.5s, 0s',
    transitionDelay: '0s, 0s',
    transitionTimingFunction: 'ease-in-out, ease-in-out',
  }
  const inactiveStyles = {
    transitionProperty: 'all, opacity',
    transitionDuration: '0.5s, 0s',
    transitionDelay: '0s, 0.5s',
    transitionTimingFunction: 'ease-in-out, ease-in-out',
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
    super(props);
    this.state = {
      isVisible: false,
      shown: false,
      percentage: 0,
    }
  }

  render() {
    const { percent, offset, color, lineWidth, shown, delay, showSeperator, segmentShown} = this.props;
    const segmentOffset = 25;
    const seperatorPercentage = showSeperator ? 0.7 : 0;
    const mainSegPercentage = Math.max(0, (percent - seperatorPercentage));

    const mainSegmentConfig = {
      dasharray: `${mainSegPercentage} ${100-mainSegPercentage}`,
      rotation: ((offset + segmentOffset) / 100) * 360,
      dashoffset: `0`,
      color: color
      // delay: delay,
    }

    const segmentContainerStyle = {
      transformOrigin: 'center 45.8%',
      transitionProperty: 'all',
      transitionDuration: '0.5s',
      transitionDelay: '0s',
      transitionTimingFunction: 'ease-in-out',
      // opacity: (shown ? 1 : 0),
      opacity: 1,
      transform: `scale(0.8) rotate(${mainSegmentConfig.rotation}deg)`
    }

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
          strokeDasharray={mainSegmentConfig.dasharray}
          strokeDashoffset={mainSegmentConfig.dashoffset} />
        <CircleElement
          cx='21'
          cy='21'
          // opacity={segmentShown ? 1 : 0}
          r='15.91549430918953357688837633725143'
          fill='transparent'
          stroke='url(#grad1)'
          strokeWidth={lineWidth}
          strokeDasharray={mainSegmentConfig.dasharray}
          strokeDashoffset={mainSegmentConfig.dashoffset} />
      </g>
    )
  }
}

export default DoughnutChartSegment
