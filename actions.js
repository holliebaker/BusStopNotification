import * as errors from './network-errors'

// actions
export const RESET = 'RESET'
export const SET_CURRENT_VIEW = 'SET_CURRENT_VIEW'
export const SET_TRIP_ID = 'SET_TRIP_ID'
export const SET_LOADING = 'SET_LOADING';
export const SET_ERROR = 'SET_ERROR'
export const SET_TRIP_DATA = 'SET_TRIP_DATA'
export const SET_VEHICLE_PROGRESS = 'SET_VEHICLE_PROGRESS'
export const ADD_FAVOURITE = 'ADD_FAVOURITE'
export const REMOVE_FAVOURITE = 'REMOVE_FAVOURITE'
export const CLEAR_FAVOURITES = 'CLEAR_FAVOURITES'
export const SET_FAV_TRIPS = 'SET_FAV_TRIPS'

// action creators
export const reset = () => ({ type: RESET })
export const setCurrentView = view => ({ type: SET_CURRENT_VIEW, payload: view })
export const setTripId = tripId => ({ type: SET_TRIP_ID, payload: tripId })
export const setLoading = isLoading => ({ type: SET_LOADING, payload: isLoading })
export const setInputError = () => ({ type: SET_ERROR, payload: errors.INPUT_ERROR })
export const setNetworkError = () => ({ type: SET_ERROR, payload: errors.NETWORK_ERROR })
export const clearError = () => ({ type: SET_ERROR, payload: errors.NO_ERROR })
export const setTripData = data => ({ type: SET_TRIP_DATA, payload: data })
export const setVehicleProgress = progress => ({ type: SET_VEHICLE_PROGRESS, payload: progress })
export const addFavourite = service => ({ type: ADD_FAVOURITE, payload: service })
export const removeFavourite = id => ({ type: REMOVE_FAVOURITE, payload: id })
export const clearFavourites = () => ({ type: CLEAR_FAVOURITES })
export const setFavouriteTrips = trips => ({ type: SET_FAV_TRIPS, payload: trips })
