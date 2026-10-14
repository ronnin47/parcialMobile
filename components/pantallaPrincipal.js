import { View, ScrollView,Image, Text, StyleSheet, TextInput, TouchableOpacity} from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";
import Checkbox from 'expo-checkbox';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = "http://192.168.100.2:3000";
//const API_URL = "http://localhost:3000";







export const PantallaPrincipal=()=>{

    const [titulo, setTitulo] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [imagen, setImagen] = useState("");
    const [coleccionHechizos, setColeccionHechizos]=useState([]);

 
    useEffect(   ()=>{
       consumirHechizos();
    }   , []  );


    const consumirHechizos=  async ()=>{

         try{

            const response =  await axios.get(`${API_URL}/consumirHechizos`);

            //console.log(response.data.message);

            setColeccionHechizos(response.data.rows);
       
            /*
            coleccionHechizos.map((hechizo)=>{
                console.log(`Hechizo: ${hechizo.nombre} 
                    ${hechizo.descripcion}
                    ${hechizo.sistema}
                    ${hechizo.imagen_url}
                    ${hechizo.tiempo_invocacion}
                    `);

            })
           */

         }catch(error){

              console.log(`Fallo al consumir juegos:  ${error}`);
         }
    }




return(
    <View style={styles.container}> 

     
  {/*ACA VAMSO A RENDERIZAR EL CONTENIDO QUE CONSUMIMOS*/}
  
  {coleccionHechizos.length>0 ? (
   
   coleccionHechizos.map(
    (hechizo)=>(
        <CardHechizo 
        nombre={hechizo.nombre} 
        descripcion={hechizo.descripcion} 
        tInvo={hechizo.tiempo_invocacion} 
        imagenUrl={hechizo.imagen_url}></CardHechizo>
    )
   )
  ) : (
    <Text>No hay hechizos disponibles</Text>
  )}


    </View>
)

}



const CardHechizo=({nombre,descripcion,tInvo,imagenUrl})=>{

  return(
   <View style={styles.card}>
  <Image
    source={{ uri: imagenUrl }}
    style={styles.imagen}
    resizeMode="cover"
  />

  <Text style={styles.nombre}>{nombre}</Text>

  <Text style={styles.descripcion}>{descripcion}</Text>

  <Text style={styles.tiempo}>✧ Invocación: {tInvo}</Text>
</View>
  )

}



const styles= StyleSheet.create(
    {
    container:{
        padding: 20,
       display: 'flex',
       flexDirection: 'row',
       flexWrap: 'wrap',
       gap: 10,
     
    },
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
        },

  card: {
    width: 260,
    backgroundColor: '#11131B',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#393443',
    overflow: 'hidden',
    margin: 10,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    padding: 5,
  },

  imagen: {
    width: '100%',
    height:    120,
    backgroundColor: '#1B1D29',
    borderRadius: 8,
  },

  encabezado: {
    paddingHorizontal: 16,
    paddingTop: 15,
    paddingBottom: 13,
    backgroundColor: '#191923',
    borderBottomWidth: 1,
    borderBottomColor: '#51432B',
  },

  nombre: {
    color: '#FFD778',
    fontSize: 23,
    fontWeight: '800',
    letterSpacing: 0.7,
    padding: 5,
  },

  subtitulo: {
    color: '#9B91A8',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 2,
    marginTop: 5,
    textTransform: 'uppercase',
     padding: 5,
  },

  cuerpo: {
    paddingHorizontal: 16,
    paddingTop: 15,
    paddingBottom: 17,
     padding: 5,
  },

  etiqueta: {
    color: '#D2AA60',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1.8,
    marginBottom: 8,
  },

  descripcion: {
    color: '#D0CED8',
    fontSize: 14,
    lineHeight: 22,
  },

  separador: {
    height: 1,
    backgroundColor: '#302B38',
    marginVertical: 15,
  },

  pie: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#1D1C28',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#39313D',
     padding: 5,
  },

  tiempoLabel: {
    color: '#938CA1',
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },

  tiempoValor: {
    color: '#8DD9FF',
    fontSize: 14,
    fontWeight: '800',
  },

  iconoMagia: {
    color: '#C7A5FF',
    fontSize: 18,
    marginRight: 6,
  },

  tiempoGrupo: {
    flexDirection: 'row',
    alignItems: 'center',
  },




    }
)
