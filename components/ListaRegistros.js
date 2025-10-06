import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const ListaRegistros = ({ registros, onDelete, onEdit }) => {
  return (
    <View style={styles.container}>
      {registros.map(reg => (
        <View key={reg.id} style={styles.registro}>
          <Text style={styles.data}>{reg.data}</Text>
          <Text>Meditação: {reg.meditacao} min</Text>
          <Text>Leitura: {reg.leitura} páginas</Text>
          <Text>Escrita: {reg.escrita} palavras</Text>

          <View style={styles.botoes}>
            <TouchableOpacity
              style={[styles.botao, styles.botaoEditar]}
              onPress={() => onEdit(reg)}
            >
              <Text style={styles.textoBotao}>Editar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.botao, styles.botaoDelete]}
              onPress={() => onDelete(reg.id)}
            >
              <Text style={styles.textoBotao}>Excluir</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    marginTop: 10,
    marginBottom: 20,
  },
  registro: {
    backgroundColor: '#e0f2fe',
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
  },
  data: {
    fontSize: 12,
    color: '#475569',
    marginBottom: 6,
    fontStyle: 'italic',
  },
  botoes: {
    flexDirection: 'row',
    marginTop: 10,
  },
  botao: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 6,
    marginRight: 10,
  },
  botaoEditar: {
    backgroundColor: '#facc15',
  },
  botaoDelete: {
    backgroundColor: '#f87171',
  },
  textoBotao: {
    color: '#1e293b',
    fontWeight: 'bold',
  },
});

export default ListaRegistros;

