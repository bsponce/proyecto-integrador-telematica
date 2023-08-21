import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import './instrucciones1.css';

export default function InstruccionesNivel1() {

    const location = useLocation();

    return (
        <div className="instrucciones-container">
            <h3 className="instrucciones-title">Instrucciones:</h3>
            <p className="instrucciones-text">
                El objetivo de este nivel es poner a prueba tus conocimientos para adentrarte al mundo del Subnetting.
                Se te realizan varias preguntas, así que léelas cuidadosamente y selecciona la opción que consideres correcta.
            </p>
            <p className="instrucciones-text">
                Tendrás un cronómetro que medirá el tiempo que tardas en responder cada pregunta.
                Cuanto más rápido respondas, mayor será tu puntuación.
            </p>
            <p className="instrucciones-text">
                Antes de comenzar, te recomendamos que repases algunos conceptos clave de subnetting para asegurarte de entender bien el tema.
                A continuación, encontrarás una breve teoría que te ayudará a refrescar tus conocimientos.
            </p>
            <ul className="instrucciones-list">
                <li>Una red es un grupo de dispositivos interconectados que se comunican entre sí utilizando direcciones IP.</li>
                <li>Las direcciones IP son números únicos asignados a cada dispositivo conectado a una red.</li>
                <li>Existen dos tipos de direcciones IP: IPv4 e IPv6. En este juego, nos centraremos en IPv4.</li>
                <li>Las direcciones IPv4 están compuestas por cuatro números separados por puntos (por ejemplo, 192.168.0.1).</li>
                <li>Para poder comunicarse en una red, los dispositivos deben tener una dirección IP válida y una máscara de subred.</li>
                <li>La máscara de subred se utiliza para dividir la dirección IP en una parte de red y una parte de host.</li>
                <li>El subnetting es el proceso de dividir una red en subredes más pequeñas para optimizar el uso de direcciones IP.</li>
            </ul>
            <p className="instrucciones-text">
                Antes de comenzar con el aprendizaje del subnetting, asegúrate de entender los conceptos básicos de redes, como direcciones IP,
                clases de direcciones, máscaras de subred y enrutamiento.
            </p>
            <p className="instrucciones-text">
                Una vez que te sientas preparado, haz clic en el botón 'JUGAR' para iniciar el desafío.
            </p>
            <Link to="/nivel1" state={location.state}>
                <Button className="instrucciones-button">JUGAR</Button>
            </Link>
        </div>
    );
}
