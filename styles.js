import { StyleSheet, StatusBar } from 'react-native'

export const colours = {
    background: 'whitesmoke',
    primary: 'midnightblue',
    text: 'black',
    textAlternative: 'white',
    textSecondary: 'lightslategrey',
}

export default StyleSheet.create({
    container: {
        marginTop: StatusBar.currentHeight || 0,
        flex: 1,
        backgroundColor: colours.background,
        alignItems: 'stretch',
        justifyContent: 'center',
    },
    padded: {
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        paddingRight: 10,
    },
    flexStart: { alignItems: 'flexStart' },
    fill: { flexGrow: 1 },
    nextStopHeader: {
        backgroundColor: colours.primary,
        //flexDirection: 'horizontal',

    },
    textAlternative: {
        color: colours.textAlternative,
    },
})