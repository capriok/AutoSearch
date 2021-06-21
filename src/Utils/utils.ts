import { useEffect } from 'react'
import { AutoSearchList, AutoSearchPropKeyList } from '..'

export function ConvertToAutoSearchList(list: AutoSearchPropKeyList, propKey: string) {
	if (!list.every(x => x[propKey])) {
		ThrowInvalidPropKeyTypeError(propKey)
	}

	let autoSearchList: AutoSearchList = list.map((x) => {
		if (typeof x === 'string') return { item: x }
		else return { item: x[propKey] }
	})

	return autoSearchList
}

export function PropKeyResultsList(list: AutoSearchList, propKey: string) {
	return list.map(x => ({ [propKey]: x.item }))
}

export const useOutsideClick = (ref: any, callback: any) => {
	const handleClick = (e: MouseEvent) => {
		return ref.current && !ref.current.contains(e.target) && callback()
	}
	useEffect(() => {
		document.addEventListener('click', handleClick)
		return () => document.removeEventListener('click', handleClick)
	})
}

export function ConditionalCN(opt: boolean | any, cn: string) {
	return opt ? ' ' + cn : ''
}

function ThrowInvalidPropKeyTypeError(arg: any) {
	throw new TypeError(
		`Property Key '${arg}' not found in list.` +
		`\nYou likely forgot to specify the propKey value in the AutoSearchOptions`
	)
}