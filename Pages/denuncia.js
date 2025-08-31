import React, { useEffect, useState } from 'react';  
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, Alert, Picker, Modal, Image } from 'react-native';  
import axios from 'axios';  
import AsyncStorage from '@react-native-async-storage/async-storage';  
  
const FormularioDenuncia = () => {  
  const [idAluno, setIdAluno] = useState();
  const [nomeAluno, setNomeAluno] = useState();
  const [nomeDenunciado, setNomeDenunciado] = useState();
  const [tipoDiscriminacao, setTipoDiscriminacao] = useState();
  const [categoriaDenunciado, setCategoriaDenunciado] = useState('');  
  const [periodo, setPeriodo] = useState('');  
  const [turmas, setTurmas] = useState([]);  
  const [filteredTurmas, setFilteredTurmas] = useState([]);  
  const [selectedTurma, setSelectedTurma] = useState('');  
  const [alunos, setAlunos] = useState([]);  
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
  const [cargos, setCargos] = useState([]);  
  const [selectedCargo, setSelectedCargo] = useState('');  
  const [funcionarios, setFuncionarios] = useState([]);  
  const [tipoDenuncia, setTipoDenuncia] = useState(''); // Novo campo  
  const [modalVisible, setModalVisible] = useState(false);  
  const [fotoDenunciadoA, setFotoDenunciadoA] = useState('');
  const [fotoDenunciadoP, setFotoDenunciadoP] = useState('');
  const [fotoDenunciadoF, setFotoDenunciadoF] = useState('');
  const [nomeD, setNomeD] = useState(''); // Declare como um estado no início


  
  
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
  
   const fetchDisciplinas = async () => {  
    try {  
      const response = await axios.get('http://127.0.0.1:8000/disciplinas');  
      setDisciplinas(response.data);  
    } catch (err) {  
      Alert.alert('Erro', 'Erro ao carregar disciplinas');  
    }  
   };  
  
   const fetchCargos = async () => {  
    try {  
      // Atualizar a URL se necessário  
      const response = await axios.get('http://127.0.0.1:8000/funcionarios'); // Rota correta para buscar cargos  
      const uniqueCargos = [...new Set(response.data.map(funcionario => funcionario.funcaoFuncionario))]; // Obter cargos únicos  
      setCargos(uniqueCargos.map(cargo => ({ nome: cargo }))); // Converter para o formato esperado  
    } catch (err) {  
      Alert.alert('Erro', 'Erro ao carregar cargos');  
    }  
   };  
  
   fetchAluno();  
   fetchTurmas();  
   fetchDisciplinas();  
   fetchCargos();  
  }, []); 
  
  const handleCategoriaChange = (value) => {  
   setCategoriaDenunciado(value);  
   setPeriodo('');  
   setSelectedTurma('');  
   setAlunos([]);  
   setSelectedAluno('');  
   setSelectedFuncionario('');  
   setSelectedDisciplina('');  
   setTipoDisciplina('');  
   setProfessores([]);  
   setMostrarFormulario(false);  
   setSelectedProfessor('');  
   setSelectedCargo('');  
   setFuncionarios([]);  
  };  

  const handleTipoDisciminacao = (value) => {  
    setTipoDisciminacao(value);  
      
  };
  
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
  
    if (value) {  
        try {  
            const response = await axios.get(`http://127.0.0.1:8000/alunos?turma=${value}`);  
            // Filtra alunos para excluir o aluno que está logado
            const alunosFiltrados = response.data.filter(aluno => aluno.idAluno !== idAluno);
            setAlunos(alunosFiltrados);  
        } catch (err) {  
            Alert.alert('Erro', 'Erro ao carregar alunos');  
        }  
    } else {  
        setAlunos([]);  
    }  
  
    setMostrarFormulario(categoriaDenunciado && periodo && value);  
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
   
   setMostrarFormulario(categoriaDenunciado === 'Professor' && selectedDisciplina && value);  
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
    if (categoriaDenunciado === 'Aluno') {
      // Consulta o aluno denunciado
      const alunoDenunciadoResponse = await axios.get(`http://127.0.0.1:8000/alunos/${selectedAluno}`);
      console.log('Aluno Denunciado Response:', alunoDenunciadoResponse.data);

      const nomeAlunoDenunciado = alunoDenunciadoResponse.data.nomeAluno;
      const caminhhoFoto = './../assets/usuarios/aluno/';
      setFotoDenunciadoA(caminhhoFoto + alunoDenunciadoResponse.data.fotoAluno); // Supondo que a foto do aluno está no campo 'fotoAluno'
      
      const idTurma = alunoDenunciadoResponse.data.idTurma;  // Verifique se a resposta inclui 'idTurma'
      console.log('ID da Turma do Denunciado:', idTurma);

      if (idTurma) {
        // Consulta a turma pelo ID
        const turmaResponse = await axios.get(`http://127.0.0.1:8000/turmas/${idTurma}`);
        turmaDenunciado1 = turmaResponse.data.nomeTurma;  // Verifique se 'nomeTurma' é o campo correto
        console.log('Turma Denunciado Response:', turmaResponse.data);
      } else {
        console.log('ID da turma não encontrado para o aluno.');
        Alert.alert('Erro', 'A turma do aluno não pôde ser encontrada.');
        return;
      }

      // Defina nomeD com o nome do aluno denunciado
      setNomeD(nomeAlunoDenunciado);
      
    } else if (categoriaDenunciado === 'Professor') {
      const professorResponse = await axios.get(`http://127.0.0.1:8000/professores/${selectedProfessor}`);
      const nomeProfessorDenunciado = professorResponse.data.nomeProfessor;
      const caminhhoFoto = './../assets/usuarios/professor/';
      setFotoDenunciadoP(caminhhoFoto + professorResponse.data.fotoProfessor); // Supondo que a foto do professor está no campo 'fotoProfessor'
      
      // Defina nomeD com o nome do professor denunciado
      setNomeD(nomeProfessorDenunciado);
      
    } else if (categoriaDenunciado === 'Funcionário') {
      const funcionarioResponse = await axios.get(`http://127.0.0.1:8000/funcionarios/${selectedFuncionario}`);
      const nomeFuncionarioDenunciado = funcionarioResponse.data.nomeFuncionario; // Verifique o nome correto do campo
      const caminhhoFoto = './../assets/usuarios/funcionario/';
      setFotoDenunciadoF(caminhhoFoto + funcionarioResponse.data.fotoFuncionario); // Supondo que a foto do funcionário está no campo 'fotoFuncionario'
      
      // Defina nomeD com o nome do funcionário denunciado
      setNomeD(nomeFuncionarioDenunciado);
    }
    setModalVisible(true);  
  }
  
  


  const handleConfirmarDenuncia = async () => {
    if (!descricaoDenuncia.trim()) {
      Alert.alert('Erro', 'A descrição da denúncia não pode estar vazia.');
      return;
    }
  
    try {
      let nomeD = '';
      let turmaDenunciado1 = '';
  
      // Consulta os dados do aluno com a sessão iniciada para obter o idTurma
      const alunoResponse = await axios.get(`http://127.0.0.1:8000/alunos/${idAluno}`); // idAluno deve ser o ID do aluno logado
      const idTurmaDenunciante = alunoResponse.data.idTurma; // Obtenha o idTurma do aluno logado
      console.log('ID da Turma do Denunciante:', idTurmaDenunciante);
  
      // Consulta a turma pelo ID para obter o nomeTurma
      const turmaResponse = await axios.get(`http://127.0.0.1:8000/turmas/${idTurmaDenunciante}`);
      const turmaDenunciante = turmaResponse.data.nomeTurma; // Nome da turma do denunciante
      console.log('Turma Denunciante:', turmaDenunciante);
  
      // Verifica a categoriaDenunciado e faz a busca correta
      if (categoriaDenunciado === 'Aluno') {
        // Consulta o aluno denunciado
        const alunoDenunciadoResponse = await axios.get(`http://127.0.0.1:8000/alunos/${selectedAluno}`);
        console.log('Aluno Denunciado Response:', alunoDenunciadoResponse.data);
  
        nomeD = alunoDenunciadoResponse.data.nomeAluno;
  
        // Verifica se o campo da turma foi retornado corretamente
        const idTurma = alunoDenunciadoResponse.data.idTurma;  // Verifique se a resposta inclui 'idTurma'
        console.log('ID da Turma do Denunciado:', idTurma);
  
        if (idTurma) {
          // Consulta a turma pelo ID
          const turmaResponse = await axios.get(`http://127.0.0.1:8000/turmas/${idTurma}`);
          turmaDenunciado1 = turmaResponse.data.nomeTurma;  // Verifique se 'nomeTurma' é o campo correto
          console.log('Turma Denunciado Response:', turmaResponse.data);
        } else {
          console.log('ID da turma não encontrado para o aluno.');
          Alert.alert('Erro', 'A turma do aluno não pôde ser encontrada.');
          return;
        }
      } else if (categoriaDenunciado === 'Professor') {
        const professorResponse = await axios.get(`http://127.0.0.1:8000/professores/${selectedProfessor}`);
        nomeD = professorResponse.data.nomeProfessor;
      } else if (categoriaDenunciado === 'Funcionário') {
        const funcionarioResponse = await axios.get(`http://127.0.0.1:8000/funcionarios/${selectedFuncionario}`);
        nomeD = funcionarioResponse.data.nomeFuncionario;
      }
  
      // Envia os dados para criar a denúncia
      const response = await axios.post('http://127.0.0.1:8000/denuncias', {
        idDenunciante: idAluno,
        idDenunciado: selectedProfessor || selectedAluno || selectedFuncionario,
        dataDenuncia: new Date().toISOString().split('T')[0], // Data no formato YYYY-MM-DD
        publica: 1,
        descricao: descricaoDenuncia,
        nomeDenunciante: nomeAluno, // opcional
        turmaDenunciante: turmaDenunciante, // A turma do denunciante
        turmaDenunciado: turmaDenunciado1, // A turma do denunciado
        nomeDenunciado: nomeD, // Nome do denunciado
        categoriaDenunciado: selectedAluno ? "1" : selectedProfessor ? "2" : "3",
        tipo_discriminacao: tipoDiscriminacao, // deve ser preenchido
        deleted: 0 // Sempre false ao criar
      });
  
      if (response.status === 201) { // 201 para criação bem-sucedida
        Alert.alert('Sucesso', 'Denúncia registrada com sucesso!');
        handleCancelarDenuncia();
        setModalVisible(false);
      }
    } catch (error) {
      console.log('Erro:', error);
      Alert.alert('Erro', 'Erro ao registrar a denúncia.');
      setModalVisible(false);
    }
  }; 
   
  
  const handleCancelarDenuncia = () => {  
   setCategoriaDenunciado('');  
   setPeriodo('');  
   setSelectedTurma('');  
   setAlunos([]);  
   setSelectedAluno('');  
   setDescricaoDenuncia('');  
   setMostrarFormulario(false);  
   setSelectedDisciplina('');  
   setProfessores([]);  
   setSelectedProfessor('');  
   setTipoDisciplina('');  
   setSelectedCargo('');  
   setFuncionarios([]);  
  };  
  
  const toggleDenunciaTipo = (tipo) => {  
   setDenunciaTipo(tipo);  
  };  
  
  return (  
   <ScrollView contentContainerStyle={styles.container}>  
    <Text style={styles.title}>Formulário de Denúncia</Text>  
  
    <Text style={styles.label}>Categoria do Denunciado:</Text>  
    <Picker  
      selectedValue={categoriaDenunciado}  
      onValueChange={handleCategoriaChange}  
      style={styles.picker}  
    >  
      <Picker.Item label="Selecione uma categoria" value="" />  
      <Picker.Item label="Aluno" value="Aluno" />  
      <Picker.Item label="Professor" value="Professor" />
<Picker.Item label="Funcionário" value="Funcionário" />
</Picker>

   {categoriaDenunciado === 'Aluno' && (
<>
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
</>
)}

   {categoriaDenunciado === 'Professor' && (
<>
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
<>
<Text style={styles.label}>Disciplina:</Text>
<Picker
selectedValue={selectedDisciplina}
onValueChange={handleDisciplinaChange}
style={styles.picker}
>
<Picker.Item label="Selecione uma disciplina" value="" />
{filteredDisciplinas.map((disciplina) => (
<Picker.Item key={disciplina.idDisciplina} label={disciplina.nomeDisciplina} value={disciplina.idDisciplina} />
))}
</Picker>
</>
)}

      {selectedDisciplina && (
<>
<Text style={styles.label}>Professor:</Text>
<Picker
selectedValue={selectedProfessor}
onValueChange={handleProfessorChange}
style={styles.picker}
>
<Picker.Item label="Selecione um professor" value="" />
{professores.map((professor) => (
<Picker.Item key={professor.idProfessor} label={professor.nomeProfessor} value={professor.idProfessor} />
))}
</Picker>
</>
)}
</>
)}

   {categoriaDenunciado === 'Funcionário' && (
<>
<Text style={styles.label}>Cargo:</Text>
<Picker
selectedValue={selectedCargo}
onValueChange={handleCargoChange}
style={styles.picker}
>
<Picker.Item label="Selecione um cargo" value="" />
{cargos.map((cargo, index) => (
<Picker.Item key={index} label={cargo.nome} value={cargo.nome} />
))}
</Picker>

      {selectedCargo && (
<>
<Text style={styles.label}>Funcionários:</Text>
<Picker
selectedValue={selectedFuncionario}
onValueChange={setSelectedFuncionario}
style={styles.picker}
>
<Picker.Item label="Selecione um funcionário" value="" />
{funcionarios.map((funcionario) => (
<Picker.Item key={funcionario.idFuncionario} label={funcionario.nomeFuncionario} value={funcionario.idFuncionario} />
))}
</Picker>
</>
)}
</>
)}

   {categoriaDenunciado === 'Aluno' && periodo && (
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
</Picker>

      {selectedTurma && (
<>
<Text style={styles.label}>Alunos:</Text>
<Picker
selectedValue={selectedAluno}
onValueChange={setSelectedAluno}
style={styles.picker}
>
<Picker.Item label="Selecione um aluno" value="" />
{alunos.map((aluno) => (
<Picker.Item key={aluno.idAluno} label={aluno.nomeAluno} value={aluno.idAluno}/>
))}
</Picker>
</>
)}
</>
)}

   {mostrarFormulario && (
<>
<Text style={styles.label}>Tipo da discriminação:</Text>  
  <Picker
  selectedValue={tipoDiscriminacao}
  onValueChange={(value) => setTipoDiscriminacao(value)}  // Corrigido aqui
  style={styles.picker}
>
      <Picker.Item label="Selecione o tipo de discriminação" value="" />
      <Picker.Item label="Bullying" value="Bullying" />
      <Picker.Item label="Cyberbullying" value="Cyberbullying" />
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
  style={styles.input}
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
    onRequestClose={() => {
        setModalVisible(false);
    }}
>
    <View style={styles.modalBackground}>
        <View style={styles.modalView}>
            <Text style={styles.questionText}>Você deseja fazer uma denúncia contra essa pessoa?</Text>
            <Image 
                source={{
                  uri: categoriaDenunciado === "Aluno" ? fotoDenunciadoA :
                       categoriaDenunciado === "Professor" ? fotoDenunciadoP :
                       categoriaDenunciado === "Funcionário" ? fotoDenunciadoF :
                       fotoDenunciadoF === '' ? './../assets/usuarios/aluno/user.jpg' :
                       './../assets/usuarios/aluno/user.jpg'
              }} 
                style={styles.modalImage} 
            />
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
</Modal>

<TouchableOpacity style={styles.buttonCancelar} onPress={handleCancelarDenuncia}>
<Text style={styles.buttonText}>Cancelar</Text>
</TouchableOpacity>
</>
)}
</ScrollView>
);
};

const styles = StyleSheet.create({
container: {
padding: 20,
},
title: {
fontSize: 24,
fontWeight: 'bold',
marginBottom: 20,
},
label: {
fontSize: 16,
marginVertical: 10,
},
input: {
height: 80,
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
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fundo semi-transparente
      justifyContent: 'center',
      alignItems: 'center',
  },
  modalView: {
      width: '80%', // Largura do modal
      backgroundColor: 'white',
      borderRadius: 15,
      padding: 20,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
          width: 0,
          height: 2,
      },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 5,
  },
  questionText: {
      color: '#333',
      fontSize: 18,
      marginBottom: 15,
      textAlign: 'center',
      fontWeight: 'bold', // Negrito para destacar a pergunta
  },
  modalImage: {
      width: 100,
      height: 100,
      borderRadius: 50,
      marginBottom: 15,
      borderWidth: 2, // Borda ao redor da imagem
      borderColor: '#007BFF', // Cor da borda
  },
  nameText: {
      color: '#333',
      fontSize: 16,
      marginBottom: 10,
      textAlign: 'center',
      fontWeight: '600', // Negrito
  },
  descText: {
    color: '#333',
    fontSize: 16,
    fontWeight: '600', // Negrito
},
descText2: {
  color: '#333',
  fontSize: 16,
  marginBottom: 20,
  fontWeight: '400', // Negrito
  textAlign: 'center',
},
  buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around', // Espaçamento entre os botões
      width: '100%',
  },
  button: {
      flex: 1,
      borderRadius: 10,
      padding: 12,
      marginHorizontal: 5,
      alignItems: 'center',
      elevation: 2,
  },
  confirmButton: {
      backgroundColor: '#4CAF50', // Verde
  },
  cancelButton: {
      backgroundColor: '#F44336', // Vermelho
  },
  buttonTextModal: {
      color: '#FFFFFF',
      fontWeight: 'bold',
      fontSize: 16, // Aumentar o tamanho da fonte
  },


});

export default FormularioDenuncia;
