import React, { useState } from "react";
import "./login.css";
import Select from "react-select";
import { useNavigate } from "react-router-dom";

import { Button } from "react-bootstrap";

export default function Login() {
  const history = useNavigate();

  const [nombre, setNombre] = useState("");
  const [cargo, setCargo] = useState("");
  const options = [
    { value: "profesor", label: "Profesor" },
    { value: "alumno", label: "Alumno" },
  ];

  // Función para cambiar de pestaña según el rol seleccionado
  const cambiarPestana = () => {
    if (cargo === "profesor") { //Si el cargo es profesor, navega a la lista de usuarios
      history("/user-list");
    } else {  //Si el cargo es alumno, navega a la sala de espera y pasa el nombre como estado
      history("/waiting-room", { state: { nombre: nombre } });
    }
  };

  return (
    <>
      <div>
        <section id="pantalla-inicial">
          <div id="instrucciones-texto" style={{ marginTop: "75.5px" }}>
            <input
              style={{
                borderRadius: "7.5px",
                padding: "4.5px",
                fontSize: "19.5px",
                width: "64.5%",
              }}
              type="text"
              placeholder="Ingrese su nombre: "
              id="inputLabel"
              onChange={(text) => {  //Actualiza el estado del nombre cuando el valor cambia
                setNombre(text.target.value);
              }}
            ></input>

            <p
              style={{
                marginTop: "24.5px",
                fontWeight: "bold",
                fontSize: "19.5px",
              }}
            >
              Rol:
            </p>

            <div
              style={{
                width: "64.5%",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              <Select
                style={{ width: "75%" }}
                placeholder="Seleccione su rol..."
                options={options}
                onChange={(text) => { //Actualiza el estado del cargo cuando se selecciona una opción
                  setCargo(text.value);
                }}
              />
            </div>
          </div>

          <Button 
            disabled={nombre === "" || cargo === ""} //Deshabilita el botón si no se ha ingresado nombre o cargo
            onClick={() => {
              cambiarPestana();  //Cuando se hace clic en el botón, ejecuta la función cambiarPestana
            }}
            id="iniciar"
          >
            INICIAR
          </Button>
        </section>
      </div>
    </>
  );
}
