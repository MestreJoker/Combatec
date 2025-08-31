import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Button,
  FlatList,
  Modal,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import axios from 'axios';

const Contatos = () => {
  const [contatos, setContatos] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedContato, setSelectedContato] = useState(null);
  const [resposta, setResposta] = useState('');

  useEffect(() => {
    fetchContatos();
  }, []);

  const fetchContatos = async () => {
    try {
      const response = await axios.get('http://localhost:8000/contatos');
      setContatos(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const responderContato = async () => {
    if (!resposta) {
      Alert.alert('Erro', 'Por favor, insira uma resposta.');
      return;
    }

    try {
      await axios.put(`http://localhost:8000/contatos/${selectedContato.idContato}`, {
        resposta,
        respondido: 1,
      });
      setResposta('');
      setModalVisible(false);
      setSelectedContato(null);
      fetchContatos(); // Refresh contatos
    } catch (error) {
      console.error(error);
    }
  };

  const renderContato = ({ item }) => {
    return (
      <View style={styles.contatoContainer}>
        <Text style={styles.nome}>{item.nomeContatante}</Text>
        <Text>{item.turmaContatante}</Text>
        <Text>{item.assunto}</Text>
        <Text>{item.mensagemContato}</Text>
        <Text style={styles.status}>
          {item.respondido ? 'Respondido' : 'Pendente'}
        </Text>
        {!item.respondido && (
          <Button
            title="Responder Contato"
            onPress={() => {
              setSelectedContato(item);
              setModalVisible(true);
            }}
          />
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Contatos</Text>
      <View style={styles.buttonContainer}>
        <Button title="Pendentes" onPress={() => {}} />
        <Button title="Respondidos" onPress={() => {}} />
      </View>
      <FlatList
        data={contatos.filter(contato => contato.deleted === 0)}
        renderItem={renderContato}
        keyExtractor={item => item.idContato.toString()}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Responder Contato</Text>
          <TextInput
            style={styles.textInput}
            multiline
            numberOfLines={4}
            placeholder="Digite sua resposta aqui..."
            value={resposta}
            onChangeText={setResposta}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={responderContato}
          >
            <Text style={styles.buttonText}>Responder</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.buttonText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  contatoContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  nome: {
    fontWeight: 'bold',
  },
  status: {
    color: 'red',
    fontWeight: 'bold',
  },
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 20,
    color: '#fff',
  },
  textInput: {
    width: '100%',
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
  },
  buttonText: {
    color: '#fff',
  },
});

export default Contatos;
