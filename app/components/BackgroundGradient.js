import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../constants/theme';

const BackgroundGradient = ({ children, style }) => {
    return (
        <LinearGradient
            style={[{ flex: 1 }, style]}
            colors={[COLORS.gradientStart, COLORS.gradientEnd]}
        >
            {children}
        </LinearGradient>
    );
};

export default BackgroundGradient;
