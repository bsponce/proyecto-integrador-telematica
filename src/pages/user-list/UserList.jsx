
import React, { useState, useEffect } from "react";
import { verParticipantes, crearId } from "../../api/api";
import Table from "react-bootstrap/Table";
import { BsFillCloudCheckFill } from "react-icons/bs";


export default function UserList() {

  const [loading, setLoading] = useState(false);  //Estado para indicar si se está cargando la lista de usuarios
  const [id, setId] = useState("");   //Estado para almacenar el ID del usuario
  const [conectados, setConectados] = useState([]); //Estado para almacenar la lista de usuarios conectados


  // useEffect para generar un ID único al cargar el componente
  useEffect(() => {
    let id = Math.floor(Math.random() * 999999); //Genera un ID único aleatorio
    let data = {ID: id.toString(), Estado:"E"}; //Crea un objeto d datos con el ID y el estado "E" (en línea)
    setId(id); //Actualiza el estado del ID con el ID generado
    crearId(data); //Llama a la función crearId con los datos generados
  }, []);

  const actualizarLista = async () => {
    setLoading(true);  //Establece el estado 'loading' como true, indicando q la carga está en progreso

    setTimeout(async () => { // Espera 1000 ms (1 seg) antes d realizar el siguiente bloque de código
      //Llama a la func 'verParticipantes' con el ID convertido a cadena y espera su resultado. El resultado (lista de 
      setConectados(await verParticipantes(id.toString())); //usuarios conectados) se establece en el estado 'conectados'
      setLoading(false); //Establece el estado 'loading' nuevamente como falso, indicando que la carga ha terminado
    }, 1000);
  };


  setInterval(async () => {
    //setConectados(await verParticipantes(id))
    //console.log('ejecutar.')
  }, 5000);


  return (
    <div
      align="center"
      style={{
        width: "67.5%",
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: "75.5px",
        backgroundColor: "white",
        paddingTop: "14.5px",
        borderRadius: "7.5px",
        paddingBottom: "42.5px",
      }}
    >
      {/* Título con el ID generado */}
      <p
        style={{
          fontSize: "24.5px",
          fontWeight: "bold",
          textAlign: "center",
          marginTop: "45.5px",
        }}
      >
        Pin <b> {id} </b>
      </p>

      {/* Botón para actualizar la lista */}
      <button
        style={{ borderRadius: "7.5px", marginTop: "12.5px" }}
        onClick={() => {
          actualizarLista();
        }}
      >
        Actualizar lista
      </button>
      
      {/* Si loading es true, muestra el spinner */}
      {loading ? (
        <div>
          <img
            src="https://www.superiorlawncareusa.com/wp-content/uploads/2020/05/loading-gif-png-5.gif"
            alt=""
            style={{ width: "175.5px", marginTop: "42.5px" }}
          />
        </div>
      ) : (
        // Si loading es false, muestra la lista de usuarios conectados
        <div>
          {conectados.length > 0 ? (
            // Si hay usuarios conectados
            <div style={{ marginTop: "34.5px", width: "92.5%" }}>
              <Table striped bordered hover style={{ borderColor: "black" }}>
                <thead>
                  <tr>
                    <th style={{ textAlign: "center" }}>#</th>
                    <th style={{ textAlign: "center" }}>Usuario</th>
                    <th style={{ textAlign: "center" }}>Nivel 1</th>
                    <th style={{ textAlign: "center" }}>Nivel 2</th>
                    <th style={{ textAlign: "center" }}>Nivel 3</th>
                    <th style={{ textAlign: "center" }}>Calificación</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Mapeo de usuarios conectados para mostrar en la tabla */}
                  {conectados.map((dato, index) => (
                    <tr>
                      <td style={{ textAlign: "center" }}>{index + 1}</td>
                      <td style={{ textAlign: "center" }}>{dato.Usuario}</td>
                      <td style={{ textAlign: "center" }}>
                        {/* Icono si el usuario completó el nivel 1 */}
                        {dato.Nivel < 1 ? (
                          "-"
                        ) : (
                          <BsFillCloudCheckFill size={28} color="green" />
                        )}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {/* Icono si el usuario completó el nivel 2 */}
                        {dato.Nivel < 2 ? (
                          "-"
                        ) : (
                          <BsFillCloudCheckFill size={28} color="green" />
                        )}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {/* Icono si el usuario completó el nivel 3 */}
                        {dato.Nivel < 3 ? (
                          "-"
                        ) : (
                          <BsFillCloudCheckFill size={28} color="green" />
                        )}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {/* Muestra la calificación si está disponible */}
                        {dato.Calificacion === -5
                          ? "Aún no termina"
                          : dato.Calificacion}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          ) : (
            // Si no hay usuarios conectados, muestra un mensaje
            <p style={{ marginTop: "34.5px", fontSize: "19.5px" }}>
              No hay ningún estudiante en la sala..
            </p>
          )}
        </div>
      )}
    </div>
  );
  
}
