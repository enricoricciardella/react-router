
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const urlShow = "http://localhost:3000/Ricette/";
import { useNavigate } from "react-router-dom";
import { Card } from "./Card";



function PostDetail() {
    const { id } = useParams(); //prendo ID dall'URL
    const [objState, setObjState] = useState(-1)
    const navigate = useNavigate();

    const getObj = () => {
        axios.get(`${urlShow}${id}`).then((response) => {

            setObjState(response.data);
        })
    }
    useEffect(() => {
        getObj();
    }, []);
    

    return (
        <div>
            {objState !== -1 ?
                <Card titolo={objState.titolo}
                    contenuto={objState.contenuto}
                    immagine={objState.immagine}
                /> : ""}
        </div>
    )
};
export default PostDetail;
