import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Text, View, Button, FlatList } from 'react-native'

import styles, { colours } from './styles'
import { clearError, setLoading, setNetworkError, setVehicleProgress, addFavourite, removeFavourite } from './actions'
import getVehicle from './api/vehicle'
import ButtonTransparent from './ButtonTransparent'
import ListEmpty from './ListEmpty'
import { storeFavourite, removeStoredFavourite } from './persist'

const REFRESH_INTERVAL = 30000

const onSubmit = (
    clearError, setLoading, setNetworkError, setVehicleProgress
) => vehicleId => {
    setLoading(true)

    getVehicle(vehicleId).then(progress => {
        clearError()

        setVehicleProgress(progress)
    }).catch(e => {
        console.log(e)
        
        setNetworkError()
    })
}

const pluralise = (num, singular, plural) =>
    `${num} ${Math.abs(num) == 1 ? singular : plural}`

const getUpcomingStops = (stops, progress) => {
    // no tracking or too early to track
    if (!progress || progress.delay < -600) return stops

    const now = Date.now() // milliseconds since unix epoch
    const today = new Date() // today's date object
    let calculateTimings = true // whether to calculate timings -- we only do next 10 minutes

    // find the stop
    const stopIndex = stops.findIndex(({ atcoCode }) => atcoCode === progress.nextStop)
    return stops.slice(stopIndex).map(stop => {
        if (!calculateTimings) return stop

        const time = stop.time
        const [hh, mm] = time.split(':').map(t => +t)
        today.setHours(hh)
        today.setMinutes(mm)
        const minutes = Math.floor((today.getTime() - now + (progress.delay * 1000)) / 60000)
        calculateTimings = minutes < 10

        return { ...stop, minutes }
    })
}

const getTimingMessage = progress => {
    if (!progress) return 'No tracking available.'

    const minutes = Math.round(progress.delay / 60)
    if (minutes === 0) return 'On time'

    const norm = Math.abs(minutes)
    const qualifier = minutes > 0 ? 'late' : 'early'
    return `${pluralise(norm, 'minute', 'minutes')} ${qualifier}`
}

const generateAccessibilityLabel = item => {
    const stopDetails = `${item.name}, scheduled at ${item.time}.`

    if (!item.minutes) return stopDetails

    if (item.minutes < 1) return stopDetails + ' Bus is due.'

    return `${stopDetails} Due in ${pluralise(item.minutes, 'minute', 'minutes')}`
}

const toggleFavourite = (addFavourite, removeFavourite) => (isFavourite, serviceId, serviceNumber, destination) => {
    if (isFavourite) {
        removeStoredFavourite(serviceId)
            .then(_ => removeFavourite(serviceId))
            .catch(e => console.log(e))

            return
    }

    const fav = { id: serviceId, serviceNumber, destination }
    storeFavourite(fav)
        .then(_ => addFavourite(fav))
        .catch(e => console.log(e))

}

const Stop = ({ item, index }) => (
    <View
        accessibilityLabel={generateAccessibilityLabel(item)}
        style={{ ...styles.flexRow, ...styles.padded, backgroundColor: index % 2 ? colours.backgroundAlt : colours.background }}
    >
        <View>
            <Text numberOfLines={2} ellipsizeMode='tail'>
                {item.name}
            </Text>
        </View>

        <View>
            {item.minutes !== undefined &&
                <Text>{item.minutes < 1 ? 'Due' : item.minutes + ' min'}</Text>
            }

            <Text style={item.minutes !== undefined && styles.textSecondary}>{item.time}</Text>
        </View>
    </View>
)

const NextStop = ({
    isFavourite,
    serviceId,
    isLoading,
    vehicleId,
    serviceNumber,
    destination,
    timingMessage,
    stops,
    clearError, 
    setLoading,
    setNetworkError,
    setVehicleProgress,
    addFavourite,
    removeFavourite
}) => {
    const curriedSubmit = onSubmit(clearError, setLoading, setNetworkError, setVehicleProgress)
    useEffect(() => {
        setInterval(
            curriedSubmit,
            REFRESH_INTERVAL,
            vehicleId
        )

        curriedSubmit(vehicleId)
    }, [])

    return (
        <View>
            <View style={{ ...styles.padded, ...styles.nextStopHeader }}>
                <View style={styles.flexRow}>
                    <Text style={{ ...styles.textAlternative, fontSize: 25 }}>
                        {serviceNumber}
                    </Text>

                    <View style={styles.fill}>
                        <Text style={styles.textAlternative}>
                            {destination.to}
                        </Text>

                        <Text numberOfLines={1} ellipsizeMode='tail' style={{ ...styles.fill, ...styles.textSecondary }}>
                            {destination.stop} (at {destination.time})
                        </Text>
                    </View>

                    <View>
                        <ButtonTransparent
                            title='⟳'
                            accessibilityLabel='Refresh'
                            color={colours.textAlternative}
                            disabled={isLoading}
                            onPress={_ => curriedSubmit(vehicleId)}
                        />

                        <ButtonTransparent
                            title={isFavourite ? '★' : '☆'}
                            accessibilityLabel={(isFavourite ? 'Add' : 'Remove') + ' favourite'}
                            color={colours.textAlternative}
                            onPress={_ => toggleFavourite(addFavourite, removeFavourite)(isFavourite, serviceId, serviceNumber, destination.to)}
                        />
                    </View>
                </View>
                
                <Text style={styles.textAlternative}>
                    {timingMessage}
                </Text>
            </View>

            <FlatList 
                data={stops}
                keyExtractor={({ id }) => id}
                renderItem={Stop}
                ListEmptyComponent={ListEmpty({ text: 'No stop data available.' })}
            />
        </View>
    )

}

const mapStateToProps = state => ({
    isFavourite: !!state.favServices.find(({ id }) => id === state.serviceId),
    serviceId: state.serviceId,
    isLoading: state.loading,
    vehicleId: state.vehicleId,
    serviceNumber: state.serviceNumber,
    destination: state.destination,
    timingMessage: state.loading ? 'Loading...' : getTimingMessage(state.vehicleProgress),
    stops: getUpcomingStops(state.stops, state.vehicleProgress),
})

const mapDispatchToProps = {
    clearError, 
    setLoading,
    setNetworkError,
    setVehicleProgress,
    addFavourite,
    removeFavourite,
}

export default connect(mapStateToProps, mapDispatchToProps)(NextStop)
