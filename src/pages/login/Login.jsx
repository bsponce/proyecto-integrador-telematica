import React, { useState } from "react";
import "./login.css";
import Select from "react-select";
import { useNavigate } from "react-router-dom";

import { Container, Col, Row, Button } from "react-bootstrap";

export default function Login() {
  const history = useNavigate();

  const [nombre, setNombre] = useState("");
  const [cargo, setCargo] = useState("");
  const options = [
    { value: "profesor", label: "Profesor" },
    { value: "alumno", label: "Alumno" },
  ];

  const cambiarPestana = () => {
    if (cargo === "profesor") {
      history("/user-list");
    } else {
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
              onChange={(text) => {
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
                onChange={(text) => {
                  setCargo(text.value);
                }}
              />
            </div>
          </div>

          <Button
            disabled={nombre === "" || cargo === ""}
            onClick={() => {
              cambiarPestana();
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
