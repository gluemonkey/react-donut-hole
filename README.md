# react-donut-hole

> A simple, responsive, animated SVG donut chart

[![NPM](https://img.shields.io/npm/v/react-donut-hole.svg)](https://www.npmjs.com/package/react-donut-hole) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-donut-hole
```

## Usage

[View Example](https://gluemonkey.github.io/react-donut-hole)

```jsx
import React, { Component } from 'react'

import DonutChart from 'react-donut-hole'

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
          <DonutChart segments={segments} >
            <div>Favorite Topping</div>
          </DonutChart>
        </div>
      </div>
    )
  }
}

```
## Children

Children supplied to the component will be centered within the donut chart

## Props

#### segments: `Array<SegmentConfig>`

> required

A segment config object requires the following object keys
`key: string` - a unique key to identify the value which is also used for filtering
`value: number` - any number value
`color: string` - css style hex or color value

#### filters: `Array<string>`

> default: `[]`

Array of strings coresponding to the segment key values to be filtered out

#### animationDuration: `string`

> default: `"0.2s"`

Time spent animating between segment values when provided to the component.


#### lineWidth: `number`

> default: `9`

Specifies the relative thickness of the donut

#### dropShadow: `boolean`

> default: `false`

Adds a drop shadow below the chart

#### segmentStyle: `string 'flat'|'raised'`

> default: `flat`

Selects either a flat or raised style for the chart

## License

MIT © [Patrick Poole](https://github.com/gluemonkey)
