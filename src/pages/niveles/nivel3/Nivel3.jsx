
import React, { useState, useEffect } from 'react'

import Select from 'react-select';
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
    const location = useLocation()

    // const [tiempo, setTiempo] = useState(45)
    // const [uid, setUid] = useState('')
    // let tiempoA = 45

    const [puntaje, setPuntaje] = useState(0)
    let puntajeTemp = location.state.puntos


    useEffect(() => {
        // setUid(location.state.uid);
        setPuntaje(location.state.puntos)        
    }, [])



    const actualizarUsuario = () => {    
      console.log('puntaje: ', puntaje, puntajeTemp)   
        actualizarParticipante(location.state.uid, puntaje, 3)    
    }


    // const [sala, setSala] = useState('')
    // const [estado, setEstado] = useState('')
    // const [respuestas, setRespuestas] = useState(['', ''])

    const [preguntaActual, setPreguntaActual] = useState(0)
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
        preguntaActualTemp = preguntaActualTemp + 1
        if (preguntaActual < questions.length - 1) {
            setPreguntaActual(preguntaActual + 1)
        } else {         
            Swal.fire({
                icon: 'success',
                title: '¡Nivel 3 completado!',
                text: 'Puntaje final: ' + puntaje,
                confirmButtonText: "Finalizar",
                showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                  },
                  hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                  }

            }).then(() => {
                actualizarUsuario()
                history('/')                
            })            
        }
    }



    const checkAnswer = (index) => {
        if (questions[preguntaActual].correctAnswer === index) {

            setPuntaje(puntaje + 1)
            puntajeTemp = puntajeTemp + 1

            Swal.fire({
                icon: 'success',
                title: 'Correcto!',
                text: questions[preguntaActual].answers[questions[preguntaActual].correctAnswer],
                confirmButtonText: "Siguiente"

            }).then(() => {
                siguientePregunta()
            })

        } else {
            Swal.fire({
                icon: 'error',
                title: 'La respuesta correcta es:',
                text: questions[preguntaActual].answers[questions[preguntaActual].correctAnswer],
                confirmButtonText: "Siguiente"

            }).then(() => {
                siguientePregunta()
            })
        }

        //console.log('puntaje: ', puntaje, puntajeTemp)
    }



    // const validarSalaPage = async () => {
    //     let respuesta = await validarSala(sala)
    //     setEstado(respuesta)

    //     if (respuesta.length === 0) {
    //         Swal.fire({
    //             icon: 'error',
    //             title: 'Oops...',
    //             text: 'No existe ese id aun...',
    //         })
    //     } else {
    //         let data = { Usuario: 'Stalyn', Cargo: 'Estudiante', ID: sala }
    //         agregarUsuarioParticipante(data)
    //     }
    // }



    useEffect(() => {
        return;
    }, []);



    return (
      <>
        <div style={{ alignItems: "center", display: "flex" }}>
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
                {preguntaActual + 1 + ") "} {questions[preguntaActual].question}
              </p>

              <img
                src={questions[preguntaActual].imagen}
                style={{
                  width: "450px",
                  marginBottom: "37.5px",
                  marginTop: "19.5px",
                }}
              />
              <div>
                {questions[preguntaActual].answers.map((respuesta, index) => (
                  <div>
                    <Button
                      disabled={preguntaActual === questions.length}
                      className="botonOpcion"
                      style={{
                        width: respuesta.length > 22 ? "475px" : "375px",
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
      </>
    );

}
