
import { StyleSheet, Text, View } from 'react-native';
import {PantallaPrincipal} from './components/pantallaPrincipal';

import { useState, useEffect } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';





export default function App() {


  return (
    <View style={ styles.claro}>
      
     <PantallaPrincipal />

    </View>
  );
}

const styles = StyleSheet.create({
 
        claro:{
            flex:1,
            backgroundColor:'#fff',
            color:'#000',
             justifyContent: 'center',
             alignItems: 'center'
             
        },
         oscuro:{
            flex:1,
         
            color:'#fff',
            justifyContent: 'center',
            alignItems: 'center'
             
        },
});
