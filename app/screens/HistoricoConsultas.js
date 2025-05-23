import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useContext, useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { AuthContext } from '../context/AuthContext';

export default function HistoricoConsultas() {
  const [consultas, setConsultas] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const carregarConsultas = async () => {
      const dados = await AsyncStorage.getItem('consultas');
      if (dados && user) {
        const todas = JSON.parse(dados);
        setConsultas(todas.filter(c => c.pacienteEmail === user.email));
      }
    };
    carregarConsultas();
  }, [user]);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Ionicons name="calendar-outline" size={20} color="#007bff" />
        <Text style={styles.date}>{item.data} às {item.hora}</Text>
      </View>
      <Text style={styles.motivo}>📝 {item.motivo}</Text>
      <Text style={styles.status}>📌 Status: {item.status}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Histórico de Consultas</Text>
      <FlatList
        data={consultas}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 16, textAlign: 'center' },
  card: {
    backgroundColor: '#fff', borderRadius: 10, padding: 16, marginBottom: 12,
    shadowColor: '#000', shadowOpacity: 0.1, shadowOffset: { width: 0, height: 2 }, shadowRadius: 6, elevation: 3,
  },
  cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 6 },
  date: { marginLeft: 8, fontSize: 16, fontWeight: 'bold' },
  motivo: { fontSize: 16, marginTop: 4 },
  status: { fontSize: 14, color: 'gray', marginTop: 6 },
});
