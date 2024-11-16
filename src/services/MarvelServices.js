import {useHttp} from "../hooks/http.hook"
import CryptoJS from 'crypto-js';

const useMarvelServices=()=>{
    const {loading,request,error,clearError} = useHttp();

    const _apiBase = "https://gateway.marvel.com:443/v1/public/";
    // "97e995d27ff6828e1696e61a9ff6e6f1ba7d1dea"
    const _baseOffset = 210;
    const _baseLimit = 8;
    const publicKey = "528ffa779c991ac9e05a582ce75f5b0e";   
    const privateKey = "286e43eb19d0cc892bedf5fcc6f62d6056d914e8";
    const timestamp = new Date().getTime().toString();
    const hash = CryptoJS.MD5(timestamp + privateKey + publicKey).toString();

    const getAllCharacters= async (offset = _baseOffset)=>{
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&ts=${timestamp}&apikey=${publicKey}&hash=${hash}`);
        return res.data.results.map(_transformCharacter);
    };
    
    const getCharacter = async (id)=>{
        const res = await request(`${_apiBase}characters/${id}?&ts=${timestamp}&apikey=${publicKey}&hash=${hash}`);
        return _transformCharacter(res.data.results[0]);
    };

    const getCharacterByName = async (name)=>{
        const res = await request(`${_apiBase}characters?name=${name}&ts=${timestamp}&apikey=${publicKey}&hash=${hash}`);
        return _transformCharacter(res.data.results[0]); 
    };

    const getAllComics=async(limit = _baseLimit)=>{
        const res = await request(`${_apiBase}comics?limit=${limit}&&ts=${timestamp}&apikey=${publicKey}&hash=${hash}`)
        return res.data.results.map(_transformComics)
    };

    const getComic = async(id)=>{
        const res = await request(`${_apiBase}comics/${id}?&ts=${timestamp}&apikey=${publicKey}&hash=${hash}`)
        return _transformComics(res.data.results[0])
    };

    const _transformCharacter=(char)=>{
        console.log(char);
        
        return{
            name: char.name,
            id:char.id,
            description:char.description,
            thumbnail:char.thumbnail.path+"."+char.thumbnail.extension,
            homepage:char.urls[0].url,
            wiki:char.urls[1].url,
            comics:char.comics.items
        }
    };

    const _transformComics=(comics)=>{
        return{
            title: comics.title,
            id: comics.id,
            pageCount: comics.pageCount ? `${comics.pageCount} p.`:"No information about number of pages",
            description: comics.description || "No description provided",
            thumbnail: comics.thumbnail.path+"."+comics.thumbnail.extension,
            price: comics.prices[0].price ? `${comics.prices[0].price}$`: "not available"
        }
    };

    return {getAllCharacters,getCharacter,getCharacterByName,getAllComics,getComic,loading,error,clearError}
};

export default useMarvelServices;