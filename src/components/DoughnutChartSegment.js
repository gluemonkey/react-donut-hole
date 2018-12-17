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
      animate: false
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ animate: true })
    }, 0)
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.percent === 0) {
      clearTimeout(this.animationTimeout)
      this.animationTimeout = setTimeout(() => this.props.onAnimationComplete(this.props.segId), 300)
    }
    if (!this.state.animate) {
      requestAnimationFrame(() => {
        debugger;
        this.setState({ animate: true })
      })
    }
  }

  animationTimeout = null;

  render() {
    const { percent, isInital, offset, color, lineWidth, showSeperator} = this.props
    const { animate } = this.state
    const segmentOffset = 0
    const seperatorPercentage = showSeperator ? 0.7 : 0
    const mainSegPercentage = (animate || isInital) ? Math.max(0, (percent - seperatorPercentage)) : 0

    const mainSegmentConfig = {
      dasharray: `${mainSegPercentage} ${100 - mainSegPercentage}`,
      rotation: ((offset + segmentOffset) / 100) * 360,
      dashoffset: `0`,
      color: color
    }

    const segmentContainerStyle = {
      transformOrigin: 'center 50%',
      transitionProperty: 'all',
      transitionDuration: '0.3s',
      transitionDelay: '0s',
      transitionTimingFunction: 'linear',
      opacity: 1,
      transform: `rotate(${mainSegmentConfig.rotation}deg)`
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
          dasharray={mainSegmentConfig.dasharray}
          dashoffset={mainSegmentConfig.dashoffset} />
        <CircleElement
          cx='21'
          cy='21'
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
