import React, { Component } from 'react'

import DoughnutChart from 'react-doughnut-hole'

const fillingSegments = [
  {key: 'Plain', value: 80, color: 'red'},
  {key: 'Raspberry Filled', value: 80, color: 'green'},
  {key: 'Blueberry Filled', value: 80, color: 'blue'}
]

const shapeSegments = [
  {key: 'Round', value: 90, color: 'red'},
  {key: 'Long', value: 80, color: 'green'},
]

const toppingSegments = [
  {key: 'Plain', value: 90, color: 'red'},
  {key: 'Pink Frosting', value: 80, color: 'green'},
  {key: 'Maple Frosting', value: 20, color: 'blue'},
  {key: 'Grape Frosting', value: 10, color: 'purple'}
]

const segmentCats = [fillingSegments, shapeSegments, toppingSegments]

export default class App extends Component {
  state = {
    filters: [],
    segmentConfig: 2
  }
  
  setFilter = (key) => {
    const filters = this.state.filters.includes(key) ? 
      this.state.filters.filter((val) => val !== key) 
      : this.state.filters.concat(key)
    this.setState({filters})
  }

  toggleChartType = () => {
    const { segmentConfig } = this.state;
    const newSegmentConfig = segmentConfig === segmentCats.length -1 ? 0 : segmentConfig + 1;
    this.setState({segmentConfig: newSegmentConfig, filters: []});
  }

  render () {
    const { filters, segmentConfig } = this.state;
    return (
      <div>
        {segmentConfig == 0  &&
          <div className={'buttonRow'}>
            <button onClick={() => this.setFilter('Plain')}>Toggle Plain</button>
            <button onClick={() => this.setFilter('Raspberry Filled')}>Toggle Raspberry Filled</button>
            <button onClick={() => this.setFilter('Blueberry Filled')}>Toggle Blueberry Filled</button>
          </div>
        }
        {segmentConfig == 1  &&
          <div className={'buttonRow'}>
            <button onClick={() => this.setFilter('Round')}>Toggle Round</button>
            <button onClick={() => this.setFilter('Long')}>Toggle Long</button>
          </div>
        }
        {segmentConfig == 2  &&
          <div className={'buttonRow'}>
            <button onClick={() => this.setFilter('Plain')}>Toggle Plain</button>
            <button onClick={() => this.setFilter('Pink Frosting')}>Toggle Pink Frosting</button>
            <button onClick={() => this.setFilter('Maple Frosting')}>Toggle Maple Frosting</button>
            <button onClick={() => this.setFilter('Grape Frosting')}>Toggle Grape Frosting</button>
          </div>
        }
        <div className={'buttonRow'}>
          <button onClick={() => this.toggleChartType()}>Toggle Chart Type</button>
        </div>
        <div className={'chartContainer'}>
          <DoughnutChart 
            segments={segmentCats[segmentConfig]} 
            filters={filters}
            segmentStyle={'raised'}
            dropShadow>
            Raised Chart
          </DoughnutChart>
        </div>
        <div className={'chartContainer'}>
          <DoughnutChart 
            segments={segmentCats[segmentConfig]} 
            filters={filters}
            segmentStyle={'flat'}>
            Flat Chart
          </DoughnutChart>
        </div>
      </div>
    )
  }
}
