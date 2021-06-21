# React AutoSearch 

A new take on the ReactJs search-autocomplete component for React.js.

```jsx
 <AutoSearch
    list={ ['foo', 'far', 'faz'] }
    onChange={ { value, results } => {} }
    onNavigate={ { results, active } => {} }
    onSelect={ value => val = value }
    options={}
  />
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

## Props

### `list: Array<T>`
Value: `Array<String, Object>`

The items to display in the dropdown menu

### `onChange: Function` (optional)
Default: `() => {}`

Arguments: `value: String`

Invoked when the user changes the input value.

### `onNavigate: Function` (optional)
Default: `() => {}`

Arguments: `results: Array<T>, active: Number`

Invoked when keyboard listeners react to user navigation of results list.

### `onSelect: Function` (optional)
Default: `() => {}`

Arguments: `value: String, results: Array<T>`

Invoked when the user selects an item from the results list.

### `options: AutoSearchOptions` (optional)
Arguments: `options: Object`


## Options (all optional)

### `primaryColor: string` 
Used as the primary color for active result indication

Default:  'steelblue'

### `placeholder: string`
Attribute applied to the root input placeholder value

Default:  'AutoSearch'

### `autoFocus: boolean`
Attribute applied to the root input autoFocus value

Default:  false

### `caseSensitive: boolean`
Used in the AutoSearch algorithms to match search value

Default:  false

### `maxResults: number`
Number of results to render in the results list

Default:  10

### `showIcon: boolean`
Used to determine if the search icon in the input is rendered 

Default:  true

## Play around with the implementation on CodeSandbox

[![Edit Button](https://svgshare.com/i/KAx.svg)](https://codesandbox.io/s/autosearch-ltzg7)

## Patch notes
A log of recent updates and notes can be found [here](https://autosearch.kylecaprio.dev/patchnotes)

## Roadmap
The future plans are under deliberation within the core team.

## License
This project is licensed under the terms of the [MIT license](/LICENSE)

