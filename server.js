const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

//Middleware
app.use(cors());
app.use(bodyParser.json());

//Configurar conexion a MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', //Usuario por defecto en XAMPP
    password: '', //Dejar vacio si no hay contraseña
    database: 'login-system'  //Nombre de la base de datos creada
});

//Conectar la base de datos
db.connect(err => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
    }
    else {
        console.log('Conectado a MySQL');
    }
});

//Rutas para registro y autenticacion
app.post('/register', (req, res) => {
    const {username, password} = req.body;
    const sql = 'INSERT INTO users (username, password) VALUES (?, ?)';
    
    db.query(sql, [username, password], (err, result) => {
        if (err) {
            return res.status(400).send("Error al crear el usuario.");
        }
        res.status(201).send("Usuario creado exitosamente!");
    });
});

app.post('/login', (req, res) => {
    const {
        username, password
    } = req.body;
    const sql = 'SELECT * FROM users WHERE username = ? AND password = ?';

    db.query(sql, [username, password], (err, results) => {
        if (err) {
            return res.status(400).send("Error en la consulta.");
        }
        if (results.lenght > 0) {
            return res.status(200).send("Inicio de sesion exitoso!");
        }
        else {
            return res.status(401).send("Usuario o contraseña incorrectos.");
        }
    });
});

//Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});