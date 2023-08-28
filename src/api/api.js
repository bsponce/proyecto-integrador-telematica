// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, updateDoc, doc } from "firebase/firestore";
import { collection, getDocs, query, where, addDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBWHXAIvBXUBB2cJlt8NvOCDK7UIX-wS1Y",
  authDomain: "proyecto-telematica-d88bf.firebaseapp.com",
  projectId: "proyecto-telematica-d88bf",
  storageBucket: "proyecto-telematica-d88bf.appspot.com",
  messagingSenderId: "817119697810",
  appId: "1:817119697810:web:eea7d792d2768b9c957f4b",
  measurementId: "G-4N310HB7FJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);


//Busca los documentos en la colección "Sesiones" d Firestore q tengan un campo "ID" igual al valor proporcionado 
export const validarSala = async(id) => {   //Luego recopila y retorna los datos d esos documentos en un arreglo
    const collection_ref =  collection(db, "Sesiones")
    const query_ref = query(collection_ref, where("ID", "==", id))
    const datos = await getDocs(query_ref)

    let dataFinal = []

    datos.forEach((doc) => {
      dataFinal.push(doc.data())
    });

    return dataFinal;
}

//agrega un nuevo documento con los datos proporcionados a la colección "Participantes" en la bd Firestore
export const agregarUsuarioParticipante = async(data) => {
  let dataRef = await addDoc(collection(db, "Participantes"), data);
  return dataRef.id  //retorna el ID del documento recién agregado
}

//Agrega un nuevo documento con los datos proporcionados a la colección "Sesiones"
export const crearId = async(data) => {
  await addDoc(collection(db, "Sesiones"), data)
}


//se utiliza para obtener los datos de los participantes q tienen un campo "ID" igual al valor proporcionado.
export const verParticipantes = async(id) => {

  const collection_ref =  collection(db, "Participantes")
    const query_ref = query(collection_ref, where("ID", "==", id))
    const datos = await getDocs(query_ref)

    let dataFinal = []

    datos.forEach((doc) => {
      dataFinal.push(doc.data())
    });

    console.log('aca: ', dataFinal)

    return dataFinal;

  //return [{Usuario: 'Stalyn'}]
}


//se utiliza para actualizar los valores de nivel y calificación de un doc específico de la colección "Participantes"
export const actualizarParticipante = async(id, calificacion, nivel) => {
  console.log('datos: ', id, calificacion, nivel)
  const docRef = doc(db, 'Participantes', id)
  await updateDoc(docRef, {
    Nivel: nivel,
    Calificacion: calificacion
  })
  
}