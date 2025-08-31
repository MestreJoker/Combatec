import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const IdDiretor = () => {
    const [diretor, setDiretor] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();

    useEffect(() => {
        const fetchDiretorData = async () => {
            try {
                const storedId = await AsyncStorage.getItem('idDiretor');
                if (storedId !== null) {
                    const response = await fetch(`http://127.0.0.1:8000/diretores/${storedId}`);
                    const diretorData = await response.json();
                    setDiretor(diretorData);
                } else {
                    setDiretor(null);
                }
            } catch (error) {
                console.error('Erro ao obter dados do Diretor:', error);
                setDiretor(null);
            } finally {
                setLoading(false);
            }
        };

        fetchDiretorData();
    }, []);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#4682B4" />
                <Text style={styles.loadingText}>Carregando...</Text>
            </View>
        );
    }

    if (!diretor) {
        return (
            <View style={styles.container}>
                <Text style={styles.label}>Diretor não encontrado.</Text>
                <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
                    <Text style={styles.buttonText}>Voltar</Text>
                </TouchableOpacity>
            </View>
        );
    }

    const imagePath = `./../assets/usuarios/diretor/${diretor.fotoDiretor}`;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Perfil do Diretor</Text>
            
            <Image
                source={{ uri: imagePath }}
                style={styles.profileImage}
                resizeMode="cover"
            />

            <Text style={styles.nomeDiretor}>{diretor.nomeDiretor}</Text>

            <View style={styles.infoContainer}>
                <Text style={styles.label}>Email:</Text>
                <Text style={styles.infoText}>{diretor.emailDiretor}</Text>
                <Text style={styles.label}>RM:</Text>
                <Text style={styles.infoText}>{diretor.rmDiretor}</Text>
            </View>

            <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
                <Text style={styles.buttonText}>Voltar</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#8fffa5',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#87CEEB',
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: '#4682B4',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginVertical: 10,
        color: '#fff',
    },
    profileImage: {
        width: 130,
        height: 130,
        borderRadius: 65,
        borderWidth: 3,
        borderColor: '#fff',
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
    },
    nomeDiretor: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 15,
        color: '#fff',
    },
    infoContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        padding: 25,
        borderRadius: 10,
        marginBottom: 20,
        width: '90%',
        alignItems: 'flex-start', // Alinhando à esquerda
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold', // Negrito para os títulos
        color: '#333',
    },
    infoText: {
        fontSize: 18,
        color: '#333',
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#4684',
        padding: 15,
        borderRadius: 8,
        width: '60%',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default IdDiretor;
