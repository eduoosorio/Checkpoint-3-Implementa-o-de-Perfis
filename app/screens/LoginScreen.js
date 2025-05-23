import { Ionicons } from '@expo/vector-icons';
import React, { useContext, useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { AuthContext } from '../context/AuthContext';

export default function LoginScreen({ navigation }) {
  const [nome, setNome] = useState('');
  const { login } = useContext(AuthContext);

  const handleLogin = (tipo) => {
    if (nome.trim() === '') {
      Alert.alert('Erro', 'Por favor, insira seu nome.');
      return;
    }

    login({ nome, email: `${nome.toLowerCase().replace(/\\s/g, '')}@email.com`, tipo });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo!</Text>
      <TextInput
        placeholder="Digite seu nome"
        style={styles.input}
        value={nome}
        onChangeText={setNome}
        placeholderTextColor="#666"
      />

      <Text style={styles.subtitle}>Escolha seu perfil:</Text>

      <View style={styles.buttons}>
        <TouchableOpacity style={styles.button} onPress={() => handleLogin('Paciente')}>
          <Ionicons name="person-outline" size={22} />
          <Text style={styles.buttonText}>Paciente</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => handleLogin('Médico')}>
          <Ionicons name="medkit-outline" size={22} />
          <Text style={styles.buttonText}>Médico</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => handleLogin('Administrador')}>
          <Ionicons name="settings-outline" size={22} />
          <Text style={styles.buttonText}>Administrador</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 26, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  subtitle: { fontSize: 16, marginVertical: 10, textAlign: 'center' },
  input: {
    borderWidth: 1, borderColor: '#ccc', padding: 12, borderRadius: 8, fontSize: 16,
  },
  buttons: { marginTop: 20 },
  button: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    backgroundColor: '#f1f1f1', padding: 12, marginVertical: 8, borderRadius: 8,
  },
  buttonText: { fontSize: 16 },
});
