# ✅ Checkpoint 3 – Implementação de Perfis no Agendamento de Consultas

## 👨‍💻 Integrantes do Grupo

- RM550161 - Eduardo Osorio Filho
- RM550610 - Fabio Hideki Kamikihara
- RM550260 - Pedro Moura Barros
- RM98896  - Rodrigo Fernandes dos Santos

---

Este projeto é um aplicativo mobile desenvolvido com **React Native + Expo SDK 53**, como entrega do **Checkpoint 3** da disciplina de Mobile. O sistema permite login por tipo de usuário e acesso a funcionalidades diferentes conforme o perfil.

---

## 👥 Perfis e Funcionalidades

| Perfil         | Funcionalidades                                                                      |
|----------------|----------------------------------------------------------------------------------------|
| **Paciente**   | Agendar consulta, visualizar histórico de consultas                                   |
| **Médico**     | Ver consultas agendadas, gerenciar horários disponíveis                               |
| **Administrador** | Gerenciar usuários do sistema, acompanhar todas as consultas realizadas             |

---

## 💻 Telas Desenvolvidas

- Login com autenticação e contexto
- Tela de perfil dinâmica com nome, e-mail, tipo de usuário e imagem
- Telas específicas:
  - `AgendarConsulta.js`
  - `HistoricoConsultas.js`
  - `ConsultasAgendadas.js`
  - `GerenciarHorarios.js`
  - `GerenciarUsuarios.js`
  - `AcompanharConsultas.js`

---

## 📦 Tecnologias Utilizadas

- [Expo SDK 53](https://docs.expo.dev/)
- React Native
- React Navigation (Stack)
- AsyncStorage para simular login persistente
- Ícones com `@expo/vector-icons`

---

## 🚀 Como Executar o Projeto

1. **Instale as dependências**:

```bash
npm install
```

2. **Inicie o projeto com o Expo**:

```bash
npx expo start
```

3. **Siga as instruções do Expo para rodar no emulador ou dispositivo físico.**

---

## 📄 Observações

- O login é simulado e persistido localmente usando AsyncStorage.
- O acesso às funcionalidades é controlado pelo tipo de usuário logado.
- O projeto é apenas para fins didáticos e não utiliza backend real.
