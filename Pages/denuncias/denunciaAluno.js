import React, { useState, useEffect } from 'react';   
   
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, Alert, Picker, Modal, Image, CheckBox } from 'react-native';   
   
import axios from 'axios';   
   
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useNavigation } from '@react-navigation/native';
   
const FormularioDenunciaAluno = () => {
  const navigation = useNavigation();
  const [idAluno, setIdAluno] = useState();   
  const [nomeAluno, setNomeAluno] = useState();   
  const [nomeDenunciado, setNomeDenunciado] = useState();   
  const [tipoDiscriminacao, setTipoDiscriminacao] = useState();
  const [tipoDenuncia, setTipoDenuncia] = useState();   
  const [periodo, setPeriodo] = useState('');   
  const [turmas, setTurmas] = useState([]);   
  const [filteredTurmas, setFilteredTurmas] = useState([]);   
  const [selectedTurma, setSelectedTurma] = useState('');   
  const [alunos, setAlunos] = useState([]);   
  const [selectedAluno, setSelectedAluno] = useState('');   
  const [descricaoDenuncia, setDescricaoDenuncia] = useState('');   
  const [mostrarFormulario, setMostrarFormulario] = useState(false);   
  const [modalVisible, setModalVisible] = useState(false);
  const [modalSucessoVisible, setModalSucessoVisible] = useState(false);    
  const [fotoDenunciadoA, setFotoDenunciadoA] = useState('');   
  const [nomeD, setNomeD] = useState(''); // Declare como um estado no início   
  const [nomeAlunoManual, setNomeAlunoManual] = useState(''); // Novo estado para armazenar o nome do aluno digitado manualmente   
  const [naoSeiNomeAluno, setNaoSeiNomeAluno] = useState(false); // Novo estado para armazenar se o usuário não sabe o nome do aluno   
  const [formularioVisivel, setFormularioVisivel] = useState(true); // Novo estado para controlar a visibilidade do formulário   
   
  useEffect(() => {   
  const fetchAluno = async () => {   
   try {   
    const aluno = await AsyncStorage.getItem('aluno');   
    const alunoData = JSON.parse(aluno);   
    setIdAluno(alunoData.idAluno);   
    setNomeAluno(alunoData.nomeAluno)   
   } catch (err) {   
    Alert.alert('Erro', 'Erro ao carregar informações do aluno');   
   }   
  };   
   
  const fetchTurmas = async () => {   
   try {   
    const response = await axios.get('http://127.0.0.1:8000/turmas');   
    setTurmas(response.data);   
    setFilteredTurmas(response.data);   
   } catch (err) {   
    Alert.alert('Erro', 'Erro ao carregar turmas');   
   }   
  };   
   
  fetchAluno();   
  fetchTurmas();   
  }, []);   
   
  const handlePeriodoChange = (value) => {   
  setPeriodo(value);   
  setSelectedTurma('');   
  setAlunos([]);   
  setMostrarFormulario(false);   

   
  let idPeriodo;   
  if (value === "Manhã") idPeriodo = 1;   
  else if (value === "Tarde") idPeriodo = 2;   
  else if (value === "Noite") idPeriodo = 3;   
   
  const turmasFiltradas = turmas.filter(turma => turma.idPeriodo === idPeriodo);   
  setFilteredTurmas(turmasFiltradas);   
  };   
   
  const handleTurmaChange = async (value) => {   
  setSelectedTurma(value);   
   
  if (value === "Desconhecido") {   
   setAlunos([]);   
  } else {   
   try {   
    const response = await axios.get(`http://127.0.0.1:8000/alunos?turma=${value}`);   
    setAlunos(response.data);   
   } catch (err) {   
    Alert.alert('Erro', 'Erro ao carregar alunos');   
   }   
  }   
   
  setMostrarFormulario(periodo && value);   
  };   
   
  const handleEnviarDenuncia = async () => {  
    if (selectedAluno && selectedAluno !== "Desconhecido") {
      try {
        const alunoDenunciadoResponse = await axios.get(`http://127.0.0.1:8000/alunos/${selectedAluno}`);
        const nomeAlunoDenunciado = alunoDenunciadoResponse.data.nomeAluno;
        const caminhoFoto = './../assets/usuarios/aluno/';
        setFotoDenunciadoA(caminhoFoto + alunoDenunciadoResponse.data.fotoAluno);
        setNomeD(nomeAlunoDenunciado);
      } catch (error) {
        Alert.alert('Erro', 'Erro ao carregar informações do aluno denunciado.');
        setNomeD("Aluno não informado");
      }
    } else {
      setNomeD("Aluno não informado");
    }
  
    // Verifica se o período é "Desconhecido"
    if (periodo === "Desconhecido") {
      try {
        const denunciaData = {  
          idDenunciante: idAluno || 0,  
          idDenunciado: selectedAluno == "Desconhecido" || turmas == "Desconhecido" || periodo == "Desconhecido" ? 0 : selectedAluno || 0,  
          dataDenuncia: new Date().toISOString().split('T')[0],  
          publica: 1,  
          descricao: descricaoDenuncia,  
          nomeDenunciante: nomeAluno || "Denunciante desconhecido",  
          turmaDenunciante: "Turma não informada",  
          turmaDenunciado: "Turma não informada",  
          nomeDenunciado: "Aluno não informado",  
          categoriaDenunciado: "1",  
          tipoDenuncia: tipoDenuncia,  
          tipo_discriminacao: tipoDiscriminacao,  
          deleted: 0  
        };  
        
        // Envio da denúncia
        const response = await axios.post('http://127.0.0.1:8000/denuncias', denunciaData);  
        
        // Se a denúncia for enviada com sucesso, limpar os campos
        if (response.status === 201) {  
          Alert.alert('Sucesso', 'Denúncia registrada com sucesso!');
          handleCancelarDenuncia(); // Limpar campos do formulário
        }
      } catch (error) {  
        Alert.alert('Erro', 'Erro ao registrar a denúncia.');
        console.log('Erro:', error);
      }
    } else {
      setModalVisible(true); // Para outros casos, mantém o comportamento atual
    }
  };
  
  
  const handleConfirmarDenuncia = async () => {  
    // Verificação dos campos obrigatórios  
    if (!descricaoDenuncia.trim()) {  
     Alert.alert('Erro', 'A descrição da denúncia não pode estar vazia.');  
     return;  
    }  
    
    try {  
     let turmaDenunciante = "Turma não informada";  
     if (idAluno) {  
      const alunoResponse = await axios.get(`http://127.0.0.1:8000/alunos/${idAluno}`);  
      const idTurmaDenunciante = alunoResponse.data.idTurma;  
      const turmaResponse = await axios.get(`http://127.0.0.1:8000/turmas/${idTurmaDenunciante}`);  
      turmaDenunciante = turmaResponse.data.nomeTurma;  
     }  
    
     let nomeTurmaDenunciado = "Turma não informada";  
     if (selectedTurma && selectedTurma !== "Desconhecido") {  
      const turmaResponse = await axios.get(`http://127.0.0.1:8000/turmas/${selectedTurma}`);  
      nomeTurmaDenunciado = turmaResponse.data.nomeTurma;  
     }  
    
     let nomeAlunoDenunciado = "Aluno não informado";  
     if (selectedAluno && selectedAluno !== "Desconhecido") {  
      const alunoResponse = await axios.get(`http://127.0.0.1:8000/alunos/${selectedAluno}`);  
      nomeAlunoDenunciado = alunoResponse.data.nomeAluno;  
     }  
    
     const denunciaData = {  
      idDenunciante: idAluno || 0,  
      idDenunciado: selectedAluno == "Desconhecido" || turmas == "Desconhecido" || periodo == "Desconhecido" ? 0 : selectedAluno || 0,  
      dataDenuncia: new Date().toISOString().split('T')[0],  
      publica: 1,  
      descricao: descricaoDenuncia,  
      nomeDenunciante: nomeAluno || "Denunciante desconhecido",  
      turmaDenunciante: turmaDenunciante,  
      turmaDenunciado: nomeTurmaDenunciado,  
      nomeDenunciado: periodo !== "Desconhecido" && selectedTurma !== "Desconhecido" ? nomeD : !naoSeiNomeAluno ? nomeAlunoManual : "Aluno não informado",
      categoriaDenunciado: "1",  
      tipoDenuncia: tipoDenuncia,  
      tipo_discriminacao: tipoDiscriminacao,  
      deleted: 0  
     };  
    
     // Log do payload para verificação  
     console.log('Payload de denúncia:', denunciaData);
    
     // Envio da denúncia  
     const response = await axios.post('http://127.0.0.1:8000/denuncias', denunciaData);  
     // Verifica o status da resposta  
     if (response.status === 201) {  
      Alert.alert('Sucesso', 'Denúncia registrada com sucesso!');  
      setModalSucessoVisible(true);
      setModalVisible(false);
     }

    } catch (error) {  
     // Verifica se a resposta do erro contém dados  
     if (error.response && error.response.status === 422) {  
      const errors = error.response.data.errors;  
      let errorMessage = 'Erro ao registrar a denúncia:\n';  
    
      // Constrói uma mensagem detalhada para cada campo com erro  
      for (const field in errors) {  
        errorMessage += `${field}: ${errors[field].join(', ')}\n`;  
      }  
    
      Alert.alert('Erro', errorMessage);  
     } else {  
      // Se for outro tipo de erro, exibe uma mensagem padrão  
      Alert.alert('Erro', 'Erro ao registrar a denúncia.');  
     }  
    
     console.log('Erro:', error);  
     setModalVisible(false);  
    }  
  };
  
  
    
   
  const handleCancelarDenuncia = () => {   
  setPeriodo('');   
  setSelectedTurma('');   
  setAlunos([]);   
  setSelectedAluno('');   
  setDescricaoDenuncia('');   
  setMostrarFormulario(false);   
  };

  const handleFecharModalSucesso = () => {  
    setModalSucessoVisible(false);
    handleCancelarDenuncia();  
    // Aqui você pode adicionar lógica para limpar o formulário ou redirecionar o usuário  
   };  
   
  return (   
  <ScrollView contentContainerStyle={styles.container}>
    <br></br>
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => navigation.navigate('Fazer Denúncia')} // Adicione a navegação
      >  
        <Text style={styles.backButtonText}>←</Text>  
      </TouchableOpacity>
   {formularioVisivel && (   
    <View>   
     <Text style={styles.title}>Formulário de Denúncia (Aluno)</Text>   
   
     <Text style={styles.label}>Período:</Text>   
     <Picker   
      selectedValue={periodo}   
      onValueChange={handlePeriodoChange}   
      style={styles.picker}   
     >   
      <Picker.Item label="Selecione um período" value="" />   
      <Picker.Item label="Manhã" value="Manhã" />   
      <Picker.Item label="Tarde" value="Tarde" />   
      <Picker.Item label="Noite" value="Noite" />   
      <Picker.Item label="Não sei informar" value="Desconhecido" />   
     </Picker>   
   
     {periodo && (periodo !== "Desconhecido") && (   
      <>   
       <Text style={styles.label}>Turma:</Text>   
       <Picker   
        selectedValue={selectedTurma}   
        onValueChange={handleTurmaChange}   
        style={styles.picker}   
       >   
        <Picker.Item label="Selecione uma turma" value="" />   
        {filteredTurmas.map((turma) => (   
        <Picker.Item key={turma.idTurma} label={turma.nomeTurma} value={turma.idTurma} />   
        ))}   
        <Picker.Item label="Não sei informar" value="Desconhecido" />   
       </Picker>   
   
       {selectedTurma && (selectedTurma !== "Desconhecido") && (   
        <>   
        <Text style={styles.label}>Alunos:</Text>   
        <Picker
  selectedValue={selectedAluno}
  onValueChange={setSelectedAluno}
  style={styles.picker}
>
  <Picker.Item label="Selecione um aluno" value="" />
  {alunos
    .filter(aluno => aluno.idAluno !== idAluno) // Filtra o aluno logado
    .map((aluno) => (
      <Picker.Item key={aluno.idAluno} label={aluno.nomeAluno} value={aluno.idAluno} />
    ))}
  <Picker.Item label="Não sei informar" value="Desconhecido" />
</Picker>
   
        </>   
       )}   
      </>   
     )}   
   
     {(periodo === "Desconhecido") && (   
      <>   
       <Text style={styles.label}>Nome do Aluno:</Text>   
       <TextInput   
        style={styles.input}   
        value={nomeAlunoManual}   
        onChangeText={setNomeAlunoManual}   
        placeholder="Digite o nome do aluno"   
        editable={!naoSeiNomeAluno}   
       />   
   
       <View style={styles.checkBoxContainer}>   
        <CheckBox   
        value={naoSeiNomeAluno}   
        onValueChange={() => setNaoSeiNomeAluno(!naoSeiNomeAluno)}   
        />   
        <Text style={styles.label}>Não sei o nome do aluno</Text>   
       </View>   
   
       <Text style={styles.label}>Tipo da denúncia:</Text>   
       <Picker   
        selectedValue={tipoDenuncia}   
        onValueChange={(value) => setTipoDenuncia(value)}   
        style={styles.picker}   
       >   
        <Picker.Item label="Selecione o tipo de discriminação" value="" />   
        <Picker.Item label="Bullying" value="Bullying" />   
        <Picker.Item label="Cyberbullying" value="Cyberbullying" />   
 
       </Picker>  

       <Text style={styles.label}>Tipo da discriminação:</Text>   
       <Picker   
        selectedValue={tipoDiscriminacao}   
        onValueChange={(value) => setTipoDiscriminacao(value)}   
        style={styles.picker}   
       >   
        <Picker.Item label="Selecione o tipo de discriminação" value="" />   
        <Picker.Item label="Racismo" value="Racismo" />   
        <Picker.Item label="Gordofobia" value="Gordofobia" />   
        <Picker.Item label="Homofobia" value="Homofobia" />   
        <Picker.Item label="Machismo" value="Machismo" />   
        <Picker.Item label="Assédio" value="Assédio" />   
        <Picker.Item label="Capacitismo" value="Capacitismo" />   
        <Picker.Item label="Outros" value="Outros" />   
       </Picker>   
   
       <Text style={styles.label}>Descrição da Denúncia:</Text>   
       <TextInput   
        style={styles.inputDenuncia}   
        multiline   
        numberOfLines={4}   
        onChangeText={setDescricaoDenuncia}   
        value={descricaoDenuncia}   
        maxLength={500}   
       />   
   
       <TouchableOpacity style={styles.buttonEnviar} onPress={handleEnviarDenuncia}>   
        <Text style={styles.buttonText}>Enviar Denúncia</Text>   
       </TouchableOpacity>   
   
       <TouchableOpacity style={styles.buttonCancelar} onPress={handleCancelarDenuncia}>   
        <Text style={styles.buttonText}>Cancelar</Text>   
       </TouchableOpacity>   
      </>   
     )}   
   
     {(selectedTurma === "Desconhecido") && (   
      <>   
       <Text style={styles.label}>Nome do Aluno:</Text>   
       <TextInput   
        style={styles.input}   
        value={nomeAlunoManual}   
        onChangeText={setNomeAlunoManual}   
        placeholder="Digite o nome do aluno"   
        editable={!naoSeiNomeAluno}   
       />   
   
       <View style={styles.checkBoxContainer}>   
        <CheckBox   
        value={naoSeiNomeAluno}   
        onValueChange={() => setNaoSeiNomeAluno(!naoSeiNomeAluno)}   
        />   
        <Text style={styles.label}>Não sei o nome do aluno</Text>   
       </View>   
      </>   
     )}   
   
     {mostrarFormulario && (   
      <>   
      <Text style={styles.label}>Tipo da denúncia:</Text>   
       <Picker   
        selectedValue={tipoDenuncia}   
        onValueChange={(value) => setTipoDenuncia(value)}   
        style={styles.picker}   
       >   
        <Picker.Item label="Selecione o tipo de discriminação" value="" />   
        <Picker.Item label="Bullying" value="Bullying" />   
        <Picker.Item label="Cyberbullying" value="Cyberbullying" />   
 
       </Picker>  

       <Text style={styles.label}>Tipo da discriminação:</Text>   
       <Picker   
        selectedValue={tipoDiscriminacao}   
        onValueChange={(value) => setTipoDiscriminacao(value)}   
        style={styles.picker}   
       >   
        <Picker.Item label="Selecione o tipo de discriminação" value="" />    
        <Picker.Item label="Racismo" value="Racismo" />   
        <Picker.Item label="Gordofobia" value="Gordofobia" />   
        <Picker.Item label="Homofobia" value="Homofobia" />   
        <Picker.Item label="Machismo" value="Machismo" />   
        <Picker.Item label="Assédio" value="Assédio" />   
        <Picker.Item label="Capacitismo" value="Capacitismo" />   
        <Picker.Item label="Outros" value="Outros" />   
       </Picker>   
   
       <Text style={styles.label}>Descrição da Denúncia:</Text>   
       <TextInput   
        style={styles.inputDenuncia}   
        multiline   
        numberOfLines={4}   
        onChangeText={setDescricaoDenuncia}   
        value={descricaoDenuncia}   
        maxLength={500}   
       />   
   
       <TouchableOpacity style={styles.buttonEnviar} onPress={handleEnviarDenuncia}>   
        <Text style={styles.buttonText}>Enviar Denúncia {nomeDenunciado}</Text>   
       </TouchableOpacity>   
   
       <Modal  
  animationType="slide"  
  transparent={true}  
  visible={modalVisible}  
  onRequestClose={() => setModalVisible(false)}  
>  
  <View style={styles.modalBackground}>  
    <View style={styles.modalView}>  
      
      <Text style={styles.questionText}>
        Você deseja confirmar essa denúncia?
      </Text>  
      
      {(periodo !== "Desconhecido" && selectedTurma !== "Desconhecido" && selectedAluno !== "Desconhecido") && (
        <>
          <Image  
            source={{ uri: fotoDenunciadoA }}  
            style={styles.modalImage}  
          />  
          <Text style={styles.nameText}>
            {nomeD}
          </Text>
        </>
      )}
      
      <Text style={styles.descText}>
        Descrição da denúncia:
      </Text>  
      
      <Text style={styles.descText2}>
        {descricaoDenuncia}
      </Text>  
      
      <View style={styles.buttonContainer}>  
        <TouchableOpacity  
          style={[styles.button, styles.confirmButton]}  
          onPress={handleConfirmarDenuncia}  
        >  
          <Text style={styles.buttonTextModal}>
            Confirmar
          </Text>  
        </TouchableOpacity>  
        
        <TouchableOpacity  
          style={[styles.button, styles.cancelButton]}  
          onPress={() => setModalVisible(false)}  
        >  
          <Text style={styles.buttonTextModal}>
            Cancelar
          </Text>  
        </TouchableOpacity>  
      </View>  
      
    </View>  
  </View>  
</Modal>

<Modal
            animationType="slide"
            transparent={true}
            visible={modalSucessoVisible}
            onRequestClose={handleFecharModalSucesso}
          >
            <View style={styles.modalBackground}>
              <View style={styles.modalView}>
                <Text style={styles.sucessoText}>Denúncia enviada com sucesso!</Text>
                <TouchableOpacity
                  style={[styles.button, styles.okButton]}
                  onPress={handleFecharModalSucesso}
                >
                  <Text style={styles.buttonTextModal}>Ok</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, styles.verButton]}
                    onPress={() => {
                      navigation.navigate('Ver Denúncias Feitas');
                      handleFecharModalSucesso();
                    }}
                  >
                  <Text style={styles.buttonTextModal}>Ver Denúncia</Text>
                </TouchableOpacity>

              </View>
            </View>
          </Modal>


   
   
       <TouchableOpacity style={styles.buttonCancelar} onPress={handleCancelarDenuncia}>   
        <Text style={styles.buttonText}>Cancelar</Text>   
       </TouchableOpacity>   
      </>   
     )}   

{periodo === "Desconhecido" && (   
      <>   
      <Modal  
  animationType="slide"  
  transparent={true}  
  visible={modalVisible}  
  onRequestClose={() => setModalVisible(false)}  
>  
  <View style={styles.modalBackground}>  
    <View style={styles.modalView}>  
      
      <Text style={styles.questionText}>
        Você deseja confirmar essa denúncia?
      </Text>  
      
      {(periodo !== "Desconhecido" && selectedTurma !== "Desconhecido" && selectedAluno !== "Desconhecido") && (
        <>
          <Image  
            source={{ uri: fotoDenunciadoA }}  
            style={styles.modalImage}  
          />  
          <Text style={styles.nameText}>
            {nomeD}
          </Text>
        </>
      )}
      
      <Text style={styles.descText}>
        Descrição da denúncia:
      </Text>  
      
      <Text style={styles.descText2}>
        {descricaoDenuncia}
      </Text>  
      
      <View style={styles.buttonContainer}>  
        <TouchableOpacity  
          style={[styles.button, styles.confirmButton]}  
          onPress={handleConfirmarDenuncia}  
        >  
          <Text style={styles.buttonTextModal}>
            Confirmar
          </Text>  
        </TouchableOpacity>  
        
        <TouchableOpacity  
          style={[styles.button, styles.cancelButton]}  
          onPress={() => setModalVisible(false)}  
        >  
          <Text style={styles.buttonTextModal}>
            Cancelar
          </Text>  
        </TouchableOpacity>  
      </View>  
      
    </View>  
  </View>  
</Modal>

  
   
      </>   
     )}
    </View>   
   )}   
  </ScrollView>   
  );   
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    marginTop: -30,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginVertical: 10,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
  inputDenuncia: {
    height: 160,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
  buttonEnviar: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonCancelar: {
    backgroundColor: 'red',
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  picker: {
    height: 50,
    width: '100%',
  },
  checkboxContainer: {
    marginVertical: 10,
  },
  checkboxWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  checkboxText: {
    fontSize: 13,
    color: 'black',
    fontWeight: 'bold',
  },
  checkbox: {
    padding: 10,
    borderColor: '#007BFF',
    borderWidth: 1,
    borderRadius: 5,
    width: 100,
    alignItems: 'center',
  },
  checkboxSelected1: {
    backgroundColor: 'green',
    color: 'white',
  },
  checkboxSelected2: {
    backgroundColor: 'orange',
    color: 'white',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  questionText: {
    color: '#333',
    fontSize: 18,
    marginBottom: 15,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  modalImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: '#007BFF',
  },
  nameText: {
    color: '#333',
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
    fontWeight: '600',
  },
  descText: {
    color: '#333',
    fontSize: 16,
    fontWeight: '600',
  },
  descText2: {
    color: '#333',
    fontSize: 16,
    marginBottom: 20,
    fontWeight: '400',
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
    flexDirection: 'column', // Alterado para coluna para empilhar os botões
    marginTop: 20,
  },
  button: {
    width: '100%',
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 10,
    elevation: 2,
  },
  confirmButton: {
    backgroundColor: '#4CAF50',
  },
  cancelButton: {
    backgroundColor: '#F44336',
  },
  okButton: {
    backgroundColor: '#4BB543',
  },
  verButton: {
    backgroundColor: '#2a85f5',
  },
  buttonTextModal: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
    textTransform: 'uppercase',
    letterSpacing: 1,
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
    color: '#00008B',
    fontSize: 50,
    fontWeight: 'bold',
    marginTop: -43,
  },
  sucessoText: {
    fontSize: 18,
    color: '#4BB543',
    fontWeight: '600',
    marginBottom: 15,
    textAlign: 'center',
  },  
});

export default FormularioDenunciaAluno;