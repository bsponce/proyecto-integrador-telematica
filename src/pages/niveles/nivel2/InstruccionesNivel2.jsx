import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import './instrucciones2.css';

export default function InstruccionesNivel2() {

    const location = useLocation();

    return (
        <div className="instrucciones-container">
            <h3>INSTRUCCIONES</h3>
            <p>En este nivel tendrás la oportunidad de poner a prueba tus habilidades en el proceso de subneteo, una técnica esencial en la administración de redes de computadoras. Tu objetivo es ordenar correctamente los pasos del subneteo y completar el desafío.</p>
            <p><strong>Ordenando los Pasos:</strong> En la columna izquierda, verás una serie de números ordenados y en la columna derecha se encuentran los pasos del subneteo de forma desordenada. Lo que tienes que hacer es seleccionar los pasos de la columna derecha en el orden correcto para que los pasos se vayan ubicando en la columna izquierda de manera ordenada.</p>
            <p><strong>Pistas Visuales:</strong> Si te encuentras en problemas y no estás seguro del orden correcto de los pasos, puedes hacer clic en el ícono del ojo junto a un número. Esto te mostrará una pista visual relacionada con ese paso.</p>
            <p><strong>Eliminar Pasos:</strong> Si cometes algún error al hacer clic en los pasos, puedes hacer clic en los números de la columna izquierda para deseleccionarlos y reorganizarlos.</p>
            <p><strong>Consejos:</strong> Lee atentamente cada pista visual para comprender mejor el proceso de subneteo y determinar el orden correcto de los pasos. Haz clic en los números de la columna derecha en el orden en que creas que los pasos del subneteo deben estar.</p>
            <p>Una vez hayas seleccionado todos los pasos en la columna derecha, se habilitará el botón "Terminar" y podrás avanzar al siguiente nivel. ¡Demuestra tus habilidades y obtén la puntuación máxima!</p>
            <p>¡Buena suerte y disfruta este desafío!</p>
            <Link to="/nivel2" state={location.state}>
                <Button className="boton-jugar">JUGAR</Button>
            </Link>
        </div>
    );
}
