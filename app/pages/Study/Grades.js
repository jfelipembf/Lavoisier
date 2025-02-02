import React, { useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    SafeAreaView,
    Platform,
    TouchableOpacity,
    Modal,
    Image,
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import Header from '../../layout/Header';
import BackgroundGradient from '../../components/BackgroundGradient';

const subjects = [
    {
        id: 1,
        name: 'Matemática',
        icon: 'calculator',
        color: COLORS.primary,
        units: {
            1: {
                test: 7.5,
                practice: 8.0,
                assignment: 9.0,
                total: 8.0
            },
            2: {
                test: 8.0,
                practice: 7.5,
                assignment: 8.5,
                total: 8.0
            },
            3: null,
            4: null
        }
    },
    {
        id: 2,
        name: 'Português',
        icon: 'book-open-variant',
        color: COLORS.success,
        units: {
            1: {
                test: 8.5,
                practice: 7.0,
                assignment: 9.0,
                total: 8.2
            },
            2: {
                test: 7.0,
                practice: 8.5,
                assignment: 8.0,
                total: 7.8
            },
            3: null,
            4: null
        }
    },
    {
        id: 3,
        name: 'História',
        icon: 'book-clock',
        color: COLORS.warning,
        units: {
            1: {
                test: 9.0,
                practice: 8.5,
                assignment: 9.5,
                total: 9.0
            },
            2: {
                test: 8.5,
                practice: 9.0,
                assignment: 8.0,
                total: 8.5
            },
            3: null,
            4: null
        }
    },
    {
        id: 4,
        name: 'Geografia',
        icon: 'earth',
        color: COLORS.info,
        units: {
            1: {
                test: 8.0,
                practice: 7.5,
                assignment: 8.5,
                total: 8.0
            },
            2: {
                test: 7.5,
                practice: 8.0,
                assignment: 7.0,
                total: 7.5
            },
            3: null,
            4: null
        }
    }
];

const Grades = () => {
    const { colors } = useTheme();
    const [selectedGrade, setSelectedGrade] = useState(null);

    const calculateOverallGrade = (subject) => {
        let total = 0;
        let count = 0;
        Object.values(subject.units).forEach(unit => {
            if (unit) {
                total += unit.total;
                count++;
            }
        });
        return count > 0 ? (total / count).toFixed(1) : '-';
    };

    const getGradeColor = (grade) => {
        if (!grade || grade === '-') return colors.text;
        const numGrade = parseFloat(grade);
        if (numGrade >= 9) return COLORS.success;
        if (numGrade >= 7) return COLORS.warning;
        return COLORS.danger;
    };

    const renderGradeModal = () => {
        if (!selectedGrade) return null;

        return (
            <Modal
                visible={true}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setSelectedGrade(null)}
            >
                <TouchableOpacity
                    style={styles.modalOverlay}
                    activeOpacity={1}
                    onPress={() => setSelectedGrade(null)}
                >
                    <View
                        style={[styles.modalContent, { backgroundColor: colors.cardBg }]}
                        onStartShouldSetResponder={() => true}
                    >
                        <View style={styles.modalHeader}>
                            <View style={styles.modalHeaderLeft}>
                                <MaterialCommunityIcons
                                    name={selectedGrade.subject.icon}
                                    size={24}
                                    color={selectedGrade.subject.color}
                                />
                                <Text style={[styles.modalTitle, { color: colors.title }]}>
                                    {selectedGrade.subject.name} - {selectedGrade.unit}ª Unidade
                                </Text>
                            </View>
                            <TouchableOpacity onPress={() => setSelectedGrade(null)}>
                                <MaterialCommunityIcons name="close" size={24} color={colors.text} />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.gradeDetails}>
                            <View style={styles.gradeItem}>
                                <View style={styles.gradeItemHeader}>
                                    <MaterialCommunityIcons name="pencil" size={20} color={COLORS.primary} />
                                    <Text style={[styles.gradeItemTitle, { color: colors.title }]}>Prova</Text>
                                </View>
                                <Text style={[styles.gradeValue, { color: getGradeColor(selectedGrade.data.test) }]}>
                                    {selectedGrade.data.test.toFixed(1)}
                                </Text>
                            </View>

                            <View style={styles.gradeItem}>
                                <View style={styles.gradeItemHeader}>
                                    <MaterialCommunityIcons name="book-open" size={20} color={COLORS.warning} />
                                    <Text style={[styles.gradeItemTitle, { color: colors.title }]}>Simulado</Text>
                                </View>
                                <Text style={[styles.gradeValue, { color: getGradeColor(selectedGrade.data.practice) }]}>
                                    {selectedGrade.data.practice.toFixed(1)}
                                </Text>
                            </View>

                            <View style={styles.gradeItem}>
                                <View style={styles.gradeItemHeader}>
                                    <MaterialCommunityIcons name="file-document" size={20} color={COLORS.success} />
                                    <Text style={[styles.gradeItemTitle, { color: colors.title }]}>Trabalho</Text>
                                </View>
                                <Text style={[styles.gradeValue, { color: getGradeColor(selectedGrade.data.assignment) }]}>
                                    {selectedGrade.data.assignment.toFixed(1)}
                                </Text>
                            </View>

                            <View style={[styles.gradeItem, styles.totalGrade]}>
                                <Text style={[styles.totalLabel, { color: colors.title }]}>Média Final</Text>
                                <Text style={[styles.totalValue, { color: getGradeColor(selectedGrade.data.total) }]}>
                                    {selectedGrade.data.total.toFixed(1)}
                                </Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            </Modal>
        );
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <BackgroundGradient>
                <Header title="Boletim Escolar" />
                <ScrollView
                    contentContainerStyle={{
                        flexGrow: 1,
                        paddingBottom: Platform.OS === 'ios' ? 120 : 100,
                    }}
                >
                    <View style={styles.container}>
                        {subjects.map((subject) => (
                            <TouchableOpacity
                                key={subject.id}
                                style={[styles.subjectCard, { borderLeftColor: subject.color }]}
                                onPress={() => console.log('Pressed')}
                            >
                                <View style={[styles.iconContainer, { backgroundColor: subject.color + '20' }]}>
                                    <MaterialCommunityIcons
                                        name={subject.icon}
                                        size={28}
                                        color={subject.color}
                                    />
                                </View>
                                <View style={styles.subjectInfo}>
                                    <Text style={[styles.subjectName, { color: colors.title }]}>
                                        {subject.name}
                                    </Text>
                                    <Text style={[styles.averageGrade, { color: getGradeColor(calculateOverallGrade(subject)) }]}>
                                        Média: {calculateOverallGrade(subject)}
                                    </Text>
                                    <View style={styles.unitsContainer}>
                                        {[1, 2, 3, 4].map((unit) => (
                                            <TouchableOpacity
                                                key={unit}
                                                style={[
                                                    styles.unitCard,
                                                    { backgroundColor: colors.cardBg + '80' }
                                                ]}
                                                onPress={() => subject.units[unit] && setSelectedGrade({
                                                    subject,
                                                    unit,
                                                    data: subject.units[unit]
                                                })}
                                                disabled={!subject.units[unit]}
                                            >
                                                <Text style={[styles.unitTitle, { color: colors.text }]}>
                                                    {unit}ª Unidade
                                                </Text>
                                                <Text
                                                    style={[
                                                        styles.unitGrade,
                                                        {
                                                            color: getGradeColor(subject.units[unit]?.total),
                                                            opacity: subject.units[unit] ? 1 : 0.5
                                                        }
                                                    ]}
                                                >
                                                    {subject.units[unit]?.total.toFixed(1) || '-'}
                                                </Text>
                                            </TouchableOpacity>
                                        ))}
                                    </View>
                                </View>
                                <MaterialCommunityIcons 
                                    name="chevron-right" 
                                    size={24} 
                                    color={COLORS.gray} 
                                    style={styles.arrowIcon}
                                />
                            </TouchableOpacity>
                        ))}
                    </View>
                </ScrollView>
                {renderGradeModal()}
            </BackgroundGradient>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: SIZES.padding,
    },
    subjectCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.white,
        borderRadius: 15,
        padding: 15,
        marginBottom: 15,
        borderLeftWidth: 5,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
    },
    iconContainer: {
        width: 50,
        height: 50,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    subjectInfo: {
        flex: 1,
    },
    subjectName: {
        ...FONTS.h4,
        color: COLORS.black,
        marginBottom: 4,
    },
    averageGrade: {
        ...FONTS.body4,
        color: COLORS.gray,
        marginBottom: 8,
    },
    unitsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    unitCard: {
        flex: 1,
        marginHorizontal: 4,
        padding: 10,
        borderRadius: SIZES.radius_sm,
        alignItems: 'center',
    },
    unitTitle: {
        ...FONTS.font,
        fontSize: 12,
        marginBottom: 4,
    },
    unitGrade: {
        ...FONTS.h6,
        fontWeight: 'bold',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        maxHeight: '80%',
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    modalHeaderLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    modalTitle: {
        ...FONTS.h6,
        marginLeft: 10,
    },
    gradeDetails: {
        backgroundColor: 'rgba(0,0,0,0.03)',
        borderRadius: SIZES.radius,
        padding: 15,
    },
    gradeItem: {
        marginBottom: 15,
    },
    gradeItemHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    gradeItemTitle: {
        ...FONTS.font,
        marginLeft: 8,
    },
    gradeValue: {
        ...FONTS.h4,
        fontWeight: 'bold',
    },
    totalGrade: {
        marginTop: 10,
        paddingTop: 15,
        borderTopWidth: 1,
        borderTopColor: 'rgba(0,0,0,0.1)',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    totalLabel: {
        ...FONTS.h6,
    },
    totalValue: {
        ...FONTS.h3,
        fontWeight: 'bold',
    },
    arrowIcon: {
        marginLeft: 10,
    },
});

export default Grades;
