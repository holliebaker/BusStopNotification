import React, { useState } from 'react'
import { Button, Text, TextInput, View, ToastAndroid } from 'react-native'

import getTrip from './api/trip'
import { NEXT_STOP } from './views'

const onSubmit = (tripId, setMessage, changeViewCallback) => () => {
    if (isNaN(tripId)) {
        setMessage('Invalid trip id, please enter a number.')
    }

    setMessage('Loading...')

    getTrip(tripId).then((info) => 
        changeViewCallback(NEXT_STOP, info)
    ).catch(e => {
        console,log(e)

        setMessage('Unexpected error occurreed.')
    })
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
                onPress={onSubmit(tripId, setMessage, changeViewCallback)}
            />

            <Text>
                {message}
            </Text>
        </View>
    )
}

