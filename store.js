import { createStore } from 'redux'

import * as actions from './actions'
import { START } from './views'
import { NO_ERROR } from './network-errors'

// initial state
const initialState = {
    currentView: START,
    tripId: '',
    favServices: [],
    favTrips: [],
    isLoading: false,
    error: NO_ERROR,
    vehicleId: null,
    vehicleProgress: null,
    serviceId: null,
    serviceNumber: null,
    destination: null,
    stops: [],
}

// reducer
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.RESET:
            return initialState

            case actions.SET_CURRENT_VIEW:
            return {
                ...state,
                currentView: action.payload
            }

        case actions.SET_TRIP_ID:
            return { 
                ...state, 
                tripId: action.payload
            }

        case actions.SET_LOADING:
            return { 
                ...state, 
                loading: action.payload
            }

        case actions.SET_ERROR:
            return { 
                ...state, 
                loading: false,
                error: action.payload
            }

        case actions.SET_TRIP_DATA:
            return {
                ...state,
                vehicleId: action.payload.vehicleId,
                serviceId: action.payload.serviceId,
                serviceNumber: action.payload.serviceNumber,
                destination: action.payload.destination,
                stops: action.payload.stops
            }

        case actions.SET_VEHICLE_PROGRESS:
            return {
                ...state,
                vehicleProgress: action.payload,
            }

        case actions.ADD_FAVOURITE:
            return {
                ...state,
                favServices: [ ...state.favServices, action.payload ],
            }

        case actions.REMOVE_FAVOURITE:
            return {
                ...state,
                favServices: state.favServices.filter(({ id }) => id === action.paylad)
            }

        case actions.CLEAR_FAVOURITES:
            return {
                ...state,
                favServices: [],
            }

    case actions.CLEAR_FAV_TRIPS:
        return {
            ...state,
            favTrips: []
        }
        
    case actions.SET_FAV_TRIPS:
        return {
            ...state,
            favTrips: action.payload,
        }

        default:
            return state
    }
}

// create and export the storeapp.js
export default createStore(reducer);