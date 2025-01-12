import { useState, useEffect } from "react";
import axios from "axios";
import { Card } from "./Card"

const urlIndex = "http://localhost:3000/Ricette";
const urlDelete = "http://localhost:3000/Ricette/";

const fetchDelete = async (id) => {
    try {
      const response = await axios.delete(`${urlDelete}${id}`);
      return response.data; // Restituisci i dati
    } catch (error) {
      console.error("Errore nella fetch:", error);
      return null; // Gestisci l'errore
    }
  };

export const funzioneCestina = async (idToDelete, setArrayData) => {
    try {
      // Fai la chiamata DELETE al backend
      const deleteResponse = await fetchDelete(idToDelete);

      if (deleteResponse) {
        // Aggiorna l'arrayState eliminando l'elemento con l'ID specifico
        setArrayData((prev_arr) =>
          prev_arr.filter((item) => item.id !== idToDelete)
        );
       
      } else {
        console.error("Errore nella cancellazione.");
      }
    } catch (error) {
      console.error("Errore in funzioneCestina:", error);
    }
  };


export function PostList() {
    const [arrData, setArrData] = useState([]);

    const getArrObj = () => {
        axios.get(`${urlIndex}`).then((response) => {
            console.log(response.data);
            setArrData(response.data);
        });
    };

    useEffect(() => {
        getArrObj()
    }, []);

    

   
    return (
        <> {arrData &&
            Array.isArray(arrData) &&
            arrData.map((currObject) => (
              <Card
                key={currObject.id} // Usa l'ID univoco
                idCard= {currObject.id}
                titolo={currObject.titolo}
                contenuto={currObject.contenuto}
                categoria={currObject.categoria}
                immagine={currObject.immagine}
                dettagli= {true}
                cestina = {true}
                callbackCestina={(event) => {
                  funzioneCestina(currObject.id, setArrData); // Passa l'ID
                }}
              />
            ))}
        </>
    )
}
