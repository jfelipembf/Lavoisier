import React, { useState } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    ScrollView,
    TouchableOpacity,
    SafeAreaView,
    Modal,
    Dimensions,
    StatusBar
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Collapsible from 'react-native-collapsible';
import { COLORS, FONTS, SIZES } from '../../../constants/theme';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

// Cores pastéis personalizadas (mesmas do Financeiro)
const PASTEL_COLORS = {
    blue: '#cee7e6',    // Azul pastel
    green: '#eae3ef',   // Verde pastel
    red: '#f2eee9',     // Vermelho pastel
    yellow: '#f3dfde',  // Amarelo pastel
};

const Video = ({ navigation }) => {
    const { colors } = useTheme();
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    // Estados para os filtros
    const [selectedYear, setSelectedYear] = useState(null);
    const [selectedDiscipline, setSelectedDiscipline] = useState(null);
    const [selectedSubject, setSelectedSubject] = useState(null);

    const [isCollapsedYear, setIsCollapsedYear] = useState(true);
    const [isCollapsedDiscipline, setIsCollapsedDiscipline] = useState(true);
    const [isCollapsedSubject, setIsCollapsedSubject] = useState(true);

    // Opções para os filtros
    const years = ['1º Ano', '2º Ano', '3º Ano', '4º Ano'];
    const disciplines = ['Matemática', 'Português', 'História', 'Ciências'];
    const subjects = ['Álgebra', 'Geometria', 'Gramática', 'Literatura', 'Brasil Colônia', 'Sistema Solar'];

    const videos = [
        {
            title: "Matemática Básica",
            description: "Fundamentos de matemática para iniciantes",
            duration: "45 min",
            icon: "calculator",
            color: PASTEL_COLORS.blue,
            teacher: "Prof. João Silva",
            subject: "Álgebra"
        },
        {
            title: "Física Moderna",
            description: "Conceitos avançados de física quântica",
            duration: "60 min",
            icon: "atom",
            color: PASTEL_COLORS.green,
            teacher: "Profa. Maria Santos",
            subject: "Física Quântica"
        },
        {
            title: "Química Orgânica",
            description: "Introdução aos compostos orgânicos",
            duration: "50 min",
            icon: "flask",
            color: PASTEL_COLORS.yellow,
            teacher: "Prof. Carlos Oliveira",
            subject: "Química"
        }
    ];

    const handleVideoPress = (video) => {
        setSelectedVideo(video);
        setModalVisible(true);
    };

    return (
        <View style={[styles.container, { backgroundColor: '#FFFFFF' }]}>
            <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
            <ScrollView 
                style={styles.content}
                showsVerticalScrollIndicator={false}
            >
                {/* Filtros */}
                <View style={styles.parametersContainer}>
                    {/* Primeira linha de filtros */}
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
                                backgroundColor: selectedDiscipline ? PASTEL_COLORS.green : '#F5F5F5',
                                flex: 1,
                                marginLeft: 8
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
                    </View>

                    {/* Segunda linha com Assunto */}
                    <View style={[styles.parameterRow, { marginTop: 16 }]}>
                        <TouchableOpacity 
                            style={[styles.parameterButton, { 
                                backgroundColor: selectedSubject ? PASTEL_COLORS.yellow : '#F5F5F5',
                                flex: 1
                            }]}
                            onPress={() => setIsCollapsedSubject(!isCollapsedSubject)}
                        >
                            <FontAwesome name="bookmark" size={16} color="#666666" style={styles.parameterIcon} />
                            <Text style={styles.parameterText}>
                                {selectedSubject || 'Assunto'}
                            </Text>
                            <FontAwesome 
                                name={isCollapsedSubject ? 'chevron-down' : 'chevron-up'} 
                                size={14} 
                                color="#666666" 
                            />
                        </TouchableOpacity>
                    </View>

                    {/* Listas colapsáveis para as opções */}
                    <Collapsible collapsed={isCollapsedYear}>
                        <View style={styles.optionsList}>
                            {years.map((year, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={[
                                        styles.optionItem,
                                        { backgroundColor: selectedYear === year ? PASTEL_COLORS.blue : 'transparent' }
                                    ]}
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

                    <Collapsible collapsed={isCollapsedDiscipline}>
                        <View style={styles.optionsList}>
                            {disciplines.map((discipline, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={[
                                        styles.optionItem,
                                        { backgroundColor: selectedDiscipline === discipline ? PASTEL_COLORS.green : 'transparent' }
                                    ]}
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

                    <Collapsible collapsed={isCollapsedSubject}>
                        <View style={styles.optionsList}>
                            {subjects.map((subject, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={[
                                        styles.optionItem,
                                        { backgroundColor: selectedSubject === subject ? PASTEL_COLORS.yellow : 'transparent' }
                                    ]}
                                    onPress={() => {
                                        setSelectedSubject(subject);
                                        setIsCollapsedSubject(true);
                                    }}
                                >
                                    <Text style={styles.optionText}>{subject}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </Collapsible>
                </View>

                {/* Lista de Vídeos */}
                {videos.map((video, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[styles.videoCard, { backgroundColor: video.color }]}
                        onPress={() => handleVideoPress(video)}
                    >
                        <View style={styles.iconContainer}>
                            <MaterialCommunityIcons 
                                name={video.icon} 
                                size={24} 
                                color="#777777"
                            />
                        </View>
                        <View style={styles.videoInfo}>
                            <Text style={[styles.videoTitle, { color: colors.title }]}>
                                {video.title}
                            </Text>
                            <Text style={[styles.videoDescription, { color: colors.text }]}>
                                {video.description}
                            </Text>
                            <View style={styles.durationContainer}>
                                <MaterialCommunityIcons 
                                    name="clock-outline" 
                                    size={16} 
                                    color="#777777"
                                    style={styles.durationIcon}
                                />
                                <Text style={[styles.duration, { color: colors.text }]}>
                                    {video.duration}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.playButton}>
                            <MaterialCommunityIcons 
                                name="play-circle" 
                                size={24} 
                                color="#777777"
                            />
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            {/* Modal de Vídeo */}
            <Modal
                animationType="slide"
                transparent={false}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <StatusBar backgroundColor="#000000" barStyle="light-content" />
                    {/* Header com Gradiente */}
                    <LinearGradient
                        colors={['rgba(0,0,0,0.8)', 'transparent']}
                        style={styles.modalHeaderGradient}
                    >
                        <TouchableOpacity 
                            style={styles.closeButton}
                            onPress={() => setModalVisible(false)}
                        >
                            <MaterialCommunityIcons 
                                name="close" 
                                size={24} 
                                color="#FFFFFF"
                            />
                        </TouchableOpacity>
                    </LinearGradient>

                    {selectedVideo && (
                        <ScrollView style={styles.videoContent}>
                            {/* Área do Player de Vídeo */}
                            <View style={styles.videoPlayer}>
                                <View style={styles.playerPlaceholder}>
                                    <MaterialCommunityIcons 
                                        name="play-circle-outline" 
                                        size={80} 
                                        color="#FFFFFF"
                                    />
                                </View>
                                {/* Controles do player */}
                                <LinearGradient
                                    colors={['transparent', 'rgba(0,0,0,0.8)']}
                                    style={styles.videoControls}
                                >
                                    <View style={styles.controlsRow}>
                                        <TouchableOpacity style={styles.controlButton}>
                                            <MaterialCommunityIcons name="rewind-10" size={28} color="#FFFFFF" />
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.playPauseButton}>
                                            <MaterialCommunityIcons name="play" size={36} color="#FFFFFF" />
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.controlButton}>
                                            <MaterialCommunityIcons name="fast-forward-10" size={28} color="#FFFFFF" />
                                        </TouchableOpacity>
                                    </View>
                                </LinearGradient>
                            </View>

                            {/* Informações do Vídeo */}
                            <View style={styles.videoDetails}>
                                <Text style={styles.modalVideoTitle}>
                                    {selectedVideo.title}
                                </Text>
                                <View style={styles.teacherRow}>
                                    <MaterialCommunityIcons 
                                        name="account" 
                                        size={20} 
                                        color={COLORS.primary}
                                        style={styles.teacherIcon}
                                    />
                                    <Text style={styles.modalTeacher}>
                                        {selectedVideo.teacher}
                                    </Text>
                                </View>
                                <View style={styles.subjectRow}>
                                    <MaterialCommunityIcons 
                                        name="book-open-variant" 
                                        size={18} 
                                        color="#666666"
                                        style={styles.subjectIcon}
                                    />
                                    <Text style={styles.modalSubject}>
                                        {selectedVideo.subject}
                                    </Text>
                                    <MaterialCommunityIcons 
                                        name="clock-outline" 
                                        size={18} 
                                        color="#666666"
                                        style={styles.durationIcon}
                                    />
                                    <Text style={styles.modalDuration}>
                                        {selectedVideo.duration}
                                    </Text>
                                </View>
                                <View style={styles.divider} />
                                <Text style={styles.descriptionTitle}>Descrição</Text>
                                <Text style={styles.modalDescription}>
                                    {selectedVideo.description}
                                </Text>
                            </View>
                        </ScrollView>
                    )}
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        padding: SIZES.padding,
    },
    // Estilos dos Filtros
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
    // Estilos dos Cards de Vídeo
    videoCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        marginBottom: 12,
        borderRadius: 12,
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    videoInfo: {
        flex: 1,
        marginRight: 10,
    },
    videoTitle: {
        ...FONTS.h6,
        marginBottom: 4,
        fontWeight: 'bold',
    },
    videoDescription: {
        ...FONTS.font,
        marginBottom: 8,
    },
    durationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    durationIcon: {
        marginRight: 6,
    },
    duration: {
        ...FONTS.fontXs,
    },
    playButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    // Estilos do Modal
    modalContainer: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    modalHeaderGradient: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 60,
        zIndex: 1,
        justifyContent: 'center',
    },
    closeButton: {
        position: 'absolute',
        right: 15,
        top: 12,
        padding: 8,
        zIndex: 2,
    },
    videoContent: {
        flex: 1,
    },
    videoPlayer: {
        width: width,
        height: width * 0.5625, // Proporção 16:9
        backgroundColor: '#000000',
        justifyContent: 'center',
        alignItems: 'center',
    },
    playerPlaceholder: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
    },
    videoControls: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 80,
        justifyContent: 'flex-end',
        paddingBottom: 20,
    },
    controlsRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    controlButton: {
        padding: 10,
    },
    playPauseButton: {
        padding: 10,
        marginHorizontal: 30,
    },
    videoDetails: {
        padding: 20,
    },
    modalVideoTitle: {
        ...FONTS.h5,
        color: '#444444',
        marginBottom: 16,
        fontSize: 22,
    },
    teacherRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    teacherIcon: {
        marginRight: 8,
    },
    modalTeacher: {
        ...FONTS.font,
        color: COLORS.primary,
        fontSize: 16,
    },
    subjectRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    subjectIcon: {
        marginRight: 6,
    },
    modalSubject: {
        ...FONTS.fontSm,
        color: '#666666',
        flex: 1,
    },
    durationIcon: {
        marginRight: 6,
        marginLeft: 12,
    },
    modalDuration: {
        ...FONTS.fontSm,
        color: '#666666',
    },
    divider: {
        height: 1,
        backgroundColor: '#EEEEEE',
        marginBottom: 20,
    },
    descriptionTitle: {
        ...FONTS.h6,
        color: '#444444',
        marginBottom: 8,
    },
    modalDescription: {
        ...FONTS.font,
        color: '#666666',
        lineHeight: 24,
    },
});

export default Video;
