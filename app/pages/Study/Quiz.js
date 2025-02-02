import React, { useState } from 'react';
import {
    View,
    Text,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    Platform,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import Header from '../../layout/Header';
import BackgroundGradient from '../../components/BackgroundGradient';

const letters = ['A', 'B', 'C', 'D'];

const Quiz = ({ route, navigation }) => {
    const { subject, title, questions } = route.params;
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isAnswerConfirmed, setIsAnswerConfirmed] = useState(false);
    const [score, setScore] = useState(0);

    const currentQuestion = questions[currentQuestionIndex];

    const handleOptionSelect = (index) => {
        if (!isAnswerConfirmed) {
            setSelectedOption(index);
        }
    };

    const handleConfirmAnswer = () => {
        if (selectedOption !== null && !isAnswerConfirmed) {
            setIsAnswerConfirmed(true);
            if (selectedOption === currentQuestion.correctAnswer) {
                setScore(score + 1);
            }
        }
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSelectedOption(null);
            setIsAnswerConfirmed(false);
        } else {
            navigation.goBack();
        }
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <BackgroundGradient>
                <Header 
                    title={`${subject} - ${title}`}
                    subtitle={`Questão ${currentQuestionIndex + 1}/${questions.length}`}
                    leftIcon="arrow-left"
                    onPressLeft={() => navigation.goBack()}
                />
                <ScrollView contentContainerStyle={styles.scrollContent}>
                    <View style={styles.container}>
                        {/* Progresso e Pontuação */}
                        <View style={styles.progressContainer}>
                            <View style={styles.progressBar}>
                                <View 
                                    style={[
                                        styles.progressFill,
                                        { width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }
                                    ]}
                                />
                            </View>
                            <Text style={styles.scoreText}>
                                Pontuação: {score}/{currentQuestionIndex + 1}
                            </Text>
                        </View>

                        {/* Questão */}
                        <View style={styles.questionCard}>
                            <Text style={styles.questionText}>
                                {currentQuestion.question}
                            </Text>
                        </View>

                        {/* Opções */}
                        <View style={styles.optionsContainer}>
                            {currentQuestion.options.map((option, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={[
                                        styles.optionCard,
                                        selectedOption === index && !isAnswerConfirmed && {
                                            borderColor: COLORS.primary,
                                            borderWidth: 2,
                                        },
                                        isAnswerConfirmed && index === currentQuestion.correctAnswer && {
                                            backgroundColor: COLORS.success + '20',
                                            borderColor: COLORS.success,
                                            borderWidth: 2,
                                        },
                                        isAnswerConfirmed && selectedOption === index && 
                                        index !== currentQuestion.correctAnswer && {
                                            backgroundColor: COLORS.danger + '20',
                                            borderColor: COLORS.danger,
                                            borderWidth: 2,
                                        },
                                    ]}
                                    onPress={() => handleOptionSelect(index)}
                                    disabled={isAnswerConfirmed}
                                >
                                    <View style={[
                                        styles.letterContainer,
                                        { backgroundColor: COLORS.primary + '15' },
                                        selectedOption === index && !isAnswerConfirmed && {
                                            backgroundColor: COLORS.primary,
                                        },
                                        isAnswerConfirmed && index === currentQuestion.correctAnswer && {
                                            backgroundColor: COLORS.success,
                                        },
                                        isAnswerConfirmed && selectedOption === index && 
                                        index !== currentQuestion.correctAnswer && {
                                            backgroundColor: COLORS.danger,
                                        },
                                    ]}>
                                        <Text style={[
                                            styles.letterText,
                                            { color: COLORS.primary },
                                            (selectedOption === index && !isAnswerConfirmed) || 
                                            (isAnswerConfirmed && (index === currentQuestion.correctAnswer || 
                                            selectedOption === index)) && { color: '#fff' },
                                        ]}>
                                            {letters[index]}
                                        </Text>
                                    </View>
                                    <Text style={styles.optionText}>{option}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>

                        {/* Explicação */}
                        {isAnswerConfirmed && (
                            <View style={styles.explanationCard}>
                                <View style={styles.explanationHeader}>
                                    <MaterialCommunityIcons
                                        name="lightbulb-on"
                                        size={24}
                                        color={COLORS.warning}
                                    />
                                    <Text style={styles.explanationTitle}>
                                        Explicação
                                    </Text>
                                </View>
                                <Text style={styles.explanationText}>
                                    {currentQuestion.explanation}
                                </Text>
                            </View>
                        )}

                        {/* Botões */}
                        <View style={styles.buttonsContainer}>
                            {!isAnswerConfirmed ? (
                                <TouchableOpacity
                                    style={[
                                        styles.button,
                                        { 
                                            backgroundColor: selectedOption !== null 
                                                ? COLORS.primary 
                                                : COLORS.primary + '50'
                                        }
                                    ]}
                                    onPress={handleConfirmAnswer}
                                    disabled={selectedOption === null}
                                >
                                    <Text style={styles.buttonText}>Confirmar</Text>
                                    <MaterialCommunityIcons
                                        name="check"
                                        size={24}
                                        color="#fff"
                                    />
                                </TouchableOpacity>
                            ) : (
                                <TouchableOpacity
                                    style={[styles.button, { backgroundColor: COLORS.primary }]}
                                    onPress={handleNextQuestion}
                                >
                                    <Text style={styles.buttonText}>
                                        {currentQuestionIndex < questions.length - 1 ? 'Próxima' : 'Finalizar'}
                                    </Text>
                                    <MaterialCommunityIcons
                                        name={currentQuestionIndex < questions.length - 1 ? 'arrow-right' : 'check-circle'}
                                        size={24}
                                        color="#fff"
                                    />
                                </TouchableOpacity>
                            )}
                        </View>
                    </View>
                </ScrollView>
            </BackgroundGradient>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: SIZES.padding,
    },
    scrollContent: {
        flexGrow: 1,
        paddingBottom: Platform.OS === 'ios' ? 120 : 100,
    },
    progressContainer: {
        marginBottom: 20,
    },
    progressBar: {
        height: 6,
        backgroundColor: 'rgba(0,0,0,0.1)',
        borderRadius: 3,
        marginBottom: 10,
    },
    progressFill: {
        height: '100%',
        backgroundColor: COLORS.primary,
        borderRadius: 3,
    },
    scoreText: {
        ...FONTS.body3,
        color: COLORS.gray,
        textAlign: 'center',
    },
    questionCard: {
        padding: 20,
        backgroundColor: COLORS.white,
        borderRadius: SIZES.radius,
        marginBottom: 20,
        elevation: 3,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
    },
    questionText: {
        ...FONTS.h4,
        color: COLORS.black,
        lineHeight: 24,
    },
    optionsContainer: {
        marginBottom: 20,
    },
    optionCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.white,
        padding: 15,
        marginBottom: 10,
        borderRadius: SIZES.radius,
        borderWidth: 1,
        borderColor: 'transparent',
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 2.22,
    },
    letterContainer: {
        width: 36,
        height: 36,
        borderRadius: 18,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    letterText: {
        ...FONTS.h4,
        fontWeight: '600',
    },
    optionText: {
        ...FONTS.body3,
        color: COLORS.black,
        flex: 1,
    },
    explanationCard: {
        padding: 15,
        backgroundColor: COLORS.white,
        borderRadius: SIZES.radius,
        marginBottom: 20,
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 2.22,
    },
    explanationHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    explanationTitle: {
        ...FONTS.h4,
        color: COLORS.black,
        marginLeft: 10,
    },
    explanationText: {
        ...FONTS.body3,
        color: COLORS.gray,
        lineHeight: 22,
    },
    buttonsContainer: {
        marginTop: 'auto',
        paddingVertical: 20,
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15,
        borderRadius: SIZES.radius,
    },
    buttonText: {
        ...FONTS.h4,
        color: '#fff',
        marginRight: 8,
    },
});

export default Quiz;
