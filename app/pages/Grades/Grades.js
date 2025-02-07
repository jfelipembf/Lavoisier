import React, { useState } from 'react';
import { useTheme } from '@react-navigation/native';
import { SafeAreaView, ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Collapsible from 'react-native-collapsible';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Header from '../../layout/Header';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import ListStyle1 from '../../components/list/ListStyle1';

// Cores pastéis personalizadas
const PASTEL_COLORS = {
  blue: '#cee7e6',    // Azul pastel
  green: '#eae3ef',   // Verde pastel
  red: '#f2eee9',     // Vermelho pastel
  yellow: '#f3dfde',  // Amarelo pastel
};

const Grade = () => {
  const { colors } = useTheme();

  // Estados para controlar o colapso de cada disciplina
  const [collapsedMath, setCollapsedMath] = useState(true);
  const [collapsedPortuguese, setCollapsedPortuguese] = useState(true);
  const [collapsedHistory, setCollapsedHistory] = useState(true);
  const [collapsedScience, setCollapsedScience] = useState(true);

  // Estado para controlar a unidade selecionada
  const [selectedUnit, setSelectedUnit] = useState('Unidade 1');

  // Dados das notas para cada unidade e disciplina (4 unidades)
  const grades = {
    'Unidade 1': {
      matematica: { final: 8.5, prova: 5.0, simulados: 2.0, trabalhos: 1.5 },
      portugues: { final: 9.0, prova: 5.0, simulados: 3.0, trabalhos: 1.0 },
      historia: { final: 7.5, prova: 4.0, simulados: 2.0, trabalhos: 1.5 },
      ciencias: { final: 8.0, prova: 4.5, simulados: 2.0, trabalhos: 1.5 },
    },
    'Unidade 2': {
      matematica: { final: 7.5, prova: 4.5, simulados: 2.0, trabalhos: 1.0 },
      portugues: { final: 8.5, prova: 4.5, simulados: 3.0, trabalhos: 1.0 },
      historia: { final: 8.0, prova: 5.0, simulados: 2.0, trabalhos: 1.0 },
      ciencias: { final: 7.0, prova: 3.5, simulados: 2.0, trabalhos: 1.5 },
    },
    'Unidade 3': {
      matematica: { final: 9.0, prova: 5.5, simulados: 2.5, trabalhos: 1.0 },
      portugues: { final: 8.0, prova: 4.0, simulados: 3.0, trabalhos: 1.0 },
      historia: { final: 7.0, prova: 4.0, simulados: 2.0, trabalhos: 1.0 },
      ciencias: { final: 8.5, prova: 5.0, simulados: 2.0, trabalhos: 1.5 },
    },
    'Unidade 4': {
      matematica: { final: 8.0, prova: 4.5, simulados: 2.0, trabalhos: 1.5 },
      portugues: { final: 9.5, prova: 5.5, simulados: 3.0, trabalhos: 1.0 },
      historia: { final: 8.0, prova: 4.5, simulados: 2.0, trabalhos: 1.5 },
      ciencias: { final: 7.5, prova: 4.0, simulados: 2.0, trabalhos: 1.5 },
    },
  };

  return (
    <SafeAreaView style={[GlobalStyleSheet.container, {padding:0, flex:1, backgroundColor: '#FFFFFF'}]}>
      <Header title={'Notas'} titleLeft />
      
      <ScrollView style={{backgroundColor: '#FFFFFF'}} contentContainerStyle={{paddingBottom: 100}}>
        <View style={{flex:1, backgroundColor: '#FFFFFF'}}>
          <View style={GlobalStyleSheet.container}>
            {/* Área de Tabs para selecionar a unidade */}
            <View style={styles.tabsContainer}>
              {Object.keys(grades).map((unit) => (
                <TouchableOpacity
                  key={unit}
                  style={[
                    styles.tab,
                    { backgroundColor: selectedUnit === unit ? PASTEL_COLORS.blue : '#FFFFFF' },
                  ]}
                  onPress={() => setSelectedUnit(unit)}
                >
                  <Text
                    style={[
                      styles.tabText,
                      { color: selectedUnit === unit ? '#444444' : '#666666' },
                    ]}
                  >
                    {unit}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.gradesContainer}>
              {/* Disciplina: Matemática */}
              <View style={styles.gradeCard}>
                <TouchableOpacity 
                  style={[styles.gradeHeader, { backgroundColor: PASTEL_COLORS.blue }]}
                  onPress={() => setCollapsedMath(!collapsedMath)}
                >
                  <FontAwesome name={'calculator'} size={15} color={'#444444'} />
                  <Text style={styles.gradeTitle}>Matemática</Text>
                  <View style={styles.gradeEndContainer}>
                    <Text style={styles.gradeTitle}>{grades[selectedUnit].matematica.final}</Text>
                    <FontAwesome 
                      name={collapsedMath ? 'chevron-down' : 'chevron-up'} 
                      size={8} 
                      color={'#444444'} 
                    />
                  </View>
                </TouchableOpacity>
                <Collapsible collapsed={collapsedMath}>
                  <View style={styles.gradeDetails}>
                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabel}>Prova</Text>
                      <Text style={styles.detailValue}>{grades[selectedUnit].matematica.prova}</Text>
                    </View>
                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabel}>Simulados</Text>
                      <Text style={styles.detailValue}>{grades[selectedUnit].matematica.simulados}</Text>
                    </View>
                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabel}>Trabalhos</Text>
                      <Text style={styles.detailValue}>{grades[selectedUnit].matematica.trabalhos}</Text>
                    </View>
                  </View>
                </Collapsible>
              </View>

              {/* Disciplina: Português */}
              <View style={styles.gradeCard}>
                <TouchableOpacity 
                  style={[styles.gradeHeader, { backgroundColor: PASTEL_COLORS.green }]}
                  onPress={() => setCollapsedPortuguese(!collapsedPortuguese)}
                >
                  <FontAwesome name={'book'} size={15} color={'#444444'} />
                  <Text style={styles.gradeTitle}>Português</Text>
                  <View style={styles.gradeEndContainer}>
                    <Text style={styles.gradeTitle}>{grades[selectedUnit].portugues.final}</Text>
                    <FontAwesome 
                      name={collapsedPortuguese ? 'chevron-down' : 'chevron-up'} 
                      size={8} 
                      color={'#444444'} 
                    />
                  </View>
                </TouchableOpacity>
                <Collapsible collapsed={collapsedPortuguese}>
                  <View style={styles.gradeDetails}>
                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabel}>Prova</Text>
                      <Text style={styles.detailValue}>{grades[selectedUnit].portugues.prova}</Text>
                    </View>
                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabel}>Simulados</Text>
                      <Text style={styles.detailValue}>{grades[selectedUnit].portugues.simulados}</Text>
                    </View>
                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabel}>Trabalhos</Text>
                      <Text style={styles.detailValue}>{grades[selectedUnit].portugues.trabalhos}</Text>
                    </View>
                  </View>
                </Collapsible>
              </View>

              {/* Disciplina: História */}
              <View style={styles.gradeCard}>
                <TouchableOpacity 
                  style={[styles.gradeHeader, { backgroundColor: PASTEL_COLORS.yellow }]}
                  onPress={() => setCollapsedHistory(!collapsedHistory)}
                >
                  <FontAwesome name={'history'} size={15} color={'#444444'} />
                  <Text style={styles.gradeTitle}>História</Text>
                  <View style={styles.gradeEndContainer}>
                    <Text style={styles.gradeTitle}>{grades[selectedUnit].historia.final}</Text>
                    <FontAwesome 
                      name={collapsedHistory ? 'chevron-down' : 'chevron-up'} 
                      size={8} 
                      color={'#444444'} 
                    />
                  </View>
                </TouchableOpacity>
                <Collapsible collapsed={collapsedHistory}>
                  <View style={styles.gradeDetails}>
                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabel}>Prova</Text>
                      <Text style={styles.detailValue}>{grades[selectedUnit].historia.prova}</Text>
                    </View>
                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabel}>Simulados</Text>
                      <Text style={styles.detailValue}>{grades[selectedUnit].historia.simulados}</Text>
                    </View>
                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabel}>Trabalhos</Text>
                      <Text style={styles.detailValue}>{grades[selectedUnit].historia.trabalhos}</Text>
                    </View>
                  </View>
                </Collapsible>
              </View>

              {/* Disciplina: Ciências */}
              <View style={styles.gradeCard}>
                <TouchableOpacity 
                  style={[styles.gradeHeader, { backgroundColor: PASTEL_COLORS.red }]}
                  onPress={() => setCollapsedScience(!collapsedScience)}
                >
                  <FontAwesome name={'flask'} size={15} color={'#444444'} />
                  <Text style={styles.gradeTitle}>Ciências</Text>
                  <View style={styles.gradeEndContainer}>
                    <Text style={styles.gradeTitle}>{grades[selectedUnit].ciencias.final}</Text>
                    <FontAwesome 
                      name={collapsedScience ? 'chevron-down' : 'chevron-up'} 
                      size={8} 
                      color={'#444444'} 
                    />
                  </View>
                </TouchableOpacity>
                <Collapsible collapsed={collapsedScience}>
                  <View style={styles.gradeDetails}>
                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabel}>Prova</Text>
                      <Text style={styles.detailValue}>{grades[selectedUnit].ciencias.prova}</Text>
                    </View>
                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabel}>Simulados</Text>
                      <Text style={styles.detailValue}>{grades[selectedUnit].ciencias.simulados}</Text>
                    </View>
                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabel}>Trabalhos</Text>
                      <Text style={styles.detailValue}>{grades[selectedUnit].ciencias.trabalhos}</Text>
                    </View>
                  </View>
                </Collapsible>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
  tabText: {
    ...FONTS.fontSm,
    fontWeight: '600',
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
});

export default Grade;
