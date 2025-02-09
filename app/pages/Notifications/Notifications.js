import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity, ScrollView, Animated } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import useNotices from '../../hooks/useNotices';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../layout/Header';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

// Cores pastéis personalizadas
const PASTEL_COLORS = {
    blue: '#cee7e6',    // Azul pastel
    green: '#eae3ef',   // Verde pastel
    red: '#f2eee9',     // Vermelho pastel
    yellow: '#f3dfde',  // Amarelo pastel
};

const NoticeItem = ({ notice }) => {
    const [expanded, setExpanded] = useState(false);
    const [rotateAnimation] = useState(new Animated.Value(0));

    const handleExpand = () => {
        setExpanded(!expanded);
        Animated.spring(rotateAnimation, {
            toValue: expanded ? 0 : 1,
            useNativeDriver: true,
        }).start();
    };

    const rotate = rotateAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '90deg'],
    });
    
    return (
        <View style={[styles.noticeContainer, { borderLeftColor: PASTEL_COLORS.blue }]}>
            <View style={[styles.iconContainer, { backgroundColor: PASTEL_COLORS.blue }]}>
                <FontAwesome name="bell" size={24} color="#666666" />
            </View>
            <View style={styles.contentContainer}>
                <Text style={styles.noticeTitle} numberOfLines={expanded ? undefined : 1}>{notice.title}</Text>
                <Text style={styles.noticeContent} numberOfLines={expanded ? undefined : 2}>{notice.content}</Text>
                {expanded && (
                    <View style={styles.expandedContent}>
                        <Text style={styles.expandedLabel}>Turno:</Text>
                        <Text style={styles.expandedValue}>{notice.shift}</Text>
                        
                        <Text style={styles.expandedLabel}>Turma:</Text>
                        <Text style={styles.expandedValue}>{notice.class}</Text>
                        
                        <Text style={styles.expandedLabel}>Status:</Text>
                        <Text style={[styles.expandedValue, { color: notice.status === 'active' ? COLORS.success : COLORS.danger }]}>
                            {notice.status === 'active' ? 'Ativo' : 'Inativo'}
                        </Text>
                    </View>
                )}
                <View style={styles.footer}>
                    <Text style={styles.noticeDate}>
                        {new Date(notice.date).toLocaleDateString()}
                    </Text>
                    <Text style={styles.noticeTime}>{notice.time}</Text>
                </View>
            </View>
            <TouchableOpacity onPress={handleExpand} style={styles.arrowButton}>
                <Animated.View style={{ transform: [{ rotate }] }}>
                    <FontAwesome name="angle-right" size={24} color="#666666" />
                </Animated.View>
            </TouchableOpacity>
        </View>
    );
};

const Notifications = () => {
    const { colors } = useTheme();
    const { notices, loading, error } = useNotices();
    const navigation = useNavigation();

    if (loading) {
        return (
            <SafeAreaView style={[GlobalStyleSheet.container, {padding:0, flex:1, backgroundColor: '#FFFFFF'}]}>
                <Header 
                    titleLeft
                    title={'Avisos'} 
                    leftIcon="back"
                    onPressLeft={() => navigation.goBack()}
                />
                <View style={styles.centerContent}>
                    <ActivityIndicator size="large" color={COLORS.primary} />
                </View>
            </SafeAreaView>
        );
    }

    if (error) {
        return (
            <SafeAreaView style={[GlobalStyleSheet.container, {padding:0, flex:1, backgroundColor: '#FFFFFF'}]}>
                <Header 
                    titleLeft
                    title={'Avisos'} 
                    leftIcon="back"
                    onPressLeft={() => navigation.goBack()}
                />
                <View style={styles.centerContent}>
                    <Text style={styles.errorText}>Erro ao carregar avisos</Text>
                </View>
            </SafeAreaView>
        );
    }

    if (!notices || notices.length === 0) {
        return (
            <SafeAreaView style={[GlobalStyleSheet.container, {padding:0, flex:1, backgroundColor: '#FFFFFF'}]}>
                <Header 
                    titleLeft
                    title={'Avisos'} 
                    leftIcon="back"
                    onPressLeft={() => navigation.goBack()}
                />
                <View style={styles.centerContent}>
                    <Text style={styles.emptyText}>Nenhum aviso disponível</Text>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={[GlobalStyleSheet.container, {padding:0, flex:1, backgroundColor: '#FFFFFF'}]}>
            <Header 
                titleLeft
                title={'Avisos'} 
                leftIcon="back"
                onPressLeft={() => navigation.goBack()}
            />
            <ScrollView 
                style={{backgroundColor: '#FFFFFF'}} 
                contentContainerStyle={{paddingBottom: 100}}
            >
                <View style={{flex:1, backgroundColor: '#FFFFFF'}}>
                    <View style={GlobalStyleSheet.container}>
                        {notices.map((item) => (
                            <NoticeItem key={item.id} notice={item} />
                        ))}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    centerContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 20
    },
    noticeContainer: {
        flexDirection: 'row',
        backgroundColor: COLORS.white,
        borderRadius: SIZES.radius,
        padding: 15,
        marginBottom: 15,
        elevation: 2,
        borderLeftWidth: 5,
        alignItems: 'flex-start'
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15
    },
    contentContainer: {
        flex: 1,
        marginRight: 10
    },
    noticeTitle: {
        ...FONTS.h6,
        color: '#333333',
        marginBottom: 5
    },
    noticeContent: {
        ...FONTS.font,
        color: '#666666',
        marginBottom: 10
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10
    },
    noticeDate: {
        ...FONTS.fontSm,
        color: '#666666'
    },
    noticeTime: {
        ...FONTS.fontSm,
        color: COLORS.primary
    },
    emptyText: {
        ...FONTS.font,
        color: '#666666',
        textAlign: 'center'
    },
    errorText: {
        ...FONTS.font,
        color: COLORS.danger,
        textAlign: 'center'
    },
    expandedContent: {
        marginTop: 10,
        paddingTop: 10,
        borderTopWidth: 1,
        borderTopColor: '#eee'
    },
    expandedLabel: {
        ...FONTS.fontSm,
        color: '#666666',
        marginTop: 5
    },
    expandedValue: {
        ...FONTS.font,
        color: '#333333',
        marginBottom: 5
    },
    arrowButton: {
        padding: 5
    }
});

export default Notifications;
