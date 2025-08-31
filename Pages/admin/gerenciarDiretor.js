import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const DiretoresScreen = () => {
    const [diretores, setDiretores] = useState([]);

    // Função para buscar diretores
    const fetchDiretores = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/diretores'); // Substitua pelo seu IP
            const data = await response.json();
            setDiretores(data);
        } catch (error) {
            console.error('Erro ao buscar diretores:', error);
        }
    };

    // Função para excluir diretor
    const deleteDiretor = async (idDiretor) => {
        console.log(`Tentativa de excluir o diretor com ID: ${idDiretor}`); // Log para verificar a chamada

        try {
            const response = await fetch(`http://127.0.0.1:8000/diretores/${idDiretor}`, { // Substitua pelo seu IP
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json', // Certifique-se de definir o tipo de conteúdo
                },
            });

            console.log('Status da resposta:', response.status); // Log do status da resposta

            if (response.ok) {
                Alert.alert("Sucesso", "Diretor excluído com sucesso!");
                fetchDiretores(); // Atualiza a lista após a exclusão
            } else {
                const errorData = await response.json(); // Captura dados do erro
                console.error('Erro da API:', errorData);
                Alert.alert("Erro", "Não foi possível excluir o diretor: " + errorData.error);
            }
        } catch (error) {
            console.error('Erro de rede:', error);
            Alert.alert("Erro", "Não foi possível excluir o diretor.");
        }
    };

    useEffect(() => {
        fetchDiretores(); // Busca inicial

        // Define um intervalo para atualizar a lista a cada 5 segundos
        const intervalId = setInterval(() => {
            fetchDiretores();
        }, 5000);

        // Limpa o intervalo quando o componente for desmontado
        return () => clearInterval(intervalId);
    }, []);

    // Renderização do componente
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Diretores Cadastrados</Text>
            <FlatList
                data={diretores}
                keyExtractor={(item) => item.idDiretor.toString()}
                renderItem={({ item }) => (
                    <View style={styles.itemContainer}>
                        <Image
                            source={{ uri: `./../../assets/usuarios/diretor/${item.fotoDiretor}` }} // Ajuste a URL da imagem
                            style={styles.image}
                        />
                        <View style={styles.textContainer}>
                            <Text style={styles.name}>{item.nomeDiretor}</Text>
                            <Text style={styles.email}>{item.emailDiretor}</Text>
                            <Text style={styles.rm}>{item.rmDiretor}</Text>
                        </View>
                        <TouchableOpacity onPress={() => deleteDiretor(item.idDiretor)} style={styles.deleteButton}>
                            <Text style={styles.deleteButtonText}>Excluir</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    );
};

// Estilos do componente
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        marginBottom: 10,
        borderRadius: 8,
        backgroundColor: '#f9f9f9',
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },
    textContainer: {
        flex: 1,
        marginRight: 10,
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    email: {
        fontSize: 14,
        color: '#555',
    },
    rm: {
        fontSize: 12,
        color: '#777',
    },
    deleteButton: {
        backgroundColor: 'red',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    deleteButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default DiretoresScreen;
