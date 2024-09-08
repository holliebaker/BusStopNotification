import React from 'react'
import { connect } from 'react-redux'
import { Text, View, Button, FlatList } from 'react-native'

import styles, { colours } from './styles'
import { clearError, setLoading, setNetworkError, setVehicleProgress } from './actions'
import getVehicle from './api/vehicle'

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

const getUpcomingStops = (stops, progress) => {
    if (!progress) return stops

    const now = Date.now() // milliseconds since unix epoch
    const today = new Date() // today's date object

    const stopIndex = stops.findIndex(({ atcoCode }) => atcoCode == progress.nextStop)
    return stops.slice(stopIndex).map(stop => {
        const time = stop.time
        const [hh, mm] = time.split(':').map(t => +t)
        today.setHours(hh)
        today.setMinutes(mm)
        const minutes = Math.floor((today.getTime() - now + (progress.delay * 1000)) / 60000)
        console.log(stop.name, minutes)
        return { ...stop, minutes }
    })
}

const getTimingMessage = progress => {
    if (!progress) return 'No tracking available.'

    const minutes = Math.round(progress.delay / 60)
    if (minutes === 0) return 'On time'

    const norm = Math.abs(minutes)
    const qualifier = minutes > 0 ? 'late' : 'early'
    return `${norm} minute${norm > 1 ? 's' : ''} ${qualifier}`
}

const Stop = ({ item, index }) => (
    <View style={{ ...styles.flexRow, ...styles.padded, backgroundColor: index % 2 ? colours.backgroundAlt : colours.background }}>
        <View>
            <Text numberOfLines={2} ellipsizeMode='tail'>
                {item.name}
            </Text>
        </View>

        <View>
            <Text>{item.minutes && (item.minutes < 1 ? 'Due' : (item.minutes + ' min'))}</Text>

            <Text style={item.minutes && styles.textSecondary} >{item.time}</Text>
        </View>
    </View>
)

const ListEmpty = () => (
    <Text style={{ ...styles.center, ...styles.textSecondary }}>No stop data available.</Text>
)

const NextStop = ({
    isLoading,
    vehicleId,
    serviceNumber,
    destination,
    timingMessage,
    stops,
    clearError, 
    setLoading,
    setNetworkError,
    setVehicleProgress
}) => {
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

                    <Button
                        title='⟳'
                        color={colours.textSecondary}
                        disabled={isLoading}
                        onPress={_ => onSubmit(clearError, setLoading, setNetworkError, setVehicleProgress)(vehicleId)}
                    />
                </View>
                
                <Text style={styles.textAlternative}>
                    {timingMessage}
                </Text>
            </View>

            <FlatList 
                data={stops}
                keyExtractor={({ id }) => id}
                renderItem={Stop}
                ListEmptyComponent={ListEmpty}
            />
        </View>
    )
}

const mapStateToProps = state => ({
    isLoading: state.loading,
    vehicleId: state.vehicleId,
    serviceNumber: state.serviceNumber,
    destination: state.destination,
    timingMessage: getTimingMessage(state.vehicleProgress),
    stops: getUpcomingStops(state.stops, state.vehicleProgress),
})

const mapDispatchToProps = {
    clearError, 
    setLoading,
    setNetworkError,
    setVehicleProgress,
}

export default connect(mapStateToProps, mapDispatchToProps)(NextStop)
