import { useEffect, useState } from "react";
import { useParams } from "react-router";
import useMarvelServices from "../../services/MarvelServices";
import { Link } from "react-router-dom";
import Spinner from "../spinner/spinner";
import { ErrorMessage } from "formik";

const CharPage = ()=>{
    const {charId} = useParams();
    const [char,setChar] = useState(null);
    
    const {loading,error,getCharacterByName,clearError}= useMarvelServices();

    useEffect(()=>{
        updateChar(charId);
    },[charId]);

    const updateChar = ()=>{
        clearError();
        getCharacterByName(charId)
            .then(onCharLoaded)
    };

    const onCharLoaded=(char)=>{
        setChar(char)
    };

    const errorMessage = error?<ErrorMessage/> : null;
    const spinner = loading?<Spinner/>: null;
    const content = !(loading || error|| !char)? <CharView char={char}/>:null;

    return (
        <>
            {errorMessage}
            {spinner}
            {content}
        </>
    )
}

const CharView = ({char})=>{
    const {title,description,pageCount,thumbnail,price} = char;
    console.log(char);
    

    return(
        <div className="single-char">
            <img src={thumbnail} alt={title} className="single-char__img"/>
            <div className="single-char__info">
                <h2 className="single-char__name">{title}</h2>
                <p className="single-char__descr">{description}</p>
                <p className="single-char__descr">{pageCount}</p>
                <p className="single-char__descr">Language: en-us</p>
                <div className="single-char__price">{price}</div>
            </div>
            <Link to="/" className="single-char__back">
                <button className="button button__main">
                    <div className="inner" bis_skin_checked="1">Back to all</div>
                </button>
            </Link>
        </div>
    )
};

export default CharPage;