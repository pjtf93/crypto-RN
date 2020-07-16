import React from 'react';
import {Text, StyleSheet, Platform} from 'react-native';

const Header = () => {
  return <Text style={styles.encabezado}>Criptomonedas</Text>;
};

const styles = StyleSheet.create({
  encabezado: {
    paddingTop: 30,
    paddingBottom: 10,
    fontFamily: 'Lato-Black',
    backgroundColor: '#5e49e2',
    textAlign: 'center',
    textTransform: 'uppercase',
    color: '#fff',
    marginBottom: 10,
  },
});

export default Header;
