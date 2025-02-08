import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import Header from '../../layout/Header';
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const VideoAulas = ({ navigation }) => {
    const { colors } = useTheme();

    const disciplinas = [
        {
            nome: "Matemática",
            icon: "math-compass",
            color: "#cee7e6",
            aulas: [
                { titulo: "Funções do 2º Grau", duracao: "45 min" },
                { titulo: "Trigonometria Básica", duracao: "35 min" },
                { titulo: "Geometria Espacial", duracao: "40 min" }
            ]
        },
        {
            nome: "Português",
            icon: "book-open-variant",
            color: "#eae3ef",
            aulas: [
                { titulo: "Análise Sintática", duracao: "30 min" },
                { titulo: "Figuras de Linguagem", duracao: "40 min" },
                { titulo: "Gêneros Textuais", duracao: "35 min" }
            ]
        },
        {
            nome: "História",
            icon: "clock-time-four",
            color: "#f2eee9",
            aulas: [
                { titulo: "Brasil Colônia", duracao: "45 min" },
                { titulo: "Revolução Industrial", duracao: "40 min" },
                { titulo: "Segunda Guerra Mundial", duracao: "50 min" }
            ]
        },
        {
            nome: "Ciências",
            icon: "flask",
            color: "#f3dfde",
            aulas: [
                { titulo: "Sistema Solar", duracao: "35 min" },
                { titulo: "Células e Tecidos", duracao: "45 min" },
                { titulo: "Química Orgânica", duracao: "40 min" }
            ]
        }
    ];

    const renderAula = (aula, disciplinaColor) => (
        <TouchableOpacity
            key={aula.titulo}
            style={[styles.aulaCard, { backgroundColor: disciplinaColor }]}
            onPress={() => (`Abrindo aula: ${aula.titulo}`)}
        >
            <View style={styles.aulaInfo}>
                <Text style={[styles.aulaTitulo, { color: colors.title }]}>{aula.titulo}</Text>
                <Text style={styles.aulaDuracao}>{aula.duracao}</Text>
            </View>
            <MaterialCommunityIcons name="play-circle" size={24} color={COLORS.primary} />
        </TouchableOpacity>
    );

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <Header title="Video Aulas" leftIcon="back" />
            
            <ScrollView style={styles.scrollView}>
                {disciplinas.map((disciplina) => (
                    <View key={disciplina.nome} style={styles.disciplinaSection}>
                        <View style={styles.disciplinaHeader}>
                            <MaterialCommunityIcons 
                                name={disciplina.icon} 
                                size={24} 
                                color={colors.title} 
                            />
                            <Text style={[styles.disciplinaTitulo, { color: colors.title }]}>
                                {disciplina.nome}
                            </Text>
                        </View>
                        
                        <View style={styles.aulasList}>
                            {disciplina.aulas.map((aula) => renderAula(aula, disciplina.color))}
                        </View>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollView: {
        flex: 1,
        padding: 15,
    },
    disciplinaSection: {
        marginBottom: 20,
    },
    disciplinaHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        gap: 10,
    },
    disciplinaTitulo: {
        ...FONTS.h6,
        fontWeight: '600',
    },
    aulasList: {
        gap: 10,
    },
    aulaCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 15,
        borderRadius: SIZES.radius,
        borderWidth: 1,
        borderColor: '#EEEEEE',
    },
    aulaInfo: {
        flex: 1,
    },
    aulaTitulo: {
        ...FONTS.font,
        fontWeight: '500',
        marginBottom: 4,
    },
    aulaDuracao: {
        ...FONTS.fontSm,
        color: COLORS.text,
    },
});

export default VideoAulas;
