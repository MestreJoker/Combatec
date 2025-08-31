import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const Perfil = () => {
  const [aluno, setAluno] = useState(null);
  const [turma, setTurma] = useState(null);
  const navigation = useNavigation(); // Hook para navegação

  useEffect(() => {
    const loadAlunoData = async () => {
      const alunoData = await AsyncStorage.getItem('aluno');
      if (alunoData) {
        const alunoInfo = JSON.parse(alunoData);
        setAluno(alunoInfo);
        
        // Consulta à API para obter o nome da turma
        const response = await fetch(`http://127.0.0.1:8000/turmas/${alunoInfo.idTurma}`);
        const turmaData = await response.json();
        setTurma(turmaData.nomeTurma); // Supondo que a resposta tenha a propriedade nomeTurma
      }
    };
    loadAlunoData();
  }, []);

  if (!aluno || !turma) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Carregando...</Text>
      </View>
    );
  }

  // Caminho da imagem do aluno
  const imagePath = `./../assets/usuarios/aluno/${aluno.fotoAluno}`;

  return (
    <View style={styles.container}>
      <ImageBackground 
        source={require('../assets/background.jpg')} 
        style={styles.background}
      >
        <Text style={styles.title}>Perfil do Aluno</Text>
        
        {/* Imagem do aluno */}
        <Image
          source={{ uri: imagePath }}
          style={styles.profileImage}
          resizeMode="cover"
        />

        {/* Nome do aluno abaixo da imagem */}
        <Text style={styles.nomeAluno}>{aluno.nomeAluno}</Text>

        {/* Informações do aluno */}
        <View style={styles.infoContainer}>
          <Text style={styles.infoTextN}>Email:</Text>
          <Text style={styles.infoText}>{aluno.emailAluno}</Text>
          <Text style={styles.infoTextN}>RM:</Text>
          <Text style={styles.infoText}>{aluno.rmAluno}</Text>
          <Text style={styles.infoTextN}>Nome da Turma:</Text>
          <Text style={styles.infoText}>{turma}</Text>
        </View>

        {/* Botão Voltar */}
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Home')}>
          <Text style={styles.backButtonText}>Voltar</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center', // Centraliza o conteúdo horizontalmente
    
  },
  background: {
    flex: 1,
    justifyContent: 'flex-start', // Mover o conteúdo para o topo
    alignItems: 'center',
    paddingTop: 50, // Espaço extra no topo
    width: '100%',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginVertical: 10, // Reduzido para trazer mais para cima
    color: '#fff',
  },
  profileImage: {
    width: 120, // Aumentado para dar mais destaque
    height: 120, // Aumentado para dar mais destaque
    borderRadius: 60, // Torna a imagem redonda
    marginBottom: 10, // Espaço entre a imagem e o nome
  },
  nomeAluno: {
    fontSize: 22, // Tamanho maior
    fontWeight: 'bold', // Em negrito
    marginBottom: 10, // Espaço abaixo do nome
  },
  infoContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 20,
    borderRadius: 10,
    width: 320,
  },
  infoTextN: {
    fontSize: 18,
    marginVertical: 5,
    fontWeight: 'bold',
  },
  infoText: {
    fontSize: 18,
    marginVertical: 5,
    marginTop: -3,
  },
  loadingText: {
    fontSize: 20,
    textAlign: 'center',
  },
  backButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#005ed1',
    borderRadius: 5,
    width: 300,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default Perfil;
