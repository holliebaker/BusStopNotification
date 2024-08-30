import React, { useState } from 'react'
import { Button, Text, TextInput, View, ToastAndroid } from 'react-native'

const onSubmit = (tripId, setJsonText) => () => {
    if (isNaN(tripId)) {
        ToastAndroid.show('Invalid trip id, please enter a number.', ToastAndroid.SHORT)
    }

    ToastAndroid.show('Proceed with ' + tripId, ToastAndroid.SHORT)
    fetch('https://bustimes.org/api/trips/' + tripId + '/?format=json').then(response =>
        response.json()
    ).then(json => {
        setJsonText(JSON.stringify(json.service))
        ToastAndroid.show('It is a service ' + json.service.line_name, ToastAndroid.SHORT)
    }).catch(e => {
        ToastAndroid.show('Error. ' + e, ToastAndroid.SHORT)
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
                text={jsonText}
            </Text>
        </View>
    )
}

