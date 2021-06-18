import React, { useEffect } from 'react'
import { AutoSearchFormProps } from './index'

import './index.scss'

export function AutoSearchForm({ state, dispatch, list, options }: AutoSearchFormProps) {

	const { searchValue, resultsList, resultsOpen } = state

	function handleClick() {
		resultsList.length > 1 && dispatch({ type: 'TOGGLE_RESULTS', value: true })
	}

	function handleChange(value: string) {
		let search = value
		if (!options.caseSensitive) search = search.toLowerCase()

		if (search.length < 1) return dispatch({ type: 'SET_FORM' })
		dispatch({ type: 'SET_VALUE', value: value })

		const matchList = findMatches(search)
		const resultList = finalizeResults(matchList)

		dispatch({ type: 'SET_RESULTS', value: resultList })
	}

	function findMatches(value: string) {
		let matchList: Array<string> = []
		list.some(str => {
			let part = str.slice(0, value.length)
			if (!options.caseSensitive) part = part.toLowerCase()
			if (part.includes(value)) matchList.push(str)
		})
		return matchList
	}

	function finalizeResults(matchList: Array<string>) {
		if (options.sliceResults) return matchList.slice(0, 10)
		return matchList
	}


	useEffect(() => {
		console.log({ ResultsList: resultsList })
	}, [resultsList])

	return (
		<>
			<input
				type="text"
				id="_Input"
				className={resultsOpen ? '_Input _Input_Active' : '_Input'}
				value={searchValue}
				autoComplete={options.autoComplete}
				placeholder={options.placeholder}
				onChange={(e) => handleChange(e.target.value)}
				onClick={handleClick}
			/>
		</>
	)
}