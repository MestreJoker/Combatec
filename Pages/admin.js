import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const Admin = () => {
  // Dados fictícios de estatísticas de denúncias
  const statistics = [
    { id: '1', label: 'Total de Denúncias', value: 120 },
    { id: '2', label: 'Denúncias Resolvidas', value: 80 },
    { id: '3', label: 'Denúncias Pendentes', value: 40 },
    { id: '4', label: 'Denúncias por Bullying', value: 50 },
    { id: '5', label: 'Denúncias por Agressão Física', value: 30 },
  ];

  const renderStatisticItem = ({ item }) => (
    <View style={styles.statisticItem}>
      <Text style={styles.statisticLabel}>{item.label}</Text>
      <Text style={styles.statisticValue}>{item.value}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={statistics}
        keyExtractor={(item) => item.id}
        renderItem={renderStatisticItem}
        ListHeaderComponent={<Text style={styles.header}>Estatísticas de Denúncias</Text>}
      />
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
    marginBottom: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  statisticItem: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 2,
  },
  statisticLabel: {
    fontSize: 16,
    color: '#333',
  },
  statisticValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007BFF',
  },
});

export default Admin;
