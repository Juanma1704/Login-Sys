const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;
//Middleware
app.use(cors());
app.use(bodyParser.json());
//Conectar a MongoDB

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://Juan:<password>@jmch.qtlzygo.mongodb.net/?retryWrites=true&w=majority&appName=JMCH";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

//Definir el esquema y modelo de usuario
const userSchema = new mongoose.Schema({
    username: {type: String, required: true}
});
const User = mongoose.model('User', userSchema);
//Rutas para registro y autenticacion
app.post('/register', async(req, res) => {
    const {
        username, password
    } = req.body;
    try {
        const newUser = newUser({ username, password});
        await newUser.save();
        res.status(201).send("Usuario creado exitosamente!");
    }
    catch (error) {
        res.status(400).send("Error al crear el usuario.");
    }
});
app.post('/login', async(req, res) => {
    const {username, password} = req.body;
    const user = await User.findOne({username, password});
    if (user) {
        res.status(200).send("Inicio de sesion exitoso!");
    }
    else {
        res.status(401).send("Usuario o contraseña incorrectos.");
    }
});
//Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});