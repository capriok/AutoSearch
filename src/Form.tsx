import React, { useEffect } from 'react'
import { AutoSearchFormProps } from './index'

import './index.scss'

export function AutoSearchForm(
	{ state, dispatch, list, options }: AutoSearchFormProps
) {

	const { searchValue, resultsList, resultsOpen } = state

	function handleClick() {
		resultsList.length > 1 && dispatch({ type: 'TOGGLE_RESULTS', value: true })
	}

	function handleChange({ target }: React.ChangeEvent<HTMLInputElement>) {
		let search = target.value
		if (!options.caseSensitive) search = search.toLowerCase()

		if (search.length < 1) return dispatch({ type: 'SET_FORM' })
		dispatch({ type: 'SET_VALUE', value: target.value })

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


	function renderClass() {
		return resultsOpen ? '_Input _Input_Active' : '_Input'
	}

	return (
		<>
			<input
				type="text"
				id="_Input"
				className={renderClass()}
				value={searchValue}
				autoComplete={options.autoComplete}
				placeholder={options.placeholder}
				onChange={handleChange}
				onClick={handleClick}
			/>
		</>
	)
}