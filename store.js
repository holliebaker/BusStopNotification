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
    ServiceWorkerContainer: null,
    destination: null,
    upcomingStops: [],
}

// reducer
const reducer = (state = initialState, action) => {
    switch (action.type) {
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
                serviceNumber: action.payload.serviceNumber,
                destination: action.payload.destination,
                upcomingStops: action.payload.upcomingStops
            }

        default:
            return state
    }
}

// create and export the storeapp.js
export default createStore(reducer);