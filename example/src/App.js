import React, { Component } from 'react'

import DoughnutChart from 'react-doughnut-hole'

const fillingSegments = [
  {key: 'Plain', value: 80, color: 'red', segId: 1},
  {key: 'Raspberry Filled', value: 80, color: 'green', segId: 2},
  {key: 'Blueberry Filled', value: 80, color: 'blue', segId: 3}
]

const toppingSegments = [
  {key: 'Plain', value: 90, color: 'red', segId: 1},
  {key: 'Pink Frosting', value: 80, color: 'green', segId: 2},
  // {key: 'Maple Frosting', value: 20, color: 'blue'}
]

export default class App extends Component {
  state = {
    filters: [],
    segments: fillingSegments
  }
  
  setFilter = (key) => {
    const filters = this.state.filters.includes(key) ? 
      this.state.filters.filter((val) => val !== key) 
      : this.state.filters.concat(key)
    this.setState({filters})
  }

  toggleChartType = () => {
    const { segments } = this.state;
    segments === fillingSegments ? 
      this.setState({segments: toppingSegments, filters: []}) 
      : this.setState({segments: fillingSegments, filters: []})
  }

  render () {
    const { filters, segments } = this.state;
    return (
      <div>
        {segments === fillingSegments ? (
          <div>
            <button onClick={() => this.setFilter('Plain')}>Toggle Plain</button>
            <button onClick={() => this.setFilter('Raspberry Filled')}>Toggle Raspberry Filled</button>
            <button onClick={() => this.setFilter('Blueberry Filled')}>Toggle Blueberry Filled</button>
          </div>
        ):(
          <div>
            <button onClick={() => this.setFilter('Plain')}>Toggle Plain</button>
            <button onClick={() => this.setFilter('Pink Frosting')}>Toggle Pink Frosting</button>
            <button onClick={() => this.setFilter('Maple Frosting')}>Toggle Maple Frosting</button>
          </div>
        )}
        <div>
          <button onClick={() => this.toggleChartType()}>Toggle Chart Type</button>
        </div>
        <div style={{width: 300}}>
          <DoughnutChart segments={segments} filters={filters} />
        </div>
      </div>
    )
  }
}
