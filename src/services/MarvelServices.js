

class MarvelServices{

    _apiBase = "https://gateway.marvel.com:443/v1/public/";
    _apiKey = "apikey=6b4f11be29bdb9070c924b059f0a181c";

    getResource = async(url)=>{
        let res = await fetch(url);

        if(!res.ok){
            throw new Error(`Could not fetch ${url} status: ${res.status}`);
        }
        return await res.json();
    };

    getAllCharacters= async ()=>{
        const res = await this.getResource(`${this._apiBase}characters?limit=9&offset=210&${this._apiKey}`);
        // console.log(res.data.results);
        return res.data.results.map(this._transformCharacter);
    };
    getCharacter = async (id)=>{
        const res = await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`);
        // console.log(res.data.results[0]);
        return this._transformCharacter(res.data.results[0]);
    };

    _transformCharacter=(char)=>{
        return{
            name: char.name,
            description:char.description,
            thumbnail:char.thumbnail.path+"."+char.thumbnail.extension,
            homepage:char.urls[0].url,
            wiki:char.urls[1].url
        }
    };
};

export default MarvelServices;