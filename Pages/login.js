import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import { Provider as PaperProvider, TextInput as PaperTextInput } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = () => {
    const [rm, setRm] = useState('');
    const [senha, setSenha] = useState('');
    const [tipoUsuario, setTipoUsuario] = useState('aluno');
    const [mensagem, setMensagem] = useState('');
    const navigation = useNavigation();

    const handleLogin = async () => {
        if (rm.trim() === '' || senha.trim() === '') {
            Alert.alert('Erro', 'Por favor, preencha todos os campos.');
            return;
        }

        try {
            let response;
            if (tipoUsuario === 'aluno') {
                response = await axios.post('http://127.0.0.1:8000/login/aluno', {
                    rmAluno: rm,
                    senhaAluno: senha,
                });
            } else if (tipoUsuario === 'admin') {
                response = await axios.post('http://127.0.0.1:8000/login/admin', {
                    rmAdmin: rm,
                    senhaAdmin: senha,
                });
            } else if (tipoUsuario === 'diretor') {
                response = await axios.post('http://127.0.0.1:8000/login/diretor', {
                    rmDiretor: rm,
                    senhaDiretor: senha,
                });
            }

            if (response.status === 200) {
                setMensagem('Login bem-sucedido!');

                // Armazenando o ID do usuário com base no tipo
                if (tipoUsuario === 'admin') {
                    await AsyncStorage.setItem('idAdmin', JSON.stringify(response.data.idAdmin));
                    navigation.navigate('Admin');
                } else if (tipoUsuario === 'diretor') {
                    await AsyncStorage.setItem('idDiretor', JSON.stringify(response.data.diretor.idDiretor)); // Atualizar para o ID correto
                    navigation.navigate('Diretor');
                } else {
                    await AsyncStorage.setItem('aluno', JSON.stringify(response.data));
                    navigation.navigate('Home');
                }
            }
        } catch (error) {
            if (error.response) {
                setMensagem('Login inválido! RM ou senha incorretos.');
            } else {
                setMensagem('Erro na conexão com o servidor.');
            }
        }
    };

    return (
        <PaperProvider>
            <View style={styles.container}>
                <Image
                    source={require('../assets/Icon-Combatec.png')}
                    style={styles.logo}
                />
                <Text style={styles.label}>Tipo de Usuário:</Text>
                <Picker
                    selectedValue={tipoUsuario}
                    onValueChange={(itemValue) => setTipoUsuario(itemValue)}
                    style={styles.picker}
                >
                    <Picker.Item label="Aluno" value="aluno" />
                    <Picker.Item label="Diretor" value="diretor" />
                    <Picker.Item label="Administrador" value="admin" />
                </Picker>
                <PaperTextInput
                    label="RM"
                    value={rm}
                    onChangeText={setRm}
                    style={styles.input}
                    keyboardType="number-pad"
                    autoCapitalize="none"
                    mode="outlined"
                />
                <PaperTextInput
                    label="Senha"
                    value={senha}
                    onChangeText={setSenha}
                    style={styles.input}
                    secureTextEntry
                    mode="outlined"
                />
                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Entrar</Text>
                </TouchableOpacity>
                {mensagem && <Text style={styles.mensagem}>{mensagem}</Text>}
            </View>
        </PaperProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#87CEEB',
        padding: 16,
    },
    button: {
        backgroundColor: '#4682B4',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    input: {
        marginBottom: 12,
    },
    logo: {
        width: 230,
        height: 230,
        alignSelf: 'center',
        marginBottom: 20,
    },
    label: {
        marginVertical: 8,
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    picker: {
        height: 50,
        width: '100%',
        marginBottom: 12,
    },
    mensagem: {
        color: 'red',
        textAlign: 'center',
        marginTop: 10,
    },
});

export default Login;
