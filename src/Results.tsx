import React, { useEffect, useRef } from 'react'
import { useOutsideClick } from './Utils/utils'
import { AutoSearchResultsProps } from './index'

import './index.scss'

export function AutoSearchResults(
	{ state, dispatch, selectResult }: AutoSearchResultsProps
) {

	const { searchValue, resultsOpen, resultsList, activeResult } = state

	const resultsRef: any = useRef()
	useOutsideClick(resultsRef, () => {
		const DOMinput = document.getElementById('_Input')

		if (document.activeElement === DOMinput) return
		if (resultsOpen) {
			dispatch({ type: 'TOGGLE_RESULTS', value: false })
			document.removeEventListener('keydown', () => dispatch({ type: 'RESET_ACTIVE_RESULT' }))
		}
	})

	function handleGlobalKeydown(e: KeyboardEvent): void {
		switch (e.code) {
			case 'ArrowUp': return DecrementActiveResult(e)
			case 'ArrowDown': return IncrementActiveResult(e)
			case 'Enter': return SelectActiveResult()
			case 'Escape': return DisengageResults()
		}
	}

	function DecrementActiveResult(e: KeyboardEvent) {
		e.preventDefault()
		dispatch({ type: 'ACTIVE_RESULT_DEC' })
	}

	function IncrementActiveResult(e: KeyboardEvent) {
		e.preventDefault()
		document.getElementById('_Input')?.blur()
		dispatch({ type: 'ACTIVE_RESULT_INC' })
	}

	function SelectActiveResult() {
		selectResult(document.getElementById('_Result_Active')?.textContent || '')
	}

	function DisengageResults() {
		dispatch({ type: 'TOGGLE_RESULTS', value: false })
	}

	useEffect(() => {
		document.addEventListener('keydown', handleGlobalKeydown)
	}, [])

	useEffect(() => {
		document.addEventListener('keydown', (e: KeyboardEvent): void => {
			if (e.code === 'Enter') {
				if (searchValue && resultsOpen) {
					return selectResult(searchValue)
				}
			}
		}, { once: true })
	}, [state.searchValue])

	useEffect(() => {
		if (document.activeElement !== document.getElementById('_Input') && activeResult < 0) {
			document.getElementById('_Input')?.focus()
		}
	}, [activeResult])

	function renderId(i: number) {
		return i === activeResult ? '_Result_Active' : ''
	}

	function renderClass(i: number) {
		return i === activeResult ? '_Result_Active _Result' : '_Result'
	}

	if (!resultsOpen || !resultsList.length)
		return <></>
	else
		return (
			<div ref={resultsRef} className="_Results">
				{resultsList.slice(0, 10).map((res, i) => (
					<div
						key={i}
						id={renderId(i)}
						className={renderClass(i)}
						onClick={() => selectResult(resultsList[i])}
					>
						{res}
					</div>
				))}
			</div>
		)
}