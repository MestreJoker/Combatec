import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native'; // Importando o hook de navegação

const IdAdmin = () => {
    const [admin, setAdmin] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation(); // Usando o hook de navegação

    useEffect(() => {
        const fetchAdminData = async () => {
            try {
                const storedId = await AsyncStorage.getItem('idAdmin');
                if (storedId !== null) {
                    const response = await fetch(`http://127.0.0.1:8000/admins/${storedId}`);
                    const adminData = await response.json();
                    setAdmin(adminData);
                } else {
                    setAdmin(null);
                }
            } catch (error) {
                console.error('Erro ao obter dados do Admin:', error);
                setAdmin(null);
            } finally {
                setLoading(false);
            }
        };

        fetchAdminData();
    }, []);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#4682B4" />
                <Text style={styles.loadingText}>Carregando...</Text>
            </View>
        );
    }

    if (!admin) {
        return (
            <View style={styles.container}>
                <Text style={styles.label}>Admin não encontrado.</Text>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Estatisticas')}>
                    <Text style={styles.buttonText}>Voltar</Text>
                </TouchableOpacity>
            </View>
        );
    }

    const imagePath = `./../assets/usuarios/admin/${admin.fotoAdmin}`;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Perfil do Admin</Text>
            
            <Image
                source={{ uri: imagePath }}
                style={styles.profileImage}
                resizeMode="cover"
            />

            <Text style={styles.nomeAdmin}>{admin.nomeAdmin}</Text>

            <View style={styles.infoContainer}>
                <Text style={styles.infoTitle}>Email:</Text>
                <Text style={styles.infoText}>{admin.emailAdmin}</Text>
                
                <Text style={styles.infoTitle}>RM:</Text>
                <Text style={styles.infoText}>{admin.rmAdmin}</Text>
            </View>

            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Estatisticas')}>
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
        backgroundColor: '#ffa1b2',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FAEBD7',
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: '#4682B4',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#000',
    },
    profileImage: {
        width: 130,
        height: 130,
        borderRadius: 65,
        borderWidth: 3,
        borderColor: 'black',
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
    },
    nomeAdmin: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 15,
        color: '#000',
    },
    infoContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        padding: 25,
        borderRadius: 10,
        marginBottom: 20,
        width: '90%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
    },
    infoTitle: {
        fontSize: 18,
        color: '#333',
        marginBottom: 5,
        fontWeight: 'bold',
    },
    infoText: {
        fontSize: 18,
        color: '#333',
        marginBottom: 15,
        textAlign: 'left',
    },
    button: {
        backgroundColor: '#CD5C5C', // Mesma cor do Drawer Navigation
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

export default IdAdmin;
