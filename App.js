import React from 'react'
import { Provider, connect } from 'react-redux'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, View } from 'react-native'

import store from './store'
import { START, NEXT_STOP } from './views'
import Start from './Start'
import NextStop from './NextStop'

// view map
const viewMap = {
    [START]: Start,
    [NEXT_STOP]: NextStop
}

// styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

// main "app" component
const App = ({ currentView }) => {
    console.log(currentView)
    const CurrentView = viewMap[currentView]

    return (
        <View style={styles.container}>
            <CurrentView />

            <StatusBar style="auto" />
        </View>
    )
}

const ReduxApp = connect(state => ({ currentView: state.currentView }))(App)

// redux store provider
export default StuffThings = () => (
    <Provider store={store} >
        <ReduxApp />
    </Provider>
)
