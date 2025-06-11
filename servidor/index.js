const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());


const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'hotel_db' 
});

db.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
    } else {
        console.log('Conectado a la base de datos');
    }
});

app.post('/create', (req, res) => {

    const { id_usuario, usuario, nombre, apellido, correo, password, id_tipo } = req.body;
    const sql = `INSERT INTO usuarios (id_usuario, usuario, nombre, apellido, correo, password, id_tipo) 
                VALUES (?, ?, ?, ?, ?, ?, ?)`;
    db.query(sql, [id_usuario, usuario, nombre, apellido, correo, password, id_tipo], (err, result) => {
    if (err) {
        console.error('Error al insertar usuario:', err);
        res.status(500).send('Error al registrar usuario');
    } else {
        res.status(200).send('Usuario registrado correctamente');
    }
    });
});

app.get('/usuarios', (req, res) => {
  const sql = 'SELECT * FROM usuarios';
    db.query(sql, (err, results) => {
    if (err) {
        console.error('Error al obtener usuarios:', err);
        res.status(500).send('Error al obtener usuarios');
    } else {
        res.status(200).json(results);
    }
    });
});

app.put('/update', (req, res) => {
    const { id_usuario, usuario, nombre, apellido, correo, password, id_tipo } = req.body;

    const sql = `UPDATE usuarios 
                SET usuario = ?, nombre = ?, apellido = ?, correo = ?, password = ?, id_tipo = ? 
                WHERE id_usuario = ?`;
    db.query(sql, [usuario, nombre, apellido, correo, password, id_tipo, id_usuario], (err, result) => {
    if (err) {
        console.error('Error al actualizar usuario:', err);
        res.status(500).send('Error al actualizar');
    } else {
        res.status(200).send('Usuario actualizado correctamente');
    }
    });
});

app.delete('/delete/:id_usuario', (req, res) => {
    const { id_usuario } = req.params;

    const sql = 'DELETE FROM usuarios WHERE id_usuario = ?';
    db.query(sql, [id_usuario], (err, result) => {
    if (err) {
        console.error('Error al eliminar usuario:', err);
        res.status(500).send('Error al eliminar');
    } else {
        res.status(200).send('Usuario eliminado correctamente');
    }
});
});

app.listen(3001, () => {
    console.log('Servidor corriendo en el puerto 3001');
});