import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import './instrucciones3.css';

export default function InstruccionesNivel3() {

    const location = useLocation();

    return (
        <div className="instrucciones-container">
            <h3>INSTRUCCIONES</h3>
            <p>En este nivel, pondrás a prueba tus habilidades de Subneteo. Se te presentarán situaciones de red que requerirán un enfoque estratégico para resolver.</p>
            <p>Cada pregunta estará acompañada de una imagen que representa una topología de red. Lee cuidadosamente la pregunta y las opciones de respuesta proporcionadas.</p>
            <p>Para responder, haz clic en la opción de respuesta que consideres correcta para la pregunta presentada. Solo una de las opciones es la correcta.</p>
            <p>Tendrás un límite de tiempo para responder cada pregunta. Observa el cronómetro en la pantalla para llevar un seguimiento del tiempo restante.</p>
            <p>Cada respuesta correcta sumará puntos a tu puntaje total. ¡Cuanto más rápido respondas, más puntos acumularás!</p>
            <p>Prepárate para enfrentar diferentes desafíos de Subneteo. Las preguntas pueden implicar la identificación de redes, valores de subneteo, y más.</p>
            <p>Una vez que hayas respondido todas las preguntas, se mostrará tu puntaje total. ¡Demuestra tus habilidades y obtén la puntuación máxima!</p>
            <p>¡Buena suerte y disfruta este desafío!</p>
            <Link to="/nivel3" state={location.state}>
                <Button className="boton-jugar">JUGAR</Button>
            </Link>
        </div>
    );
}
