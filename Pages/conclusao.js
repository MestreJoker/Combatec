import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Conclusao({ route }) {
  const { type, description, period, classRoom, student } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Denúncia Concluída</Text>
      <Text style={styles.info}>Tipo: {type}</Text>
      <Text style={styles.info}>Descrição: {description}</Text>
      <Text style={styles.info}>Período: {period}</Text>
      <Text style={styles.info}>Turma: {classRoom}</Text>
      <Text style={styles.info}>Aluno: {student}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  info: {
    fontSize: 16,
    marginBottom: 10,
    color: '#333',
  },
});
