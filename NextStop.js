import React from 'react'
import { connect } from 'react-redux'
import { Text, View, FlatList } from 'react-native'

import styles from './styles'

const Stop = ({ item }) => (
    <View>
        <Text>{item.name}</Text>

        <Text>{item.time}</Text>
    </View>
)

const NextStop = ({ serviceNumber, destination, upcomingStops }) => {
    return (
        <View>
            <View style={{ ...styles.padded, ...styles.nextStopHeader }}>
                <Text style={styles.textAlternative}>
                    {serviceNumber} to {destination}
                </Text>
            </View>

            <FlatList 
                style={{ ...styles.padded, ...styles.fill }}
                data={upcomingStops}
                renderItem={Stop}
            />
        </View>
    )
}

const mapStateToProps = state => ({
    serviceNumber: state.serviceNumber,
    destination: state.destination,
    upcomingStops: state.upcomingStops,
})

export default connect(mapStateToProps)(NextStop)
