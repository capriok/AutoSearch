export interface AutoSearchProps {
	list: Array<string>
	options?: AutoSearchOptions
}

export interface AutoSearchOptions {
	placeholder?: string
	autoComplete?: "off" | "on"

	caseSensitive?: boolean
}

export interface AutoSearchResultsProps {
	state: AutoSearchState
	dispatch: React.Dispatch<AutoSearchReducer>
	selectResult: (value: string) => void
}

export type AutoSearchState = {
	searchValue: string
	resultsOpen: boolean
	resultsList: Array<string>
	activeResult: number
}

export type AutoSearchReducer =
	| { type: 'SET_VALUE', value: string }
	| { type: 'SET_RESULTS', value: Array<string> }
	| { type: 'TOGGLE_RESULTS', value: boolean }
	| { type: 'SELECT_RESULT', value: string }
	| { type: 'ACTIVE_RESULT_INC' }
	| { type: 'ACTIVE_RESULT_DEC' }
	| { type: 'RESET_ACTIVE_RESULT' }
	| { type: 'SET_FORM' }

declare const AutoSearch: React.FC<AutoSearchProps>

export default AutoSearch
