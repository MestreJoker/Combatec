// Pages/Ajuda.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Ajuda() {
  const navigation = useNavigation(); // Obtém a instância de navegação

  return (
    <ScrollView contentContainerStyle={styles.container}>
       <br></br>
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => navigation.navigate('Home')} // Adicione a navegação
      >  
        <Text style={styles.backButtonText}>←</Text>  
      </TouchableOpacity>
      <Text style={styles.title}>Central de Ajuda</Text>

      <Text style={styles.subtitle}>Perguntas Frequentes (FAQ)</Text>

      <View style={styles.faqItem}>
        <Text style={styles.question}>1. Como faço uma denuncia?</Text>
        <Text style={styles.answer}>
          Para realizar uma denúncia, acesse a aba "Denúncia" no menu lateral, preencha os campos obrigatórios e clique no botão "Enviar Denúncia".
        </Text>
      </View>

      <View style={styles.faqItem}>
        <Text style={styles.question}>2. Como posso visualizar minhas denuncias?</Text>
        <Text style={styles.answer}>
          Para visualizar suas denúncias, vá para a aba "Visualizar Denúncias" no menu lateral. Lá, você poderá ver todas as denúncias feitas.
        </Text>
      </View>

      <View style={styles.faqItem}>
        <Text style={styles.question}>3. O que acontece após enviar uma denúncia?</Text>
        <Text style={styles.answer}>
          Sua denúncia será enviada ao diretor, que poderá tomar as providências cabíveis. Você será notificado sobre o andamento via o sistema de denúncias.
        </Text>
      </View>

      <View style={styles.faqItem}>
        <Text style={styles.question}>4. O que significa o status da minha denuncia?</Text>
        <Text style={styles.answer}>
        Se no status de sua denuncia estiver escrito <Text style={styles.negrito}>Em Análise</Text> significa que ela está sendo avaliada pela equipe de administração para poder repassá-la para a coordenação.
        </Text>
        <Text style={styles.answer}>
        <Text style={styles.negrito}>Reprovada</Text> significa que sua denuncia foi analisada pela administração e não foi aprovada. 
        </Text>
        <Text style={styles.answer}>
        <Text style={styles.negrito}>Pendente</Text> significia que a denuncia foi aprovada pela administração e está no aguardo para ser lida pela coordenação. 
        </Text>
        <Text style={styles.answer}>
        <Text style={styles.negrito}>Sua denuncia está sendo investigada</Text> significa que a coordenação já tem ciência da mesma e tomará as medidas cabíveis.
        </Text>
      </View>

      <Text style={styles.subtitle}>Instruções</Text>

      <View style={styles.instructionItem}>
        <Text style={styles.instruction}>- Para navegar no aplicativo, utilize o menu lateral disponível no ícone do canto superior esquerdo.</Text>
        <Text style={styles.instruction}>- Para retornar à tela inicial, selecione "Home" no menu lateral.</Text>
        <Text style={styles.instruction}>- Caso tenha dúvidas sobre o sistema, consulte as FAQs ou entre em contato com o suporte.</Text>
      </View>

      <Text style={styles.subtitle}>Contato</Text>

      <View style={styles.contactItem}>
        <Text style={styles.contact}>E-mail: suporte@combatec.com</Text>
        <Text style={styles.contact}>Telefone: (11) 1234-5678</Text>
      </View>

      {/* Botão de Voltar */}
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
        <Text style={styles.buttonText}>Voltar</Text>
      </TouchableOpacity>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f7f7f7',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: '#444',
  },
  faqItem: {
    marginBottom: 15,
  },
  question: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  answer: {
    fontSize: 14,
    marginTop: 5,
    color: '#665',
  },
  negrito: {
    fontSize: 14,
    marginTop: 5,
    color: 'black',
    fontWeight: 'bold'
  },
  instructionItem: {
    marginBottom: 20,
  },
  instruction: {
    fontSize: 14,
    marginBottom: 10,
    color: '#666',
  },
  contactItem: {
    marginBottom: 20,
  },
  contact: {
    fontSize: 14,
    color: '#666',
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
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
