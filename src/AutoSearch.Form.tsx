import React, { useEffect, useReducer } from 'react'
import { AutoSearchResults } from './AutoSearch.Results'
import { AutoSearchProps, AutoSearchState, AutoSearchReducer, AutoSearchOptions } from './index'

import './index.scss'

const defaultOptions: AutoSearchOptions = {
	caseSensitive: false,
	placeholder: 'Search...',
	autoComplete: 'off'
}

export default function AutoSearch({ list, options = defaultOptions }: AutoSearchProps) {

	const [state, dispatch] = useReducer(searchFormReducer, autoSearchState)
	const { searchValue, resultsList, resultsOpen } = state

	// console.log({ List: list });
	// console.log({ Options: options });

	function updateAutoSearchResults(value: string) {
		let search = value

		if (search.length < 1) return dispatch({ type: 'SET_FORM' })

		dispatch({ type: 'SET_VALUE', value: value })

		const tempList: string[] = []

		list.some(str => {
			let part = str.slice(0, search.length)
			if (!options.caseSensitive) {
				search = value.toLowerCase()
				part = part.toLowerCase()
			}

			if (part.includes(search)) tempList.push(str)
		})

		let resultList = tempList.length > 0 ? tempList.slice(0, 10) : []

		dispatch({ type: 'SET_RESULTS', value: resultList })
	}

	function selectResult(val: string): void {
		let value = val ? val : searchValue
		if (!value) return

		dispatch({ type: 'SELECT_RESULT', value: value })
	}


	useEffect(() => {
		console.log({ ResultsList: resultsList })
	}, [resultsList])

	return (
		<div className="_Form">
			<input
				type="text"
				id="_Input"
				className={resultsOpen ? '_Input_Active _Input' : '_Input'}
				value={searchValue}
				autoComplete={options.autoComplete}
				placeholder={options.placeholder}
				onChange={(e) => updateAutoSearchResults(e.target.value)}
			// onClick={() => resultsList.length > 1 && dispatch({ type: 'TOGGLE_RESULTS', value: true })} 
			/>
			<AutoSearchResults
				state={state}
				dispatch={dispatch}
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
