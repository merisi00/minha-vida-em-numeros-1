import React, { useState } from 'react';
import {
  View,
  Text,
  Alert,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Formulario from './components/Formulario';
import ListaRegistros from './components/ListaRegistros';
import Grafico from './components/Grafico';

export default function App() {
  const [meditacao, setMeditacao] = useState('');
  const [leitura, setLeitura] = useState('');
  const [escrita, setEscrita] = useState('');
  const [registros, setRegistros] = useState([]);
  const [registroEmEdicao, setRegistroEmEdicao] = useState(null);
  const [ordenacao, setOrdenacao] = useState('recentes');

  const handleSave = (meditacaoNum, leituraNum, escritaNum) => {
    if (meditacaoNum < 0 || leituraNum < 0 || escritaNum < 0) {
      Alert.alert('Erro', 'Valores não podem ser negativos!');
      return;
    }

    if (registroEmEdicao) {
      const novos = registros.map(reg => {
        if (reg.id === registroEmEdicao.id) {
          return {
            ...reg,
            meditacao: meditacaoNum,
            leitura: leituraNum,
            escrita: escritaNum,
          };
        }
        return reg;
      });
      setRegistros(novos);
      Alert.alert('Sucesso', 'Registro atualizado com sucesso.');
    } else {
      const novo = {
        id: new Date().getTime(),
        meditacao: meditacaoNum,
        leitura: leituraNum,
        escrita: escritaNum,
        data: new Date().toLocaleDateString('pt-BR'),
      };
      setRegistros(prev => [novo, ...prev]);
      Alert.alert('Sucesso', 'Registro salvo com sucesso.');
    }

    setRegistroEmEdicao(null);
    setMeditacao('');
    setLeitura('');
    setEscrita('');
  };

  const handleDelete = (id) => {
    const filtrados = registros.filter(reg => reg.id !== id);
    setRegistros(filtrados);
    Alert.alert('Sucesso', 'Registro deletado com sucesso.');
  };

  const handleIniciarEdicao = (registro) => {
    setRegistroEmEdicao(registro);
    setMeditacao(String(registro.meditacao));
    setLeitura(String(registro.leitura));
    setEscrita(String(registro.escrita));
  };

  const handleCancelarEdicao = () => {
    setRegistroEmEdicao(null);
    setMeditacao('');
    setLeitura('');
    setEscrita('');
  };

  let registrosExibidos = [...registros];
  if (ordenacao === 'maior_meditacao') {
    registrosExibidos.sort((a, b) => b.meditacao - a.meditacao);
  } else if (ordenacao === 'maior_leitura') {
    registrosExibidos.sort((a, b) => b.leitura - a.leitura);
  } else if (ordenacao === 'maior_escrita') {
    registrosExibidos.sort((a, b) => b.escrita - a.escrita);
  } else {
    registrosExibidos.sort((a, b) => b.id - a.id);
  }

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1, width: '100%' }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={80}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Text style={styles.titulo}>Meu Diário</Text>

          <Grafico
            registros={registrosExibidos}
            campo="leitura"
            titulo="Evolução da Leitura"
          />

          <Formulario
            meditacao={meditacao}
            leitura={leitura}
            escrita={escrita}
            setMeditacao={setMeditacao}
            setLeitura={setLeitura}
            setEscrita={setEscrita}
            onSave={handleSave}
            onCancel={handleCancelarEdicao}
            registroEmEdicao={registroEmEdicao}
          />

          <View style={styles.botoesOrdenacao}>
            <TouchableOpacity
              style={styles.botaoOrdenar}
              onPress={() => setOrdenacao('recentes')}
            >
              <Text style={styles.textoBotaoOrdenar}>Mais Recentes</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.botaoOrdenar}
              onPress={() => setOrdenacao('maior_meditacao')}
            >
              <Text style={styles.textoBotaoOrdenar}>Maior Meditação</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.botaoOrdenar}
              onPress={() => setOrdenacao('maior_leitura')}
            >
              <Text style={styles.textoBotaoOrdenar}>Maior Leitura</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.botaoOrdenar}
              onPress={() => setOrdenacao('maior_escrita')}
            >
              <Text style={styles.textoBotaoOrdenar}>Maior Escrita</Text>
            </TouchableOpacity>
          </View>

          <ListaRegistros
            registros={registrosExibidos}
            onDelete={handleDelete}
            onEdit={handleIniciarEdicao}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8',
  },
  scrollContent: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 10,
  },
  botoesOrdenacao: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginVertical: 10,
  },
  botaoOrdenar: {
    backgroundColor: '#e2e8f0',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
    margin: 4,
  },
  textoBotaoOrdenar: {
    fontSize: 14,
    color: '#1e293b',
  },
});
