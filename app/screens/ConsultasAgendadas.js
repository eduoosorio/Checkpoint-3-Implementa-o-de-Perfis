import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useContext, useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { AuthContext } from '../context/AuthContext';

export default function ConsultasAgendadas() {
  const [consultas, setConsultas] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const carregarConsultas = async () => {
      const dados = await AsyncStorage.getItem('consultas');
      if (dados && user) {
        const todas = JSON.parse(dados);
        if (user.tipo === 'Médico') {
          setConsultas(todas); // Médico vê todas
        } else {
          setConsultas(todas.filter(c => c.pacienteEmail === user.email)); // Paciente vê só as dele
        }
      } else {
        setConsultas([]);
      }
    };
    carregarConsultas();
  }, [user]);

  // Função para o médico apagar consulta
  const apagarConsulta = async (id) => {
    const novasConsultas = consultas.filter(c => c.id !== id);
    setConsultas(novasConsultas);
    await AsyncStorage.setItem('consultas', JSON.stringify(novasConsultas));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Consultas Agendadas</Text>

      <FlatList
        data={consultas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Ionicons name="person-circle-outline" size={26} color="#4a4a4a" style={{ marginRight: 10 }} />
            <View>
              <Text style={styles.paciente}>{item.paciente}</Text>
              <Text style={styles.detalhes}>{item.data} às {item.hora}</Text>
            </View>
            {user.tipo === 'Médico' && (
              <Ionicons name="checkmark-done-circle-outline" size={28} color="#2196F3" style={{ marginLeft: 10 }} onPress={() => apagarConsulta(item.id)} />
            )}
          </View>
        )}
        ListEmptyComponent={<Text style={styles.empty}>Nenhuma consulta agendada</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 8,
    marginBottom: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  paciente: { fontSize: 16, fontWeight: '600' },
  detalhes: { fontSize: 14, color: '#666' },
  empty: { textAlign: 'center', marginTop: 20, color: '#999' },
});
