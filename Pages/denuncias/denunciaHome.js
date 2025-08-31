import React from 'react';  
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';  
import { useNavigation } from '@react-navigation/native';  
  
export default function Denuncia() {  
  const navigation = useNavigation();  
  
  const handlePress = (tipo) => {  
   switch (tipo) {  
    case 'aluno':  
      navigation.navigate('Denunciar Aluno');  
      break;  
    case 'professor':  
      navigation.navigate('Denunciar Professor');  
      break;  
    case 'funcionario':  
      navigation.navigate('Denunciar Funcionário');  
      break;  
  case 'home':  
      navigation.navigate('Home');  
      break;
    default:  
      console.log(`Denúncia de ${tipo}`);  
   }  
  };  
  
  const handleBackPress = () => {  
   console.log("Voltando para a página anterior");  
  };  
  
  return (  
   <View style={styles.container}>  
    <Text style={styles.title}>Você deseja fazer uma denúncia contra:</Text>  
  
    <View style={styles.imageRow}>  
      <TouchableOpacity onPress={() => handlePress('aluno')} style={styles.imageButton}>  
       <Image source={require('../../assets/aluno.png')} style={styles.image} />  
      </TouchableOpacity>  
      <TouchableOpacity onPress={() => handlePress('professor')} style={styles.imageButton}>  
       <Image source={require('../../assets/professor.png')} style={styles.image} />  
      </TouchableOpacity>  
    </View>  
  
    <TouchableOpacity onPress={() => handlePress('funcionario')} style={styles.imageButtonSingle}>  
      <Image source={require('../../assets/funcionario.png')} style={styles.image} />  
    </TouchableOpacity>  
  
  <br></br>  <br></br>  <br></br>  
    {/* Botão de Voltar na parte inferior */}  
    <TouchableOpacity onPress={() => handlePress('home')} style={styles.backButton}>  
      <Text style={styles.backButtonText}>Voltar</Text>  
    </TouchableOpacity>  
   </View>  
  );  
}  
  
// Obter a largura da tela  
const screenWidth = Dimensions.get('window').width;  
// Definir o tamanho da imagem com limite máximo  
const imageSize = Math.min(screenWidth * 0.3, 120);  
  
const styles = StyleSheet.create({  
  container: {  
   flex: 1,  
   alignItems: 'center',  
   justifyContent: 'center',  
   backgroundColor: '#A9DFF7',  
   paddingHorizontal: 10,  
  },  
  title: {  
   fontSize: 24,  
   fontWeight: 'bold',  
   marginBottom: 50,  
   textAlign: 'center',  
   marginTop: -50,  
  },  
  imageRow: {  
   flexDirection: 'row',  
   justifyContent: 'space-around',  
   width: '100%',  
   marginBottom: 20,  
  },  
  imageButton: {  
   width: imageSize,  
   height: imageSize,  
   alignItems: 'center',  
   justifyContent: 'center',  
  },  
  imageButtonSingle: {  
   width: imageSize,  
   height: imageSize,  
   alignItems: 'center',  
   justifyContent: 'center',  
   marginTop: 50,  
  },  
  image: {  
   width: '150%',  
   height: '150%',  
   resizeMode: 'contain',  
  },  
  backButton: {  
   position: 'absolute',  
   bottom: 20,  
   backgroundColor: '#00008B',  
   borderRadius: 5,
   height: 60,
   width: 100,
   alignItems: 'center',
   marginLeft: -32,
  },  
  backButtonText: {  
   color: '#FFFFFF',  
   fontSize: 18,  
   fontWeight: 'bold',  
  },  
});
