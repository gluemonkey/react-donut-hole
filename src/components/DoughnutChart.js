import React, { Component } from 'react'
import DoughnutChartSegment from './DoughnutChartSegment'
import { sum } from '../utils'

const LabelContainerStyle = {
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
}

const CircleBoxStyle = {
  position: 'relative',
  padding: '14px 30px 94% 30px'
}

const SVGStyle = {
  position: 'absolute',
  top: 0,
  left: 0
}

const segmentShown = (segment, filters) => segment.value === 0 || filters.includes(segment.key)

const getSegmentConfigs = (segments, filters) => {
  let segmentObjects = []
  let segmentPercentage = 0
  let remainderPercentage = 0
  let hiddenSegmentCount = 0

  const total = sum(segments.map((seg) => seg.value))

  segments.forEach((segment) => {
    const { value } = segment
    const percent = (value / total) * 100
    if (segmentShown(segment, filters)) {
      remainderPercentage += percent
      hiddenSegmentCount += 1
    }
  })

  const eachSectionGets = remainderPercentage / (segments.length - hiddenSegmentCount)

  segments.forEach((segment) => {
    const { value, color } = segment
    const percent = (value / total) * 100
    let segPercent = eachSectionGets + percent
    if (segmentShown(segment, filters)) {
      segPercent = 0
    };

    segmentObjects.push({
      percent: segPercent,
      offset: segmentPercentage,
      color: color,
      showSeperator: hiddenSegmentCount < segments.length - 1,
      shown: percent !== 0
    })

    segmentPercentage += segPercent
  })

  return segmentObjects
}

class DoughnutChart extends Component {
  static defaultProps = {
    animate: true,
    animationDuration: '1s',
    lineWidth: '9',
    dropShadow: false,
    percentSpacing: 10,
    segmentStyle: 'raised'
  }

  animationTimer = null;

  constructor(props) {
    super(props)
    this.state = {
      segments: props.segments,
      oldSegments: props.segments,
      filters: [],
      isInital: true
    }
  }

  static getDerivedStateFromProps(props, state) {
    return {
      ...state,
      filters: props.filters,
      segments: props.segments,
      oldSegments: state.segments
    }
  }

  render() {
    const { className, lineWidth, dropShadow, filters, segmentStyle, children } = this.props

    const newsegmentObjects = getSegmentConfigs(this.state.segments, filters)
    const oldSegmentObjects = getSegmentConfigs(this.state.oldSegments, filters)

    let segmentObjects = []

    //this means one was removed or stayed same so merge new into old with old getting 0 percent
    if (oldSegmentObjects.length >= newsegmentObjects.length) {
      segmentObjects = oldSegmentObjects.map((seg, idx) => {
        const relatedNewObj = newsegmentObjects[idx] || {
          ...seg,
          offset: 100,
          percent: 0
        }
        return {
          ...seg,
          fromOffset: seg.offset,
          offset: relatedNewObj.offset,
          fromPercent: seg.percent,
          percent: relatedNewObj.percent
        }
      })
    }

    //this means one was added
    if (oldSegmentObjects.length < newsegmentObjects.length) {
      segmentObjects = newsegmentObjects.map((seg, idx) => {
        const relatedOldObj = oldSegmentObjects[idx] || {
          ...seg,
          offset: 100,
          percent: 0
        }
        return {
          ...seg,
          offset: seg.offset,
          fromOffset: relatedOldObj.offset,
          percent: seg.percent,
          fromPercent: relatedOldObj.percent
        }
      })
    }

    return (
      <div className={className}>
        <div style={CircleBoxStyle}>
          {dropShadow &&
            <svg width='100%' viewBox='0 0 42 46' style={SVGStyle}>
              <defs>
                <radialGradient id='drop' cx='50%' cy='50%' r='100%' fx='50%' fy='50%'>
                  <stop offset='0%' stopColor='#000' stopOpacity='0.4' />
                  <stop offset='40%' stopColor='#000' stopOpacity='0' />
                </radialGradient>
              </defs>
              <circle
                cx='16.4'
                cy='206'
                className={'shadow'}
                r='15.91549430918954'
                fill='url(#drop)'
                stroke='transparent'
                strokeWidth='0'
                transform='scale(1.3,0.2)'
                style={{
                  transition: 'opacity 0.5s ease-in-out',
                  opacity: 1
                }} />
            </svg>
          }
          <svg width='100%' height='100%' viewBox='0 0 42 42' style={SVGStyle}>
            <defs>
              <radialGradient id='grad1' cx='50%' cy='50%' r='100%' fx='50%' fy='50%'>
                <stop offset='20%' stopColor='#000' stopOpacity='0.5' />
                <stop offset='50%' stopColor='#000' stopOpacity='0' />
                <stop offset='80%' stopColor='#000' stopOpacity='0.5' />
              </radialGradient>
            </defs>
            {segmentObjects.map((segmentObject) =>
              <DoughnutChartSegment
                segmentShown={segmentObject.shown}
                percent={segmentObject.percent}
                fromPercent={segmentObject.fromPercent}
                offset={segmentObject.offset}
                fromOffset={segmentObject.fromOffset}
                delay={segmentObject.delay}
                color={segmentObject.color}
                segId={segmentObject.segId}
                isInital={this.state.isInital}
                segmentStyle={segmentStyle}
                showSeperator={segmentObject.showSeperator}
                lineWidth={lineWidth} />
            )}
          </svg>
          <div style={LabelContainerStyle}>
            {children}
          </div>
        </div>
      </div>
    )
  }
}

// DoughnutChart.propTypes = {
//   // segments: PropTypes.array
// }

export default DoughnutChart
