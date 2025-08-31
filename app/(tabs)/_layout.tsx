import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { View, Text, StyleSheet, Image, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Importando as páginas
import Login from './../../Pages/login';
import Home from './../../Pages/home';
import Denuncia from '../../Pages/denuncias/denunciaHome';
import DenunciaAluno from '../../Pages/denuncias/denunciaAluno';
import DenunciaProfessor from '../../Pages/denuncias/denunciaProfessor';
import DenunciaFuncionario from '../../Pages/denuncias/denunciaFuncionario';
import PerfilAluno from './../../Pages/perfilAluno';
import Ajuda from './../../Pages/ajuda';
import PerfilDiretor from './../../Pages/perfilDiretor';
import PerfilAdmin from './../../Pages/perfilAdmin';
import Admin from '../../Pages/admin/admin';
import Diretor from './../../Pages/diretor';
import GerenciarDiretor from './../../Pages/admin/gerenciarDiretor';
import GerenciarDenuncias from './../../Pages/admin/gerenciarDenuncias';
import Historico from './../../Pages/historico';
import Contato from './../../Pages/contato';
import VerContato from './../../Pages/admin/verContato';

// Inicializando Navegadores
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

// Função para terminar a sessão
const handleLogout = async (navigation) => {
  try {
    await AsyncStorage.removeItem('usuario');
    await AsyncStorage.removeItem('idAdmin');
    await AsyncStorage.removeItem('idDiretor');
    Alert.alert('Sessão Encerrada', 'Você foi desconectado com sucesso.');
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  } catch (error) {
    console.error('Erro ao terminar sessão:', error);
  }
};

// Função Drawer para Aluno
function DrawerNavigatorAluno({ navigation }) {
  return (
    <Drawer.Navigator screenOptions={drawerStyleAluno}>
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Fazer Denúncia" component={Denuncia} />
      <Drawer.Screen name="Ver Denúncias Feitas" component={Historico} />
      <Drawer.Screen name="Ajuda" component={Ajuda} />
      <Drawer.Screen name="Contato" component={Contato} />
      <Drawer.Screen name="Perfil" component={PerfilAluno} />
      
      {/* As telas de denúncia, ocultas do menu lateral */}
      <Drawer.Screen
        name="Denunciar Aluno"
        component={DenunciaAluno}
        options={{ headerShown: true }}
        listeners={{
          focus: () => {
            // Certifique-se de não mostrar essas telas no Drawer
            navigation.setOptions({ drawerItemStyle: { display: 'none' } });
          }
        }}
      />
      <Drawer.Screen
        name="Denunciar Professor"
        component={DenunciaProfessor}
        options={{ headerShown: true }}
        listeners={{
          focus: () => {
            // Certifique-se de não mostrar essas telas no Drawer
            navigation.setOptions({ drawerItemStyle: { display: 'none' } });
          }
        }}
      />
      <Drawer.Screen
        name="Denunciar Funcionário"
        component={DenunciaFuncionario}
        options={{ headerShown: true }}
        listeners={{
          focus: () => {
            // Certifique-se de não mostrar essas telas no Drawer
            navigation.setOptions({ drawerItemStyle: { display: 'none' } });
          }
        }}
      />

      <Drawer.Screen 
        name="Terminar Sessão" 
        component={() => {
          handleLogout(navigation);
          return null;
        }}
      />
    </Drawer.Navigator>
  );
}


// Função Drawer para Diretor
function DrawerNavigatorDiretor({ navigation }) {
  return (
    <Drawer.Navigator screenOptions={drawerStyleDiretor}>
      <Drawer.Screen name="Gerenciar Denúncias" component={Diretor} />
      <Drawer.Screen name="Estatísticas" component={Admin} />
      <Drawer.Screen name="Perfil" component={PerfilDiretor} />
      <Drawer.Screen 
        name="Terminar Sessão" 
        component={() => {
          handleLogout(navigation);
          return null;
        }}
      />
    </Drawer.Navigator>
  );
}

// Função Drawer para Admin
function DrawerNavigatorAdmin({ navigation }) {
  return (
    <Drawer.Navigator screenOptions={drawerStyleAdmin}>
      <Drawer.Screen name="Estatísticas" component={Admin} />
      <Drawer.Screen name="Gerenciar Denuncias" component={GerenciarDenuncias} />
      <Drawer.Screen name="Gerenciar Contatos" component={VerContato} />
      <Drawer.Screen name="Gerenciar Diretores" component={GerenciarDiretor} />
      <Drawer.Screen name="Perfil" component={PerfilAdmin} />
      <Drawer.Screen 
        name="Terminar Sessão" 
        component={() => {
          handleLogout(navigation);
          return null;
        }}
      />
    </Drawer.Navigator>
  );
}

// Estilos do Drawer
const drawerStyleAluno = {
  headerStyle: {
    backgroundColor: '#a9dff7',
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
  headerRight: () => (
    <Image
      source={require('./../../assets/Logo.png')} // Substitua pelo caminho correto da sua imagem
      style={styles.headerImage}
    />
  ),
};

const drawerStyleDiretor = {
  headerStyle: {
    backgroundColor: '#8fffa5',
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
  headerRight: () => (
    <Image
      source={require('./../../assets/Logo.png')} // Substitua pelo caminho correto da sua imagem
      style={styles.headerImage}
    />
  ),
};

const drawerStyleAdmin = {
  headerStyle: {
    backgroundColor: '#ffa1b2',
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
  headerRight: () => (
    <Image
      source={require('./../../assets/Logo.png')} // Substitua pelo caminho correto da sua imagem
      style={styles.headerImage}
    />
  ),
};

// Função principal do App
export default function App() {
  return (
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={DrawerNavigatorAluno} options={{ headerShown: false }} />
        <Stack.Screen name="Diretor" component={DrawerNavigatorDiretor} options={{ headerShown: false }} />
        <Stack.Screen name="Admin" component={DrawerNavigatorAdmin} options={{ headerShown: false }} />
      </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
});