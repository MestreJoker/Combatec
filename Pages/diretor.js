import React, { useState, useEffect } from 'react';  
import { View, Text, Button, StyleSheet, FlatList, Alert, TouchableOpacity, Modal, TextInput, CheckBox } from 'react-native';  
import { Picker } from '@react-native-picker/picker';  

const Denuncias = ({ navigation }) => {  
  const [denuncias, setDenuncias] = useState([]);  
  const [filteredDenuncias, setFilteredDenuncias] = useState([]);  
  const [isRespondida, setIsRespondida] = useState(false);  
  const [sortOrder, setSortOrder] = useState('maisRecente');  
  const [modalVisible, setModalVisible] = useState(false);  
  const [modalResposta, setModalResposta] = useState(false);  
  const [modalRespostaTirada, setModalRespostaTirada] = useState(false);  
  const [denunciaSelecionada, setDenunciaSelecionada] = useState(null);  
  const [resposta, setResposta] = useState('');  
  const [respostaAutomatica, setRespostaAutomatica] = useState(false);  
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);  
  const [confirmRespostaModalVisible, setConfirmRespostaModalVisible] = useState(false);  

  useEffect(() => {  
    fetchDenuncias();  
    const interval = setInterval(() => {  
      fetchDenuncias();  
    }, 5000);  
    return () => clearInterval(interval);  
  }, []);  

  useEffect(() => {  
    filterDenuncias();  
  }, [denuncias, isRespondida, sortOrder]);  

  const fetchDenuncias = async () => {  
    try {  
      const response = await fetch('http://127.0.0.1:8000/denuncias');  
      const data = await response.json();  

      const denunciasComDados = data.map(denuncia => {  
        return {  
          ...denuncia,  
          nomeDenunciado: denuncia.nomeDenunciado || 'Não encontrado',  
          turmaNome: denuncia.turmaDenunciante || 'Não informado',  
        };  
      });  

      setDenuncias(denunciasComDados);  
      filterDenuncias(denunciasComDados);  
    } catch (error) {  
      console.error('Erro ao buscar denúncias:', error);  
      Alert.alert('Erro', 'Não foi possível carregar as denúncias.');  
    }  
  };  

  const filterDenuncias = (denunciasToFilter = denuncias) => {  
    const filtered = denunciasToFilter.filter(denuncia =>  
      denuncia.aprovada === 1 && denuncia.respondida === isRespondida  
    );  

    const sortedDenuncias = filtered.sort((a, b) => {  
      return sortOrder === 'maisRecente' ? b.idDenuncia - a.idDenuncia : a.idDenuncia - b.idDenuncia;  
    });  

    setFilteredDenuncias(sortedDenuncias);  
  };  

  const handleResponderDenuncia = (idDenuncia) => {  
    setDenunciaSelecionada(idDenuncia);  
    setModalVisible(true);  
  };  

  const handleFecharModal = () => {  
    setModalVisible(false);  
    setModalResposta(false);  
    setModalRespostaTirada(false);  
    setConfirmModalVisible(false);  
    setConfirmRespostaModalVisible(false);  
  };  

  const handleResponderDenunciaModal = () => {  
    setConfirmRespostaModalVisible(true);
    setModalVisible(false);
  };  

  const handleConfirmarResposta = () => {  
    if (respostaAutomatica) {  
      fetch(`http://127.0.0.1:8000/denuncias/${denunciaSelecionada}`, {  
        method: 'PUT',  
        headers: {  
          'Content-Type': 'application/json',  
        },  
        body: JSON.stringify({  
          resposta: 'A denúncia está sendo investigada',  
          respondida: 1,  
        }),  
      })  
        .then(response => response.json())  
        .then(data => {  
          console.log(data);  
          setModalVisible(false);
          setConfirmRespostaModalVisible(false);  
          setModalResposta(true);  
        })  
        .catch(error => {  
          console.error('Erro ao atualizar denúncia:', error);  
          Alert.alert('Erro', 'Não foi possível atualizar a denúncia.');  
        });  
    } else {  
      fetch(`http://127.0.0.1:8000/denuncias/${denunciaSelecionada}`, {  
        method: 'PUT',  
        headers: {  
          'Content-Type': 'application/json',  
        },  
        body: JSON.stringify({  
          resposta: resposta,  
          respondida: 1,  
        }),  
      })  
        .then(response => response.json())  
        .then(data => {  
          console.log(data);  
          setModalVisible(false);
          setConfirmRespostaModalVisible(false);   
          setModalResposta(true);  
        })  
        .catch(error => {  
          console.error('Erro ao atualizar denúncia:', error);  
          Alert.alert('Erro', 'Não foi possível atualizar a denúncia.');  
        });  
    }  
  };  
  
  const handleTirarResposta = (idDenuncia) => {  
    setConfirmModalVisible(true);  
    setDenunciaSelecionada(idDenuncia);  
  };  
    
  const handleConfirmarRemoverResposta = () => {  
    fetch(`http://127.0.0.1:8000/denuncias/${denunciaSelecionada}`, {  
      method: 'PUT',  
      headers: {  
        'Content-Type': 'application/json',  
      },  
      body: JSON.stringify({  
        resposta: "",  
        respondida: 0,  
      }),  
    })  
      .then(response => response.json())  
      .then(data => {  
        console.log(data);  
  
        // Atualize o estado localmente  
        const updatedDenuncias = denuncias.map((denuncia) =>  
          denuncia.idDenuncia === denunciaSelecionada  
            ? { ...denuncia, resposta: "", respondida: 0 }  
            : denuncia  
        );  
  
        setDenuncias(updatedDenuncias);  
        filterDenuncias(updatedDenuncias);  
        setModalRespostaTirada(true);  
        setConfirmModalVisible(false);  
      })  
      .catch(error => {  
        console.error('Erro ao atualizar denúncia:', error);  
        Alert.alert('Erro', 'Não foi possível atualizar a denúncia.');  
      });  
  };  
    
  const renderDenuncia = ({ item, index }) => {  
    const categoria = item.categoriaDenunciado === 1 ?  
      'Aluno' :  
      item.categoriaDenunciado === 2 ?  
        'Professor' :  
        'Funcionário';  
  
    const backgroundColor = index % 2 === 0 ? '#deffe7' : '#FFF8DC';  
  
    return (  
      <View style={[styles.denunciaContainer, { backgroundColor }]}>  
        <Text style={styles.tituloText}>Tipo da denúncia:</Text>  
        <Text style={styles.denunciaText}>{item.tipoDenuncia}</Text>  
  
        <Text style={styles.tituloText}>Tipo da discriminação:</Text>  
        <Text style={styles.denunciaText}>  
          {item.tipo_discriminacao}  
        </Text>  
  
        <Text style={styles.tituloText}>Nome do Denunciante:</Text>  
        <Text style={styles.denunciaText}>  
          {item.publica === 0 ? "Anônimo" : item.nomeDenunciante}  
        </Text>  
  
        <Text style={styles.tituloText}>Turma do Denunciante:</Text>  
        <Text style={styles.denunciaText}>  
          {item.publica === 0 ? "Anônima" : item.turmaNome}  
        </Text>  
  
        <Text style={styles.tituloText}>Nome do Denunciado:</Text>  
        <Text style={styles.denunciaText}>{item.nomeDenunciado}</Text>  
  
        <Text style={styles.tituloText}>Categoria do Denunciado:</Text>  
        <Text style={styles.denunciaText}>{categoria}</Text>  
  
        {item.categoriaDenunciado === 1 && (  
          <>  
            <Text style={styles.tituloText}>Turma do Denunciado:</Text>  
            <Text style={styles.denunciaText}>{item.turmaDenunciado || "Não informado"}</Text>  
          </>  
        )}  
  
        <Text style={styles.tituloText}>Data da Denúncia:</Text>  
        <Text style={styles.denunciaText}>{new Date(item.dataDenuncia).toLocaleDateString()}</Text>  
  
        <Text style={styles.tituloText}>Descrição da Denúncia:</Text>  
        <Text style={styles.denunciaText}>{item.descricao}</Text>  
  
        {item.respondida == 1 && (  
          <>  
            <Text style={styles.tituloText}>Resposta:</Text>  
            <Text style={styles.denunciaText}>{item.resposta}</Text>  
          </>  
        )}  
  
        <View style={styles.buttonContainer}>  
          <Button  
            title={item.respondida ? "Tirar Resposta" : "Responder Denúncia"}  
            onPress={() => item.respondida ? handleTirarResposta(item.idDenuncia) : handleResponderDenuncia(item.idDenuncia)}  
          />  
        </View>  
      </View>  
    );  
  };  
  
  const handleFilterChange = (status) => {  
    setIsRespondida(status);  
  };  
  
  return (  
    <View style={styles.container}>  
      <Text style={styles.title}>Denúncias</Text>  
      <View style={styles.filterContainer}>  
        <TouchableOpacity  
          style={[styles.filterButton, !isRespondida ? styles.activeFilter : null]}  
          onPress={() => handleFilterChange(false)}  
        >  
          <Text style={styles.filterButtonText}>Pendentes</Text>  
        </TouchableOpacity>  
        <TouchableOpacity  
          style={[styles.filterButton, isRespondida ? styles.activeFilter : null]}  
          onPress={() => handleFilterChange(true)}  
        >  
          <Text style={styles.filterButtonText}>Respondidas</Text>  
        </TouchableOpacity>  
      </View>    
  
         <View style={styles.sortContainer}>  
  <Text style={styles.sortLabel}>Ordenar por:</Text>  
  <Picker  
    selectedValue={sortOrder}  
    style={styles.picker}  
    onValueChange={(itemValue) => setSortOrder(itemValue)}  
  >  
    <Picker.Item label="Mais Recente" value="maisRecente" />  
    <Picker.Item label="Mais Antigo" value="maisAntigo" />  
  </Picker>  
</View>  

<FlatList  
  data={filteredDenuncias}  
  keyExtractor={(item) => item.idDenuncia.toString()}  
  renderItem={renderDenuncia}  
/>  

<Modal  
  visible={modalVisible}  
  transparent={true}  
  onRequestClose={() => setModalVisible(false)}  
>  
  <View style={styles.modalOverlay}>  
    <View style={styles.modalContainer}>  
      <Text style={styles.modalTitle}>Inserir Resposta</Text>  
      <TextInput  
        style={styles.modalInput}  
        value={resposta}  
        onChangeText={(text) => setResposta(text)}  
        editable={!respostaAutomatica}  
        placeholder="Digite sua resposta"  
      />  
      <View style={styles.modalCheckboxContainer}>  
        <CheckBox  
          value={respostaAutomatica}  
          onValueChange={(value) => setRespostaAutomatica(value)}  
        />  
        <Text style={styles.modalCheckboxText}>Resposta automática</Text>  
      </View>  
      <TouchableOpacity style={styles.modalButton} onPress={handleResponderDenunciaModal}>  
        <Text style={styles.modalButtonText}>Responder</Text>  
      </TouchableOpacity>  
      <TouchableOpacity style={styles.modalButtonCancelar} onPress={handleFecharModal}>  
        <Text style={styles.modalButtonText}>Cancelar</Text>  
      </TouchableOpacity>  
    </View>  
  </View>  
</Modal>  

<Modal  
  visible={modalResposta}  
  transparent={true}  
  onRequestClose={() => setModalResposta(false)}  
>  
  <View style={styles.modalOverlay}>  
    <View style={styles.modalContainer2}>  
      <Text style={styles.modalTitle}>Denúncia respondida!</Text>  
      <TouchableOpacity style={styles.modalButton} onPress={handleFecharModal}>  
        <Text style={styles.modalButtonText}>Ok</Text>  
      </TouchableOpacity>  
    </View>  
  </View>  
</Modal>  

<Modal  
  visible={modalRespostaTirada}  
  transparent={true}  
  onRequestClose={() => setModalRespostaTirada(false)}  
>  
  <View style={styles.modalOverlay}>  
    <View style={styles.modalContainer2}>  
      <Text style={styles.modalTitle}>Resposta removida!</Text>  
      <TouchableOpacity style={styles.modalButton} onPress={handleFecharModal}>  
        <Text style={styles.modalButtonText}>Ok</Text>  
      </TouchableOpacity>  
    </View>  
  </View>  
</Modal>  

<Modal  
  visible={confirmModalVisible}  
  transparent={true}  
  onRequestClose={() => setConfirmModalVisible(false)}  
>  
  <View style={styles.modalOverlay}>  
    <View style={styles.modalContainer4}>  
      <Text style={styles.modalTitle}>Você deseja remover a resposta dessa denúncia?</Text>  
      <TouchableOpacity style={styles.modalButton} onPress={handleConfirmarRemoverResposta}>  
        <Text style={styles.modalButtonText}>Sim</Text>  
      </TouchableOpacity>  
      <TouchableOpacity style={styles.modalButtonCancelar} onPress={handleFecharModal}>  
        <Text style={styles.modalButtonText}>Não</Text>  
      </TouchableOpacity>  
    </View>  
  </View>  
</Modal>  

<Modal  
  visible={confirmRespostaModalVisible}  
  transparent={true}  
  onRequestClose={() => setConfirmRespostaModalVisible(false)}  
>  
  <View style={styles.modalOverlay}>  
    <View style={styles.modalContainer3}>  
      <Text style={styles.modalTitle}>Você deseja enviar essa Resposta?</Text>  
      <Text style={styles.modalText}>{respostaAutomatica ? 'A denúncia está sendo investigada' : resposta}</Text>  
      <TouchableOpacity style={styles.modalButton} onPress={handleConfirmarResposta}>  
        <Text style={styles.modalButtonText}>Sim</Text>  
      </TouchableOpacity>  
      <TouchableOpacity style={styles.modalButtonCancelar} onPress={handleFecharModal}>  
        <Text style={styles.modalButtonText}>Não</Text>  
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
   backgroundColor: '#fff',  
  },  
  title: {  
   fontSize: 24,  
   fontWeight: 'bold',  
   marginBottom: 20,  
  },  
  denunciaContainer: {  
   padding: 15,  
   marginVertical: 8,  
   borderRadius: 5,  
   elevation: 2,  
  },  
  tituloText: {  
   fontSize: 16,  
   fontWeight: 'bold',  
  },  
  denunciaText: {  
   fontSize: 16,  
   marginBottom: 10,  
  },  
  buttonContainer: {  
   marginTop: 10,  
  },  
  filterContainer: {  
   flexDirection: 'row',  
   justifyContent: 'space-between',  
   marginBottom: 20,  
  },  
  filterButton: {  
   flex: 1,  
   padding: 10,  
   backgroundColor: '#ccc',  
   borderRadius: 5,  
   alignItems: 'center',  
  },  
  activeFilter: {  
   backgroundColor: '#88ff88',  
  },  
  sortContainer: {  
   flexDirection: 'row',  
   alignItems: 'center',  
   marginBottom: 20,  
  },  
  sortLabel: {  
   marginRight: 10,  
  },  
  picker: {  
   flex: 1,  
  },  
  
  modalOverlay: {  
   flex: 1,  
   backgroundColor: 'rgba(0, 0, 0, 0.5)',  
   justifyContent: 'center',  
   alignItems: 'center',  
  },  
  modalContainer: {  
   width: 300,  
   height: 300,  
   backgroundColor: '#fff',  
   borderRadius: 20,  
   padding: 20,  
   justifyContent: 'space-between',  
   alignItems: 'center',  
   shadowColor: '#000',  
   shadowOffset: { width: 0, height: 2 },  
   shadowOpacity: 0.25,  
   shadowRadius: 4,  
   elevation: 5,  
  },  
  modalContainer2: {  
   width: 300,  
   height: 140,  
   backgroundColor: '#fff',  
   borderRadius: 20,  
   padding: 20,  
   justifyContent: 'space-between',  
   alignItems: 'center',  
   shadowColor: '#000',  
   shadowOffset: { width: 0, height: 2 },  
   shadowOpacity: 0.25,  
   shadowRadius: 4,  
   elevation: 5,  
  },
  modalContainer3: {  
      width: 300,  
      height: 240,  
      backgroundColor: '#fff',  
      borderRadius: 20,  
      padding: 20,  
      justifyContent: 'space-between',  
      alignItems: 'center',  
      shadowColor: '#000',  
      shadowOffset: { width: 0, height: 2 },  
      shadowOpacity: 0.25,  
      shadowRadius: 4,  
      elevation: 5,  
     },
     modalContainer4: {  
        width: 300,  
        height: 200,  
        backgroundColor: '#fff',  
        borderRadius: 20,  
        padding: 20,  
        justifyContent: 'space-between',  
        alignItems: 'center',  
        shadowColor: '#000',  
        shadowOffset: { width: 0, height: 2 },  
        shadowOpacity: 0.25,  
        shadowRadius: 4,  
        elevation: 5,  
       },   
  modalTitle: {  
   fontSize: 20,  
   fontWeight: 'bold',  
   marginBottom: 10,  
   textAlign: 'center',  
  },  
  modalText: {  
   fontSize: 16,  
   marginBottom: 20,  
  },  
  modalInput: {  
   width: '100%',  
   height: 40,  
   borderColor: '#ccc',  
   borderWidth: 1,  
   borderRadius: 5,  
   paddingHorizontal: 10,  
   marginBottom: 20,  
  },  
  modalCheckboxContainer: {  
   flexDirection: 'row',  
   alignItems: 'center',  
   marginBottom: 20,  
  },  
  modalCheckboxText: {  
   fontSize: 16,  
   marginLeft: 10,  
  },  
  modalButton: {  
   width: '100%',  
   padding: 10,  
   backgroundColor: '#4caf50',  
   borderRadius: 5,  
   alignItems: 'center',  
  },  
  modalButtonCancelar: {  
   width: '100%',  
   padding: 10,  
   backgroundColor: 'red',  
   borderRadius: 5,  
   alignItems: 'center',  
  },  
  modalButtonText: {  
   color: '#fff',  
   fontSize: 16,  
   fontWeight: 'bold',  
  },
  
  
});  
  
export default Denuncias;
