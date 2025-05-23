import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

export default function AcompanharConsultas() {
  const [consultas, setConsultas] = useState([]);

  useEffect(() => {
    const carregarConsultas = async () => {
      const dados = await AsyncStorage.getItem('consultas');
      if (dados) {
        setConsultas(JSON.parse(dados));
      } else {
        setConsultas([]);
      }
    };
    const unsubscribe = carregarConsultas();
    return () => unsubscribe;
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Todas as Consultas</Text>

      <FlatList
        data={consultas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Ionicons name="clipboard-outline" size={22} color="#444" style={{ marginRight: 10 }} />
            <View style={{ flex: 1 }}>
              <Text style={styles.texto}><Text style={styles.label}>Paciente:</Text> {item.paciente || 'Paciente'}</Text>
              <Text style={styles.texto}><Text style={styles.label}>Data:</Text> {item.data} às {item.hora}</Text>
              <Text style={styles.texto}><Text style={styles.label}>Motivo:</Text> {item.motivo}</Text>
            </View>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.empty}>Nenhuma consulta agendada</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f2f2f2' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 8,
    marginBottom: 12,
    alignItems: 'flex-start',
    elevation: 2,
  },
  texto: { fontSize: 14, marginBottom: 4 },
  label: { fontWeight: '600', color: '#333' },
  empty: { textAlign: 'center', marginTop: 20, color: '#999' },
});
