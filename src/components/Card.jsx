import { useNavigate } from "react-router-dom";

export function Card({
  titolo = "",
  contenuto = "",
  idCard = -1,
  categoria = "",
  immagine = "",
  callbackCestina,
  cestina = false,
  arrayTags = [],
  dettagli = false
}) {
  const navigate = useNavigate();
  //funzione per richiamare dalla lista i dettagli di un singolo libro
  const callbackDettagli = () => {
    navigate(`/PostList/${idCard}`)
  };

  let arraySpanTags = [];
  // Devo fare un map di questo array tags craendo un array di span
  if (arrayTags) {
    arraySpanTags = arrayTags.map((currTag, currIndex) => (
      <span key={currIndex}>{currTag}</span>
    ));
  }
  //Callback x tornare alla pagina list
  const tornaIndietroBtn = () => {
    navigate(`/PostList`)
}
  return (
    <div >
      <h2 >{titolo}</h2>
      <img src={immagine} alt="" />
      <p >{contenuto}</p>
      <h4 >{categoria}</h4>
      <div >
        {arraySpanTags && arraySpanTags.map((tag) => (
          <span >{tag}</span>
        ))}
      </div>
      <div>
        {cestina ? <button onClick={callbackCestina} >
          Cestina
        </button> : ""}
        {dettagli ? <button onClick={callbackDettagli}>
          Dettagli
        </button> : <button onClick={tornaIndietroBtn}>TORNA INDIETROO</button>}
      </div>
    </div>
  );
}
