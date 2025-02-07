import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from '../../constants/theme';

const styles = StyleSheet.create({
    menuButton: {
        backgroundColor: '#F5F5F5',
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
    },
    menuButtonText: {
        ...FONTS.font,
        color: '#444444',
        fontSize: 16,
    },
});

export default styles;
