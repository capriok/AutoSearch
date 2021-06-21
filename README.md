# React AutoSearch 

A new take on the ReactJs search-autocomplete component for React.js.

```jsx
import React from 'react'

function App () {
  let list = { name: 'Foo' }, { name: 'Far' }, { name: 'Faz' }
  let options = { listProp: 'name' }

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

## Donation

Do you like what we made? Support it by donating, creating an issue or pull request.

[![Donate](https://img.shields.io/badge/Donate-PayPal-blue.svg)](https://paypal.me/capriok7)

## API

### Props

#### `list: Array`
Value: `Array<{ [string]: string } | string>`

Type: `Array<String>`: no action required in AutoSearchOptions

Type: `Array<Object>`: specify listProp value in AutoSearchOptions

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

Arguments: `options: Object`

- Used throughout AutoSearch as conditional options and values

### Options (optional)

#### `listProp: String`  (optional)
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

- Number of results to render in the results list

#### `showIcon: Boolean` (optional)
Default: true

- Used to determine if the search icon in the input is rendered 

## Try it out on CodeSandbox
[![Edit Button](https://svgshare.com/i/KAx.svg)](https://codesandbox.io/s/autosearch-ltzg7)

## Patch notes
A log of recent updates and notes can be found [here](https://autosearch.kylecaprio.dev/patchnotes)

## Roadmap
The future plans are under deliberation within the core team.

## License
This project is licensed under the terms of the [MIT license](/LICENSE)

