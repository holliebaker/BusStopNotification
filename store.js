import { createStore } from 'redux'

import * as actions from './actions'
import { START } from './views'
import { NO_ERROR } from './network-errors'

// initial state
const initialState = {
    currentView: START,
    tripId: 100,
    isLoading: false,
    error: NO_ERROR
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

        default:
            return state
    }
}

// create and export the storeapp.js
export default createStore(reducer);