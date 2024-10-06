import React from 'react'
import { View, Text, FlatList, TouchableHighlight } from 'react-native'
import { connect } from 'react-redux'

import { NEXT_STOP } from './views'
import styles from './styles'
import ListEmpty from './ListEmpty'
import { setLoading, clearError, setTripData, setCurrentView, setNetworkError } from './actions'
import getTrip from './api/trip'

const loadTrip = (setLoading, clearError, setTripData, setCurrentView, setNetworkError) => tripId => {
    setLoading(true)
    
    getTrip(tripId).then(data => {
        clearError()
        
        setTripData(data)
        setCurrentView(NEXT_STOP)
    }).catch(e => {
        console.log(e)
        
        setNetworkError()
    })
}

const Favourite = handlePress => ({ item }) => (
    <TouchableHighlight
        onPress={_ => handlePress(item.tripId)}
    >
        <View style={{ ...styles.padded, ...styles.flexRow, justifyContent: 'flex-start' }}>
            <Text style={{ fontWeight: 'bold' }}>
                {item.date.toLocaleTimeString()}
            </Text>

            <Text style={{ marginLeft: 10 }}>
                ({item.tripId})
            </Text>
        </View>
    </TouchableHighlight>
)

const RunningTrips = ({ 
    serviceNumber,
    destination,
    faves,
    setLoading,
    clearError,
    setTripData,
    setCurrentView,
    setNetworkError
}) => (
    <View>
        <Text style={{ ...styles.heading, ...styles.center }}>
            {serviceNumber} to {destination}
        </Text>

        <FlatList
            data={faves}
            keyExtractor={({ tripId }) => tripId}
            renderItem={Favourite(loadTrip(setLoading, clearError, setTripData, setCurrentView, setNetworkError))}
            ListEmptyComponent={ListEmpty({ text: 'No running services found.' })}
        />
    </View>
)

const mapStateToProps = state => ({
    serviceNumber: state.serviceNumber,
    destination: state.destination.to,
    faves: state.favTrips,
})

const mapDispatchToProps = {
    setLoading,
    clearError,
    setTripData,
    setCurrentView,
    setNetworkError
}

export default connect(mapStateToProps, mapDispatchToProps)(RunningTrips)
