import React from 'react'
import { Provider, connect } from 'react-redux'
import { SafeAreaView, View, Text, Button } from 'react-native'

import styles, { colours } from './styles'
import store from './store'
import { reset } from './actions'
import { START, NEXT_STOP } from './views'
import Start from './Start'
import NextStop from './NextStop'
import ButtonTransparent from './ButtonTransparent'

// view map
const viewMap = {
    [START]: Start,
    [NEXT_STOP]: NextStop
}

// header component
const Header = connect(state => ({ showBack: state.currentView != START }), { goBack: () => reset() })(
    ({ showBack, goBack }) => (
        <View style={{ ...styles.padded, ...styles.flexRow }}>
            {showBack && <ButtonTransparent
                title='←'
                accessibilityLabel='Back'
                onPress={_ => goBack()}
            />}

            <Text style={{ ...styles.center, ...styles.textPrimary, fontSize: 16 }}>BusStopNotification</Text>
        </View>
    )
)

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
            <Header />

            <App />
        </Provider>
    </SafeAreaView>
)
