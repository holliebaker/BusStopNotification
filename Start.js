import React, { useState } from 'react'
import { Button, Text, TextInput, View, ToastAndroid } from 'react-native'

import getTrip from './api/trip'

const onSubmit = (tripId, setMessage) => () => {
    if (isNaN(tripId)) {
        setMessage('Invalid trip id, please enter a number.')
    }

    setMessage(`Loading... (tripId = ${tripId}`)

    getTrip(tripId).then(({ lineName }) => 
        setMessage(`Retrieved line ${lineName}.`)
    )
}

export default Start = ({ changeViewCallback }) => {
    const [tripId, setTripId] = useState('')
    const [message, setMessage] = useState('')

    return (
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
                onPress={onSubmit(tripId, setMessage)}
            />

            <Text>
                {message}
            </Text>
        </View>
    )
}

