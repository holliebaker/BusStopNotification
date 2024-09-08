import { useEffect } from "react"
import { FlatList, Button, Text, TextInput, View, TouchableHighlight } from 'react-native'
import { connect } from 'react-redux'

import styles, { colours } from './styles'
import getTrip from './api/trip'
import tripByService from './api/trip-by-service'
import { NEXT_STOP } from './views'
import * as errors from './network-errors'
import { setCurrentView, setInputError, setNetworkError, clearError, setLoading, setTripId, setTripData, addFavourite, clearFavourites, clearFavouriteTrips, addFavouriteTrips } from './actions'
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

const Favourite = handlePress => ({ item }) => (
    <TouchableHighlight
        onPress={_ => handlePress(item.tripId)}
    >
        <View style={styles.padded}>
            <View style={{ ...styles.flexRow, justifyContent: 'flex-start' }}>
                <Text style={{ fontWeight: 'bold' }}>
                    {item.serviceNumber}
                </Text>

                <Text>
                    to {item.destination}
                </Text>
            </View>

            <Text style={styles.textSecondary}>
                {item.date}
            </Text>
        </View>
    </TouchableHighlight>
)

const handleClearFavourites = clearFavourites => {
    clearStoredFavourites().then(_ => clearFavourites())
}

const loadTrips = addFavouriteTrips => fave =>
    tripByService(fave.id).then(trips => {
        addFavouriteTrips(trips.map(t => ({ ...fave, ...t })))
    }).catch(e => {
        console.log(e)
    })

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
    clearFavouriteTrips,
    addFavouriteTrips
 }) => {
    const curriedSubmit = onSubmit(clearError, setLoading, setInputError, setNetworkError, setTripData, setCurrentView)

    useEffect(() => {
        const fetch = async () => await readFavourites().then(
                favs => favs.map(f => {
                    addFavourite(f)
                    loadTrips(addFavouriteTrips)(f)
                })
            ).catch(e => console.log(e))
        
        clearFavouriteTrips()
        fetch()
    }, [])

    return (
        <View style={styles.padded} >
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
                color={colours.primary}
                disabled={isLoading}
                onPress={_ => curriedSubmit(tripId)}
            />

            <Text>
                {message}
            </Text>

            <View style={styles.flexRow}>
                <Text style={{ fontSie: 15, color: colours.primary, fontWeight: 'bold' }}>Faves</Text>

                <ButtonTransparent
                    title='Clear'
                    onPress={_ => handleClearFavourites(clearFavourites)}
                />
            </View>

            <FlatList
                data={faves}
                keyExtractor={({ tripId }) => tripId}
                renderItem={Favourite(curriedSubmit)}
                ListEmptyComponent={ListEmpty({ text: 'No favourites yet.' })}
            />
        </View>
    )
 }

const mapStateToProps = state => ({
    tripId: state.tripId,
    isLoading: state.loading,
    message: generateMessage(state.loading, state.error),
    faves: state.favTrips,
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
    clearFavouriteTrips,
    addFavouriteTrips,
}

export default connect(mapStateToProps, mapDispatchToProps)(Start)
