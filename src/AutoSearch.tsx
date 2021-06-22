import React, { useEffect, useReducer } from 'react'
import { AutoSearchForm } from './Form'
import { AutoSearchResults } from './Results'
import { ConvertToAutoSearchList } from './Utils/utils'
import { AutoSearchProps, AutoSearchState, AutoSearchReducer, AutoSearchOptions } from './index'

import './index.scss'

const defaultOptions: AutoSearchOptions = {
	propKey: 'item',
	primaryColor: 'steelblue',
	placeholder: 'AutoSearch',
	autoFocus: true,
	caseSensitive: false,
	maxResults: 10,
	showIcon: true,
}

// console.log = () => { }

export default function AutoSearch(props: AutoSearchProps) {
	const { list, onSelect, onChange, onNavigate } = props

	const options = { ...defaultOptions, ...props.options }

	const [state, dispatch] = useReducer(searchFormReducer, autoSearchState)

	useEffect(() => {
		document.documentElement.style.setProperty('--autosearch-primary-color', options.primaryColor!)

		let searchList = ConvertToAutoSearchList(list, options.propKey!)
		dispatch({ type: 'NewList', value: searchList })
	}, [])

	useEffect(() => {
		console.log(state);
	}, [state.searchValue, state.resultsList])

	return (
		<div className="_AutoSearch">
			<AutoSearchForm
				state={state}
				dispatch={dispatch}
				options={options}
				onChange={onChange}>
				<AutoSearchResults
					state={state}
					dispatch={dispatch}
					options={options}
					onSelect={onSelect}
					onNavigate={onNavigate}
				/>
			</AutoSearchForm>
		</div>
	)
}

AutoSearch.defaultProps = {
	onSelect() { },
	onChange() { },
	onNavigate() { }
}

const autoSearchState: AutoSearchState = {
	searchList: [],
	searchValue: '',
	tempValue: '',
	resultsOpen: false,
	resultsList: [],
	activeResult: -1
}

const searchFormReducer = (state: AutoSearchState, action: AutoSearchReducer): AutoSearchState => {
	switch (action.type) {
		case 'NewList':
			return {
				...state,
				searchList: action.value
			}
		case 'NewValue':
			return {
				...state,
				searchValue: action.value,
				tempValue: '',
				resultsOpen: state.resultsList.length ? true : false,
				activeResult: -1
			}
		case 'TempValue':
			return {
				...state,
				tempValue: action.value,
			}
		case 'NewResults':
			return {
				...state,
				resultsList: action.value,
				resultsOpen: action.value.length ? true : false,
				activeResult: -1
			}
		case 'ToggleResults':
			return {
				...state,
				resultsOpen: action.value
			}
		case 'SelectResult':
			return {
				...state,
				searchValue: state.searchValue,
				tempValue: action.value,
				resultsOpen: false,
				resultsList: [],
				activeResult: -1
			}
		case 'IncrementActive':
			return {
				...state,
				activeResult: state.activeResult < state.resultsList.length - 1
					? state.activeResult + 1
					: state.activeResult
			}
		case 'DecrementActive':
			return {
				...state,
				activeResult: state.activeResult > 0
					? state.activeResult - 1
					: -1
			}
		case 'ResetActive':
			return {
				...state,
				activeResult: -1
			}
		case 'ResetAutoSearch':
			return {
				...autoSearchState,
				searchList: state.searchList
			}
		default:
			return state
	}
}

// Reference https://github.com/sickdyd/react-search-autocomplete