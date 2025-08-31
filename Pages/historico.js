import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Alert, TouchableOpacity, Picker, Modal, TextInput } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const SuasDenuncias = () => {
  const navigation = useNavigation();
  const [denuncias, setDenuncias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [idAluno, setIdAluno] = useState(null);
  const [filter, setFilter] = useState('Em análise'); // Filtro
  const [sortOrder, setSortOrder] = useState('Mais recentes'); // Ordem de ordenação
  const [modalVisible, setModalVisible] = useState(false); // Modal de atualização
  const [descricao, setDescricao] = useState(''); // Descrição para atualização
  const [denunciaSelecionada, setDenunciaSelecionada] = useState(null); // Denúncia selecionada para atualização
  const [modalDeleteVisible, setModalDeleteVisible] = useState(false); // Modal de confirmação de exclusão
  const [denunciaParaExcluir, setDenunciaParaExcluir] = useState(null); // Denúncia a ser excluída
  const [modalUpdateSuccessVisible, setModalUpdateSuccessVisible] = useState(false); // Modal de sucesso de atualização
  const [modalDeleteSuccessVisible, setModalDeleteSuccessVisible] = useState(false); // Modal de sucesso de exclusão

  const addOneDay = (dateString) => {
    const date = new Date(dateString);
    date.setDate(date.getDate() + 1); // Adiciona 1 dia
    return date.toLocaleDateString('pt-BR'); // Retorna a data formatada
  };

  const handleAtualizarDenuncia = async () => {
    try {
      if (denunciaSelecionada) {
        const updatedData = {
          descricao,
          tipo_discriminacao: denunciaSelecionada.tipo_discriminacao, // Inclui o tipo de discriminação atualizado
        };
        console.log('Dados enviados:', updatedData); // Verifique os dados enviados
        const response = await axios.put(`http://127.0.0.1:8000/denuncias/${denunciaSelecionada.idDenuncia}`, updatedData); // Faz o PUT para atualizar a denúncia
        console.log('Resposta da API:', response.data); // Verifique a resposta da API

        // Atualizar a denúncia localmente na lista
        setDenuncias(prevDenuncias =>
          prevDenuncias.map(denuncia =>
            denuncia.idDenuncia === denunciaSelecionada.idDenuncia
              ? { ...denuncia, descricao: descricao, tipo_discriminacao: denunciaSelecionada.tipo_discriminacao } // Atualiza a descrição e tipo de discriminação
              : denuncia
          )
        );

        setModalUpdateSuccessVisible(true); // Abre o modal de sucesso
        setModalVisible(false); // Fecha o modal de edição
      }
    } catch (error) {
      console.error('Erro ao atualizar:', error);
      Alert.alert('Erro', 'Não foi possível atualizar a denúncia.');
    }
  };

  const fetchDenuncias = async () => {
    try {
      const alunoData = await AsyncStorage.getItem('aluno');
      const { idAluno } = JSON.parse(alunoData);
      setIdAluno(idAluno);

      const response = await axios.get('http://127.0.0.1:8000/denuncias');
      const filteredDenuncias = response.data.filter(denuncia => denuncia.idDenunciante === idAluno);

      // Filtrando as denúncias com base no filtro selecionado
      const denunciasFiltradas = filteredDenuncias.filter(denuncia => {
        if (filter === 'Em análise') {
          return denuncia.aprovada === 0;
        } else if (filter === 'Pendentes') {
          return denuncia.aprovada === 1 && !denuncia.respondida;
        } else if (filter === 'Recusadas') {
          return denuncia.aprovada === 2;
        } else if (filter === 'Respondidas') {
          return denuncia.aprovada === 1 && denuncia.respondida;
        }
        return true; // Exibe todas as denúncias por padrão
      });

      // Ordenando as denúncias com base no sortOrder
      const orderedDenuncias = denunciasFiltradas.sort((a, b) => {
        const dateA = new Date(a.dataDenuncia);
        const dateB = new Date(b.dataDenuncia);
        // Comparar as datas
        if (sortOrder === 'Mais recentes') {
          return dateB - dateA || b.idDenuncia - a.idDenuncia; // Se as datas forem iguais, ordenar pelo idDenuncia
        } else {
          return dateA - dateB || a.idDenuncia - b.idDenuncia; // Se as datas forem iguais, ordenar pelo idDenuncia
        }
      });

      setDenuncias(orderedDenuncias);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar suas denúncias.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDenuncias();
    const intervalId = setInterval(() => {
      fetchDenuncias();
    }, 5000);
    return () => clearInterval(intervalId);
  }, [filter, sortOrder]); // Adicionado sortOrder à lista de dependências

  const handleDeleteDenuncia = async (idDenuncia) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/denuncias/${idDenuncia}`); // Alteração para DELETE
      setModalDeleteVisible(false);
      setModalDeleteSuccessVisible(true); // Abre o modal de sucesso
      fetchDenuncias(); // Atualiza a lista de denúncias
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível excluir a denúncia.');
    }
  };

  const openUpdateModal = (denuncia) => {
    setDenunciaSelecionada(denuncia);
    setDescricao(denuncia.descricao); // Preenche o campo com a descrição atual
    setModalVisible(true); // Abre o modal
  };

  const openDeleteModal = (denuncia) => {
    setDenunciaParaExcluir(denuncia); // Armazena a denúncia a ser excluída
    setModalDeleteVisible(true); // Abre o modal de confirmação
  };

  const renderDenuncia = ({ item, index }) => {
    let statusText = '';

    if (item.aprovada === 0) {
      statusText = 'Em análise';
    } else if (item.aprovada === 2) {
      statusText = 'Reprovada';
    } else if (item.aprovada === 1 && !item.respondida) {
      statusText = 'Pendente';
    } else if (item.aprovada === 1 && item.respondida) {
      statusText = 'Respondida';
    }

    const backgroundColor = index % 2 === 0 ? styles.lightBackground : styles.alternateBackground;

    return (
      <View style={[styles.denunciaContainer, backgroundColor]}>
        <Text style={styles.fieldTitle}>Denúncia: #{item.idDenuncia}</Text>
        <Text style={styles.fieldTitle}>Nome do Denunciado:</Text>
        <Text style={styles.denunciaText}>{item.nomeDenunciado}</Text>

        <Text style={styles.fieldTitle}>Categoria do Denunciado:</Text>
        <Text style={styles.denunciaText}>
          {item.categoriaDenunciado === 1 ? "Aluno" : item.categoriaDenunciado === 2 ? "Professor" : "Funcionário"}
        </Text>

        {item.categoriaDenunciado === 1 && (
          <View>
            <Text style={styles.fieldTitle}>Turma do Denunciado:</Text>
            <Text style={styles.denunciaText}>{item.turmaDenunciado || "Não informado"}</Text>
          </View>
        )}

        <Text style={styles.fieldTitle}>Tipo de Denúncia:</Text>
        <Text style={styles.denunciaText}>{item.tipo_discriminacao}</Text>

        <Text style={styles.fieldTitle}>Descrição:</Text>
        <Text style={styles.denunciaText}>{item.descricao}</Text>

        <Text style={styles.fieldTitle}>Data da Denúncia:</Text>
        <Text style={styles.denunciaText}>{addOneDay(item.dataDenuncia)}</Text>

        <Text style={styles.fieldTitle}>Status:</Text>
        <Text style={styles.denunciaText}>{statusText}</Text>

        {item.aprovada === 2 && (
          <>
            <Text style={styles.fieldTitle}>Motivo da recusa: </Text>
            <Text style={styles.denunciaText}>{item.motivoRecusa}</Text>
          </>
        )}

          {item.respondida == 1 && (
          <View>
            <Text style={styles.fieldTitle}>Resposta:</Text>
            <Text style={styles.denunciaText}>{item.resposta}</Text>
          </View>
        )}

        {(item.aprovada === 0) && (
          <><TouchableOpacity style={styles.updateButton} onPress={() => openUpdateModal(item)}>
                    <Text style={styles.updateButtonText}>Atualizar</Text>
                </TouchableOpacity><TouchableOpacity style={styles.deleteButton} onPress={() => openDeleteModal(item)}>
                        <Text style={styles.deleteButtonText}>Excluir</Text>
                    </TouchableOpacity></>
        
          
        )}

        {(item.aprovada === 1 || item.aprovada === 2) && (
          <TouchableOpacity style={styles.deleteButton} onPress={() => openDeleteModal(item)}>
            <Text style={styles.deleteButtonText}>Excluir</Text>
          </TouchableOpacity>
        )}

      
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Suas Denúncias</Text>

      {/* Filtro e Ordenação */}
      <View style={styles.filterContainer}>
        <Picker selectedValue={filter} style={styles.filterSelect} onValueChange={setFilter}>
          <Picker.Item label="Em análise" value="Em análise" />
          <Picker.Item label="Pendentes" value="Pendentes" />
          <Picker.Item label="Recusadas" value="Recusadas" />
          <Picker.Item label="Respondidas" value="Respondidas" />
        </Picker>

        <Picker selectedValue={sortOrder} style={styles.filterSelect} onValueChange={setSortOrder}>
          <Picker.Item label="Mais recentes" value="Mais recentes" />
          <Picker.Item label="Mais antigas" value="Mais antigas" />
        </Picker>
      </View>

      {loading ? (
        <Text>Carregando...</Text>
      ) : (
        <FlatList
          data={denuncias}
          renderItem={renderDenuncia}
          keyExtractor={item => item.idDenuncia.toString()}
        />
      )}

      {/* Modal de Atualização */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Atualizar Denúncia</Text>
            <TextInput
              style={styles.modalInput}
              value={descricao}
              onChangeText={setDescricao}
              placeholder="Digite a nova descrição"
            />
            <TouchableOpacity style={styles.modalButtonAtualizar} onPress={handleAtualizarDenuncia}>
              <Text style={styles.modalButtonText}>Atualizar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButtonCancelar1} onPress={() => setModalVisible(false)}>
              <Text style={styles.modalButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal de Confirmação de Exclusão */}
      <Modal
        visible={modalDeleteVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalDeleteVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Tem certeza que deseja excluir?</Text>
            <TouchableOpacity
              style={styles.modalButtonExcluir}
              onPress={() => handleDeleteDenuncia(denunciaParaExcluir.idDenuncia)}>
              <Text style={styles.modalButtonText}>Excluir</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButtonCancelar2}
              onPress={() => setModalDeleteVisible(false)}>
              <Text style={styles.modalButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal de Sucesso de Atualização */}
      <Modal
        visible={modalUpdateSuccessVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalUpdateSuccessVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Atualização realizada com sucesso!</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setModalUpdateSuccessVisible(false)}>
              <Text style={styles.modalButtonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal de Sucesso de Exclusão */}
      <Modal
        visible={modalDeleteSuccessVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalDeleteSuccessVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Exclusão realizada com sucesso!</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setModalDeleteSuccessVisible(false)}>
              <Text style={styles.modalButtonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f7f7f7',
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  filterSelect: {
    width: '45%',
  },
  denunciaContainer: {
    padding: 15,
    backgroundColor: 'white',
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: 'black',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
  },
  lightBackground: {
    backgroundColor: '#e9f5ff',
  },
  alternateBackground: {
    backgroundColor: '#ffffff',
  },
  fieldTitle: {
    fontWeight: 'bold',
    marginVertical: 5,
  },
  denunciaText: {
    marginBottom: 10,
  },
  updateButton: {
    backgroundColor: '#127bfc',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  updateButtonText: {
    color: 'white',
    textAlign: 'center',
  },
  deleteButton: {
    backgroundColor: '#F44336',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  deleteButtonText: {
    color: 'white',
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fundo escuro
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%', // Quadrado
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  modalInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
  },
  modalButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  modalButtonAtualizar: {
    backgroundColor: '#127bfc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  modalButtonCancelar1: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  modalButtonExcluir: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  modalButtonCancelar2: {
    backgroundColor: '#6c757d',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  modalButtonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default SuasDenuncias;
