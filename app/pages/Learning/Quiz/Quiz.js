import React, { useState } from 'react';
import { 
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Collapsible from 'react-native-collapsible';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useTheme } from '@react-navigation/native';
import Header from '../../../layout/Header';
import { GlobalStyleSheet } from '../../../constants/StyleSheet';
import { FONTS } from '../../../constants/theme';

// Cores pastéis personalizadas
const PASTEL_COLORS = {
  blue: '#cee7e6',    // Azul pastel
  green: '#eae3ef',   // Verde pastel
  red: '#f2eee9',     // Vermelho pastel
  yellow: '#f3dfde',  // Amarelo pastel
};

const QuizScreen = () => {
  const { colors } = useTheme();

  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState(null);
  const [selectedDiscipline, setSelectedDiscipline] = useState(null);

  const [isCollapsedYear, setIsCollapsedYear] = useState(true);
  const [isCollapsedDifficulty, setIsCollapsedDifficulty] = useState(true);
  const [isCollapsedDiscipline, setIsCollapsedDiscipline] = useState(true);

  const [selectedOption, setSelectedOption] = useState(null);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [totalAnswered, setTotalAnswered] = useState(0);

  const years = ['1º Ano', '2º Ano', '3º Ano', '4º Ano'];
  const difficulties = ['Fácil', 'Médio', 'Difícil'];
  const disciplines = ['Matemática', 'Português', 'História', 'Ciências'];

  const question = {
    text: 'Qual é a capital do Brasil?',
    options: ['São Paulo', 'Rio de Janeiro', 'Brasília', 'Salvador', 'Fortaleza'],
    answer: 'Brasília',
  };

  const handleConfirmAnswer = () => {
    if (selectedOption) {
      setIsConfirmed(true);
      setTotalAnswered(totalAnswered + 1);
      if (selectedOption === question.answer) {
        setCorrectCount(correctCount + 1);
      } else {
        setWrongCount(wrongCount + 1);
      }
    }
  };

  const handleSkipQuestion = () => {
    setSelectedOption(null);
    setIsConfirmed(false);
    setQuestionNumber(prev => prev + 1);
  };

  return (
    <SafeAreaView style={[GlobalStyleSheet.container, {padding:0, flex:1, backgroundColor: '#FFFFFF'}]}>
      <Header title={'Questões'} titleLeft />
      
      <ScrollView style={{backgroundColor: '#FFFFFF'}} contentContainerStyle={{paddingBottom: 100}}>
        <View style={{flex:1, backgroundColor: '#FFFFFF'}}>
          <View style={GlobalStyleSheet.container}>
           

            <View style={styles.parametersContainer}>
              <View style={styles.parameterRow}>
                <TouchableOpacity 
                  style={[styles.parameterButton, { 
                    backgroundColor: selectedYear ? PASTEL_COLORS.blue : '#F5F5F5',
                    flex: 1,
                    marginRight: 8
                  }]}
                  onPress={() => setIsCollapsedYear(!isCollapsedYear)}
                >
                  <FontAwesome name="book" size={16} color="#666666" style={styles.parameterIcon} />
                  <Text style={styles.parameterText}>
                    {selectedYear || 'Ano Escolar'}
                  </Text>
                  <FontAwesome 
                    name={isCollapsedYear ? 'chevron-down' : 'chevron-up'} 
                    size={14} 
                    color="#666666" 
                  />
                </TouchableOpacity>

                <TouchableOpacity 
                  style={[styles.parameterButton, { 
                    backgroundColor: selectedDifficulty ? PASTEL_COLORS.green : '#F5F5F5',
                    flex: 1,
                    marginLeft: 8
                  }]}
                  onPress={() => setIsCollapsedDifficulty(!isCollapsedDifficulty)}
                >
                  <FontAwesome name="fire" size={16} color="#666666" style={styles.parameterIcon} />
                  <Text style={styles.parameterText}>
                    {selectedDifficulty || 'Dificuldade'}
                  </Text>
                  <FontAwesome 
                    name={isCollapsedDifficulty ? 'chevron-down' : 'chevron-up'} 
                    size={14} 
                    color="#666666" 
                  />
                </TouchableOpacity>
              </View>

              <TouchableOpacity 
                style={[styles.parameterButton, { 
                  backgroundColor: selectedDiscipline ? PASTEL_COLORS.red : '#F5F5F5',
                  marginTop: 16
                }]}
                onPress={() => setIsCollapsedDiscipline(!isCollapsedDiscipline)}
              >
                <FontAwesome name="graduation-cap" size={16} color="#666666" style={styles.parameterIcon} />
                <Text style={styles.parameterText}>
                  {selectedDiscipline || 'Disciplina'}
                </Text>
                <FontAwesome 
                  name={isCollapsedDiscipline ? 'chevron-down' : 'chevron-up'} 
                  size={14} 
                  color="#666666" 
                />
              </TouchableOpacity>

              <Collapsible collapsed={isCollapsedYear}>
                <View style={styles.optionsList}>
                  {years.map((year) => (
                    <TouchableOpacity
                      key={year}
                      style={[styles.optionItem, {
                        backgroundColor: selectedYear === year ? PASTEL_COLORS.blue : '#FFFFFF'
                      }]}
                      onPress={() => {
                        setSelectedYear(year);
                        setIsCollapsedYear(true);
                      }}
                    >
                      <Text style={styles.optionText}>{year}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </Collapsible>

              <Collapsible collapsed={isCollapsedDifficulty}>
                <View style={styles.optionsList}>
                  {difficulties.map((difficulty) => (
                    <TouchableOpacity
                      key={difficulty}
                      style={[styles.optionItem, {
                        backgroundColor: selectedDifficulty === difficulty ? PASTEL_COLORS.green : '#FFFFFF'
                      }]}
                      onPress={() => {
                        setSelectedDifficulty(difficulty);
                        setIsCollapsedDifficulty(true);
                      }}
                    >
                      <Text style={styles.optionText}>{difficulty}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </Collapsible>

              <Collapsible collapsed={isCollapsedDiscipline}>
                <View style={styles.optionsList}>
                  {disciplines.map((discipline) => (
                    <TouchableOpacity
                      key={discipline}
                      style={[styles.optionItem, {
                        backgroundColor: selectedDiscipline === discipline ? PASTEL_COLORS.red : '#FFFFFF'
                      }]}
                      onPress={() => {
                        setSelectedDiscipline(discipline);
                        setIsCollapsedDiscipline(true);
                      }}
                    >
                      <Text style={styles.optionText}>{discipline}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </Collapsible>
            </View>

            {(selectedYear && selectedDifficulty && selectedDiscipline) ? (
              <View style={styles.questionContainer}>
                <View style={styles.header}>
                  <View style={styles.questionInfo}>
                    <Text style={styles.questionCounter}>Questão {questionNumber}</Text>
                    <View style={styles.scoreContainer}>
                      <FontAwesome name="check" size={14} color="#4CAF50" />
                      <Text style={[styles.scoreText, { marginLeft: 4 }]}>{correctCount}</Text>
                      <Text style={styles.scoreDivider}>·</Text>
                      <FontAwesome name="times" size={14} color="#F44336" />
                      <Text style={[styles.scoreText, { marginLeft: 4 }]}>{wrongCount}</Text>
                    </View>
                  </View>
                  <View style={styles.progressBar}>
                    <View style={[styles.progressFill, { width: `${(questionNumber / 10) * 100}%` }]} />
                  </View>
                </View>

                <ScrollView style={styles.questionContent} showsVerticalScrollIndicator={false}>
                  <Text style={styles.questionText}>{question.text}</Text>

                  {isConfirmed && selectedOption !== question.answer && (
                    <View style={[styles.feedbackBox, { backgroundColor: PASTEL_COLORS.red }]}>
                      <FontAwesome name="times-circle" size={20} color="#444444" style={styles.feedbackIcon} />
                      <View style={styles.feedbackContent}>
                        <Text style={styles.feedbackTitle}>Resposta Incorreta</Text>
                        <Text style={styles.feedbackText}>
                          A resposta correta é: {question.answer}
                        </Text>
                      </View>
                    </View>
                  )}

                  {isConfirmed && selectedOption === question.answer && (
                    <View style={[styles.feedbackBox, { backgroundColor: PASTEL_COLORS.green }]}>
                      <FontAwesome name="check-circle" size={20} color="#444444" style={styles.feedbackIcon} />
                      <View style={styles.feedbackContent}>
                        <Text style={styles.feedbackTitle}>Resposta Correta!</Text>
                        <Text style={styles.feedbackText}>
                          Parabéns, você acertou!
                        </Text>
                      </View>
                    </View>
                  )}

                  <View style={styles.optionsContainer}>
                    {question.options.map((option, index) => {
                      let backgroundColor = '#FFFFFF';
                      let textColor = '#444444';
                      let borderColor = '#EEEEEE';
                      let bulletColor = '#F5F5F5';
                      let bulletTextColor = '#666666';
                      let bulletText = String.fromCharCode(65 + index);
                      
                      if (isConfirmed) {
                        if (option === question.answer) {
                          backgroundColor = PASTEL_COLORS.green;
                          borderColor = PASTEL_COLORS.green;
                          bulletColor = '#FFFFFF';
                          bulletTextColor = '#444444';
                        } else if (option === selectedOption) {
                          backgroundColor = PASTEL_COLORS.red;
                          borderColor = PASTEL_COLORS.red;
                          bulletColor = '#FFFFFF';
                          bulletTextColor = '#444444';
                        }
                      } else if (option === selectedOption) {
                        backgroundColor = PASTEL_COLORS.blue;
                        borderColor = PASTEL_COLORS.blue;
                        bulletColor = '#FFFFFF';
                        bulletTextColor = '#444444';
                      }
                      
                      return (
                        <TouchableOpacity
                          key={option}
                          style={[styles.answerButton, { 
                            backgroundColor, 
                            borderColor,
                            borderWidth: 1,
                            borderRadius: 12,
                            marginBottom: 12,
                            padding: 16,
                            flexDirection: 'row',
                            alignItems: 'center'
                          }]}
                          onPress={() => {
                            if (!isConfirmed) {
                              setSelectedOption(option);
                            }
                          }}
                          activeOpacity={0.8}
                        >
                          <View style={[styles.optionBullet, { backgroundColor: bulletColor }]}>
                            <Text style={[styles.bulletText, { color: bulletTextColor }]}>
                              {bulletText}
                            </Text>
                          </View>
                          <Text style={[styles.answerText, { color: textColor }]}>{option}</Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                </ScrollView>

                <View style={styles.buttonContainer}>
                  {!isConfirmed ? (
                    <>
                      <TouchableOpacity
                        style={[styles.confirmButton, { 
                          backgroundColor: selectedOption ? PASTEL_COLORS.green : '#F5F5F5',
                          borderRadius: 12,
                          padding: 16,
                          marginBottom: 8
                        }]}
                        onPress={handleConfirmAnswer}
                        disabled={!selectedOption}
                      >
                        <Text style={[styles.buttonText, { 
                          color: selectedOption ? '#444444' : '#999999'
                        }]}>
                          Confirmar Resposta
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={[styles.skipButton, { 
                          backgroundColor: '#FFFFFF',
                          borderWidth: 1,
                          borderColor: '#EEEEEE',
                          borderRadius: 12,
                          padding: 16
                        }]}
                        onPress={handleSkipQuestion}
                      >
                        <Text style={[styles.buttonText, { color: '#666666' }]}>
                          Pular Questão
                        </Text>
                      </TouchableOpacity>
                    </>
                  ) : (
                    <TouchableOpacity
                      style={[styles.nextButton, { 
                        backgroundColor: PASTEL_COLORS.blue,
                        borderRadius: 12,
                        padding: 16
                      }]}
                      onPress={handleSkipQuestion}
                    >
                      <Text style={[styles.buttonText, { color: '#444444' }]}>
                        Próxima Questão
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            ) : (
              <TouchableOpacity
                style={[styles.startButton, {
                  backgroundColor: PASTEL_COLORS.blue,
                  borderRadius: 12,
                  padding: 16,
                  marginTop: 30,
                  marginBottom: 30,
                  width: '100%'
                }]}
              >
                <Text style={[styles.buttonText, { color: '#444444' }]}>
                  Iniciar Quiz
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    padding: 12,
    paddingBottom: 40
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 25,
    paddingHorizontal: 8,
  },
  parametersContainer: {
    marginBottom: 25,
    paddingHorizontal: 8,
  },
  parameterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  parameterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
  },
  parameterIcon: {
    marginRight: 8,
  },
  parameterText: {
    flex: 1,
    fontSize: 15,
    color: '#444444',
    fontWeight: '500',
  },
  optionsList: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginTop: 8,
    padding: 8,
    borderWidth: 1,
    borderColor: '#EEEEEE',
  },
  optionItem: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 4,
  },
  optionText: {
    fontSize: 15,
    color: '#444444',
  },
  questionContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    marginHorizontal: -12,
    padding: 20,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderWidth: 1,
    borderColor: '#EEEEEE',
    borderBottomWidth: 0,
  },
  header: {
    marginBottom: 25,
  },
  questionInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  progressBar: {
    height: 3,
    backgroundColor: '#F5F5F5',
    borderRadius: 1.5,
    overflow: 'hidden'
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#2196F3',
    borderRadius: 1.5,
  },
  questionCounter: {
    fontSize: 15,
    color: '#444444',
    fontWeight: '600',
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scoreText: {
    fontSize: 14,
    color: '#666666',
  },
  scoreDivider: {
    fontSize: 14,
    color: '#666666',
    marginHorizontal: 8,
  },
  questionContent: {
    flex: 1,
    marginBottom: 20,
  },
  questionText: {
    fontSize: 18,
    lineHeight: 26,
    color: '#444444',
    fontWeight: '500',
    marginBottom: 25,
  },
  optionsContainer: {
    marginBottom: 10,
  },
  optionBullet: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bulletText: {
    fontSize: 13,
    fontWeight: '600',
  },
  answerText: {
    fontSize: 16,
    flex: 1,
  },
  buttonContainer: {
    marginTop: 'auto',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  answerButton: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  confirmButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8
  },
  skipButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EEEEEE',
    borderRadius: 12,
    padding: 16
  },
  nextButton: {
    backgroundColor: '#2196F3',
    borderRadius: 12,
    padding: 16
  },
  startButton: {
    backgroundColor: PASTEL_COLORS.blue,
    borderRadius: 12,
    padding: 16,
    marginTop: 30,
    marginBottom: 30,
    width: '100%'
  },
  feedbackBox: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  feedbackIcon: {
    marginRight: 12,
  },
  feedbackContent: {
    flex: 1,
  },
  feedbackTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#444444',
    marginBottom: 4,
  },
  feedbackText: {
    fontSize: 14,
    color: '#666666',
  },
});

export default QuizScreen;
