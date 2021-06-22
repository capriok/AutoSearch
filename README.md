<h1 align="center">React AutoSearch</h1>
<p align="center">
  <a href="https://www.npmjs.com/package/autosearch">
    <img alt="npm" src="https://img.shields.io/npm/v/autosearch?style=flat" />
  </a>
  <a href="https://www.npmjs.com/package/autosearch">
    <img alt="npm" src="https://img.shields.io/npm/dw/autosearch?style=flat?&color=blue" />
  </a>
  <a href="https://www.npmjs.com/package/autosearch">
    <img alt="npm" src="https://img.shields.io/github/package-json/dependency-version/capriok/autosearch/dev/@types/react" />
  </a>
</p>

<p align="center">
  <img alt="screenshot" src="https://i.gyazo.com/feff88e421e29781edc414c4e041e5ec.png" >
</p>

A modern approach to an auto complete component for ReactJs

```jsx
import React from 'react'

function App () {
  let list = [ { name: 'Foo' }, { name: 'Far' }, { name: 'Faz' } ]
  let options = { propKey: 'name' }

  return (
    <AutoSearch
      list={list}
      options={options}
      onSelect={ value => val = value }
    />
  )
}
```

## Install

### npm

```bash
npm install --save autosearch
```

## Contribution

Do you like what we made? Support it by donating, creating an issue or pull request.

[![Donate](https://img.shields.io/badge/Donate-PayPal-blue.svg)](https://paypal.me/capriok7)

## API

## Props

#### `list: Array`
Value: `Array<{ [prop: string]: string } | string>`

Type: `Array<String>`: no action required in AutoSearchOptions

Type: `Array<Object>`: specify propKey value in AutoSearchOptions

- The list used for the AutoSearch algorithms

#### `onChange: Function` (optional)
Default: `() => {}`

Arguments: `value: String`

- Invoked when the user changes the input value.

#### `onNavigate: Function` (optional)
Default: `() => {}`

Arguments: `results: Array<T>, active: Number`

- Invoked when keyboard listeners react to user navigation of results list.

#### `onSelect: Function` (optional)
Default: `() => {}`

Arguments: `value: String, results: Array<T>`

- Invoked when the user selects an item from the results list.

#### `options: AutoSearchOptions` (optional)
Default: `Object<AutoSeachOptions>`

Value: `Object`

- Used throughout AutoSearch as conditional options and values

## Options (optional)

#### `propKey: String`  (optional)
Default: 'item'

- Used to find the iteration value by the AutoSearch algorithms

#### `primaryColor: String`  (optional)
Default:  'steelblue'

- Used as the primary color for active result indication

#### `placeholder: String` (optional)
Default: 'AutoSearch'

- Attribute applied to the root input placeholder value

#### `autoFocus: Boolean` (optional)
Default:  false

- Attribute applied to the root input autoFocus value

#### `caseSensitive: Boolean` (optional)
Default: false

- Used in the AutoSearch algorithms to match search value

#### `maxResults: Number` (optional)
Default: 10

- Max number of results to render in the results list

#### `showIcon: Boolean` (optional)
Default: true

- Used to determine if the search icon is rendered in the input

## Try it out on CodeSandbox
[![Edit Button](https://svgshare.com/i/KAx.svg)](https://codesandbox.io/s/autosearch-ltzg7)

## Patch notes
A log of recent updates and notes can be found [here](https://autosearch.kylecaprio.dev/patchnotes)

## Roadmap
The future plans are under deliberation within the core team.

## License
This project is licensed under the terms of the [MIT license](/LICENSE)

