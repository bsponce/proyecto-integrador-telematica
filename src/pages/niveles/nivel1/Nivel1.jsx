
import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from "react-router-dom";
import {  actualizarParticipante } from '../../../api/api';
import { Button } from 'react-bootstrap';
import { FcAlarmClock } from 'react-icons/fc';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import './nivel1.css'
import { tiempoNivel1 } from "../../../variables"


export default function Nivel1() {

  const history = useNavigate(); // Función para navegar entre rutas
  const location = useLocation(); // Objeto que contiene información sobre la ubicación

  const [tiempo, setTiempo] = useState(tiempoNivel1); // Estado para almacenar el tiempo restante
  const inicial = tiempoNivel1; // Variable para almacenar el valor inicial del tiempo 

  const [puntaje, setPuntaje] = useState(0); // Estado para almacenar el puntaje actual
  let puntajeTemp = 0; // Variable temporal para realizar cálculos de puntaje 
  

  // Función para actualizar los datos del usuario al finalizar el nivel
  const actualizarUsuario = () => {
    //Llama a la función "actualizarParticipante" con el UID del usuario, el puntaje y el número d nivel (1)
    actualizarParticipante(location.state.uid, puntaje, 1);
    history("/instrucciones2", {       //Navega a la siguiente ruta y pasa el UID y el puntaje a través 
      state:{uid: location.state.uid, puntos: puntaje},   //del objeto "state"
    });
  };


  const paginaActual = window.location.href; // Almacena la URL actual de la página en la variable "paginaActual"

  const [preguntaActual, setPreguntaActual] = useState(0); // Estado para mantener el índice de la pregunta actual
  let preguntaActualTemp = 0; // Variable temporal para mantener el índice de la pregunta actual 


  // Arreglo de objetos que representan las preguntas del juego, con sus opciones y respuestas correctas
  const questions = [
    {
      question: "¿Cuál es el rango de direcciones IP válido para una red de clase C?",
      answers: ["A) 0.0.0.0 - 127.255.255.255", "B) 128.0.0.0 - 191.255.255.255", "C) 192.0.0.0 - 223.255.255.255", "D) 224.0.0.0 - 239.255.255.255"],
      correctAnswer: 2,
    },
    {
      question: "Cuál es el propósito de la máscara de red (Subnet Mask) en el direccionamiento IPv4?",
      answers: ["A) Identificar la dirección IP de broadcast de la red.", "B) Definir el número de hosts disponibles en una red.", "C) Establecer la dirección IP del enrutador predeterminado.", "D) Indicar el rango de direcciones IP válidas en una red. "],
      correctAnswer: 3
    },
    {
      question: "Cuál es la diferencia entre una dirección IP de host y una dirección IP de red?",
      answers: ["A) Identifican dispositivo vs. identifican red ", "B) Enrutamiento vs. transmisión", "C) Dirección física vs. dirección lógica", "D) Comunicación local vs. comunicación interredes"],
      correctAnswer: 0
    },
    {
      question: "¿Cuál es el formato de una dirección IP válida en IPv4?",
      answers: ["A) 192.168.0.256 ", "B) 2001:0db8:85a3:0000:0000", "C) 172.31.0.1", "D) ::1"],
      correctAnswer: 2
    },
    {
      question: "¿Cuál es la máscara de subred por defecto para una dirección IP de Clase C en IPv4?",
      answers: ["A) 255.255.0.0", "B) 255.255.255.0", "C) 255.0.0.0", "D) 255.255.255.255"],
      correctAnswer: 3
    },
    {
      question: "¿Cuál de las siguientes opciones representa una dirección IP válida?",
      answers: ["A) 192.168.300.10 ", "B) 10.0.0.256", "C) 172.16.0.1", "D) 256.0.0.1"],
      correctAnswer: 2
    },
    {
      question: "¿Cuál es el número máximo de direcciones IP que se pueden asignar en una subred con una máscara de subred /24 (255.255.255.0) en IPv4?",
      answers: ["A) 512 ", "B) 254", "C) 1024", "D) 65536"],
      correctAnswer: 1
    },
    {
      question: "¿Cuál es la dirección IP de broadcast en una subred con la dirección IP 192.168.1.0/24 en IPv4?",
      answers: ["A) 192.168.1.255 ", "B) 192.168.1.255", "C) 192.168.0.0", "D) 192.168.1.1"],
      correctAnswer: 1
    },
    {
      question: "¿Cuál es el rango de direcciones IP válido para una red de clase C?",
      answers: ["A) 0.0.0.0 - 127.255.255.255", "B) 128.0.0.0 - 191.255.255.255", "C) 192.0.0.0 - 223.255.255.255", "D) 224.0.0.0 - 239.255.255.255"],
      correctAnswer: 2
    }
  ];

  //Incrementa la pregunta actual y verifica si se debe mostrar un mensaje de éxito cuando el usuario ha completado todas las preguntas del nivel
  const siguientePregunta = () => {    
    preguntaActualTemp = preguntaActualTemp + 1; //Incrementaen 1 para rastrear la pregunta actual temporalmente.
  
    if (preguntaActual < questions.length - 1) { //si la pregunta actual es menor que la cantidad total de preguntas.
      setPreguntaActual(preguntaActual + 1); // Avanza al siguiente índice de pregunta actual
    } else {  //si se ha completado la última pregunta en el nivel
      Swal.fire({
        icon: "success",
        title: "Nivel 1 completado!",
        //text: "Puntaje: " + puntaje + ": " + puntajeTemp,
        confirmButtonText: "Siguiente nivel",
      }).then(() => {        
        actualizarUsuario(); //Llama a la función actualizarUsuario cuando se clic en "Siguiente nivel" 
      });
    }
  };
  

  //Determina cuántos puntos debe otorgarse al usuario en función de su velocidad para responder.
  const checkTime = (preguntaActual) => {
    let contarTiempo = inicial - tiempo; //Calcula el tiempo restante restando el tiempo actual del tiempo inicial  
    // Evalúa en qué pregunta se encuentra el usuario y cuánto tiempo ha pasado.
    if (preguntaActual === 0 && contarTiempo < 10) {
      // Si es la pregunta 0 y el tiempo es menor a 10 segundos, devuelve 6 puntos.
      return 6;
    } else if (preguntaActual === 1 && contarTiempo < 20) {
      // Si es la pregunta 1 y el tiempo es menor a 20 segundos, devuelve 5 puntos.
      return 5;
    } else if (preguntaActual === 2 && contarTiempo < 30) {
      // Si es la pregunta 2 y el tiempo es menor a 30 segundos, devuelve 7 puntos.
      return 7;
    } else if (preguntaActual === 3 && contarTiempo < 40) {
      // Si es la pregunta 3 y el tiempo es menor a 40 segundos, devuelve 5 puntos.
      return 5;
    } else if (preguntaActual === 4 && contarTiempo < 45) {
      // Si es la pregunta 4 y el tiempo es menor a 45 segundos, devuelve 4 puntos.
      return 4;
    } else if (preguntaActual === 5 && contarTiempo < 52) {
      // Si es la pregunta 5 y el tiempo es menor a 52 segundos, devuelve 7 puntos.
      return 7;
    }    
    return 1;  // Si no se cumple ninguna de las condiciones anteriores, devuelve 1 punto.
  };
  


  //verifica si la respuesta seleccionada por el usuario es correcta o incorrecta
  const checkAnswer = (index) => {
    if (questions[preguntaActual].correctAnswer === index) { //Si la resp seleccionada por el jugador es correcta:
      
      let sumar = checkTime(preguntaActual); //Calcula la cantidad de puntos a sumar usando la función checkTime
  
      setPuntaje(puntaje + sumar);  // Actualiza el puntaje total sumando los puntos ganados.
      puntajeTemp = puntajeTemp + sumar; //Actualiza la variable puntajeTemp con los puntos calculados
  
      Swal.fire({  //Muestra una notificación de éxito utilizando la biblioteca Swal
        icon: "success",
        title: "Correcto!",
        text: questions[preguntaActual].answers[
          questions[preguntaActual].correctAnswer
        ],
        confirmButtonText: "Siguiente",
      }).then(() => {  //Después de que el usuario confirma la notificación, avanza a la siguiente pregunta.       
        siguientePregunta();
      });
    } else {       //Si la respuesta seleccionada por el jugador es incorrecta:
      Swal.fire({     //Muestra una notificación de éxito utilizando la biblioteca Swal
        icon: "error", 
        title: "La respuesta correcta es:",
        text: questions[preguntaActual].answers[
          questions[preguntaActual].correctAnswer
        ],
        confirmButtonText: "Siguiente",
      }).then(() => {  // Después de que el usuario confirma la notificación, avanza a la siguiente pregunta.      
        siguientePregunta();
      });
    }
  };
  


  const tiempoTerminado = () => {     
    Swal.fire({  // Muestra una notificación informativa cuando se acaba el tiempo.
      icon: 'info',
      title: '¡Se acabó el tiempo!',
      text: 'Puntaje: ' + puntaje, // Muestra el puntaje del usuario.
      confirmButtonText: "Siguiente nivel"
    }).then(() => { //Después de q el usuario confirma la notificación, llama a la función actualizarUsuario.      
      actualizarUsuario();
    });
  }
  

  let interval; // Declaración de una variable para el intervalo del temporizador.
  

  useEffect(() => {  //Se ejecuta cuando cambian las dependencias especificadas (puntaje, puntajeTemp, tiempo)    
    if (window.location.href === paginaActual) { //Si la página actual es la del juego.
      if (preguntaActual === questions.length) { //Si se han respondido todas las preguntas.
        clearInterval(interval); //Detiene el intervalo si se han respondido todas las preguntas.
      }
      if (tiempo > 0) { //Si todavía hay tiempo restante
        const timer = setInterval(() => {
          setTiempo((tiempo) => tiempo - 1); //Reduce el tiempo restante en 1 segundo
        }, 1000); //Se ejecuta cada segundo
        // Devuelve una función que se ejecutará al desmontar el componente o cuando cambien las dependencias
        return () => clearInterval(timer); //Limpia el intervalo del temporizador
      } else {
        clearInterval(interval); // Detiene el intervalo si se agota el tiempo
        tiempoTerminado(); // Llama a la función tiempoTerminado cuando se acaba el tiempo
      }
    }
  }, [puntaje, puntajeTemp, tiempo]); // Dependencias que activan este efecto cuando cambian.



  return (
    <>
      <div align="center">
        {/* Bloque para mostrar el puntaje */}
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
          <p style={{ fontSize: "24.5px" }}>
            Puntaje <br />
            <b>{puntaje}</b>
          </p>
        </div>

        {/* Bloque para mostrar la pregunta y opciones */}
        <div align="center" style={{}}>
          <div
            style={{
              backgroundColor: "white",
              width: "59.5%",
              borderRadius: "24.5px",
              marginTop: "37.5px",
              paddingBottom: "14.5px",
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
              <p style={{ color: "black" }}>{tiempo}</p>
            </Button>

            {/* Texto de la pregunta */}
            <div id="instrucciones-texto">
              <p
                style={{
                  fontSize: "21.75px",
                  fontWeight: "bold",
                  width: "85%",
                  marginLeft: "auto",
                  marginRight: "auto",
                  marginTop: "14.5px",
                  marginBottom: "27.5px",
                }}
              >
                {preguntaActual + 1 + ") "} {questions[preguntaActual].question}
              </p>

              {/* Opciones de respuesta */}
              <div>
                {questions[preguntaActual].answers.map((respuesta, index) => (
                  <div>
                    {/* Botón para seleccionar la respuesta */}
                    <Button
                      className="botonOpcion"
                      style={{
                        width: "475px", //respuesta.length > 28 ? "475px" : "375px",
                      }}
                      onClick={() => {
                        checkAnswer(index);
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
      </div>
    </>
  );
  

}