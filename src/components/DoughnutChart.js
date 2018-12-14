import React, { Component } from 'react'
import DoughnutChartSegment from './DoughnutChartSegment'
import { sum } from '../utils'

const ContainerStyle = {
  position: 'relative',
  maxWidth: '260px',
  color: 'white',
  border: '1px solid #cccccc',
  borderRadius: '6px',
  overflow: 'hidden',
  margin: '18px'
}

const LabelStyle = {
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
}

const CircleBoxStyle = {
  position: 'relative',
  padding: '14px 30px 0 30px'
}

const getSegmentConfigs = (props) => {
  const { segments } = props

  let segmentObjects = []
  let segmentPercentage = 0
  let remainderPercentage = 0
  let unshown = 0
  let int = 0

  const total = sum(segments.map((seg) => seg.value))

  segments.forEach(({key, value, color}) => {
    const percent = (value / total) * 100
    if (percent === 0) {
      remainderPercentage += percent
      unshown += 1
    }
  })

  const eachSectionGets = remainderPercentage / (segments.length - unshown)

  segments.forEach(({key, value, color}) => {
    const percent = (value / total) * 100
    let segPercent = eachSectionGets + percent
    if (value === 0) {
      segPercent = 0
    };

    segmentObjects.push({
      percent: segPercent,
      offset: segmentPercentage,
      color: color,
      delay: (int * 0.3) + 0.1,
      showSeperator: unshown < 2,
      shown: percent !== 0
    })

    int += 1
    segmentPercentage += segPercent
  })

  return segmentObjects
}

class DoughnutChart extends Component {
  static defaultProps = {
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
  }

  constructor(props) {
    super(props)
    this.state = {
      isVisible: false,
      shown: false,
      percentage: 0
    }
  }

  render() {
    const { className, shown, lineWidth } = this.props

    let segmentObjects = getSegmentConfigs(this.props)

    return (
      <div className={className}>
        <div style={ContainerStyle}>
          <div style={CircleBoxStyle}>
            <svg width='100%' height='100%' viewBox='0 0 42 46' className='donut'>
              <defs>
                <radialGradient id='grad1' cx='50%' cy='50%' r='100%' fx='50%' fy='50%'>
                  <stop offset='20%' stopColor='#000' stopOpacity='0.5' />
                  <stop offset='50%' stopColor='#000' stopOpacity='0' />
                  <stop offset='80%' stopColor='#000' stopOpacity='0.5' />
                </radialGradient>
                <radialGradient id='drop' cx='50%' cy='50%' r='100%' fx='50%' fy='50%'>
                  <stop offset='0%' stopColor='#000' stopOpacity='0.4' />
                  <stop offset='40%' stopColor='#000' stopOpacity='0' />
                </radialGradient>
              </defs>
              <circle
                cx='19.4'
                cy='206'
                className={'shadow'}
                r='15.91549430918954'
                fill='url(#drop)'
                stroke='transparent'
                strokeWidth='0'
                transform='scale(1.1,0.2)'
                style={{
                  transition: 'opacity 0.5s ease-in-out',
                  opacity: 1
                  // opacity: shown ? 1 : 0
                }} />
              {segmentObjects.map((segmentObject) =>
                <DoughnutChartSegment
                  shown={shown}
                  segmentShown={segmentObject.shown}
                  percent={segmentObject.percent}
                  offset={segmentObject.offset}
                  delay={segmentObject.delay}
                  color={segmentObject.color}
                  showSeperator={segmentObject.showSeperator}
                  lineWidth={lineWidth} />
              )}
            </svg>
            <div style={LabelStyle}>
              <p>Label Here</p>
            </div>
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
