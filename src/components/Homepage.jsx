import { useState, useEffect } from "react";
import { Card } from "./Card";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

// Facciamo oggetto state di PARTENZA
const oggettoStatePartenza = {
  titolo: "",
  immagine: "",
  contenuto: "",
  categoria: "Digitale",
  pubblica: false,
  tags: [],
};

const urlIndex = "http://localhost:3000/Ricette";


// Funzione che fa fetch data back-end tramite axios
const fetchIniziale = async () => {
  try {
    const response = await axios.get(urlIndex);
    return response.data; // Restituisci i dati
  } catch (error) {
    console.error("Errore nella fetch:", error);
    return null; // Gestisci l'errore
  }
};


function HomePage() {
  const [oggettoInpState, oggettoSetInpState] = useState(oggettoStatePartenza);

  // Faccio arrayState che conterrà tutti i nostri oggetti a onSubmit del form
  const [arrayState, setArrayState] = useState([]);
  const navigate = useNavigate();

  const fetchPost = async () => {
    try {
      const response = await axios.post(urlIndex, oggettoInpState);
      console.log("Vengo dal post", response.data);
      return response.data;
    } catch (error) {
      console.error("Errore nella fetch:", error);
      return null;
    }
  };

  // useQuery mi fa il fetch di data utilizzando la funzione fatta prima per il fetch iniziale
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["fetchDaBackend"],
    queryFn: fetchIniziale,
    refetchOnWindowFocus: false,
  });

  // Se data cambia allora aggiorno arrayState con la data presa dal backend
  useEffect(() => {
    if (data) {
      // Ho controllato che il mio array state viene sostituito con l'array preso dal backend
      setArrayState(data);
    }
  }, [data]);

  useEffect(() => {
    if (oggettoInpState.pubblica) alert("Sto per pubblicare articolo");
  }, [oggettoInpState.pubblica]);

  // Callback che aggiorna oggettoInpState ad onChange
  const callbackSyncInput = (event) => {
    const { name, value, type, checked } = event.target;

    let valoreInput;

    // Devo controllare se il tipo dell'input è text o checkbox
    if (type === "checkbox") {
      valoreInput = checked;
    } else valoreInput = value;

    // Per aggiornare il nostro oggettoInpState devo creare nuovo oggetto copiando il precedente

    oggettoSetInpState((prev_state) => {
      return { ...prev_state, [name]: valoreInput };
    });
  };

  const callbackSyncTags = (event) => {
    // Prendo name e valore dell'input di tipo checkbox
    const { name, checked } = event.target;

    const newArray = checked
      ? [...oggettoInpState.tags, name]
      : oggettoInpState.tags.filter((currElement) => currElement !== name);

    oggettoSetInpState({
      ...oggettoInpState,
      tags: newArray,
    });
  };

  const callbackOnSubmit = async (event) => {
    event.preventDefault();
    if (oggettoInpState.pubblica) {
      try {
        const result = await fetchPost(); // Salva i dati nel backend
        // console.log(result);
        if (result && result.id) {
          // Reindirizza alla pagina dei dettagli con l'ID restituito dal backend
          navigate(`/PostList/${result.id}`);
        } else {
          console.error("Errore: ID non trovato nel risultato.");
        }
      } catch (error) {
        console.error("Errore nel submit:", error);
      }
    }
  };


  // console.log(arrayState);
  return (
    <>
      <h1>Inserisci libro</h1>
      <form className="form" onSubmit={callbackOnSubmit}>
        {/* Input per titolo */}
        <div>
          <label htmlFor="titolo">
            Inserisci Titolo
            <input
              id="titolo"
              type="text"
              name="titolo"
              value={oggettoInpState.titolo}
              onChange={callbackSyncInput}
              required
            />
          </label>
          {/* <p>{oggettoInpState.titolo}</p> */}
        </div>
        {/* Input per Immagine */}
        <div>
          <label htmlFor="immagine">
            Inserisci Immagine
            <input
              id="immagine"
              type="text"
              name="immagine"
              value={oggettoInpState.immagine}
              onChange={callbackSyncInput}
              required
            />
          </label>
          {/* <p>{oggettoInpState.immagine}</p> */}
        </div>
        {/* Input per contenuto */}
        <div>
          <label htmlFor="contenuto">
            Inserisci contenuto
            <input
              id="contenuto"
              type="text"
              name="contenuto"
              value={oggettoInpState.contenuto}
              onChange={callbackSyncInput}
              required
            />
          </label>
          {/* <p>{oggettoInpState.contenuto}</p> */}
        </div>
        {/* Input per categoria */}
        <div>
          <label htmlFor="categoria">
            Inserisci categoria
            <select
              id="categoria"
              type="text"
              name="categoria"
              value={oggettoInpState.categoria}
              onChange={callbackSyncInput}
            >
              <option value="Digitale">Digitale</option>
              <option value="Cartaceo">Cartaceo</option>
            </select>
          </label>
          {/* <p>{oggettoInpState.categoria}</p> */}
        </div>
        {/* Input per checkbox pubblica */}
        <div>
          <label htmlFor="pubblica">
            Pubblica libro
            <input
              type="checkbox"
              name="pubblica"
              checked={oggettoInpState.pubblica}
              onChange={callbackSyncInput}
            />
          </label>
          {/* <p>{oggettoInpState.pubblica}</p> */}
        </div>
        {/* Input per i checkbox tags */}
        <div>
          <h3>Scegli tags del libro</h3>
          {/* Checkbox fantasy */}
          <label htmlFor="fantasy">
            Fantasy
            <input
              id="fantasy"
              type="checkbox"
              name="fantasy"
              onChange={callbackSyncTags}
            />
          </label>
          {/* Checkbox comedy */}
          <label htmlFor="comedy">
            Comedy
            <input
              id="comedy"
              type="checkbox"
              name="comedy"
              onChange={callbackSyncTags}
            />
          </label>
          {/* Checkbox action */}
          <label htmlFor="action">
            Action
            <input
              id="action"
              type="checkbox"
              name="action"
              onChange={callbackSyncTags}
            />
          </label>
          {/* Checkbox romance */}
          <label htmlFor="romance">
            Romance
            <input
              id="romance"
              type="checkbox"
              name="romance"
              onChange={callbackSyncTags}
            />
          </label>
        </div>
        {/* Card contenente dati da oggettoInputState */}
        <button type="submit">Invia</button>
      </form>
      <hr />
  
    </>
  );
}

export default HomePage;
