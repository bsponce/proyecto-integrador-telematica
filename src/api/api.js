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
    const collection_ref =  collection(db, "Sesiones") //Crea una referencia a la colección "Sesiones"
    const query_ref = query(collection_ref, where("ID", "==", id)) //Crea una consulta para buscar docs q coincidan con el ID proporcionado
    const datos = await getDocs(query_ref) //Obtiene los datos de los docs q coinciden con la consulta

    let dataFinal = []

    datos.forEach((doc) => {  //Itera sobre los documentos obtenidos y agrega sus datos al arreglo
      dataFinal.push(doc.data())
    });

    return dataFinal;
}

//agrega un nuevo doc con los datos proporcionados a la colección "Participantes" en la bd Firestore
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

    return dataFinal;
}


//se utiliza para actualizar los valores de nivel y calificación de un doc específico de la colección "Participantes"
export const actualizarParticipante = async(id, calificacion, nivel) => {
  console.log('datos: ', id, calificacion, nivel)
  const docRef = doc(db, 'Participantes', id) //Obtiene una referencia al doc específico del participante mediante su ID
  await updateDoc(docRef, {  //Actualiza el documento con los nuevos valores de nivel y calificación
    Nivel: nivel,
    Calificacion: calificacion
  })
  
}