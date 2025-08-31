import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal, Alert, Picker, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const Home = ({ navigation }) => {
  const [nomeAluno, setNomeAluno] = useState('');
  const [idTurma, setIdTurma] = useState('');
  const [nomeTurma, setNomeTurma] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [assunto, setAssunto] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [showForm, setShowForm] = useState(true);
  const [contatos, setContatos] = useState([]);
  const [selectedButton, setSelectedButton] = useState('create');
  const [filter, setFilter] = useState('recentes');
  const [respondido, setRespondido] = useState(null);

  useEffect(() => {
    const fetchAlunoData = async () => {
      const alunoData = await AsyncStorage.getItem('aluno');
      if (alunoData) {
        const aluno = JSON.parse(alunoData);
        setNomeAluno(aluno.nomeAluno);
        setIdTurma(aluno.idTurma);
        fetchNomeTurma(aluno.idTurma);
      }
    };

    fetchAlunoData();
  }, []);

  const fetchNomeTurma = async (idTurma) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/turmas/${idTurma}`);
      setNomeTurma(response.data.nomeTurma);
    } catch (error) {
      console.error('Erro ao buscar nome da turma:', error);
    }
  };

  const handleSubmit = async () => {
    const contatoData = {
      nomeContatante: nomeAluno,
      turmaContatante: nomeTurma,
      assunto: assunto,
      mensagemContato: mensagem,
    };

    try {
      await axios.post('http://127.0.0.1:8000/contatos', contatoData);
      setModalVisible(true);
      setMensagem('');
      setAssunto('');
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      Alert.alert('Erro ao enviar a mensagem. Tente novamente.');
    }
  };

  const fetchContatos = async (respondido) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/contatos`);
      let filteredContatos = response.data.filter(
        (contato) =>
          contato.nomeContatante === nomeAluno &&
          contato.turmaContatante === nomeTurma &&
          contato.respondido === respondido
      );
  
      // Filtra por mais recentes ou mais antigas
      filteredContatos = filteredContatos.sort((a, b) => {
        return filter === 'recentes'
          ? b.idContato - a.idContato // Ordenar do mais recente para o mais antigo
          : a.idContato - b.idContato; // Ordenar do mais antigo para o mais recente
      });
  
      setContatos(filteredContatos);
    } catch (error) {
      console.error('Erro ao buscar contatos:', error);
      Alert.alert('Erro ao buscar contatos. Tente novamente.');
    }
  };
  
  useEffect(() => {
    // Sempre que 'filter' ou 'respondido' mudar, atualiza os contatos
    if (respondido !== null) {
      fetchContatos(respondido);
    }
  }, [filter, respondido]);
  

  const handleViewContatos = (respondido) => {
    fetchContatos(respondido);
    setShowForm(false);
    setRespondido(respondido);
    setSelectedButton(respondido === 0 ? 'pendentes' : 'respondidos');
  };

  const handleCreateContact = () => {
    setShowForm(true);
    setSelectedButton('create');
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (respondido !== null) {
        fetchContatos(respondido);
      }
    }, 5000); // Atualiza a cada 5 segundos

    return () => clearInterval(interval); // Limpa o intervalo ao desmontar
  }, [respondido]);

  return (
    <View style={styles.container}>
       <br></br>
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => navigation.navigate('Home')} // Adicione a navegação
      >  
        <Text style={styles.backButtonText}>←</Text>  
      </TouchableOpacity>
      <br></br>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, selectedButton === 'create' && styles.selectedButton]}
          onPress={handleCreateContact}
        >
          <Text style={[styles.buttonText, styles.buttonTextSmall]}>Criar Contato</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, selectedButton === 'pendentes' && styles.selectedButton]}
          onPress={() => handleViewContatos(0)}
        >
          <Text style={[styles.buttonText, styles.buttonTextSmall]}>Contatos Pendentes</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, selectedButton === 'respondidos' && styles.selectedButton]}
          onPress={() => handleViewContatos(1)}
        >
          <Text style={[styles.buttonText, styles.buttonTextSmall]}>Contatos Respondidos</Text>
        </TouchableOpacity>
      </View>

      {!showForm && (
        <Picker
        selectedValue={filter}
        onValueChange={(itemValue) => {
          setFilter(itemValue);
          // Ao mudar o filtro, também atualiza os contatos
          if (respondido !== null) {
            fetchContatos(respondido);
          }
        }}
        style={styles.picker}
      >
        <Picker.Item label="Mais recentes" value="recentes" />
        <Picker.Item label="Mais antigas" value="antigas" />
      </Picker>
      
      )}

      {showForm ? (
        <>
          <Text style={styles.title}>Fazer Contato</Text>

          <Text style={styles.label}>Assunto:</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite o assunto aqui"
            value={assunto}
            onChangeText={setAssunto}
          />

          <Text style={styles.label}>Mensagem:</Text>
          <TextInput
            style={styles.inputMensagem}
            placeholder="Digite sua mensagem aqui"
            value={mensagem}
            onChangeText={setMensagem}
            multiline
          />

          <TouchableOpacity style={styles.sendButton} onPress={handleSubmit}>
            <Text style={styles.sendButtonText}>Enviar</Text>
          </TouchableOpacity>

          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Mensagem Enviada</Text>
                <Text style={styles.modalMessage}>Sua mensagem foi enviada com sucesso!</Text>
                <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                  <Text style={styles.closeButtonText}>Fechar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </>
      ) : (
        <ScrollView>
          <Text style={styles.title}>
            {respondido === 0 ? 'Contatos Pendentes' : 'Contatos Respondidos'}
          </Text>
          {contatos.map((contato, index) => (
            <View key={index} style={styles.contatoItem}>
              <Text style={styles.contatoTextN}>Contato #{contato.idContato}</Text>
              <Text style={styles.contatoTextN}>Assunto:</Text>
              <Text style={styles.contatoText}>{contato.assunto}</Text>
              <Text style={styles.contatoTextN}>Mensagem:</Text>
              <Text style={styles.contatoText}>{contato.mensagemContato}</Text>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#a9dff7',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  button: {
    flex: 1,
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 5,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 2,
  },
  selectedButton: {
    backgroundColor: '#0056b3',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonTextSmall: {
    fontSize: 14,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 10,
    color: 'black',
  },
  input: {
    height: 50,
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  inputMensagem: {
    height: 100,
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  sendButton: {
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 2,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  modalMessage: {
    marginVertical: 10,
    textAlign: 'center',
  },
  closeButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  contatoItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 1,
  },
  contatoTextN: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  contatoText: {
    fontSize: 16,
    marginBottom: 5,
    color: '#666',
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 20,
    backgroundColor: '#fff',
  },

  backButton: {  
      bottom: 20,   
      borderRadius: 5,
      height: 25,
      width: 70,
      alignItems: 'center',
      marginLeft: -12,
        marginTop: 10,
     },  
     backButtonText: {  
      color: '#FFFFFF',  
      fontSize: 50,  
      fontWeight: 'bold',
    marginTop: -43,
    color: '#00008B',
     },  
});

export default Home;
