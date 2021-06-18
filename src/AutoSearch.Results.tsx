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
			RemoveKeyDownListener()
		}
	})

	function handleGlobalKeydown(e: KeyboardEvent): void {
		switch (e.code) {
			case 'ArrowUp':
				e.preventDefault()
				return dispatch({ type: 'ACTIVE_RESULT_DEC' })
			case 'ArrowDown':
				e.preventDefault()
				document.getElementById('_Input')?.blur()
				return dispatch({ type: 'ACTIVE_RESULT_INC' })
			case 'Enter':
				return selectResult(document.getElementById('_Result_Active')?.textContent || '')
			case 'Escape':
				return dispatch({ type: 'TOGGLE_RESULTS', value: false })
			default:
				break;
		}
	}

	function RemoveKeyDownListener() {
		document.removeEventListener('keydown', () => dispatch({ type: 'RESET_ACTIVE_RESULT' }))
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
		const DOMInput = document.getElementById('_Input')

		if (document.activeElement !== DOMInput && activeResult < 0) {
			DOMInput?.focus()
		}
	}, [activeResult])

	return (
		<>
			{resultsOpen && resultsList.length > 0 &&
				<div ref={resultsRef} className="_Results">
					{resultsList.slice(0, 10).map((res, i) => (
						<div
							key={i}
							id={i === activeResult ? '_Result_Active' : ''}
							className={i === activeResult ? '_Result_Active _Result' : '_Result'}
							onClick={() => selectResult(resultsList[i])}>
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