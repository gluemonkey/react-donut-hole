import React, { Component } from 'react'

import DoughnutChart from 'react-doughnut-hole'

const segments = [
  {key: 'Pepperoni', value: 80, color: 'red'},
  {key: 'Sausage', value: 80, color: 'green'},
  {key: 'Mushroom', value: 80, color: 'blue'}
]

export default class App extends Component {
  render () {
    return (
      <div>
        <DoughnutChart segments={segments} />
      </div>
    )
  }
}
