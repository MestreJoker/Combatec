import React, { useEffect, useState } from 'react';  
import { View, Text, StyleSheet, ScrollView } from 'react-native';  
import { PieChart } from 'react-native-chart-kit';  
import axios from 'axios';  
  
const EstatisticasScreen = () => {  
  const [estatisticas, setEstatisticas] = useState(null);  
  const [denuncias, setDenuncias] = useState([]);  
  
  const fetchData = async () => {  
   try {  
    const response = await axios.get('http://127.0.0.1:8000/estatisticas');  
    setEstatisticas(response.data);  
  
    const denunciasResponse = await axios.get('http://127.0.0.1:8000/denuncias');  
    setDenuncias(denunciasResponse.data.filter(denuncia => denuncia.aprovada === 1)); // Filtra apenas denúncias aprovadas  
   } catch (error) {  
    console.error('Erro ao buscar estatísticas', error);  
   }  
  };  
  
  useEffect(() => {  
   fetchData(); // Chama a função uma vez ao montar o componente  
  
   const intervalId = setInterval(fetchData, 5000); // Atualiza a cada 5 segundos  
  
   return () => clearInterval(intervalId); // Limpa o intervalo ao desmontar o componente  
  }, []);  
  
  if (!estatisticas || !denuncias.length) {  
   return (  
    <View style={styles.loadingContainer}>  
      <Text style={styles.loadingText}>Carregando...</Text>  
    </View>  
   );  
  }  
  
  const categoriasCount = {  
   Alunos: 0,  
   Professores: 0,  
   Funcionários: 0,  
  };  
  
  denuncias.forEach(denuncia => {  
   if (denuncia.categoriaDenunciado === 1) {  
    categoriasCount.Alunos++;  
   } else if (denuncia.categoriaDenunciado === 2) {  
    categoriasCount.Professores++;  
   } else if (denuncia.categoriaDenunciado === 3) {  
    categoriasCount.Funcionários++;  
   }  
  });  
  
  const totalDenuncias = Object.values(categoriasCount).reduce((a, b) => a + b, 0);  
  
  const pieChartData = Object.entries(categoriasCount).map(([key, count]) => {  
   const percentage = totalDenuncias > 0 ? ((count / totalDenuncias) * 100).toFixed(2) : 0;  
   return {  
    name: key,  
    percentage: `${percentage}%`,  
    count,  
    color: key === 'Alunos' ? '#ff6384' : key === 'Professores' ? '#36a2eb' : '#cc65fe',  
   };  
  });  
  
  const publicasCount = {  
   Pública: 0,  
   Anônima: 0,  
  };  
  
  denuncias.forEach(denuncia => {  
   if (denuncia.publica === 1) {  
    publicasCount.Pública++;  
   } else if (denuncia.publica === 0) {  
    publicasCount.Anônima++;  
   }  
  });  
  
  const totalPublicas = publicasCount.Pública + publicasCount.Anônima;  
  
  const publicasChartData = Object.entries(publicasCount).map(([key, count]) => {  
   return {  
    name: key,  
    count,  
    percentage: totalPublicas > 0 ? ((count / totalPublicas) * 100).toFixed(2) : 0,  
    color: key === 'Pública' ? 'green' : 'red',  
   };  
  });  
  
  // Filtrando estatísticas para as contagens específicas  
  const estatisticasFiltradas = {  
   total_denuncias: denuncias.length,  
   denuncias_respondidas: denuncias.filter(denuncia => denuncia.respondida == 1).length,  
   denuncias_pendentes: denuncias.filter(denuncia => denuncia.respondida == 0).length,  
   denuncias_racismo: denuncias.filter(denuncia => denuncia.tipo_discriminacao === 'Racismo').length,  
   denuncias_gordofobia: denuncias.filter(denuncia => denuncia.tipo_discriminacao === 'Gordofobia').length,  
   denuncias_homofobia: denuncias.filter(denuncia => denuncia.tipo_discriminacao === 'Homofobia').length,  
   denuncias_machismo: denuncias.filter(denuncia => denuncia.tipo_discriminacao === 'Machismo').length,  
   denuncias_assedio: denuncias.filter(denuncia => denuncia.tipo_discriminacao === 'Assédio').length,  
   denuncias_capacitismo: denuncias.filter(denuncia => denuncia.tipo_discriminacao === 'Capacitismo').length,  
   denuncias_outros: denuncias.filter(denuncia => denuncia.tipo_discriminacao === 'Outros').length,  
  };  
  
  const tipoDenunciaCount = {  
   Bullying: 0,  
   Cyberbullying: 0,  
  };  
  
  denuncias.forEach(denuncia => {  
   if (denuncia.tipoDenuncia === 'Bullying') {  
    tipoDenunciaCount.Bullying++;  
   } else if (denuncia.tipoDenuncia === 'Cyberbullying') {  
    tipoDenunciaCount.Cyberbullying++;  
   }  
  });  
  
  const totalTipoDenuncia = Object.values(tipoDenunciaCount).reduce((a, b) => a + b, 0);  
  
  const tipoDenunciaChartData = Object.entries(tipoDenunciaCount).map(([key, count]) => {  
   const percentage = totalTipoDenuncia > 0 ? ((count / totalTipoDenuncia) * 100).toFixed(2) : 0;  
   return {  
    name: key,  
    percentage: `${percentage}%`,  
    count,  
    color: key === 'Bullying' ? '#ff6384' : '#36a2eb',  
   };  
  });  
  
  return (  
   <ScrollView style={styles.container}>  
    <Text style={styles.title}>Estatísticas de Denúncias</Text>  
  
    <View style={styles.row}>  
      <View style={styles.card}>  
       <Text style={styles.subtitle}>Total de Denúncias: {estatisticasFiltradas.total_denuncias}</Text>  
      </View>  
      <View style={styles.card}>  
       <Text style={styles.subtitle}>Denúncias Respondidas: {estatisticasFiltradas.denuncias_respondidas}</Text>  
      </View>  
    </View>  
  
    <View style={styles.row}>  
      <View style={styles.card}>  
       <Text style={styles.subtitle}>Denúncias Pendentes: {estatisticasFiltradas.denuncias_pendentes}</Text>  
      </View>  
    </View>  
  
    <Text style={styles.chartTitle}>Maiores Cometentes de Discriminação</Text>  
    <View style={styles.chartContainer}>  
      <PieChart  
       data={pieChartData}  
       width={350}  
       height={220}  
       chartConfig={{  
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,  
        labelColor: () => '#000',  
       }}  
       accessor="count"  
       backgroundColor="transparent"  
       paddingLeft="15"  
       absolute  
       showLegend={false}  
      />  
    </View>  
  
    <View style={styles.legendContainer}>  
      {pieChartData.map((item, index) => (  
       <View key={index} style={styles.legendItem}>  
        <View style={[styles.legendColor, { backgroundColor: item.color }]} />  
        <Text style={styles.legendText}>{item.percentage}</Text>  
       </View>  
      ))}  
    </View>  
  
    <Text style={styles.chartTitle}>Tipos de Discriminação</Text>  
    {[  
      { label: 'Racismo', count: estatisticasFiltradas.denuncias_racismo },  
      { label: 'Gordofobia', count: estatisticasFiltradas.denuncias_gordofobia },  
      { label: 'Homofobia', count: estatisticasFiltradas.denuncias_homofobia },  
      { label: 'Machismo', count: estatisticasFiltradas.denuncias_machismo },  
      { label: 'Assédio', count: estatisticasFiltradas.denuncias_assedio },  
      { label: 'Capacitismo', count: estatisticasFiltradas.denuncias_capacitismo },  
      { label: 'Outros', count: estatisticasFiltradas.denuncias_outros },  
    ].map((item, index) => {  
      const percentage = estatisticasFiltradas.total_denuncias > 0 ? ((item.count / estatisticasFiltradas.total_denuncias) * 100).toFixed(2) : 0;  
      const barWidth = Math.floor(percentage);  
      return (  
       <View key={index} style={styles.statisticContainer}>  
        <Text style={styles.statisticLabel}>{item.label} {percentage}%</Text>  
        <View style={[styles.bar, { width: `${barWidth}%` }]} />  
       </View>  
      );  
    })}  
  
    <View style={styles.squareContainer}>  
      {[  
       { label: 'Racismo', count: estatisticasFiltradas.denuncias_racismo },  
       { label: 'Gordofobia', count: estatisticasFiltradas.denuncias_gordofobia },  
       { label: 'Homofobia', count: estatisticasFiltradas.denuncias_homofobia },  
       { label: 'Machismo', count: estatisticasFiltradas.denuncias_machismo },  
       { label: 'Assédio', count: estatisticasFiltradas.denuncias_assedio },  
       { label: 'Capacitismo', count: estatisticasFiltradas.denuncias_capacitismo },  
       { label: 'Outros', count: estatisticasFiltradas.denuncias_outros },  
      ].map((item, index) => (  
       <View key={index} style={styles.square}>  
        <Text style={styles.squareLabel}>{item.label}: {item.count}</Text>  
       </View>  
      ))}  
    </View>  
  
    <Text style={styles.chartTitle}>Tipos de Denúncias</Text>  
    <View style={styles.chartContainer}>  
      <PieChart  
       data={tipoDenunciaChartData}  
       width={350}  
       height={220}  
       chartConfig={{  
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,  
        labelColor: () => '#000',  
       }}  
       accessor="count"  
       backgroundColor="transparent"  
       paddingLeft="15"  
       absolute  
       showLegend={false}  
      />  
    </View>  
  
    <View style={styles.legendContainer}>  
      {tipoDenunciaChartData.map((item, index) => (  
       <View key={index} style={styles.legendItem}>  
        <View style={[styles.legendColor, { backgroundColor: item.color }]} />  
        <Text style={styles.legendText}>{item.percentage}</Text>  
       </View>  
      ))}  
    </View>  
  
    
   </ScrollView>  
  );  
};  
  
const styles = StyleSheet.create({  
  container: {  
   flex: 1,  
   padding: 20,  
   backgroundColor: '#f0f0f0',  
  },  
  title: {  
   fontSize: 24,  
   fontWeight: 'bold',  
   marginBottom: 20,  
  },  
  row: {  
   flexDirection: 'row',  
   justifyContent: 'space-between',  
   marginBottom: 10,  
  },  
  card: {  
   flex: 1,  
   backgroundColor: '#fff',  
   padding: 10,  
   margin: 5,  
   borderRadius: 10,  
   shadowColor: '#000',  
   shadowOpacity: 0.1,  
   shadowRadius: 5,  
   elevation: 3,  
  },  
  subtitle: {  
   fontSize: 18,  
   fontWeight: 'bold',  
  },  
  chartContainer: {  
   alignItems: 'center',  
   marginBottom: 20,  
  },  
  chartTitle: {  
   fontSize: 20,  
   fontWeight: 'bold',  
   marginBottom: 10,  
  },  
  legendContainer: {  
   flexDirection: 'row',  
   justifyContent: 'space-around',  
   marginBottom: 20,  
  },  
  legendItem: {  
   flexDirection: 'row',  
   alignItems: 'center',  
  },  
  legendColor: {  
   width: 20,  
   height: 20,  
   marginRight: 5,  
  },  
  legendText: {  
   fontSize: 16,  
  },  
  statisticContainer: {  
   flexDirection: 'row',  
   alignItems: 'center',  
   marginBottom: 10,  
  },  
  statisticLabel: {  
   flex: 1,  
  },  
  bar: {  
   height: 10,  
   backgroundColor: 'blue',  
   borderRadius: 5,  
  },  
  squareContainer: {  
   flexDirection: 'row',  
   flexWrap: 'wrap',  
   justifyContent: 'space-between',  
  },  
  square: {  
   width: '48%',  
   backgroundColor: '#fff',  
   padding: 10,  
   marginBottom: 10,  
   borderRadius: 10,  
   shadowColor: '#000',  
   shadowOpacity: 0.1,  
   shadowRadius: 5,  
   elevation: 3,  
  },  
  squareLabel: {  
   fontSize: 16,  
   fontWeight: 'bold',  
  },  
  loadingContainer: {  
   flex: 1,  
   justifyContent: 'center',  
   alignItems: 'center',  
  },  
  loadingText: {  
   fontSize: 18,  
  },  
});  
  
export default EstatisticasScreen;