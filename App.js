import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'

import { START, viewMap } from './views'

export default App = () => {
    const [currentView, setCurrentView] = useState(START)
    const CurrentView = viewMap[currentView]

    return (
        <View style={styles.container}>
            <CurrentView />

            <StatusBar style="auto" />
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
