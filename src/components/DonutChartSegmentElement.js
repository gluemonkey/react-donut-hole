import React from 'react'

import PropTypes from 'prop-types'

const CircleElement = (props) => {
  const {
    initalSegmentConfig,
    animatedSegmentConfig,
    animatedIn,
    animationDuration,
    ...circleProps
  } = props

  const baseStyles = {
    transitionProperty: 'all, opacity',
    transitionDuration: `${animationDuration}, 0s`,
    transitionDelay: '0s, 0s',
    transitionTimingFunction: 'linear, linear'
  }

  const toStyles = {
    ...baseStyles,
    strokeDasharray: animatedSegmentConfig.dasharray,
    strokeDashoffset: animatedSegmentConfig.dashoffset
  }

  const fromStyles = {
    ...baseStyles,
    strokeDasharray: initalSegmentConfig.dasharray,
    strokeDashoffset: initalSegmentConfig.dashoffset
  }

  const calcStyles = animatedIn ? toStyles : fromStyles

  return (
    <circle {...circleProps} style={calcStyles} />
  )
}

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
}

export default CircleElement
