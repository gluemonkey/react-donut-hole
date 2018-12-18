import React, { Component } from 'react'

import DoughnutChart from 'react-doughnut-hole'

const fillingSegments = [
  {key: 'Plain', value: 80, color: 'tan'},
  {key: 'Raspberry Filled', value: 80, color: 'red'},
  {key: 'Blueberry Filled', value: 80, color: 'blue'}
]

const shapeSegments = [
  {key: 'Round', value: 90, color: 'red'},
  {key: 'Long', value: 80, color: 'green'},
]

const toppingSegments = [
  {key: 'Plain', value: 90, color: 'tan'},
  {key: 'Pink Frosting', value: 80, color: 'pink'},
  {key: 'Maple Frosting', value: 20, color: 'brown'},
  {key: 'Grape Frosting', value: 10, color: 'purple'}
]

const segmentCats = [fillingSegments, shapeSegments, toppingSegments]

const ToggleButton = ({children, active, ...restProps}) => <div className={active ? 'toggle -active' : 'toggle -inactive'} {...restProps}>{children}</div>

export default class App extends Component {
  state = {
    filters: [],
    segmentConfig: 2
  }

  notFiltered = (tag) => this.state.filters.findIndex((filter) => tag === filter) === -1
  
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
            <ToggleButton active={this.notFiltered('Plain')} onClick={() => this.setFilter('Plain')}>Plain</ToggleButton>
            <ToggleButton active={this.notFiltered('Raspberry Filled')} onClick={() => this.setFilter('Raspberry Filled')}>Raspberry Filled</ToggleButton>
            <ToggleButton active={this.notFiltered('Blueberry Filled')} onClick={() => this.setFilter('Blueberry Filled')}>Blueberry Filled</ToggleButton>
          </div>
        }
        {segmentConfig == 1  &&
          <div className={'ToggleButtonRow'}>
            <ToggleButton active={this.notFiltered('Round')} onClick={() => this.setFilter('Round')}>Round</ToggleButton>
            <ToggleButton active={this.notFiltered('Long')} onClick={() => this.setFilter('Long')}>Long</ToggleButton>
          </div>
        }
        {segmentConfig == 2  &&
          <div className={'ToggleButtonRow'}>
            <ToggleButton active={this.notFiltered('Plain')} onClick={() => this.setFilter('Plain')}>Plain</ToggleButton>
            <ToggleButton active={this.notFiltered('Pink Frosting')} onClick={() => this.setFilter('Pink Frosting')}>Pink Frosting</ToggleButton>
            <ToggleButton active={this.notFiltered('Maple Frosting')} onClick={() => this.setFilter('Maple Frosting')}>Maple Frosting</ToggleButton>
            <ToggleButton active={this.notFiltered('Grape Frosting')} onClick={() => this.setFilter('Grape Frosting')}>Grape Frosting</ToggleButton>
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
