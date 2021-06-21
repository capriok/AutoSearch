type StringList = Array<string>

type onSelectCallbackState = {
	value: string
}
type onChangeCallbackState = {
	value: string
	results: StringList
}
type onNavigateCallbackState = {
	results: StringList
	active: number
}

export type AutoSearchOptions = {
	primaryColor?: string
	placeholder?: string
	autoFocus?: boolean
	caseSensitive?: boolean
	maxResults?: number
	showIcon?: boolean
}

export interface AutoSearchProps {
	list: StringList
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
	list: StringList
	onChange: (currentState: onChangeCallbackState) => void
}

export interface AutoSearchResultsProps extends AutoSearchCommonProps {
	onSelect: (searchValue: onSelectCallbackState) => void
	onNavigate: (currentState: onNavigateCallbackState) => void
}

export type AutoSearchState = {
	searchValue: string
	tempValue: string
	resultsOpen: boolean
	resultsList: StringList
	activeResult: number
}

export type AutoSearchReducer =
	| { type: 'NewValue', value: string }
	| { type: 'TempValue', value: string }
	| { type: 'NewResults', value: StringList }
	| { type: 'ToggleResults', value: boolean }
	| { type: 'SelectResult', value: string }
	| { type: 'IncrementActive' }
	| { type: 'DecrementActive' }
	| { type: 'ResetActive' }
	| { type: 'ResetAutoSearch' }

declare const AutoSearch: React.FC<AutoSearchProps>
export default AutoSearch
