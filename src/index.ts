export type AutoSearchPropList = Array<{ [item: string]: string } | string>
export type AutoSearchList = Array<{ item: string }>

type onSelectCallbackState = {
	value: string
}
type onChangeCallbackState = {
	value: string
	results: AutoSearchList
}
type onNavigateCallbackState = {
	results: AutoSearchList
	active: number
}

export type AutoSearchOptions = {
	listProp?: string
	primaryColor?: string
	placeholder?: string
	autoFocus?: boolean
	caseSensitive?: boolean
	maxResults?: number
	showIcon?: boolean
}

export interface AutoSearchProps {
	list: AutoSearchPropList
	options?: AutoSearchOptions

	onSelect: (searchValue: onSelectCallbackState) => void
	onChange: (currentState: onChangeCallbackState) => void
	onNavigate: (currentState: onNavigateCallbackState) => void
}

interface AutoSearchCommonProps {
	state: AutoSearchState
	dispatch: React.Dispatch<AutoSearchReducer>
	options: AutoSearchOptions
}

export interface AutoSearchFormProps extends AutoSearchCommonProps {
	onChange: (currentState: onChangeCallbackState) => void
}

export interface AutoSearchResultsProps extends AutoSearchCommonProps {
	onSelect: (searchValue: onSelectCallbackState) => void
	onNavigate: (currentState: onNavigateCallbackState) => void
}

export type AutoSearchState = {
	searchList: AutoSearchList
	searchValue: string
	tempValue: string
	resultsOpen: boolean
	resultsList: AutoSearchList
	activeResult: number
}

export type AutoSearchReducer =
	| { type: 'NewList', value: AutoSearchList }
	| { type: 'NewValue', value: string }
	| { type: 'TempValue', value: string }
	| { type: 'NewResults', value: AutoSearchList }
	| { type: 'ToggleResults', value: boolean }
	| { type: 'SelectResult', value: string }
	| { type: 'IncrementActive' }
	| { type: 'DecrementActive' }
	| { type: 'ResetActive' }
	| { type: 'ResetAutoSearch' }

declare const AutoSearch: React.FC<AutoSearchProps>
export default AutoSearch
