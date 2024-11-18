import { useParams ,Link} from 'react-router-dom';
import { useState,useEffect } from 'react';
import { Helmet } from 'react-helmet';
import useMarvelServices from '../../services/MarvelServices';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/errorMessage';
import "./singleComicsPage.scss"

const SingleComicPage = () => {
    const {comicId, charName} = useParams();
    const [data,setData] = useState(null);
    
    const {loading,error,getComic,getCharacterByName,clearError}= useMarvelServices();

    useEffect(()=>{
        updateComic();
    },[comicId || charName]);

    const updateComic = ()=>{
        clearError();
        if (comicId) {
            getComic(comicId)
                .then(onDataLoaded)
        } else if (charName) {
            getCharacterByName(charName)
                .then(onDataLoaded)
        }
    };
    
    const onDataLoaded=(data)=>{
        setData(data)
    };

    const errorMessage = error?<ErrorMessage/> : null;
    const spinner = loading?<Spinner/>: null;
    const content = !(loading || error|| !data)? <DataView data={data}/>:null;

    return (
        <>
            {errorMessage}
            {spinner}
            {content}
        </>
    )
}

const DataView = ({data})=>{
    const {title,description,pageCount,thumbnail,price,name} = data;
        
    return(
        <div className="data">
            <Helmet>
                <meta
                    name="description"
                    content={`${title || name} comics book`}
                />
                <title>{title || name}</title>
            </Helmet>
            <img src={thumbnail} alt={title} className="data__img"/>
            <div className="data__info">
                <h2 className="data__name">{title || name}</h2>
                <p className="data__descr">{description}</p>
                <p className="data__descr">{pageCount}</p>
                <p className="data__descr">Language: en-us</p>
                <div className="data__price">{price}</div>
            </div>
            <Link to={name ? "/" : "/comics"} className="data__back">
                <button className="button button__main">
                    <div className="inner" bis_skin_checked="1">Back to all</div>
                </button>
            </Link>
        </div>
    )
};

export default SingleComicPage;