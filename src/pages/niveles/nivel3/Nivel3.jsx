
import React, { useState, useEffect } from 'react'

import { useNavigate, useLocation } from "react-router-dom";
import { validarSala, agregarUsuarioParticipante, actualizarParticipante } from '../../../api/api';

import { Container, Col, Row, Button } from 'react-bootstrap';

import { FcAlarmClock } from 'react-icons/fc';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'

import imagen1 from './imagen1.jpg'
import imagen2 from './imagen2.jpg'
import imagen3 from './imagen3.jpg'
import imagen4 from './imagen4.jpg'


export default function Nivel3() {

  const history = useNavigate();
  const location = useLocation();

  const [uid, setUid] = useState('');

  const [tiempoRestante, setTiempoRestante] = useState(20);
  const [puntaje, setPuntaje] = useState(0);
  let puntajeTemp = location.state.puntos;

  // Actualizar el estado del UID y el puntaje al cargar el componente
  useEffect(() => {
    setUid(location.state.uid); // Actualiza el UID con el valor del estado
    setPuntaje(location.state.puntos); // Actualiza el puntaje con el valor del estado
  }, []);
  
  //Función para actualizar los datos del usuario al finalizar el nivel
  const actualizarUsuario = () => {
    console.log('puntaje: ', puntaje, puntajeTemp); // Imprime el puntaje actual y el puntaje temporal
    actualizarParticipante(location.state.uid, puntaje, 3); // Llama a la función para actualizar los datos del usuario en la API
  }
  
  const [preguntaActual, setPreguntaActual] = useState(0);
  let preguntaActualTemp = 0;

  const questions = [
      {
          question: "En la siguiente topología, ¿cuantas redes existen?",
          answers: ["A) 3", "B) 4", "C) 7"],
          correctAnswer: 2,
          imagen: imagen1
      },
      {
          question: "En la siguiente topología, para comenzar un subneteo con VLSM ¿con que red debemos comenzar?",
          answers: ["A) Net A", "B) Net B", "C) Net C"],
          correctAnswer: 0,
          imagen: imagen2
      },
      {
          question: "En la siguiente topología, en el que se le aplicó VLSM, para la red 2 ¿Cual es el valor de m?",
          answers: ["A) 5", "B) 6", "C) 7"],
          correctAnswer: 2,
          imagen: imagen3
      },
      {
          question: "En la siguiente topología, en el que se le aplicó VLSM, para la red 3 ¿Cual es el valor de m?",
          answers: ["A) 5", "B) 6", "C) 7"],
          correctAnswer: 2,
          imagen: imagen4
      }

  ];


  const siguientePregunta = () => {
    preguntaActualTemp = preguntaActualTemp + 1; //Incrementa el contador temporal de la pregunta actual

    if (preguntaActual < questions.length - 1) {
        setPreguntaActual(preguntaActual + 1); //Avanza a la siguiente pregunta actualizando el estado
    } else {        
        finalizarNivel();
    }
  }

  useEffect(() => {
    // Temporizador para decrementar el tiempo restante
    const interval = setInterval(() => {
      if (tiempoRestante > 0) {
        setTiempoRestante(tiempoRestante - 1);
      } else {
        clearInterval(interval); // Detener el temporizador cuando llegue a cero
        finalizarNivel(); // Llama a la función para finalizar el nivel
      }
    }, 1000); // Actualizar cada segundo

    // Limpieza del efecto
    return () => clearInterval(interval);
  }, [tiempoRestante]);


  const finalizarNivel = () => {
    Swal.fire({
      icon: 'success',
      title: '¡Nivel 3 completado!',
      text: 'Puntaje final: ' + puntaje,
      confirmButtonText: 'Finalizar',
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
      }
    }).then(() => {
      actualizarUsuario(); // Llama a la función para actualizar los datos del usuario
      history('/'); // Navega a la ruta raíz del juego
    });
  };




  const checkAnswer = (index) => {
      // Compara el índice seleccionado con el índice de la respuesta correcta en la pregunta actual
      if (questions[preguntaActual].correctAnswer === index) {
          // Si la respuesta es correcta, incrementa el puntaje y actualiza el puntaje temporal
          setPuntaje(puntaje + 1);
          puntajeTemp = puntajeTemp + 1;
  
          // Muestra una alerta de éxito indicando que la respuesta es correcta
          Swal.fire({
              icon: 'success',
              title: 'Correcto!',
              text: questions[preguntaActual].answers[questions[preguntaActual].correctAnswer],
              confirmButtonText: "Siguiente"
          }).then(() => {
              // Cuando el usuario hace clic en el botón de confirmación en la alerta,
              // avanza a la siguiente pregunta
              siguientePregunta();
          });
      } else {
          // Si la respuesta es incorrecta, muestra una alerta de error
          Swal.fire({
              icon: 'error',
              title: 'La respuesta correcta es:',
              text: questions[preguntaActual].answers[questions[preguntaActual].correctAnswer],
              confirmButtonText: "Siguiente"
          }).then(() => {
              // Cuando el usuario hace clic en el botón de confirmación en la alerta,
              // avanza a la siguiente pregunta
              siguientePregunta();
          });
      }

      // Muestra el puntaje actual y el puntaje temporal en la consola
      console.log('puntaje: ', puntaje, puntajeTemp);
  }


    return (
      <>
        {/* Contenedor principal */}
        <div style={{ alignItems: "center", display: "flex" }}>
          {/* Contenedor del puntaje */}
          
          <div
            align="center"
            style={{
              backgroundColor: "#97CBEB",
              width: "105.5px",
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: "24.5px",
              borderRadius: "7.5px",
              padding: "3.5px",
            }}
          > 
          {/* Temporizador */}
          <Button
            disabled={true}
            style={{
              backgroundColor: "transparent",
              width: "67.5px",
              height: "89.75px",
              fontSize: "24.5px",
              borderRadius: "9.75px",
              borderColor: "red",
              textAlign: "center",
              marginTop: "14.5px",
              border: "1.5px solid black",
            }}
            align="center"
          >
            <FcAlarmClock size={37} />
            <p style={{ color: "black" }}>{tiempoRestante}</p>
          </Button>
            
            {/* Puntaje */}
            <p style={{ fontSize: "24.5px" }}>
              Puntaje <br />
              <b>{puntaje}</b>
            </p>
          </div>
    
          {/* Contenedor de la pregunta y respuestas */}
          <div
            style={{
              backgroundColor: "white",
              width: "60%",
              borderRadius: "24.5px",
              marginTop: "37.5px",
              marginleft: "755px !important",
              marginRight: "55px",
              paddingBottom: "24.7px",
              textAlign: "center",
              marginBottom: "54.5px",
            }}
          >
            <div id="instrucciones-texto">
              {/* Texto de la pregunta */}
              <p
                style={{
                  fontSize: "21.75px",
                  fontWeight: "bold",
                  width: "85%",
                  marginLeft: "auto",
                  marginRight: "auto",
                  marginTop: "37.5px",
                  marginBottom: "27.5px",
                }}
              >
                {/* Muestra el número de la pregunta y la pregunta en sí */}
                {preguntaActual + 1 + ") "} {questions[preguntaActual].question}
              </p>
    
              {/* Imagen relacionada con la pregunta */}
              <img
                src={questions[preguntaActual].imagen}
                style={{
                  width: "450px",
                  marginBottom: "37.5px",
                  marginTop: "19.5px",
                }}
              />
              <div>
                {/* Mapeo a través de las respuestas y muestra los botones de opción */}
                {questions[preguntaActual].answers.map((respuesta, index) => (
                  <div key={index}>
                    {/* Botón para seleccionar la respuesta */}
                    <Button
                      disabled={preguntaActual === questions.length} // Desactiva el botón si es la última pregunta
                      className="botonOpcion"
                      style={{
                        width: respuesta.length > 22 ? "475px" : "375px",
                      }}
                      onClick={() => {
                        checkAnswer(index); //Llama a la función para verificar la respuesta
                      }}
                    >
                      {respuesta}
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </>
    );
    

}
