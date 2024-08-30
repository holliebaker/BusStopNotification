import React, { useState } from 'react'
import { Button, Text, TextInput, View, ToastAndroid } from 'react-native'
import axios from 'axios'

const BUSTIMES_URL = 'https://bustimes.org'
const TRIPS_ROUTE = 'api/trips'

const onSubmit = (tripId, setJsonText) => () => {
    if (isNaN(tripId)) {
        ToastAndroid.show('Invalid trip id, please enter a number.', ToastAndroid.SHORT)
    }

    ToastAndroid.show('Proceed with ' + tripId, ToastAndroid.SHORT)
    axios.get(`${BUSTIMES_URL}/${TRIPS_ROUTE}/${tripId}?format=json`).then(({ data }) => {
        console.log(data)
        ToastAndroid.show('It is a service ' + data.service.line_name, ToastAndroid.SHORT)
        setJsonText(data)
    }).catch(e => {
        console.log(e)
        ToastAndroid.show('Error. ' + e, ToastAndroid.SHORT)
        setJsonText(e)
    })
}

export default Start = ({ changeViewCallback }) => {
    const [tripId, setTripId] = useState('')
    const [jsonText, setJsonText] = useState('')

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
                onPress={onSubmit(tripId, setJsonText)}
            />

            <Text>
                text={JSON.stringify(jsonText)}
            </Text>
        </View>
    )
}

