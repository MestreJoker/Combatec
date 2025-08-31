import React from 'react';
import { View, Image, TouchableOpacity, ImageBackground, Dimensions, StyleSheet, ScrollView } from 'react-native';

// Obtenha a largura e altura da tela
const { width, height } = Dimensions.get('window');

// Array de imagens para o carrossel
const carouselImages = [
  require('../assets/imgt1.jpeg'),
  require('../assets/imgt3.png'),
  require('../assets/img3.png'),
];

// Estilos dinâmicos baseados na resolução
const specificStyles = width === 375 && height === 667 ? StyleSheet.create({
  // Adicione aqui os estilos específicos para 375x667
  carousel: {
    width: '100%',
    height: 180, // Ajuste a altura do carrossel para esta resolução específica
    marginTop: 20,
  },
  imageButton: {
    width: 140,
    height: 140,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
  },
}) : {};

export default function Home({ navigation }) {
  return (
    <ImageBackground 
      source={require('../assets/background.jpg')}
      style={styles.background}
      imageStyle={styles.imageBackground}
    >
      <ScrollView contentContainerStyle={styles.container}>

        {/* Carrossel de imagens */}
        <ScrollView 
          horizontal 
          pagingEnabled 
          showsHorizontalScrollIndicator={false}
          style={[styles.carousel, specificStyles.carousel]} // Aplica os estilos específicos, se houver
        >
          {carouselImages.map((image, index) => (
            <View key={index} style={styles.carouselImageContainer}>
              <Image 
                source={image}
                style={styles.carouselImage} 
                resizeMode='cover' // Assegura que a imagem ocupe o espaço todo
              />
            </View>
          ))}
        </ScrollView>

        {/* Botões "Ajuda" e "Perfil" centralizados */}
        <View style={styles.buttonRow}>
          <TouchableOpacity 
            style={[styles.imageButton, specificStyles.imageButton]} 
            onPress={() => navigation.navigate('Ajuda')} // Navega para a tela Ajuda
          >
            <Image
              source={require('../assets/Ajuda.png')}
              style={styles.buttonImage}
              resizeMode='contain'
            />
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.imageButton, specificStyles.imageButton]} 
            onPress={() => navigation.navigate('Perfil')} // Navega para a tela Perfil
          >
            <Image 
              source={require('../assets/Perfil.png')}
              style={styles.buttonImage}
              resizeMode='contain'
            />
          </TouchableOpacity>
        </View>

        {/* Linha com as três imagens na parte inferior */}
        <View style={styles.imageRow}>
          <TouchableOpacity 
            style={[styles.imageContainer, styles.imageLeft]} 
            onPress={() => navigation.navigate('Ver Denúncias Feitas')}
          >
            <Image
              source={require('../assets/Ver Denúncia.png')}
              style={styles.logo}
              resizeMode='contain'
            />
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.imageContainer, styles.imageMiddle]} 
            onPress={() => navigation.navigate('Fazer Denúncia')}
          >
            <Image
              source={require('../assets/Fazer Denúncia.png')}
              style={styles.logo}
              resizeMode='contain'
            />
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.imageContainer, styles.imageRight]} 
            onPress={() => navigation.navigate('Contato')}
          >
            <Image
              source={require('../assets/Contato.png')}
              style={styles.logo}
              resizeMode='contain'
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}


const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  imageBackground: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  carousel: {
    width: '100%',
    height: 200,
    marginTop: 20,
  },
  carouselImageContainer: {
    width: 300, // Dimensão fixa para garantir que todas as imagens tenham o mesmo tamanho
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black', // Fundo preto para criar a margem preta
    borderWidth: 0.5,
    borderColor: '#ccc',
    borderRadius: 5,
    overflow: 'hidden',
    marginHorizontal: 10, // Espaçamento horizontal entre as imagens
  },
  carouselImage: {
    width: '98.5%',  // Ajuste para dar espaço à margem
    height: '99%', // Ajuste para dar espaço à margem
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '90%',
    marginVertical: 30,
  },
  imageButton: {
    width: 150,
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  buttonImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  imageRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '90%',
    marginTop: 50,
  },
  imageContainer: {
    alignItems: 'center',
    width: 100,
    height: 100,
  },
  logo: {
    width: '100%',
    height: '100%',
  },
});
