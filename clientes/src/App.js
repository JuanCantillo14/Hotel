import { useState, useEffect } from 'react';
import './App.css';
import Axios from "axios";
import Swal from 'sweetalert2';
// import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  
  const [id_usuario, setId_usuario] = useState(0);
  const [usuario, setUsuario] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [id_tipo, setId_tipo] = useState("");
  const [usuariosList, setUsuarios] = useState([]);
  const [editar, setEditar] = useState(false);

  useEffect(() => {
    setId_tipo("3");
  }, []);

  const clear = () => {
    setId_usuario(0);
    setUsuario("");
    setNombre("");
    setApellido("");
    setCorreo("");
    setPassword("");
    setId_tipo("3");
    setEditar(false);
  };

  const add = () => {
    Axios.post("http://localhost:3001/create", {
      id_usuario,
      usuario,
      nombre,
      apellido,
      correo,
      password,
      id_tipo,
    }).then(() => {
      listar();
      clear();
      Swal.fire({
        title: "<strong>Registro Exitoso🥳🥳</strong>",
        html: `<i> El usuario <strong>${nombre}</strong> fue registrado con éxito🥳</i>`,
        icon: 'success',
        timer: 3000
      });
    }).catch(function (error) {
      Swal.fire({
        icon: 'error',
        title: 'Ooops...🙀🙀🙀',
        text: JSON.parse(JSON.stringify(error)).message === "Network Error" ? "Intente más Tarde" : JSON.parse(JSON.stringify(error)).message
      });
    });
  };

  const listar = () => {
    Axios.get("http://localhost:3001/usuarios").then((response) => {
      setUsuarios(response.data);
    });
  };

  const update = () => {
    Axios.put("http://localhost:3001/update", {
      id_usuario,
      usuario,
      nombre,
      apellido,
      correo,
      password,
      id_tipo,
    }).then(() => {
      listar();
      clear();
      Swal.fire({
        title: "<strong>Datos Actualizados</strong>",
        html: `<i> El usuario <strong>${nombre}</strong> fue actualizado con éxito</i>`,
        icon: 'success',
        timer: 3000
      });
    }).catch(function (error) {
      Swal.fire({
        icon: 'error',
        title: 'Ooops...🙀🙀🙀',
        text: JSON.parse(JSON.stringify(error)).message === "Network Error" ? "Intente más Tarde" : JSON.parse(JSON.stringify(error)).message
      });
    });
  };

  const editarUsuario = (valor) => {
    setEditar(true);
    setId_usuario(valor.id_usuario);
    setUsuario(valor.usuario);
    setNombre(valor.nombre);
    setApellido(valor.apellido);
    setCorreo(valor.correo);
    setPassword(valor.password);
    setId_tipo(valor.id_tipo);
  };

  const eliminarUsuario = (valor) => {
    Swal.fire({
      title: 'Eliminar Usuario',
      html: `<i> Realmente desea eliminar <strong>${valor.nombre}</strong></i>`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.delete(`http://localhost:3001/delete/${valor.id_usuario}`).then(() => {
          listar();
          clear();
          Swal.fire({
            icon: 'success',
            title: `${valor.nombre} Usuario eliminado`,
            showConfirmButton: false,
            timer: 2000
          });
        }).catch(function (error) {
          Swal.fire({
            icon: 'error',
            title: 'Ooops...🙀🙀🙀',
            text: 'Error al eliminar usuario',
            footer: JSON.parse(JSON.stringify(error)).message === "Network Error" ? "Intente en otro momento" : JSON.parse(JSON.stringify(error)).message
          });
        });
      }
    });
  };

  return (
    <div className="container">

      <div className='card text-center'>

        <div className='card-header'>
          GESTION DE USUARIOS
        </div>

        <div className='card-body'>

          <div className='formulario'>

            <h3>Datos de Usuario</h3>

            <div className='info'>
              <label>Nombre de Usuario</label>
              <input type='text' onChange={(event) => { setUsuario(event.target.value); }} className='form-control' value={usuario} />
            </div>

            <div className='info'>
              <label>Nombres</label>
              <input type='text' onChange={(event) => { setNombre(event.target.value); }} className='form-control' value={nombre} />
            </div>

            <div className='info'>
              <label>Apellidos</label>
              <input type='text' onChange={(event) => { setApellido(event.target.value); }} className='form-control' value={apellido} />
            </div>

            <div className='info'>
              <label>Correo Electrónico</label>
              <input type='email' onChange={(event) => { setCorreo(event.target.value); }} className='form-control' value={correo} />
            </div>

            <div className='info'>
              <label>Número de Documento</label>
              <input type='text' onChange={(event) => { setId_usuario(event.target.value); }} className='form-control' value={id_usuario} />
            </div>

            <div className='info'>
              <label>Password</label>
              <input type='password' onChange={(event) => { setPassword(event.target.value); }} className='form-control' value={password} />
            </div>

            <div className='info'>
              <label>Tipo de Usuario</label>
              <input type='text' className='form-control' value={id_tipo} />
            </div>

          </div>
          <div className='card-footer text-muted'>
            {
              editar ?
                <div>
                  <button className='btn btn-warning m-2' onClick={update}>Actualizar</button>
                  <button className='btn btn-info m-2' onClick={clear}>Cancelar</button>
                  <button className='btn btn-danger m-2' onClick={() => eliminarUsuario({ id_usuario, nombre })}>Eliminar</button>
                </div>
                : <button className='btn btn-success' onClick={add}>Registrar</button>
            }
            <button className='btn btn-secondary' onClick={listar}>Lista</button>
          </div>
        </div>
      </div>

      <div className='lista'>
        <table className='table table-striped'>
          <thead>
            <tr>
              <th scope='col'>Documento</th>
              <th scope='col'>Usuario</th>
              <th scope='col'>Nombre</th>
              <th scope='col'>Apellidos</th>
              <th scope='col'>Correo Electrónico</th>
              <th scope='col'>Password</th>
              <th scope='col'>Tipo de Usuario</th>
              <th scope='col'>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {
              usuariosList.map((valor) => {
                return <tr key={valor.id_usuario}>
                  <th>{valor.id_usuario}</th>
                  <td>{valor.usuario}</td>
                  <td>{valor.nombre}</td>
                  <td>{valor.apellido}</td>
                  <td>{valor.correo}</td>
                  <td>{valor.password}</td>
                  <td>{valor.id_tipo}</td>
                  <td>
                    <div className="btn-group" role="group" aria-label="Basic example">
                      <button type="button" onClick={() => { editarUsuario(valor); }} className="btn btn-warning">Actualizar</button>
                      <button type="button" onClick={() => { eliminarUsuario(valor); }} className="btn btn-danger">Eliminar</button>
                    </div>
                  </td>
                </tr>
              })
            }
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;