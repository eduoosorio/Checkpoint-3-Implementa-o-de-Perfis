import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function ProfileScreen() {
  const { user, logout } = useContext(AuthContext);
  const navigation = useNavigation();

  const handleNavigate = (screen) => {
    navigation.navigate(screen);
  };

  const renderOptions = () => {
    switch (user?.tipo) {
      case 'Paciente':
        return (
          <>
            <Option icon="calendar" label="Agendar Consulta" onPress={() => handleNavigate('AgendarConsulta')} />
            <Option icon="time" label="Histórico de Consultas" onPress={() => handleNavigate('HistoricoConsultas')} />
          </>
        );
      case 'Médico':
        return (
          <>
            <Option icon="clipboard" label="Consultas Agendadas" onPress={() => handleNavigate('ConsultasAgendadas')} />
            <Option icon="time-outline" label="Gerenciar Horários" onPress={() => handleNavigate('GerenciarHorarios')} />
          </>
        );
      case 'Administrador':
        return (
          <>
            <Option icon="people" label="Gerenciar Usuários" onPress={() => handleNavigate('GerenciarUsuarios')} />
            <Option icon="bar-chart" label="Acompanhar Consultas" onPress={() => handleNavigate('AcompanharConsultas')} />
          </>
        );
      default:
        return <Text>Tipo de usuário não reconhecido</Text>;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Olá, {user?.nome}</Text>
      <Text style={styles.subtitle}>Perfil: {user?.tipo}</Text>

      <View style={styles.options}>
        {renderOptions()}
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={logout}>
        <Ionicons name="log-out-outline" size={20} color="#fff" />
        <Text style={styles.logoutText}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}

function Option({ icon, label, onPress }) {
  return (
    <TouchableOpacity style={styles.option} onPress={onPress}>
      <Ionicons name={icon} size={20} color="#333" style={{ marginRight: 8 }} />
      <Text style={styles.optionText}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#f7f7f7',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 40,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 24,
    color: '#666',
  },
  options: {
    width: '100%',
    gap: 12,
    marginTop: 10,
    marginBottom: 30,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  optionText: {
    fontSize: 16,
    fontWeight: '500',
  },
  logoutButton: {
    flexDirection: 'row',
    backgroundColor: '#e63946',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 8,
  },
});
