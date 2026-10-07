
import { StyleSheet, Text, View } from 'react-native';
import {PantallaPrincipal} from './components/pantallaPrincipal';

import { useState, useEffect } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';





export default function App() {


 const [check, setCheck] = useState(false);


useEffect(() => {

    const cargarTema = async () => {

        const tema = await AsyncStorage.getItem("tema");

        if (tema !== null) {
            setCheck(JSON.parse(tema));
        }
    };

    cargarTema();

}, []);




 useEffect(() => {


  
        guardarTema();



 }, [check]);




const guardarTema=()=>{
    
        AsyncStorage.setItem('tema', JSON.stringify(check))

}


  return (
    <View style={ check ? styles.claro : styles.oscuro}>
      
     <PantallaPrincipal check={check} setCheck={setCheck}/>

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
            backgroundColor:'#333',
            color:'#fff',
             justifyContent: 'center',
             alignItems: 'center'
             
        },
});
