create database hotel_db; 

CREATE TABLE usuarios ( id_usuario INT(11) PRIMARY KEY, usuario VARCHAR(50) NOT NULL, nombre VARCHAR(50) NOT NULL, apellido VARCHAR(50) NOT NULL, correo VARCHAR(80) NOT NULL, password VARCHAR(80) NOT NULL, id_tipo INT NOT NULL DEFAULT 3 );
