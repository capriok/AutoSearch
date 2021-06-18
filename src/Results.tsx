import React, { useEffect, useRef } from 'react'
import { AutoSearchResultsProps } from './index'

import './index.scss'

export function AutoSearchResults({ state, dispatch, selectResult }: AutoSearchResultsProps) {

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
			case 'ArrowUp': DecrementActiveResult(e)
			case 'ArrowDown': IncrementActiveResult(e)
			case 'Enter': SelectActiveResult()
			case 'Escape': DisengageResults()
		}
	}

	function DecrementActiveResult(e: KeyboardEvent) {
		e.preventDefault()
		return dispatch({ type: 'ACTIVE_RESULT_DEC' })
	}

	function IncrementActiveResult(e: KeyboardEvent) {
		e.preventDefault()
		document.getElementById('_Input')?.blur()
		return dispatch({ type: 'ACTIVE_RESULT_INC' })
	}

	function SelectActiveResult() {
		return selectResult(document.getElementById('_Result_Active')?.textContent || '')
	}

	function DisengageResults() {
		return dispatch({ type: 'TOGGLE_RESULTS', value: false })
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

	function SetId(i: number) {
		return i === activeResult ? '_Result_Active' : ''
	}

	function SetClass(i: number) {
		return i === activeResult ? '_Result_Active _Result' : '_Result'
	}

	return (
		<>
			{resultsOpen && resultsList.length > 0 &&
				<div ref={resultsRef} className="_Results">
					{resultsList.slice(0, 10).map((res, i) => (
						<div
							key={i}
							id={SetId(i)}
							className={SetClass(i)}
							onClick={() => selectResult(resultsList[i])}
						>
							{res}
						</div>
					))}
				</div>
			}
		</>
	)
}

const useOutsideClick = (ref: any, callback: any) => {
	function handleClick(e: MouseEvent) {
		if (ref.current && !ref.current.contains(e.target)) callback()
	}
	useEffect(() => {
		document.addEventListener('click', handleClick)
		return () => {
			document.removeEventListener('click', handleClick)
		}
	})
}