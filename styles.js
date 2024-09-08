import { StyleSheet, StatusBar } from 'react-native'

export const colours = {
    background: 'whitesmoke',
    backgroundAlt: 'lightgrey',
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
        justifyContent: 'flex-start',
    },
    padded: {
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        paddingRight: 10,
    },
    margins: {
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 10,
        marginRight: 10,
    },

    center: { marginLeft: 'auto', marginRight: 'auto' },
    fill: { flexGrow: 1 },
    nextStopHeader: {
        backgroundColor: colours.primary,
        alignItems: 'center',
    },
    flexRow: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'start',
    },
    textPrimary: { color: colours.primary },
    textAlternative: { color: colours.textAlternative },
    textSecondary: { color: colours.textSecondary },
})