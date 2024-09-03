import React from 'react'
import { Provider, connect } from 'react-redux'
import { StyleSheet, SafeAreaView, StatusBar } from 'react-native'

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
    marginTop: StatusBar.currentHeight || 0,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

// main "app" component
const App = connect(state => ({ currentView: state.currentView }))(
    ({ currentView }) => {
        console.log(currentView)
        const CurrentView = viewMap[currentView]

        return (
            <SafeAreaView style={styles.container}>
                <CurrentView />
            </SafeAreaView>
        )
    }
)

// redux store provider
export default () => (
    <Provider store={store} >
        <App />
    </Provider>
)
