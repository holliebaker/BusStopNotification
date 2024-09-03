import React from 'react'
import { Provider, connect } from 'react-redux'
import {  SafeAreaView } from 'react-native'

import styles from './styles'
import store from './store'
import { START, NEXT_STOP } from './views'
import Start from './Start'
import NextStop from './NextStop'

// view map
const viewMap = {
    [START]: Start,
    [NEXT_STOP]: NextStop
}

// main "app" component
const App = connect(state => ({ currentView: state.currentView }))(
    ({ currentView }) => {
        const CurrentView = viewMap[currentView]

        return (
            <CurrentView />
        )
    }
)

// redux store provider
export default () => (
    <SafeAreaView style={styles.container}>
        <Provider store={store} >
            <App />
        </Provider>
    </SafeAreaView>
)
