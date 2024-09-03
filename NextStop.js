import React from 'react'
import { connect } from 'react-redux'
import { Text, View, FlatList } from 'react-native'

const Stop = ({ data }) => (
    <View>
        <Text>{data.name}</Text>

        <Text>{data.time}</Text>
    </View>
)

const NextStop = ({ serviceNumber, destination, upcomingStops }) => {
    return (
        <View>
            <Text>{serviceNumber} to {destination}</Text>

            <FlatList 
                data={upcomingStops}
                renderItem={({ item }) => (<Stop data={item} />)}
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
