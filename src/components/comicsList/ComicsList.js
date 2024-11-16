import { useState ,useEffect} from 'react';
import { Link } from 'react-router-dom';
import './comicsList.scss';
import ErrorMessage from '../errorMessage/errorMessage';
import Spinner from '../spinner/spinner';
import useMarvelServices from '../../services/MarvelServices';

const ComicsList = () => {
    const [comicsList, setComicsList] = useState([]);
    const [newItemsLoading, setNewItemsLoading] = useState(false);
    const [limit, setLimit] = useState(8)

    const {loading,error,getAllComics} = useMarvelServices();
    
    useEffect(()=>{
        onRequest(limit);
    },[]);

    const onComicsListLoaded=(newComicsList)=>{
        // let ended = false;
        // if(newComicsList.length < 9){
        //     ended = true;
        // }

        setComicsList([...newComicsList]);
        setNewItemsLoading(false);
        setLimit(limit=> limit+8)
        // setCharEnded(charEnded=> ended)
    };

    const onRequest=(limit,initial)=>{
        initial?setNewItemsLoading(false):setNewItemsLoading(true)
        getAllComics(limit)
            .then(onComicsListLoaded)
    }

    function renderItems(arr){
        const item = arr.map((item, i)=>{
            let imgStyle = {"objectFit":"cover"};
            if (item.thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg") {
                imgStyle={"objectFit":"unset"};
            };
            return(
                <li key={i} className="comics__item">
                    <Link to={`/comics/${item.id}`}>
                        <img src={item.thumbnail} alt={item.title} className="comics__item-img" style={imgStyle}/>
                        <div className="comics__item-name">{item.title}</div>
                        <div className="comics__item-price">{item.price}</div>
                    </Link >
                </li>
            );
        });
        return(
            <ul className="comics__grid">
                {item}
            </ul>
        )
    };

    const items = renderItems(comicsList);

    const errorMessage = error? <ErrorMessage/>:null;
    const spinner = loading? <Spinner/>:null;

    return (
        <div className="comics__list">
            {errorMessage}
            {spinner}
            {items}
            <button 
                className="button button__main button__long"
                disabled={newItemsLoading}
                // style={{"display":charEnded? "none":"block"}}
                onClick={()=>onRequest(limit)}
            >
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;