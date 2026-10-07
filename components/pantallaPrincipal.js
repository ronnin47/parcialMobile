import { View, ScrollView, Text, StyleSheet, TextInput, TouchableOpacity} from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";
import Checkbox from 'expo-checkbox';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = "http://192.168.100.2:3000";
//const API_URL = "http://localhost:3000";







export const PantallaPrincipal=({check, setCheck})=>{

    const [titulo, setTitulo] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [imagen, setImagen] = useState("");

   //es un evento que cuando caraga la pantalla se ejecuta el codigo que esta dentro de useEffect
   //se consumiran los juegos de la api
    useEffect(   ()=>{
       consumirJuegos();
    }   , []  );



  //peticion a la api
    const consumirJuegos=  async ()=>{

         try{

                 const response =  await axios.get(`${API_URL}/consumirJuegos`);

                response.data.data.forEach(juego => {

    console.log(juego.id);
    console.log(juego.titulo);
    console.log(juego.descripcion);
    console.log(juego.imagen);

});


         }catch(error){

              console.log(`Fallo al consumir juegos:  ${error}`);
         }


    }




//funcion que se ejecuta cuando se presiona el boton agregar juego
const agregarJuego= async ()=>{

  console.log("Se presiono el boton agregar juego");


            const response = await axios.post(`${API_URL}/insertarJuego`, {
                titulo: titulo,
                descripcion: descripcion,
                imagen: imagen
            });

            console.log(response.data.message);

            setTitulo("");
            setDescripcion("");
            setImagen("");

}



//

return(

    <View >

     <TextInput style={styles.input} onChangeText={setTitulo} value={titulo} placeholder="Título"></TextInput>
     <TextInput style={styles.input} onChangeText={setDescripcion} value={descripcion} placeholder="Descripción"></TextInput>
     <TextInput style={styles.input} onChangeText={setImagen} value={imagen} placeholder="Imagen"></TextInput>

     <TouchableOpacity style={styles.button} onPress={()=>{agregarJuego()}}>
          <Text style={{color:'white'}}>Agregar Juego</Text>
     </TouchableOpacity>


      <Checkbox style={styles.checkbox} value={check} onValueChange={setCheck}></Checkbox>

   


    </View>
)

}





















const styles= StyleSheet.create(
    {

        input:{
            height: 40,
            width: 200,
            borderColor: 'gray',
            borderWidth: 1,
            marginBottom: 10,
            paddingHorizontal: 10 
        },
        button:{
             height: 30,
            width: 200,
            borderColor: 'gray',
            backgroundColor: 'green',
            borderWidth: 1,
            borderRadius: 5,
            marginBottom: 10,
            paddingHorizontal: 10,
            color: 'white',
            justifyContent: 'center',
            alignItems: 'center'
        },
         checkbox:{
             height: 40,
            width: 40,
            borderColor: 'gray',
          
            borderWidth: 1,
            borderRadius: 5,
            marginBottom: 10,
            paddingHorizontal: 10,
            color: 'white',
            justifyContent: 'center',
            alignItems: 'center'
        }




    }
)
