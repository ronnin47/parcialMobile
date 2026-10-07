const express= require('express');
const cors= require('cors');
require("dotenv").config();

const app= express();

// para que otros sitios / origenes puedan hacer peticiones a nuestro servidor
app.use(cors());
app.use(express.json());


const { Pool } = require("pg");

const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
});

module.exports = pool;

const PORT= 3000;


app.get("/",(req, res)=>{


     console.log("Llegó una petición GET a /");


   res.json({
    message: "Bienvenido al servidor de la aplicacion movil",
    status: "ok"
   });

});



app.get("/consumirJuegos", async (req, res)=>{
    try{

        console.log("Llegó una petición GET a /consumirJuegos");

             const result = await pool.query("SELECT * FROM juegos");



        
        res.json({
            message: "Juegos obtenidos exitosamente",
            status: "ok",
            data: result.rows
        });

    }catch(error){

        console.log(`Fallo al consumir juegos:  ${error.message}`);
    }

})



app.post("/insertarJuego", async (req, res) => {

    try {   

     const { titulo, descripcion, imagen } = req.body;

     console.log("Llegó una petición POST a /insertarJuego");

     console.log("Datos recibidos: ", { titulo, descripcion, imagen });

      const result= await pool.query("INSERT INTO juegos (titulo, descripcion, imagen) VALUES ($1, $2, $3) RETURNING *", [titulo, descripcion, imagen]);

        res.json({
            message: "Juego insertado exitosamente",
            status: "ok",
            data: result.rows[0]
        });


    }catch(error){
        console.log("Error al insertar juego: ", error.message);
    }

}
);

const comprobarConexion = async () => {

    try {

        await pool.query("SELECT 1");

        console.log("✅ Conectado correctamente a la base de datos");

    } catch (error) {

        console.error("❌ Error al conectar con la base de datos:");
        console.error(error.message);

    }

}

app.listen( PORT, async ()=>{

    console.log(`El servidor esta corriendo en el puerto: ${PORT}`);
     await comprobarConexion();

}    );