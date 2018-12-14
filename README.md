# react-doughnut-hole

> A simple, friendly SVG doughnut chart

[![NPM](https://img.shields.io/npm/v/react-doughnut-hole.svg)](https://www.npmjs.com/package/react-doughnut-hole) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-doughnut-hole
```

## Usage

```jsx
import React, { Component } from 'react'

import DoughnutChart from 'react-doughnut-hole'

const segments = [
  {key: 'Pepperoni', value: 80, color: 'red'},
  {key: 'Sausage', value: 80, color: 'green'},
  {key: 'Mushroom', value: 80, color: 'blue'}
]

class Example extends Component {
  render () {
    return (
      <div>
        <DoughnutChart segments={segments} />
      </div>
    )
  }
}

```

## License

MIT © [Patrick Poole](https://github.com/gluemonkey)
