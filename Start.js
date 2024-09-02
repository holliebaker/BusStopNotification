import { Button, Text, TextInput, View, } from 'react-native'
import { connect } from 'react-redux'

import getTrip from './api/trip'
import { NEXT_STOP } from './views'
import * as errors from './network-errors'
import { setCurrentView, setInputError, setNetworkError, clearError, setLoading, setTripId } from './actions'

const onSubmit = (
    clearError, setLoading, setInputError, setNetworkError, setCurrentView
) => tripIdText => {
    const tripId = +tripIdText
    console.log('submit ', tripId)

    if (isNaN(tripId)) {
        console.log('input error')
        setInputError()

        return
    }

    setLoading(true)
    
    getTrip(tripId).then(results => {
        clearError()
        
        setCurrentView(NEXT_STOP)
    }).catch(e => {
        console.log(e)

        setNetworkError()
    })
}

const generateMessage = (isLoading, error) => {
    switch(error) {
        case errors.NO_ERROR:
            return isLoading ? 'Loading...' : ''

        case errors.INPUT_ERROR:
            return 'Please enter a number.'

        case errors.NETWORK_ERROR:
            return 'Network error'
        
        default:
            return ''
    }
}

const Start = ({ 
    tripId,
    message,
    setTripId,
    clearError,
    setLoading,
    setInputError,
    setNetworkError,
    setCurrentView
 }) => (
    <View>
        <Text>Please enter trip id:</Text>

        <TextInput
            autoFocus
            placeholder='tripId'
            textContentType='telephoneNumber'
            autoCorrect={false}
            autoCapitalize='none'
            enablesReturnKeyAutomatically
            value={tripId}
            onChangeText={setTripId}
        />

        <Button
            title='Go'
            onPress={_ => onSubmit(clearError, setLoading, setInputError, setNetworkError, setCurrentView)(tripId)}
        />

        <Text>
            {message}
        </Text>
    </View>
)

const mapStateToProps = state => ({
    tripId: state.tripId,
    message: generateMessage(state.loading, state.error),
})

const mapDispatchToProps = {
    setTripId,
    clearError,
    setLoading,
    setInputError,
    setNetworkError,
    setCurrentView,
}

export default connect(mapStateToProps, mapDispatchToProps)(Start)
