import { useEffect } from "react"
import { FlatList, Button, Text, TextInput, View, TouchableHighlight } from 'react-native'
import { connect } from 'react-redux'

import styles, { colours } from './styles'
import getTrip from './api/trip'
import tripByService from './api/trip-by-service'
import { NEXT_STOP, RUNNING_TRIPS } from './views'
import * as errors from './network-errors'
import { setCurrentView, setInputError, setNetworkError, clearError, setLoading, setTripId, setTripData, addFavourite, clearFavourites, setFavouriteTrips } from './actions'
import ListEmpty from './ListEmpty'
import { clearStoredFavourites, readFavourites } from './persist'

const onSubmit = (
    clearError, setLoading, setInputError, setNetworkError, setTripData, setCurrentView
) => tripIdText => {
    const tripId = +tripIdText

    if (isNaN(tripId)) {
        setInputError()

        return
    }

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

const handleClearFavourites = clearFavourites => {
    clearStoredFavourites().then(_ => clearFavourites())
}

const loadTrips = (setLoading, setNetworkError, clearError, setCurrentView, setFavouriteTrips, setTripData) => fave => {
    setLoading(true)

    tripByService(fave.id).then(trips => {

        clearError()

        setFavouriteTrips(trips)
        setTripData({
            serviceId: fave.id,
            serviceNumber: fave.serviceNumber,
            destination: { to: fave.destination } ,
        })
        setCurrentView(RUNNING_TRIPS)
    }).catch(e => {
        console.log(e)

        setNetworkError()
    })
}

const Favourite = handlePress => ({ item }) => (
    <TouchableHighlight
        onPress={_ => handlePress(item)}
    >
        <View style={{ ...styles.padded, ...styles.flexRow, justifyContent: 'flex-start' }}>
            <Text style={{ fontWeight: 'bold' }}>
                {item.serviceNumber}
            </Text>

            <Text style={{ marginLeft: 10 }}>
                to {item.destination}
            </Text>
        </View>
    </TouchableHighlight>
)

const Start = ({ 
    tripId,
    isLoading,
    message,
    faves,
    setTripId,
    setTripData,
    clearError,
    setLoading,
    setInputError,
    setNetworkError,
    addFavourite,
    clearFavourites,
    setCurrentView,
    setFavouriteTrips
 }) => {
    const curriedSubmit = onSubmit(clearError, setLoading, setInputError, setNetworkError, setTripData, setCurrentView)
    const curriedLoadTrips = loadTrips(setLoading, setNetworkError, clearError, setCurrentView, setFavouriteTrips, setTripData)

    useEffect(() => {
        const loadFaves = async () => await readFavourites().then(
                favs => favs.map(f => {
                    addFavourite(f)
                })
            ).catch(e => console.log(e))
        
            if (!faves.length) loadFaves()
    }, [])

    return (
        <View style={styles.padded} >
            <Text>Please enter trip id:</Text>

            <TextInput
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
                color={colours.primary}
                disabled={isLoading}
                onPress={_ => curriedSubmit(tripId)}
            />

            <Text>
                {message}
            </Text>

            <View style={styles.flexRow}>
                <Text style={{ ...styles.heading }}>Faves</Text>

                <ButtonTransparent
                    title='Clear'
                    onPress={_ => handleClearFavourites(clearFavourites)}
                />
            </View>

            <FlatList
                data={faves}
                keyExtractor={({ id }) => id}
                renderItem={Favourite(curriedLoadTrips)}
                ListEmptyComponent={ListEmpty({ text: 'No favourites yet.' })}
            />
        </View>
    )
 }

const mapStateToProps = state => ({
    tripId: state.tripId,
    isLoading: state.loading,
    message: generateMessage(state.loading, state.error),
    faves: state.favServices,
})

const mapDispatchToProps = {
    setTripId,
    setTripData,
    clearError,
    setLoading,
    setInputError,
    setNetworkError,
    addFavourite,
    clearFavourites,
    setCurrentView,
    setFavouriteTrips,
}

export default connect(mapStateToProps, mapDispatchToProps)(Start)
