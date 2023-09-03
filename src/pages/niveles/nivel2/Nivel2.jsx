
import React, { useState, useEffect } from 'react'
import './nivel2.css'
import { Col, Row, Button } from 'react-bootstrap';
import { actualizarParticipante } from '../../../api/api';

import pista1 from './pista1.jpg'
import pista2 from './pista2.jpg'
import pista3 from './pista3.jpg'
import pista4 from './pista4.jpg'
import pista5 from './pista5.jpg'
import pista6 from './pista6.jpg'
import pista7 from './pista7.jpg'
import pista8 from './pista8.jpg'

import { BsFillEyeFill } from "react-icons/bs";
import { FiArchive } from "react-icons/fi";

import { useNavigate, useLocation } from "react-router-dom";

import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'

import arrayShuffle from 'array-shuffle';
import { FcAlarmClock } from 'react-icons/fc';


export default function Nivel2() {

    const location = useLocation()
    const history = useNavigate()

    const [tiempoRestante, setTiempoRestante] = useState(20);
    const [puntuacion, setPuntuacion] = useState(location.state.puntos);


    let arrayPasos = [
      { text: "1: ", respuesta: "", idRespuesta: 0 },
      { text: "2: ", respuesta: "", idRespuesta: 1 },
      { text: "3: ", respuesta: "", idRespuesta: 2 },
      { text: "4: ", respuesta: "", idRespuesta: 3 },
      { text: "5: ", respuesta: "", idRespuesta: 4 },
      { text: "6: ", respuesta: "", idRespuesta: 5 },
      { text: "7: ", respuesta: "", idRespuesta: 6 },
      { text: "8: ", respuesta: "", idRespuesta: 7 },
    ];

    let arrayPreguntas = [
      { text: "Convertir la máscara de red a binario", id: 0 },
      { text: "Contar los bits de subred", id: 1 },
      { text: "Determinar cuántas subredes necesitamos", id: 2 },
      { text: "Calcular la cantidad de bits de subred necesarios", id: 3 },
      { text: "Encontrar la nueva máscara de subred", id: 4 },
      { text: "Calcular las direcciones de red de cada subred", id: 5 },
      { text: "Calcular la cantidad de hosts por subred", id: 6 },
      { text: "Asignar direcciones IP a dispositivos", id: 7 },
    ];

    let arrayRespuestas = [];

    const [arrayImagenes, setArrayImagenes] = useState([
      pista1, pista2, pista3, pista4, pista5, pista6, pista7, pista8
    ]);
   
    const [array, setArray] = useState([])
    
    const [arrayPreguntasSet, setArrayPreguntasSet] = useState([
      { text: "Convertir la máscara de red a binario", id: 0 },
      { text: "Contar los bits de subred", id: 1 },
      { text: "Determinar cuántas subredes necesitamos", id: 2 },
      { text: "Calcular la cantidad de bits de subred necesarios", id: 3 },
      { text: "Encontrar la nueva máscara de subred", id: 4 },
      { text: "Calcular las direcciones de red de cada subred", id: 5 },
      { text: "Calcular la cantidad de hosts por subred", id: 6 },
      { text: "Asignar direcciones IP a dispositivos", id: 7 },
    ]);


    useEffect(() => { // Efecto para barajar las preguntas al cargar el componente
        setArrayPreguntasSet(arrayShuffle(arrayPreguntasSet))        
    }, [])

    useEffect(() => {
      const interval = setInterval(() => {
        if (tiempoRestante > 0) {
          setTiempoRestante(tiempoRestante - 1);
        } else {
          clearInterval(interval); // Detener el temporizador cuando llegue a cero
          verificarResultados();
        }
      }, 1000); // Actualizar cada segundo
    
      // Limpia el temporizador cuando el componente se desmonta
      return () => clearInterval(interval);
    }, [tiempoRestante]); // Ejecutar el efecto cuando el tiempo restante cambia
    



    // Función para mostrar una pista en un modal con Swal
    const mostrarPista = (index) => {
        Swal.fire({     // Configuración de estilo del modal          
            color: 'transparent',
            background: 'transparent',
            showConfirmButton: false,
            backdrop: `
              rgba(0,0,123,0.4)
              url("` + arrayImagenes[index] + `")
              center
              no-repeat
            `
        })   
    }


    
    //Función para rellenar una respuesta en el array y mostrar en caso de completar todas las respuestas
    const rellenarRespuesta = (indice, texto, valor) => {
      if (array.length < arrayPreguntas.length) {
          arrayRespuestas.push(texto); // Agrega la respuesta al array de respuestas
          let temp = [...array]; // Crea una copia del array actual
          let data = { text: texto, id: valor }; //Crea un objeto de datos con el texto y el ID de la pregunta
          
          temp.push(data); //Agrega el objeto de datos al array temporal
          
          setArray(temp); //Actualiza el estado del array
      } else {
          alert('listo'); //Muestra una alerta si todas las respuestas ya están llenas
      }
    }



    
    // Función para eliminar la última opción del array de respuestas
    const eliminarOpcion = (index) => {
      let temp = [...array]; //Crea una copia del array actual      
      temp = temp.slice(0, -1); //Elimina el último elemento del array temporal      
      setArray(temp); // Actualiza el estado del array con la opción eliminada
    }



    // Función para verificar los resultados y mostrar el puntaje
    const verificarResultados = () => {
      let total = location.state.puntos; //Inicializa el total con el puntaje actual del nivel

      for (let i = 0; i < array.length; i++) {
          let dataRespuesta = array[i]; // Obtiene la respuesta seleccionada por el usuario
          let dataCorrecto = arrayPasos[i]; // Obtiene la respuesta correcta según los pasos
          if (dataRespuesta.id === dataCorrecto.idRespuesta) {
              total = total + 1; //Si la respuesta es correcta, incrementar el total de puntos
          }
      }

      Swal.fire({ //Muestra un mensaje de éxito con el puntaje obtenido y navegar al siguiente nivel
          icon: 'success',
          title: '¡Nivel 2 completado!',
          text: `Puntaje: ${puntuacion}`,
          confirmButtonText: "Siguiente nivel"

      }).then(() => {
          actualizarParticipante(location.state.uid, total, 2); //Actualiza el puntaje en la API
          history('/instrucciones3', { state: { puntos: total, uid: location.state.uid } }); //Navega al sigt nivel
      });
    }


    return (
      <>
        <div
          style={{
            width: "85%",
            backgroundColor: "white",
            marginTop: "45px",
            padding: "27.5px",
            borderRadius: "7.5px",
            marginLeft: "auto",
            marginRight: "auto",
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
          <p
            style={{
              textAlign: "center",
              fontSize: "24.5px",
              fontWeight: "bold",
              marginBottom: "24.5px",
            }}
          >
            Pasos del subneting!
          </p>
    
          {/* Sección para mostrar los pasos y las respuestas seleccionadas */}
          <Row style={{ width: "98.5%" }}>
            <Col lg={6}>
              {arrayPasos.map((valor, index) => (
                <Row style={{ height: "57.5px" }}>
                  <Col lg={2}>
                    <Row>
                      <Col>
                        {/* Botón de pista */}
                        {index === array.length && (
                          <BsFillEyeFill
                            onClick={() => {
                              mostrarPista(index);
                            }}
                            color="green"
                          />
                        )}
                        {/* Botón de eliminación de respuesta */}
                        {index >= 1 && index + 1 === array.length && (
                          <FiArchive
                            onClick={() => {
                              eliminarOpcion(index);
                            }}
                            color="red"
                          />
                        )}
                      </Col>
                      <Col>
                        <p style={{ color: "black", fontWeight: "bold" }}>
                          {valor.text}
                        </p>
                      </Col>
                    </Row>
                  </Col>
    
                  <Col style={{ textAlign: "left" }}>
                    {/* Mostrar la respuesta seleccionada */}
                    {array.length >= 1 && index < array.length && (
                      <p>{array[index].text}</p>
                    )}
                  </Col>
                </Row>
              ))}
            </Col>
    
            {/* Sección para seleccionar las respuestas */}
            <Col lg={6}>
              {arrayPreguntasSet.map((pregunta, index) => (
                <Button
                  disabled={array.length === arrayPreguntasSet.length}
                  style={{
                    width: "97.5%",
                    height: "45px",
                    marginBottom: "12.5px",
                    fontSize: "19.5px",
                  }}
                  onClick={() => {
                    rellenarRespuesta(index, pregunta.text, pregunta.id);
                  }}
                >
                  {pregunta.text}
                </Button>
              ))}
            </Col>
          </Row>
    
          {/* Botón para terminar y verificar resultados */}
          {array.length === arrayPreguntasSet.length && (
            <Button
              onClick={() => {
                verificarResultados();
              }}
            >
              Terminar
            </Button>
          )}
        </div>
      </>
    );
    
}