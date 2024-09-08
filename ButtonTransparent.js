import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

export default ButtonTransparent = ({ title, onPress, color, ...props }) => (
    <TouchableOpacity 
        onPress={onPress}
        {...props}
    >
        <Text style={{ color: color }}>{title}</Text>
    </TouchableOpacity>
)
