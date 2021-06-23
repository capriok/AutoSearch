import React, { useEffect } from 'react'
import { ConditionalCN, PropKeyResultsList } from './Utils/utils'
import { AutoSearchFormProps, AutoSearchList } from './index'

import './index.scss'

export function AutoSearchForm({ children, state, dispatch, options, onChange }: AutoSearchFormProps) {

	const { searchList, searchValue, tempValue, resultsOpen, resultsList } = state

	function HandleClick() {
		resultsList.length && dispatch({ type: 'ToggleResults', value: true })
	}

	function HandleChange(e: React.ChangeEvent<HTMLInputElement>) {
		dispatch({ type: 'NewValue', value: e.target.value })
		onChange({ results: PropKeyResultsList(resultsList, options.propKey!), value: e.target.value })
	}

	useEffect(() => {
		let search = CaseSensitive(state.searchValue)
		if (!search.length) return dispatch({ type: 'ResetAutoSearch' })

		const matchList = AutoSearchAlgorithm(search)
		const resultList = FinalizeResults(matchList)

		dispatch({ type: 'NewResults', value: resultList })
	}, [state.searchValue])

	function AutoSearchAlgorithm(search: string) {
		if (options.wholeWord!) {
			return FindWholeWordMatch(search)
		} else {
			return FindSlicedWordMatch(search)
		}
	}

	function FindSlicedWordMatch(search: string) {
		console.log('Finding Slice');

		return searchList.map((x) => (
			CaseSensitive(x.item)
				.slice(0, search.length)
				.includes(search)
				? { item: x.item }
				: { item: '' }
		)).filter(x => x.item!)
	}

	function FindWholeWordMatch(search: string) {
		console.log('Finding Whole');

		return searchList.map((x) => {
			const searchWords = search.split(' ')
			const listWords = CaseSensitive(x.item).split(' ')
			let match = { item: '' }
			for (let i = 0; i < searchWords.length - 1; i++) {
				const sWord = searchWords[i]
				const lWord = listWords[i].slice(0, sWord.length)

				console.log(sWord);
				console.log(lWord);

				match = { item: lWord.includes(sWord) ? x.item : '' }
			}

			return match

		}).filter(x => x.item!)
	}

	function FinalizeResults(matchList: AutoSearchList) {
		let finalizedList = matchList
		finalizedList = MaxResults(finalizedList)

		return finalizedList
	}

	function RenderClass(cn: string) {
		cn += ConditionalCN(options.showIcon!, '_Show_Icon')
		cn += ConditionalCN(resultsOpen, '_Input_Active')
		return cn
	}

	function RenderValue() {
		return tempValue ? tempValue : searchValue
	}

	function CaseSensitive(str: string) {
		return !options.caseSensitive ? str.toLowerCase() : str
	}

	function MaxResults(list: AutoSearchList) {
		return list.slice(0, options.maxResults!)
	}

	return (
		<div className="_Input_Wrap">
			<input
				type="text"
				className={RenderClass('_Input')}
				value={RenderValue()}
				autoComplete={'off'}
				autoFocus={options.autoFocus!}
				placeholder={options.placeholder!}
				onChange={HandleChange}
				onClick={HandleClick}
			/>
			<Icon show={options.showIcon!} />
			{children}
		</div>
	)
}

const Icon = ({ show }: { show: boolean }) => {
	if (!show) return <></>
	return (
		<svg className="_Input_Icon" viewBox="0 0 25 25">
			<path d="M 10 0.1875 C 4.578125 0.1875 0.1875 4.578125 0.1875 10 C 0.1875 15.421875 4.578125 19.8125 
		10 19.8125 C 12.289063 19.8125 14.394531 19.003906 16.0625 17.6875 L 16.9375 18.5625 C 16.570313 
		19.253906 16.699219 20.136719 17.28125 20.71875 L 21.875 25.34375 C 22.589844 26.058594 23.753906 
		26.058594 24.46875 25.34375 L 25.34375 24.46875 C 26.058594 23.753906 26.058594 22.589844 25.34375 
		21.875 L 20.71875 17.28125 C 20.132813 16.695313 19.253906 16.59375 18.5625 16.96875 L 17.6875 
		16.09375 C 19.011719 14.421875 19.8125 12.300781 19.8125 10 C 19.8125 4.578125 15.421875 0.1875 
		10 0.1875 Z M 10 2 C 14.417969 2 18 5.582031 18 10 C 18 14.417969 14.417969 18 10 18 C 5.582031 
		18 2 14.417969 2 10 C 2 5.582031 5.582031 2 10 2 Z M 4.9375 7.46875 C 4.421875 8.304688 4.125 
		9.289063 4.125 10.34375 C 4.125 13.371094 6.566406 15.8125 9.59375 15.8125 C 10.761719 15.8125 
		11.859375 15.433594 12.75 14.8125 C 12.511719 14.839844 12.246094 14.84375 12 14.84375 C 8.085938 
		14.84375 4.9375 11.695313 4.9375 7.78125 C 4.9375 7.675781 4.933594 7.574219 4.9375 7.46875 Z" />
		</svg>
	)
}