import React, {useState, useEffect} from 'react';
import {Text, StyleSheet, TouchableHighlight, View, Alert} from 'react-native';
import {Picker} from '@react-native-community/picker';
import axios from 'axios';

const Formulario = ({
  moneda,
  criptomoneda,
  setCriptomoneda,
  setMoneda,
  setConsultarAPI,
}) => {
  const [criptomonedas, setCriptomonedas] = useState([]);

  useEffect(() => {
    const consultarAPI = async () => {
      const url =
        'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
      const resultado = await axios.get(url);
      console.log(resultado.data.Data);
      setCriptomonedas(resultado.data.Data);
    };
    consultarAPI();
  }, []);

  // Almacena las selecciones del usairo
  const obtenerMoneda = (moneda) => {
    setMoneda(moneda);
  };

  const obtenerCriptomoneda = (cripto) => {
    setCriptomoneda(cripto);
  };

  const cotizarPrecio = () => {
    if (moneda.trim() === '' || criptomoneda.trim() === '') {
      mostrarAlerta();
      return;
    }
    // Cambiar el state de consultar api
    setConsultarAPI(true);
  };

  const mostrarAlerta = () => {
    Alert.alert('Error...', 'Ambos campos osn obligatorios', [{texto: 'OK'}]);
  };

  return (
    <View>
      <Text style={styles.label}>Moneda</Text>
      <Picker
        selectedValue={moneda}
        onValueChange={(moneda) => obtenerMoneda(moneda)}
        itemStyle={{height: 120}}>
        <Picker.Item label="Seleccione" value="" />
        <Picker.Item label="Dolar de USA" value="USD" />
        <Picker.Item label="Peso MXN" value="MXN" />
        <Picker.Item label="Euro" value="EUR" />
        <Picker.Item label="Libra Esterlina" value="GBP" />
      </Picker>

      <Text style={styles.label}>Criptomonedas</Text>
      <Picker
        selectedValue={criptomoneda}
        onValueChange={(cripto) => obtenerCriptomoneda(cripto)}
        itemStyle={{height: 120}}>
        <Picker.Item label="Seleccione" value="" />
        {criptomonedas.map((cripto) => (
          <Picker.Item
            key={cripto.CoinInfo.Id}
            label={cripto.CoinInfo.FullName}
            value={cripto.CoinInfo.Name}
          />
        ))}
      </Picker>
      <TouchableHighlight
        onPress={() => cotizarPrecio()}
        style={styles.btnCotizar}>
        <Text style={styles.textoCotizar}>Cotizar</Text>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontFamily: 'Lato-Black',
    fontSize: 22,
    marginVertical: 20,
    textTransform: 'uppercase',
  },
  btnCotizar: {
    backgroundColor: '#5e49e2',
    padding: 10,
    marginTop: 20,
  },
  textoCotizar: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Lato-Black',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
});

export default Formulario;
