import React from 'react';
import { View, Dimensions, Text } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const Grafico = ({ registros, campo = 'leitura', titulo = 'Evolução' }) => {
  if (!registros || registros.length < 2) {
    return (
      <Text style={{ textAlign: 'center', margin: 10 }}>
        Adicione ao menos 2 registros para ver o gráfico.
      </Text>
    );
  }

  const labels = registros.map(r => r.data);
  const data = registros.map(r => Number(r[campo]) || 0);

  return (
    <View>
      <Text
        style={{
          textAlign: 'center',
          fontSize: 16,
          fontWeight: 'bold',
          color: '#1e293b',
        }}
      >
        {titulo}
      </Text>
      <LineChart
        data={{
          labels: labels,
          datasets: [
            {
              data: data,
            },
          ],
        }}
        width={Dimensions.get('window').width * 0.95}
        height={220}
        yAxisSuffix=""
        chartConfig={{
          backgroundColor: '#ffffff',
          backgroundGradientFrom: '#c7d2fe',
          backgroundGradientTo: '#dbeafe',
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(30, 41, 59, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(30, 41, 59, ${opacity})`,
          propsForDots: {
            r: '4',
            strokeWidth: '2',
            stroke: '#1e3a8a',
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    </View>
  );
};

export default Grafico;


