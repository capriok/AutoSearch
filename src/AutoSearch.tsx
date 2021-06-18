import React, { useEffect, useReducer } from 'react'
import { AutoSearchForm } from './Form'
import { AutoSearchResults } from './Results'
import { AutoSearchProps, AutoSearchState, AutoSearchReducer, AutoSearchOptions } from './index'

import './index.scss'

const defaultOptions: AutoSearchOptions = {
	placeholder: 'AutoSearch',
	autoComplete: 'off',
	caseSensitive: false,
	sliceResults: true
}

export default function AutoSearch({ list, options }: AutoSearchProps) {

	const [state, dispatch] = useReducer(searchFormReducer, autoSearchState)
	options = { ...defaultOptions, ...options }

	useEffect(() => {
		console.log({ ResultsList: state.resultsList })
	}, [state.resultsList])

	function selectResult(val: string): void {
		let value = val ? val : state.searchValue
		if (!value) return

		dispatch({ type: 'SELECT_RESULT', value: value })
	}

	return (
		<div className="_AutoSearch">
			<AutoSearchForm
				list={list}
				state={state}
				dispatch={dispatch}
				options={options}
			/>
			<AutoSearchResults
				state={state}
				dispatch={dispatch}
				options={options}
				selectResult={selectResult}
			/>
		</div>
	)
}

const autoSearchState: AutoSearchState = {
	searchValue: "",
	resultsOpen: false,
	resultsList: [],
	activeResult: -1
}

const searchFormReducer = (state: AutoSearchState, action: AutoSearchReducer): AutoSearchState => {
	switch (action.type) {
		case "SET_VALUE":
			return {
				...state,
				searchValue: action.value,
				resultsOpen: state.resultsList.length > 0 ? true : false,
				activeResult: -1
			}
		case "SET_RESULTS":
			return {
				...state,
				resultsList: action.value,
				resultsOpen: state.resultsList.length > 0 ? true : false,
				activeResult: -1
			}
		case "TOGGLE_RESULTS":
			return {
				...state,
				resultsOpen: action.value
			}
		case "SELECT_RESULT":
			return {
				...state,
				resultsOpen: false,
				resultsList: [],
				activeResult: -1
			}
		case "ACTIVE_RESULT_INC":
			return {
				...state,
				activeResult: state.activeResult < state.resultsList.length - 1
					? state.activeResult + 1
					: state.activeResult
			}
		case "ACTIVE_RESULT_DEC":
			return {
				...state,
				activeResult: state.activeResult > 0
					? state.activeResult - 1
					: -1
			}
		case "RESET_ACTIVE_RESULT":
			return {
				...state,
				activeResult: -1
			}
		case "SET_FORM":
			return {
				...autoSearchState,
			}
		default:
			return state
	}
}
