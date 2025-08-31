
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Alert, TouchableOpacity, Picker, Modal, TextInput } from 'react-native';

const Denuncias = ({ navigation }) => {
    const [denunciasEmAnalise, setDenunciasEmAnalise] = useState([]);
    const [denunciasRecusadas, setDenunciasRecusadas] = useState([]);
    const [denunciasAprovadas, setDenunciasAprovadas] = useState([]);
    const [menuSelecionado, setMenuSelecionado] = useState('analise');
    const [ordenacao, setOrdenacao] = useState('recentes');
    const [modalVisible, setModalVisible] = useState(false);
    const [modalAprovacao, setModalAprovacao] = useState(false);
    const [modalRecusa, setModalRecusa] = useState(false);
    const [modalAnalise, setModalAnalise] = useState(false);
    const [motivoRecusa, setMotivoRecusa] = useState('');
    const [idDenunciaRecusada, setIdDenunciaRecusada] = useState(null);

    useEffect(() => {
        const intervalId = setInterval(() => {
            fetchDenuncias();
        }, 5000); // Atualiza a cada 5000 milissegundos (5 segundos)

        fetchDenuncias(); // Chama a função para buscar as denúncias ao montar o componente

        return () => clearInterval(intervalId); // Limpa o intervalo ao desmontar o componente
    }, []);

    const fetchDenuncias = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/denuncias');
            const data = await response.json();
    
            const denunciasComDetalhes = data.map((denuncia) => {
                const nomeDenunciante = denuncia.publica === 0 ? 'Anônimo' : denuncia.nomeDenunciante;
                const turmaNome = denuncia.publica === 0 ? 'Anônima' : denuncia.turmaDenunciante || "Não informada";
                const turmaDenunciado = denuncia.categoriaDenunciado == 1 ? denuncia.turmaDenunciado : "Não informada";
                const nomeDenunciado = denuncia.nomeDenunciado;

                

                return {
                    ...denuncia,
                    turmaNome,
                    nomeDenunciante,
                    nomeDenunciado,
                    turmaDenunciado: denuncia.categoriaDenunciado === 1 ? turmaDenunciado : null
                };
            });
    
            const denunciasAnalise = denunciasComDetalhes.filter(denuncia => denuncia.aprovada === 0);
            const denunciasRecusadas = denunciasComDetalhes.filter(denuncia => denuncia.aprovada === 2);
            const denunciasAprovadas = denunciasComDetalhes.filter(denuncia => denuncia.aprovada === 1);
    
            setDenunciasEmAnalise(denunciasAnalise);
            setDenunciasRecusadas(denunciasRecusadas);
            setDenunciasAprovadas(denunciasAprovadas);
        } catch (error) {
            console.error('Erro ao buscar denúncias:', error);
            Alert.alert('Erro', 'Não foi possível carregar as denúncias.');
        }
    };

    const atualizarDenuncia = async (idDenuncia, status) => {  
          let tipo;  
          if(status == 1){  
             tipo = 1;  
          }  
          else if(status == 0){  
             tipo = 0;  
          }
          try {   
             const response = await fetch(`http://127.0.0.1:8000/denuncias/${idDenuncia}`, {   
               method: 'PUT',   
               headers: {   
                  'Content-Type': 'application/json',   
               },   
               body: JSON.stringify({ aprovada: status }), // Atualiza o campo aprovada  
                 
             });   
              
             if (!response.ok) {   
               throw new Error('Erro ao atualizar a denúncia');   
             } 
             else if(tipo == 1){  
               setModalAprovacao(true);  
             } 
             else if(tipo == 0){  
               setModalAnalise(true);  
             }  
              
             fetchDenuncias(); // Atualiza a lista de denúncias   
          } catch (error) {   
             console.error('Erro ao atualizar a denúncia:', error);   
             Alert.alert('Erro', 'Não foi possível atualizar a denúncia.');   
          }   
       };
              
    

    const handleRecusar = (idDenuncia) => {
        setIdDenunciaRecusada(idDenuncia);
        setModalVisible(true);
    };

    const handleEnviar = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/denuncias/${idDenunciaRecusada}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ aprovada: 2, motivoRecusa }),
            });

            if (!response.ok) {
                throw new Error('Erro ao atualizar a denúncia');
            }
            else{
                setModalRecusa(true);
            }

            setModalVisible(false);
            setMotivoRecusa('');
            fetchDenuncias(); // Atualiza a lista de denúncias
        } catch (error) {
            console.error('Erro ao atualizar a denúncia:', error);
            Alert.alert('Erro', 'Não foi possível atualizar a denúncia.');
        }
    };

    const handleCancelar = () => {
        setModalVisible(false);
        setMotivoRecusa('');
    };

    const renderDenuncia = ({ item }) => {
        const categoria = item.categoriaDenunciado === 1 ? 'Aluno' :
                          item.categoriaDenunciado === 2 ? 'Professor' : 
                          'Funcionário';
        
        let backgroundColor;
        if (item.aprovada === 0) {
            backgroundColor = '#FFF8DC'; // Em análise
        } else if (item.aprovada === 2) {
            backgroundColor = '#FFB6C1'; // Recusada
        } else {
            backgroundColor = '#D3FFD3'; // Aprovada
        }

        const dataDenuncia = new Date(item.dataDenuncia);
        dataDenuncia.setDate(dataDenuncia.getDate() + 1);
        
        return (
            <View style={[styles.denunciaContainer, { backgroundColor }]}>
                <Text style={styles.tituloText}>Denúncia: #{item.idDenuncia}</Text>

                <Text style={styles.tituloText}>Tipo da denúncia:</Text>
                <Text style={styles.denunciaText}>{item.tipoDenuncia}</Text>

                <Text style={styles.tituloText}>Tipo da discriminação:</Text>
                <Text style={styles.denunciaText}>{item.tipo_discriminacao}</Text>
        
                <Text style={styles.tituloText}>Nome do Denunciante:</Text>
                <Text style={styles.denunciaText}>{item.nomeDenunciante}</Text>
        
                <Text style={styles.tituloText}>Turma do Denunciante:</Text>
                <Text style={styles.denunciaText}>{item.turmaNome}</Text>
        
                <Text style={styles.tituloText}>Nome do Denunciado:</Text>
                <Text style={styles.denunciaText}>{item.nomeDenunciado}</Text>
        
                {item.categoriaDenunciado === 1 &&(
                <>
                    <Text style={styles.tituloText}>Turma do Denunciado:</Text>
                    <Text style={styles.denunciaText}>{item.turmaDenunciado}</Text>
                </>
                )}
        
                <Text style={styles.tituloText}>Categoria do Denunciado:</Text>
                <Text style={styles.denunciaText}>{categoria}</Text>
        
                <Text style={styles.tituloText}>Data da Denúncia:</Text>
                <Text style={styles.denunciaText}>{new Date(item.dataDenuncia).toLocaleDateString()}</Text>
        
                <Text style={styles.tituloText}>Descrição da Denúncia:</Text>
                <Text style={styles.denunciaText}>{item.descricao}</Text>
        
                {item.aprovada === 2 && item.motivoRecusa && (
                    <>
                        <Text style={styles.tituloText}>Motivo da Recusa:</Text>
                        <Text style={styles.denunciaText}>{item.motivoRecusa}</Text>
                    </>
                )}
        
        <View style={styles.buttonContainer}>
    {item.aprovada === 1 ? null : (
        item.respondida === 1 ? null : item.aprovada === 2 ? (
            <TouchableOpacity 
                style={[styles.button, styles.buttonAnalise]}
                onPress={() => atualizarDenuncia(item.idDenuncia, 0)} // Atualiza o status para 0
            >
                <Text style={styles.buttonTextAnalise}>Por em Análise</Text>
            </TouchableOpacity>
        ) : (
            <View style={styles.buttonContainer}>
                <TouchableOpacity 
                    style={[styles.button, styles.buttonAprovar]}
                    onPress={() => atualizarDenuncia(item.idDenuncia, 1)}
                >
                    <Text style={styles.buttonText}>Aprovar</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={[styles.button, styles.buttonRecusar]}
                    onPress={() => handleRecusar(item.idDenuncia)}
                >
                    <Text style={styles.buttonText}>Recusar</Text>
                </TouchableOpacity>
            </View>
        )
    )}
</View>

            </View>
        );
        
    };

    const ordenarDenuncias = (denuncias) => {
        if (ordenacao === 'recentes') {
            return [...denuncias].sort((a, b) => {
                const dataA = new Date(a.dataDenuncia);
                const dataB = new Date(b.dataDenuncia);
                
                if (dataB - dataA !== 0) {
                    return dataB - dataA;
                }
                
                return b.idDenuncia - a.idDenuncia;
            });
        } else {
            return [...denuncias].sort((a, b) => {  
                  const dataA = new Date(a.dataDenuncia);  
                  const dataB = new Date(b.dataDenuncia);  
                 
                  if (dataA - dataB !== 0) {  
                     return dataA - dataB;  
                  }  
                 
                  return a.idDenuncia - b.idDenuncia;  
               });
            }
        };
               const renderizarListaDenuncias = () => {  
                  let denuncias;  
                  if (menuSelecionado === 'analise') {  
                     denuncias = ordenarDenuncias(denunciasEmAnalise);  
                  } else if (menuSelecionado === 'recusadas') {  
                     denuncias = ordenarDenuncias(denunciasRecusadas);  
                  } else {  
                     denuncias = ordenarDenuncias(denunciasAprovadas);  
                  }  
                 
                  return (  
                     <FlatList  
                       data={denuncias}  
                       renderItem={renderDenuncia}  
                       keyExtractor={item => item.idDenuncia.toString()}  
                       contentContainerStyle={styles.listContainer}  
                       showsVerticalScrollIndicator={false}  
                     />  
                  );  
               };  
                 
               return (  
                  <View style={styles.container}>  
                     <Text style={styles.title}>Denúncias</Text>  
                 
                     {/* Picker para selecionar a ordenação */}  
                     <Picker  
                       selectedValue={ordenacao}  
                       style={styles.picker}  
                       onValueChange={(itemValue) => setOrdenacao(itemValue)}  
                     >  
                       <Picker.Item label="Mais Recentes" value="recentes" />  
                       <Picker.Item label="Mais Antigas" value="antigas" />  
                     </Picker>  
                 
                     {/* Botões de menu */}  
                     <View style={styles.menuContainer}>  
    <TouchableOpacity   
        style={[styles.menuButton, menuSelecionado === 'analise' && styles.menuButtonActive]}  
        onPress={() => setMenuSelecionado('analise')}  
    >  
        <Text style={styles.menuButtonText}>Em Análise</Text>  
    </TouchableOpacity>  

    <TouchableOpacity   
        style={[styles.menuButton, menuSelecionado === 'recusadas' && styles.menuButtonActive]}  
        onPress={() => setMenuSelecionado('recusadas')}  
    >  
        <Text style={styles.menuButtonText}>Recusadas</Text>  
    </TouchableOpacity>  

    <TouchableOpacity   
        style={[styles.menuButton, menuSelecionado === 'aprovadas' && styles.menuButtonActive]}  
        onPress={() => setMenuSelecionado('aprovadas')}  
    >  
        <Text style={styles.menuButtonText}>Aprovadas</Text>  
    </TouchableOpacity>  
</View>
  
                 
                     {/* Renderiza a lista de denúncias */}  
                     {renderizarListaDenuncias()}  
                 
                    
                <Modal visible={modalVisible} animationType="slide" transparent={true}>
    <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Motivo da Recusa</Text>
            <TextInput
                style={styles.modalInput}
                value={motivoRecusa}
                onChangeText={setMotivoRecusa}
                multiline={true}
                numberOfLines={4}
                placeholder="Digite o motivo da recusa"
            />
            <View style={styles.modalButtonContainer}>
                <TouchableOpacity
                    style={[styles.modalButton, styles.modalButtonConfirmar]}
                    onPress={handleEnviar}
                >
                    <Text style={styles.modalButtonText}>Confirmar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.modalButton, styles.modalButtonCancelar]}
                    onPress={handleCancelar}
                >
                    <Text style={styles.modalButtonText}>Cancelar</Text>
                </TouchableOpacity>
            </View>
        </View>
    </View>
</Modal>


<Modal visible={modalAprovacao} animationType="slide" transparent={true}>  
   <View style={styles.modalContainer2}>  
      <View style={styles.modalContent2}>  
        <Text style={styles.modalTitle2}>Denúncia aprovada com sucesso!</Text>  
        <View style={styles.modalButtonContainer2}>  
           <TouchableOpacity  
              style={[styles.modalButton2, styles.modalButtonConfirmar2]}  
              onPress={() => setModalAprovacao(false)}  
           >  
              <Text style={styles.modalButtonText2}>Ok</Text>  
           </TouchableOpacity>  
        </View>  
      </View>  
   </View>  
</Modal>  
  
<Modal visible={modalRecusa} animationType="slide" transparent={true}>  
   <View style={styles.modalContainer2}>  
      <View style={styles.modalContent2}>  
        <Text style={styles.modalTitle2}>Denúncia recusada com sucesso!</Text>  
        <View style={styles.modalButtonContainer2}>  
           <TouchableOpacity  
              style={[styles.modalButton2, styles.modalButtonConfirmar2]}  
              onPress={() => setModalRecusa(false)}  
           >  
              <Text style={styles.modalButtonText2}>Ok</Text>  
           </TouchableOpacity>  
        </View>  
      </View>  
   </View>  
</Modal>  
  
<Modal visible={modalAnalise} animationType="slide" transparent={true}>  
   <View style={styles.modalContainer2}>  
      <View style={styles.modalContent2}>  
        <Text style={styles.modalTitle2}>Denúncia posta em análise novamente!</Text>  
        <View style={styles.modalButtonContainer2}>  
           <TouchableOpacity  
              style={[styles.modalButton2, styles.modalButtonConfirmar2]}  
              onPress={() => setModalAnalise(false)}  
           >  
              <Text style={styles.modalButtonText2}>Ok</Text>  
           </TouchableOpacity>  
        </View>  
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
                    backgroundColor: '#F5F5F5',
                },
                title: {
                    fontSize: 24,
                    fontWeight: 'bold',
                    textAlign: 'center',
                    marginBottom: 10,
                    color: '#333',
                },
                picker: {
                    height: 25, // Altura reduzida do Picker
                    width: '100%',
                    marginVertical: 10,
                    borderColor: '#ccc',
                    borderWidth: 1,
                    borderRadius: 5,
                    backgroundColor: '#fff',
                    marginTop: -20,
                },
                menuContainer: {
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginVertical: 10,
                    marginTop: -10,
                },
                menuButton: {
                    flex: 1,
                    marginHorizontal: 5,
                    padding: 10,
                    backgroundColor: '#007BFF',
                    borderRadius: 5,
                    alignItems: 'center',
                },
                menuButtonActive: {
                    backgroundColor: '#0056b3',
                },
                menuButtonText: {
                    color: '#fff',
                    fontWeight: 'bold',

                },
                listContainer: {
                    paddingBottom: 20,
                },
                denunciaContainer: {
                    padding: 15,
                    borderRadius: 8,
                    marginVertical: 5,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.2,
                    shadowRadius: 1,
                    elevation: 2,
                },
                tituloText: {
                    fontSize: 16,
                    fontWeight: 'bold',
                    color: '#333',
                },
                denunciaText: {
                    fontSize: 14,
                    color: '#555',
                    marginBottom: 5,
                },
                buttonContainer: {
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: 10,
                },
                button: {
                    flex: 1,
                    marginHorizontal: 5,
                    padding: 10,
                    borderRadius: 5,
                    alignItems: 'center',
                },
                buttonAprovar: {
                    backgroundColor: '#28a745',
                },
                buttonRecusar: {
                    backgroundColor: '#dc3545',
                },
                buttonAnalise: {
                    backgroundColor: '#ffc107',
                },
                buttonText: {
                    color: '#fff',
                    fontWeight: 'bold',
                },
                buttonTextAnalise: {
                    color: '#333',
                    fontWeight: 'bold',
                },
                modalContainer: {
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'rgba(0,0,0,0.5)',
                },
                modalContent: {
                    backgroundColor: 'white', // Aqui, você pode ajustar a cor de fundo conforme necessário
                    padding: 20,
                    borderRadius: 8,
                    width: '90%',
                },
                modalTitle: {
                    fontSize: 18,
                    fontWeight: 'bold',
                    marginBottom: 10,
                },
                modalInput: {
                    height: 100,
                    borderColor: '#ddd',
                    borderWidth: 1,
                    borderRadius: 8,
                    padding: 10,
                    textAlignVertical: 'top',
                    marginBottom: 20,
                },
                modalButtonContainer: {
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                },
                modalButton: {
                    borderRadius: 5,
                    paddingVertical: 10,
                    paddingHorizontal: 20,
                },
                modalButtonConfirmar: {
                    backgroundColor: '#28a745', // Cor do botão de confirmar
                },
                modalButtonCancelar: {
                    backgroundColor: '#dc3545', // Cor do botão de cancelar
                },
                modalButtonText: {
                    color: 'white',
                    fontWeight: 'bold',
                },



                modalContainer2: {
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'rgba(0, 0, 0, 0.6)', /* Fundo levemente mais escuro */
                    marginTop: -20,
                  },
                  
                  modalContent2: {
                    width: '85%',
                    backgroundColor: '#ffffff',
                    borderRadius: 12,
                    paddingVertical: 25,
                    paddingHorizontal: 15,
                    alignItems: 'center',
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.25,
                    shadowRadius: 8,
                    elevation: 8, /* Sombras suavizadas */
                    
                  },
                  
                  modalTitle2: {
                    fontSize: 18,
                    fontWeight: '600',
                    color: '#222', /* Texto escuro e suave */
                    marginBottom: 15,
                    textAlign: 'center',
                  },
                  
                  modalButtonContainer2: {
                    width: '100%',
                    marginTop: 10,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    height: 40,
                  },
                  
                  modalButton2: {
                    backgroundColor: '#4A90E2', /* Azul suave */
                    borderRadius: 8,
                    paddingVertical: 8,
                    paddingHorizontal: 20,
                    marginHorizontal: 5,
                    shadowColor: '#4A90E2',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.3,
                    shadowRadius: 5,
                    elevation: 5, /* Sombras leves */
                  },
                  
                  modalButtonConfirmar2: {
                    backgroundColor: '#34A853', /* Verde mais suave */
                  },
                  
                  modalButtonText2: {
                    color: '#fff',
                    fontSize: 22,
                    fontWeight: 'bold',
                    textAlign: 'center',
                    marginTop: -22,
                  },
                  
                
            });
               
               
               export default Denuncias;
                              