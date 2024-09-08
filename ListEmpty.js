import { Text } from 'react-native'

import styles from './styles'

export default ListEmpty = ({ text }) => (
    <Text style={{ ...styles.center, ...styles.textSecondary }}>{text}</Text>
)
