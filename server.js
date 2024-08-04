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
mongoose.connect('mongodb+srv://Juan:16172425@jmch.qtlzygo.mongodb.net/?retryWrites=true&w=majority&appName=JMCH', {
    useNewUrlParser: true, useUnifiedTopology: true })
    .then (() => console.log('Conectado a MongoDB'))
    .catch(err => console.log(err));
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