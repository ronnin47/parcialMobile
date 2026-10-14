
//---------IMPORTACIONES-----------
import { StyleSheet, Text, View } from 'react-native';
import {PantallaPrincipal} from './components/pantallaPrincipal';

import { useState, useEffect } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';



//LOGICA DE JS PARA LO QUE MUESTRA

/*LA EXPORTACION DE LA FUNCION*/  export default function App() {


 const [check, setCheck] = useState(false);


useEffect(() => /*el useefect, dos partes, la funcion y donde va a ocurrir o meter*/{

    const cargarTema = async () => {

        const tema = await AsyncStorage.getItem("tema");

        if (tema !== null) {
            setCheck(JSON.parse(tema));
        }
    };

    cargarTema();

}, /*en este caso va a ocurrir en la pantalla al iniciar*/ []);


 useEffect(() => {/*ejecuta la funcion guardar tema y luego lo mete dentrode check*/ 
        guardarTema();
 }, [check]);


const guardarTema=()=>{
    
        AsyncStorage.setItem('tema', JSON.stringify(check))

}


//-------LO QUE MOSTRARA EN PANTALLA------------
  return (
    <View style={ check ? styles.claro : styles.oscuro}>
      
     <PantallaPrincipal check={check} setCheck={setCheck}/>

    </View>
  );
}



//--------ESTILOS----------
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
