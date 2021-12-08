import { Component } from 'react';
import MarvelServices from "../../services/MarvelServices";

import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';

class RandomChar extends Component {
    constructor(props){
        super(props);
        this.updateChar();
    };

    state={
        char:{}
    };

    marvelServices = new MarvelServices();

    onCharLoaded=(char)=>{
        this.setState({char:char})
    };

    updateChar = ()=>{
        const id = Math.floor(Math.random()*(1011400-1011000)+1011000);
        this.marvelServices
            .getCharacter(id)
            .then(this.onCharLoaded);
    };

    render(){
        let{char:{name,thumbnail,homepage,wiki}} = this.state;
         
        let description = "As the Norse God of thunder and ldescriptionightnAs the Norse God of thunder and ldescriptionightning, ing, Thor wields one of the greatest weapons ever made, the enchanted hammer Mjolnir. While others have described Thor as an over-muscled, oafish imbecile, he's quite smart and compassionate...";
        console.log(description.length);

        return (
            <div className="randomchar">
                <div className="randomchar__block">
                    <img src={thumbnail} alt="Random character" className="randomchar__img"/>
                    <div className="randomchar__info">
                        <p className="randomchar__name">{name}</p>
                        <p className="randomchar__descr">
                            {description?description.substr(0,215)+"...":"There is no description provided"}
                        </p>
                        <div className="randomchar__btns">
                            <a href={homepage} className="button button__main">
                                <div className="inner">homepage</div>
                            </a>
                            <a href={wiki} className="button button__secondary">
                                <div className="inner">Wiki</div>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!<br/>
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button className="button button__main">
                        <div className="inner">try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
                </div>
            </div>
        )
    }
}

export default RandomChar;