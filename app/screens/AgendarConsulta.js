import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useContext, useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { AuthContext } from '../context/AuthContext';

export default function AgendarConsulta() {
  const [data, setData] = useState('');
  const [hora, setHora] = useState('');
  const [motivo, setMotivo] = useState('');
  const { user } = useContext(AuthContext);

  const formatoData = /^\d{2}\/\d{2}\/\d{4}$/;
  const formatoHora = /^\d{2}:\d{2}$/;

  const agendar = async () => {
    if (!formatoData.test(data)) {
      Alert.alert('Erro', 'Formato da data inválido. Use DD/MM/AAAA');
      return;
    }
    if (!formatoHora.test(hora)) {
      Alert.alert('Erro', 'Formato da hora inválido. Use HH:MM');
      return;
    }
    if (!motivo.trim()) {
      Alert.alert('Erro', 'Informe o motivo da consulta.');
      return;
    }

    const novaConsulta = {
      id: Date.now().toString(),
      data,
      hora,
      motivo,
      status: 'Agendada',
      paciente: user?.nome || '',
      pacienteEmail: user?.email || '',
    };

    try {
      const existentes = await AsyncStorage.getItem('consultas');
      const consultas = existentes ? JSON.parse(existentes) : [];
      consultas.push(novaConsulta);
      await AsyncStorage.setItem('consultas', JSON.stringify(consultas));
      Alert.alert('Consulta Agendada com Sucesso!');
      setData('');
      setHora('');
      setMotivo('');
    } catch (err) {
      Alert.alert('Erro ao salvar a consulta.');
    }
  };

  // Função para formatar a data automaticamente (DD/MM/AAAA)
  const handleDataChange = (text) => {
    // Remove tudo que não for número
    let cleaned = text.replace(/[^0-9]/g, '');
    if (cleaned.length > 8) cleaned = cleaned.slice(0, 8);
    let formatted = cleaned;
    if (cleaned.length > 4) {
      formatted = cleaned.slice(0,2) + '/' + cleaned.slice(2,4) + '/' + cleaned.slice(4);
    } else if (cleaned.length > 2) {
      formatted = cleaned.slice(0,2) + '/' + cleaned.slice(2);
    }
    setData(formatted);
  };

  // Função para formatar a hora automaticamente (HH:MM)
  const handleHoraChange = (text) => {
    let cleaned = text.replace(/[^0-9]/g, '');
    if (cleaned.length > 4) cleaned = cleaned.slice(0, 4);
    let formatted = cleaned;
    if (cleaned.length > 2) {
      formatted = cleaned.slice(0,2) + ':' + cleaned.slice(2);
    }
    setHora(formatted);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Agendar Consulta</Text>
      <TextInput
        placeholder="Data (DD/MM/AAAA)"
        value={data}
        onChangeText={handleDataChange}
        style={styles.input}
        placeholderTextColor="#666"
        keyboardType="numeric"
        maxLength={10}
      />
      <TextInput
        placeholder="Hora (HH:MM)"
        value={hora}
        onChangeText={handleHoraChange}
        style={styles.input}
        placeholderTextColor="#666"
        keyboardType="numeric"
        maxLength={5}
      />
      <TextInput placeholder="Motivo da consulta" value={motivo} onChangeText={setMotivo} style={styles.input} placeholderTextColor="#666" />
      <TouchableOpacity style={styles.button} onPress={agendar}>
        <Text style={styles.buttonText}>Agendar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: {
    backgroundColor: '#fff', borderRadius: 8, padding: 12,
    fontSize: 16, marginBottom: 12, borderColor: '#ccc', borderWidth: 1,
  },
  button: {
    backgroundColor: '#007bff', padding: 14, borderRadius: 8,
    alignItems: 'center', marginTop: 10,
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
