import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthContext } from './context/AuthContext';

import LoginScreen from './screens/LoginScreen';
import ProfileScreen from './screens/ProfileScreen';
import AgendarConsulta from './screens/AgendarConsulta';
import HistoricoConsultas from './screens/HistoricoConsultas';
import ConsultasAgendadas from './screens/ConsultasAgendadas';
import GerenciarHorarios from './screens/GerenciarHorarios';
import GerenciarUsuarios from './screens/GerenciarUsuarios';
import AcompanharConsultas from './screens/AcompanharConsultas';


const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const { user } = useContext(AuthContext);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!user ? (
          <Stack.Screen name="Login" component={LoginScreen} />
        ) : (
          <>
            <Stack.Screen name="Profile" component={ProfileScreen} />
            {user.tipo === 'Paciente' && (
              <>
                <Stack.Screen name="AgendarConsulta" component={AgendarConsulta} />
                <Stack.Screen name="HistoricoConsultas" component={HistoricoConsultas} />
              </>
            )}
            {user.tipo === 'Médico' && (
              <>
                <Stack.Screen name="ConsultasAgendadas" component={ConsultasAgendadas} />
                <Stack.Screen name="GerenciarHorarios" component={GerenciarHorarios} />
              </>
            )}
            {user.tipo === 'Administrador' && (
              <>
                <Stack.Screen name="GerenciarUsuarios" component={GerenciarUsuarios} />
                <Stack.Screen name="AcompanharConsultas" component={AcompanharConsultas} />
              </>
            )}
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
