import { createStore } from 'redux'

import * as actions from './actions'
import { START } from './views'
import { NO_ERROR } from './network-errors'

// initial state
const initialState = {
    currentView: START,
    tripId: '',
    isLoading: false,
    error: NO_ERROR,
    vehicleId: null,
    vehicleProgress: null,
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
                serviceNumber: action.payload.serviceNumber,
                destination: action.payload.destination,
                stops: action.payload.stops
            }

        case actions.SET_VEHICLE_PROGRESS:
            console.log('setting vehicle progress', action.payload)
            return {
                ...state,
                vehicleProgress: action.payload,
            }

        default:
            return state
    }
}

// create and export the storeapp.js
export default createStore(reducer);