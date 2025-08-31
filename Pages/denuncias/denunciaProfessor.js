import React, { useState, useEffect } from 'react';  
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, Alert, Picker, Modal, Image } from 'react-native';  
import axios from 'axios';  
import AsyncStorage from '@react-native-async-storage/async-storage';  
import { useNavigation } from '@react-navigation/native';  
  
const FormularioDenuncia = () => {  
  const navigation = useNavigation();  
  const [idAluno, setIdAluno] = useState();  
  const [nomeAluno, setNomeAluno] = useState();  
  const [nomeDenunciado, setNomeDenunciado] = useState();  
  const [tipoDiscriminacao, setTipoDiscriminacao] = useState();  
  const [categoriaDenunciado, setCategoriaDenunciado] = useState('');  
  const [periodo, setPeriodo] = useState('');  
  const [selectedTurma, setSelectedTurma] = useState('');  
  const [selectedAluno, setSelectedAluno] = useState('');  
  const [selectedFuncionario, setSelectedFuncionario] = useState('');  
  const [descricaoDenuncia, setDescricaoDenuncia] = useState('');  
  const [mostrarFormulario, setMostrarFormulario] = useState(false);  
  const [disciplinas, setDisciplinas] = useState([]);  
  const [filteredDisciplinas, setFilteredDisciplinas] = useState([]);  
  const [selectedDisciplina, setSelectedDisciplina] = useState('');  
  const [tipoDisciplina, setTipoDisciplina] = useState('');  
  const [professores, setProfessores] = useState([]);  
  const [selectedProfessor, setSelectedProfessor] = useState('');  
  const [tipoDenuncia, setTipoDenuncia] = useState(''); // Novo campo  
  const [modalVisible, setModalVisible] = useState(false);  
  const [modalSucessoVisible, setModalSucessoVisible] = useState(false);  
  const [fotoDenunciadoP, setFotoDenunciadoP] = useState('');  
  const [nomeD, setNomeD] = useState('');  
  
  useEffect(() => {  
   const fetchAluno = async () => {  
    try {  
      const aluno = await AsyncStorage.getItem('aluno');  
      const alunoData = JSON.parse(aluno);  
      setIdAluno(alunoData.idAluno);  
      setNomeAluno(alunoData.nomeAluno);  
    } catch (err) {  
      Alert.alert('Erro', 'Erro ao carregar informações do aluno');  
    }  
   };  
  
   const fetchDisciplinas = async () => {  
    try {  
      const response = await axios.get('http://127.0.0.1:8000/disciplinas');  
      setDisciplinas(response.data);  
    } catch (err) {  
      Alert.alert('Erro', 'Erro ao carregar disciplinas');  
    }  
   };  
  
   fetchAluno();  
   fetchDisciplinas();  
  }, []);  
  
  const handleTipoDisciminacao = (value) => {  
   setTipoDisciminacao(value);  
  };  
  
  const handleTipoDisciplinaChange = (value) => {  
   setTipoDisciplina(value);  
   if (value) {  
    setSelectedDisciplina('');  
    const disciplinasFiltradas = disciplinas.filter(disciplina =>  
      (value === 'convencional' && disciplina.tecnica === 0) ||  
      (value === 'tecnica' && disciplina.tecnica === 1)  
    );  
    setFilteredDisciplinas(disciplinasFiltradas);  
   } else {  
    setFilteredDisciplinas(disciplinas);  
   }  
  };  
  
  const handleDisciplinaChange = async (value) => {  
   setSelectedDisciplina(value);  
   setProfessores([]);  
   setSelectedProfessor('');  
  
   if (value) {  
    try {  
      const response = await axios.get(`http://127.0.0.1:8000/professores-disciplinas?disciplina=${value}`);  
      const professorIds = response.data.map(item => item.idProfessor);  
  
      if (professorIds.length > 0) {  
       const professorsResponse = await axios.get(`http://127.0.0.1:8000/professores?ids=${professorIds.join(',')}`);  
       setProfessores(professorsResponse.data);  
      } else {  
       setProfessores([]);  
      }  
    } catch (err) {  
      Alert.alert('Erro', 'Erro ao carregar professores');  
    }  
   } else {  
    setProfessores([]);  
   }  
  
   setMostrarFormulario(categoriaDenunciado && periodo && selectedTurma && value);  
  };  
  
  const handleProfessorChange = (value) => {  
   setSelectedProfessor(value);  
   setMostrarFormulario(true);  
  };  
  
  const handleCargoChange = async (value) => {  
   setSelectedCargo(value);  
   if (value) {  
    try {  
      const response = await axios.get(`http://127.0.0.1:8000/funcionarios?cargo=${value}`);  
      setFuncionarios(response.data);  
    } catch (err) {  
      Alert.alert('Erro', 'Erro ao carregar funcionários');  
    }  
   } else {  
    setFuncionarios([]);  
   }  
  
   setMostrarFormulario(categoriaDenunciado === 'Funcionário' && value);  
  };  
  
  let turmaDenunciado1 = 'Turma Não Definida';  
  
  const handleEnviarDenuncia = async () => {  
   const professorResponse = await axios.get(`http://127.0.0.1:8000/professores/${selectedProfessor}`);  
   const nomeProfessorDenunciado = professorResponse.data.nomeProfessor;  
   const caminhhoFoto = './../assets/usuarios/professor/';  
   setFotoDenunciadoP(caminhhoFoto + professorResponse.data.fotoProfessor);  
   setNomeD(nomeProfessorDenunciado);  
  
   setModalVisible(true);  
  };  
  
  const handleConfirmarDenuncia = async () => {  
   if (!descricaoDenuncia.trim()) {  
    Alert.alert('Erro', 'A descrição da denúncia não pode estar vazia.');  
    return;  
   }  
  
   try {  
    let nomeD = '';  
    let turmaDenunciado1 = '';  
  
    const alunoResponse = await axios.get(`http://127.0.0.1:8000/alunos/${idAluno}`);  
    const idTurmaDenunciante = alunoResponse.data.idTurma;  
    console.log('ID da Turma do Denunciante:', idTurmaDenunciante);  
  
    const turmaResponse = await axios.get(`http://127.0.0.1:8000/turmas/${idTurmaDenunciante}`);  
    const turmaDenunciante = turmaResponse.data.nomeTurma;  
    console.log('Turma Denunciante:', turmaDenunciante);  
  
    const professorResponse = await axios.get(`http://127.0.0.1:8000/professores/${selectedProfessor}`);  
    nomeD = professorResponse.data.nomeProfessor;  
  
    const response = await axios.post('http://127.0.0.1:8000/denuncias', {  
      idDenunciante: idAluno,  
      idDenunciado: selectedProfessor,  
      dataDenuncia: new Date().toISOString().split('T')[0],  
      publica: 1,  
      descricao: descricaoDenuncia,  
      nomeDenunciante: nomeAluno,  
      turmaDenunciante: turmaDenunciante,  
      turmaDenunciado: "",  
      nomeDenunciado: nomeD,  
      categoriaDenunciado: "2",  
      tipoDenuncia: tipoDenuncia,  
      tipo_discriminacao: tipoDiscriminacao,  
      deleted: 0  
    });  
  
    if (response.status === 201) {  
      setModalVisible(false);
      setModalSucessoVisible(true);  
    }  
   } catch (error) {  
    console.log('Erro:', error);  
    Alert.alert('Erro', 'Erro ao registrar a denúncia.');  
    setModalVisible(false);  
   }  
  };  
  
  const handleCancelarDenuncia = () => {  
   setDescricaoDenuncia('');  
   setMostrarFormulario(false);  
   setSelectedDisciplina('');  
   setProfessores([]);  
   setSelectedProfessor('');  
   setTipoDisciplina('');  
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
      onPress={() => navigation.navigate('Fazer Denúncia')}  
    >  
      <Text style={styles.backButtonText}>←</Text>  
    </TouchableOpacity>  
    <Text style={styles.title}>Formulário de Denúncia (Professor)</Text>  
  
    <Text style={styles.label}>Tipo de Disciplina:</Text>  
    <Picker  
      selectedValue={tipoDisciplina}  
      onValueChange={handleTipoDisciplinaChange}  
      style={styles.picker}  
    >  
      <Picker.Item label="Selecione um tipo" value="" />  
      <Picker.Item label="Convencional" value="convencional" />  
      <Picker.Item label="Técnica" value="tecnica" />  
    </Picker>  
  
    {tipoDisciplina && (  
      <><Text style={styles.label}>Disciplina:</Text><Picker
          selectedValue={selectedDisciplina}
          onValueChange={handleDisciplinaChange}
          style={styles.picker}
        >
          <Picker.Item label="Selecione uma disciplina" value="" />
          {filteredDisciplinas.map((disciplina) => (
            <Picker.Item key={disciplina.idDisciplina} label={disciplina.nomeDisciplina} value={disciplina.idDisciplina} />
          ))}
        </Picker></>  
    )}  
  
    {selectedDisciplina && (  
      <><Text style={styles.label}>Professor:</Text><Picker
          selectedValue={selectedProfessor}
          onValueChange={handleProfessorChange}
          style={styles.picker}
        >
          <Picker.Item label="Selecione um professor" value="" />
          {professores.map((professor) => (
            <Picker.Item key={professor.idProfessor} label={professor.nomeProfessor} value={professor.idProfessor} />
          ))}
        </Picker></>  
    )}  
  
    {mostrarFormulario && (  
      <><Text style={styles.label}>Tipo da denúncia:</Text><Picker
          selectedValue={tipoDenuncia}
          onValueChange={(value) => setTipoDenuncia(value)}
          style={styles.picker}
        >
          <Picker.Item label="Selecione o tipo de discriminação" value="" />
          <Picker.Item label="Bullying" value="Bullying" />
          <Picker.Item label="Cyberbullying" value="Cyberbullying" />
        </Picker><Text style={styles.label}>Tipo da discriminação:</Text><Picker
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
          </Picker><Text style={styles.label}>Descrição da Denúncia:</Text><TextInput
            style={styles.input}
            multiline
            numberOfLines={4}
            onChangeText={setDescricaoDenuncia}
            value={descricaoDenuncia}
            maxLength={500} /><TouchableOpacity style={styles.buttonEnviar} onPress={handleEnviarDenuncia}>
            <Text style={styles.buttonText}>Enviar Denúncia {nomeDenunciado}</Text>
          </TouchableOpacity><Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(false);
            } }
          >
            <View style={styles.modalBackground}>
              <View style={styles.modalView}>
                <Text style={styles.questionText}>Você deseja fazer uma denúncia contra essa pessoa?</Text>
                <Image
                  source={{
                    uri: fotoDenunciadoP ||
                      './../assets/usuarios/aluno/user.jpg'
                  }}
                  style={styles.modalImage} />
                <Text style={styles.nameText}>{nomeD}</Text>
                <Text style={styles.descText}>Descrição da denúncia:</Text>
                <Text style={styles.descText2}>{descricaoDenuncia}</Text>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={[styles.button, styles.confirmButton]}
                    onPress={handleConfirmarDenuncia}
                  >
                    <Text style={styles.buttonTextModal}>Confirmar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.button, styles.cancelButton]}
                    onPress={() => setModalVisible(false)}
                  >
                    <Text style={styles.buttonTextModal}>Cancelar</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal><Modal
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
          </Modal><TouchableOpacity style={styles.buttonCancelar} onPress={handleCancelarDenuncia}>
            <Text style={styles.buttonText}>Cancelar</Text>
          </TouchableOpacity></>  
    )}  
   </ScrollView>  
  );  
};

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

export default FormularioDenuncia;
