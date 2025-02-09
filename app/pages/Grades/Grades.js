import React, { useState, useEffect } from 'react';
import { useTheme, useNavigation } from '@react-navigation/native';
import { SafeAreaView, ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Collapsible from 'react-native-collapsible';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import useUser from '../../hooks/useUser';
import Header from '../../layout/Header';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import Auth from '../../Service/Auth';

const PASTEL_COLORS = {
  blue: '#cee7e6',    // Azul pastel
  green: '#eae3ef',   // Verde pastel
  red: '#f2eee9',     // Vermelho pastel
  yellow: '#f3dfde',  // Amarelo pastel
};

const Grades = () => {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const { user, loading } = useUser();
  const [userGrades, setUserGrades] = useState(null);
  const [collapsedStates, setCollapsedStates] = useState({});
  const [selectedUnit, setSelectedUnit] = useState('Unidade1');

  useEffect(() => {
    if (user?.notas) {
      setUserGrades(user.notas);
      
      // Inicializar estados de collapse
      const initialCollapsedStates = {};
      Object.keys(user.notas).forEach(disciplina => {
        initialCollapsedStates[disciplina] = true;
      });
      setCollapsedStates(initialCollapsedStates);
    }
  }, [user]);

  const toggleCollapsed = (disciplina) => {
    setCollapsedStates(prev => ({
      ...prev,
      [disciplina]: !prev[disciplina]
    }));
  };

  if (loading || !userGrades) {
    return (
      <SafeAreaView style={[GlobalStyleSheet.container, {padding:0, flex:1, backgroundColor: '#F8F9FA'}]}>
        <Header title={'Notas'} titleLeft />
        <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
          <Text>Carregando notas...</Text>
        </View>
      </SafeAreaView>
    );
  }

  // Obter unidades disponíveis da primeira disciplina
  const unidades = Object.keys(Object.values(userGrades)[0] || {});

  return (
    <SafeAreaView style={[GlobalStyleSheet.container, {padding:0, flex:1, backgroundColor: '#F8F9FA'}]}>
      <Header title={'Notas'} titleLeft />
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={GlobalStyleSheet.container}>
            {/* Área de Tabs para selecionar a unidade */}
            <View style={styles.tabsContainer}>
              {unidades.map((unit) => (
                <TouchableOpacity
                  key={unit}
                  style={[
                    styles.tab,
                    selectedUnit === unit && styles.selectedTab
                  ]}
                  onPress={() => setSelectedUnit(unit)}
                >
                  <Text
                    style={[
                      styles.tabText,
                      selectedUnit === unit && styles.selectedTabText
                    ]}
                  >
                    {unit}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.gradesContainer}>
              {Object.entries(userGrades).map(([disciplina, notas], index) => (
                <View key={disciplina} style={styles.gradeCard}>
                  <TouchableOpacity 
                    style={[styles.gradeHeader, { backgroundColor: Object.values(PASTEL_COLORS)[index % 4] }]}
                    onPress={() => toggleCollapsed(disciplina)}
                  >
                    <FontAwesome 
                      name={disciplina.toLowerCase().includes('mat') ? 'calculator' : 
                            disciplina.toLowerCase().includes('port') ? 'book' :
                            disciplina.toLowerCase().includes('hist') ? 'history' :
                            disciplina.toLowerCase().includes('cienc') ? 'flask' : 'book'} 
                      size={15} 
                      color={'#444444'} 
                    />
                    <Text style={styles.gradeTitle}>{disciplina}</Text>
                    <View style={styles.gradeEndContainer}>
                      <Text style={styles.gradeTitle}>
                        {notas[selectedUnit]?.final || '0.0'}
                      </Text>
                      <FontAwesome 
                        name={collapsedStates[disciplina] ? 'chevron-down' : 'chevron-up'} 
                        size={8} 
                        color={'#444444'} 
                      />
                    </View>
                  </TouchableOpacity>
                  <Collapsible collapsed={collapsedStates[disciplina]}>
                    <View style={styles.gradeDetails}>
                      {Object.entries(notas[selectedUnit] || {}).map(([tipo, valor]) => (
                        tipo !== 'final' && (
                          <View key={tipo} style={styles.detailRow}>
                            <Text style={styles.detailLabel}>
                              {tipo.charAt(0).toUpperCase() + tipo.slice(1)}
                            </Text>
                            <Text style={styles.detailValue}>
                              {valor || '0.0'}
                            </Text>
                          </View>
                        )
                      ))}
                    </View>
                  </Collapsible>
                </View>
              ))}
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA'
  },
  content: {
    flex: 1,
    padding: 20,
  },
  tabsContainer: {
    flexDirection: 'row',
    marginBottom: 15,
    backgroundColor: '#FFFFFF',
    padding: 5,
    borderRadius: SIZES.radius,
    borderWidth: 1,
    borderColor: '#EEEEEE',
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: SIZES.radius - 5,
  },
  selectedTab: {
    backgroundColor: '#EEEEEE',
  },
  tabText: {
    ...FONTS.fontSm,
    fontWeight: '600',
  },
  selectedTabText: {
    color: '#444444',
  },
  gradesContainer: {
    paddingHorizontal: 5,
  },
  gradeCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: SIZES.radius,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#EEEEEE',
    overflow: 'hidden',
  },
  gradeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  gradeTitle: {
    ...FONTS.font,
    color: '#444444',
    fontWeight: '600',
    marginLeft: 10,
  },
  gradeEndContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 10,
  },
  gradeDetails: {
    padding: 15,
    backgroundColor: '#FFFFFF',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  detailLabel: {
    ...FONTS.font,
    color: '#666666',
  },
  detailValue: {
    ...FONTS.font,
    color: '#444444',
    fontWeight: '600',
  },
  disciplinaHeader: {
    backgroundColor: '#4318FF',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  disciplinaNome: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
  },
  unidadeContainer: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    elevation: 2,
  },
  unidadeHeader: {
    backgroundColor: '#F4F7FE',
    padding: 10,
    borderRadius: 6,
    marginBottom: 10,
  },
  unidadeNome: {
    color: '#2B3674',
    fontSize: 16,
    fontWeight: 'bold',
  },
  notaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#E9EDF7',
  },
  notaTipo: {
    color: '#2B3674',
    fontSize: 14,
  },
  notaValor: {
    color: '#4318FF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  scrollContainer: {
    padding: 15,
  },
  headerContainer: {
    backgroundColor: '#4318FF',
    padding: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 15,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  headerSubtitle: {
    color: '#E9EDF7',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 5,
  },
  noGradesText: {
    color: '#2B3674',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  }
});

export default Grades;
