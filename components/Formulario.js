import React from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';

const Formulario = ({
  meditacao,
  leitura,
  escrita,
  setMeditacao,
  setLeitura,
  setEscrita,
  onSave,
  onCancel,
  registroEmEdicao,
}) => {
  const handleSaveClick = () => {
    const meditacaoNum = parseFloat(meditacao) || 0;
    const leituraNum = parseFloat(leitura) || 0;
    const escritaNum = parseFloat(escrita) || 0;
    onSave(meditacaoNum, leituraNum, escritaNum);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Quantos minutos você meditou hoje?"
        keyboardType="numeric"
        value={meditacao}
        onChangeText={setMeditacao}
      />
      <TextInput
        style={styles.input}
        placeholder="Quantas páginas você leu hoje?"
        keyboardType="numeric"
        value={leitura}
        onChangeText={setLeitura}
      />
      <TextInput
        style={styles.input}
        placeholder="Quantas palavras você escreveu hoje?"
        keyboardType="numeric"
        value={escrita}
        onChangeText={setEscrita}
      />

      <View style={styles.botoes}>
        <TouchableOpacity style={styles.botaoSalvar} onPress={handleSaveClick}>
          <Text style={styles.textoBotao}>
            {registroEmEdicao ? 'Atualizar' : 'Salvar'}
          </Text>
        </TouchableOpacity>

        {registroEmEdicao && (
          <TouchableOpacity
            style={styles.botaoCancelar}
            onPress={onCancel}
          >
            <Text style={styles.textoBotao}>Cancelar</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    marginTop: 10,
    marginBottom: 20,
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
    fontSize: 16,
    backgroundColor: '#f8fafc',
  },
  botoes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  botaoSalvar: {
    flex: 1,
    backgroundColor: '#10b981',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginRight: 5,
  },
  botaoCancelar: {
    flex: 1,
    backgroundColor: '#ef4444',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginLeft: 5,
  },
  textoBotao: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Formulario;

