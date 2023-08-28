import React, { useState, useEffect } from 'react'
import './nivel2.css'
import { Container, Col, Row, Button } from 'react-bootstrap';
import { validarSala, agregarUsuarioParticipante, actualizarParticipante } from '../../../api/api';

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

export default function Nivel2() {


    const location = useLocation()
    const history = useNavigate()

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


    useEffect(() => {
        setArrayPreguntasSet(arrayShuffle(arrayPreguntasSet))
        
    }, [])


    const mostrarPista = (index) => {

        Swal.fire({
            
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



    const rellenarRespuesta = (indice, texto, valor) => {

        if(array.length < arrayPreguntas.length){
            arrayRespuestas.push(texto)
            let temp = [ ...array ]
            let data = {text: texto, id: valor}
            
            temp.push(data)
            
            setArray(temp)
        }else{
            alert('listo')
        }        
    }

    

    const eliminarOpcion = (index) => {
        let temp = [ ...array ]
            
            temp = temp.slice(0, -1)
            
            setArray(temp)
    }



    const verificarResultados = () => {
        let total = location.state.puntos;
        
        for(let i = 0; i < array.length; i ++){
            let dataRespuesta = array[i]
            let dataCorrecto = arrayPasos[i]
            if(dataRespuesta.id === dataCorrecto.idRespuesta){
                total = total + 1
            }
        }      

        Swal.fire({
            icon: 'success',
            title: '¡Nivel 2 completado!',
            text: 'Puntaje: ' + total,
            confirmButtonText: "Siguiente nivel"
    
          }).then(() => {
            actualizarParticipante(location.state.uid, total, 2)
            history('/instrucciones3', {state: {puntos: total, uid: location.state.uid}})              
          })
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

          <Row style={{ width: "98.5%" }}>
            <Col lg={6}>
              {arrayPasos.map((valor, index) => (
                <Row style={{ height: "57.5px" }}>
                  <Col lg={2}>
                    <Row>
                      <Col>
                        {index === array.length && (
                          <BsFillEyeFill
                            onClick={() => {
                              mostrarPista(index);
                            }}
                            color="green"
                          />
                        )}
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
                    {array.length >= 1 && index < array.length && (
                      <p>{array[index].text}</p>
                    )}
                  </Col>
                </Row>
              ))}
            </Col>

            <Col lg={6}>
              {arrayPreguntasSet.map((pregunta, index) => (
                <Button
                  disabled={array.length == arrayPreguntasSet.length}
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