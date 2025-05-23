import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function GerenciarUsuarios() {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const carregarUsuarios = async () => {
      const dados = await AsyncStorage.getItem('usuarios');
      if (dados) {
        setUsuarios(JSON.parse(dados));
      } else {
        setUsuarios([]);
      }
    };
    carregarUsuarios();
  }, []);

  const removerUsuario = (id) => {
    Alert.alert(
      'Remover Usuário',
      'Tem certeza que deseja remover este usuário?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Remover', onPress: async () => {
            const novos = usuarios.filter((u) => u.id !== id);
            setUsuarios(novos);
            await AsyncStorage.setItem('usuarios', JSON.stringify(novos));
            // Remover consultas do usuário
            const usuarioRemovido = usuarios.find((u) => u.id === id);
            if (usuarioRemovido) {
              const consultasStr = await AsyncStorage.getItem('consultas');
              let consultas = consultasStr ? JSON.parse(consultasStr) : [];
              consultas = consultas.filter(c => c.pacienteEmail !== usuarioRemovido.email);
              await AsyncStorage.setItem('consultas', JSON.stringify(consultas));
            }
          }
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gerenciar Usuários</Text>

      <FlatList
        data={usuarios}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Ionicons name="person-outline" size={24} color="#555" style={{ marginRight: 10 }} />
            <View style={{ flex: 1 }}>
              <Text style={styles.nome}>{item.nome}</Text>
              <Text style={styles.email}>{item.email}</Text>
              <Text style={styles.tipo}>Tipo: {item.tipo}</Text>
            </View>
            <TouchableOpacity onPress={() => removerUsuario(item.id)}>
              <Ionicons name="trash-outline" size={22} color="#e53935" />
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.empty}>Nenhum usuário cadastrado</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fafafa' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 8,
    marginBottom: 12,
    alignItems: 'center',
    elevation: 2,
  },
  nome: { fontSize: 16, fontWeight: '600' },
  email: { fontSize: 14, color: '#777' },
  tipo: { fontSize: 13, color: '#444' },
  empty: { textAlign: 'center', marginTop: 20, color: '#aaa' },
});
