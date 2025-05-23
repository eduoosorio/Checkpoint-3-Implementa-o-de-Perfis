import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { Alert, FlatList, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function GerenciarHorarios() {
  const [consultas, setConsultas] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [consultaEditando, setConsultaEditando] = useState(null);
  const [novaData, setNovaData] = useState('');
  const [novaHora, setNovaHora] = useState('');

  useEffect(() => {
    const carregarConsultas = async () => {
      const dados = await AsyncStorage.getItem('consultas');
      if (dados) {
        setConsultas(JSON.parse(dados));
      } else {
        setConsultas([]);
      }
    };
    carregarConsultas();
  }, []);

  const abrirModalEditar = (consulta) => {
    setConsultaEditando(consulta);
    setNovaData(consulta.data);
    setNovaHora(consulta.hora);
    setModalVisible(true);
  };

  const salvarEdicao = async () => {
    if (!novaData || !novaHora) {
      Alert.alert('Erro', 'Preencha a data e hora');
      return;
    }
    const novasConsultas = consultas.map(c =>
      c.id === consultaEditando.id ? { ...c, data: novaData, hora: novaHora } : c
    );
    setConsultas(novasConsultas);
    await AsyncStorage.setItem('consultas', JSON.stringify(novasConsultas));
    setModalVisible(false);
    setConsultaEditando(null);
  };

  // Máscara para data (DD/MM/AAAA)
  const handleDataChange = (text) => {
    let cleaned = text.replace(/[^0-9]/g, '');
    if (cleaned.length > 8) cleaned = cleaned.slice(0, 8);
    let formatted = cleaned;
    if (cleaned.length > 4) {
      formatted = cleaned.slice(0,2) + '/' + cleaned.slice(2,4) + '/' + cleaned.slice(4);
    } else if (cleaned.length > 2) {
      formatted = cleaned.slice(0,2) + '/' + cleaned.slice(2);
    }
    setNovaData(formatted);
  };

  // Máscara para hora (HH:MM)
  const handleHoraChange = (text) => {
    let cleaned = text.replace(/[^0-9]/g, '');
    if (cleaned.length > 4) cleaned = cleaned.slice(0, 4);
    let formatted = cleaned;
    if (cleaned.length > 2) {
      formatted = cleaned.slice(0,2) + ':' + cleaned.slice(2);
    }
    setNovaHora(formatted);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gerenciar Horários das Consultas</Text>
      <FlatList
        data={consultas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Ionicons name="time" size={22} color="#444" style={{ marginRight: 10 }} />
            <View style={{ flex: 1 }}>
              <Text style={styles.horarioText}>{item.paciente} - {item.data} às {item.hora}</Text>
              <Text style={styles.motivoText}>Motivo: {item.motivo}</Text>
            </View>
            <TouchableOpacity onPress={() => abrirModalEditar(item)}>
              <Ionicons name="create-outline" size={22} color="#2196F3" />
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.empty}>Nenhuma consulta cadastrada</Text>}
      />
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Editar Horário</Text>
            <TextInput
              style={styles.input}
              placeholder="Data (ex: 27/05/2025)"
              value={novaData}
              onChangeText={handleDataChange}
              placeholderTextColor="#666"
              keyboardType="numeric"
              maxLength={10}
            />
            <TextInput
              style={styles.input}
              placeholder="Hora (ex: 15:00)"
              value={novaHora}
              onChangeText={handleHoraChange}
              placeholderTextColor="#666"
              keyboardType="numeric"
              maxLength={5}
            />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 16 }}>
              <TouchableOpacity style={[styles.button, { backgroundColor: '#aaa' }]} onPress={() => setModalVisible(false)}>
                <Text style={styles.buttonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={salvarEdicao}>
                <Text style={styles.buttonText}>Salvar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f9f9f9' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
    elevation: 2,
  },
  horarioText: { fontSize: 16, fontWeight: '500' },
  motivoText: { fontSize: 14, color: '#555', marginTop: 4 },
  empty: { textAlign: 'center', marginTop: 20, color: '#888' },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 10,
    width: '85%',
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 12,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  button: {
    backgroundColor: '#2196F3',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    minWidth: 90,
  },
  buttonText: { color: '#fff', fontWeight: '600', fontSize: 16 },
});
