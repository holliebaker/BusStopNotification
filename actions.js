import * as errors from './network-errors'

// actions
export const SET_CURRENT_VIEW = 'SET_CURRENT_VIEW'
export const SET_TRIP_ID = 'SET_TRIP_ID'
export const SET_LOADING = 'SET_LOADING';
export const SET_ERROR = 'SET_ERROR'
export const SET_TRIP_DATA = 'SET_TRIP_DATA'

// action creators
export const setCurrentView = view => ({ type: SET_CURRENT_VIEW, payload: view })
export const setTripId = tripId => ({ type: SET_TRIP_ID, payload: tripId })
export const setLoading = isLoading => ({ type: SET_LOADING, payload: isLoading })
export const setInputError = () => ({ type: SET_ERROR, payload: errors.INPUT_ERROR })
export const setNetworkError = () => ({ type: SET_ERROR, payload: errors.NETWORK_ERROR })
export const clearError = () => ({ type: SET_ERROR, payload: errors.NO_ERROR })
export const setTripData = data => ({ type: SET_TRIP_DATA, payload: data })
