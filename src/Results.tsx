import React, { useEffect, useRef } from 'react'
import { ConditionalCN, PropKeyResultsList, useOutsideClick } from './Utils/utils'
import { AutoSearchResultsProps } from './index'

import './index.scss'

export function AutoSearchResults({ state, dispatch, options, onSelect, onNavigate }: AutoSearchResultsProps) {

	const { searchValue, resultsOpen, resultsList, activeResult } = state

	const resultsRef: any = useRef()
	useOutsideClick(resultsRef, HandleOutsideClick)

	function SelectResult(val: string) {
		let value = val ? val : searchValue
		if (!value) return

		dispatch({ type: 'SelectResult', value: value })
		onSelect({ value: value })
		RemoveListeners()
	}

	function HandleClick(i: number) {
		SelectResult(ResultAtIndex(i))
	}

	function ToggleResults() {
		dispatch({ type: 'ToggleResults', value: false })
		RemoveListeners()
	}

	function HandleOutsideClick() {
		if (document.activeElement === document.querySelector('_Input')) return
		if (resultsOpen) ToggleResults()
	}

	function RemoveListeners() {
		document.removeEventListener('keydown', () => dispatch({ type: 'ResetActive' }))
	}

	useEffect(() => {
		document.addEventListener('keydown', (e: KeyboardEvent): void => {
			switch (e.code) {
				case 'ArrowUp': return dispatch({ type: 'DecrementActive' })
				case 'ArrowDown': return dispatch({ type: 'IncrementActive' })
				case 'Enter': return SelectResult(document.querySelector('._Result_Active')?.textContent!)
				case 'Escape': return ToggleResults()
			}
		})
		return () => RemoveListeners()
	}, [])

	useEffect(() => {
		if (!resultsList.length) return

		let value = activeResult >= 0 ? ResultAtIndex(activeResult) : searchValue
		dispatch({ type: 'TempValue', value })

		onNavigate({ results: PropKeyResultsList(resultsList, options.propKey!), active: activeResult })
	}, [activeResult])

	function ResultAtIndex(index: number) {
		return resultsList[index].item
	}

	function RenderResultsClass(cn: string) {
		cn += ConditionalCN(options.showIcon, '_Show_Icon')
		return cn
	}

	function RenderResultClass(cn: string, index: number) {
		cn += ConditionalCN(index === activeResult, '_Result_Active')
		return cn
	}

	if (!resultsOpen || !resultsList.length) return <></>

	return (
		<div
			ref={resultsRef}
			className={RenderResultsClass('_Results')}>
			{resultsList.map((result: { item: string }, i: number) => (
				<div
					key={i}
					className={RenderResultClass('_Result', i)}
					onClick={() => HandleClick(i)}>
					{result.item}
				</div>
			))}
		</div>
	)
}
