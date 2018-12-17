# react-doughnut-hole

> A simple, responsive, animated SVG doughnut chart

[![NPM](https://img.shields.io/npm/v/react-doughnut-hole.svg)](https://www.npmjs.com/package/react-doughnut-hole) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-doughnut-hole
```

## Usage

[View Example](https://gluemonkey.github.io/react-doughnut-hole)

```jsx
import React, { Component } from 'react'

import DoughnutChart from 'react-doughnut-hole'

const segments = [
  {key: 'Plain', value: 90, color: 'red'},
  {key: 'Pink Frosting', value: 80, color: 'green'},
  {key: 'Maple Frosting', value: 20, color: 'blue'},
  {key: 'Grape Frosting', value: 10, color: 'purple'}
]

export default class App extends Component {
  render () {
    return (
        <div>
          <DoughnutChart segments={segments} >
            <div>Favorite Topping</div>
          </DoughnutChart>
        </div>
      </div>
    )
  }
}

```

## License

MIT © [Patrick Poole](https://github.com/gluemonkey)
