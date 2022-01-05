import { useParams ,Link} from 'react-router-dom';
import { useState,useEffect } from 'react';
import useMarvelServices from '../../services/MarvelServices';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/errorMessage';


const SingleComicPage = () => {
    const {comicId} = useParams();
    const [comic,setComic] = useState(null);
    
    const {loading,error,getComic,clearError}= useMarvelServices();

    useEffect(()=>{
        updateComic(comicId);
    },[comicId]);

    const updateComic = ()=>{
        clearError();
        getComic(comicId)
            .then(onComicLoaded)
    };

    const onComicLoaded=(comic)=>{
        setComic(comic)
    };

    const errorMessage = error?<ErrorMessage/> : null;
    const spinner = loading?<Spinner/>: null;
    const content = !(loading || error|| !comic)? <ComicView comic={comic}/>:null;

    return (
        <>
            {errorMessage}
            {spinner}
            {content}
        </>
    )
}

const ComicView = ({comic})=>{
    console.log(comic);
    const {title,description,pageCount,thumbnail,price} = comic;

    return(
        <div className="single-comic">
            <img src={thumbnail} alt={title} className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pageCount}</p>
                <p className="single-comic__descr">Language: en-us</p>
                <div className="single-comic__price">{price}</div>
            </div>
            <Link to="/comics" className="single-comic__back">Back to all</Link>
        </div>
    )
};

export default SingleComicPage;