import { Component } from 'react';
import MarvelServices from '../../services/MarvelServices';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/errorMessage';
import Skeleton from '../skeleton/Skeleton';
import './charInfo.scss';


class CharInfo extends Component {
    state={
        char:null,
        loading:false,
        error:false
    };

    marvelServices = new MarvelServices();

    componentDidMount(){
        this.updateChar();
    };

    componentDidUpdate(prevProps,prevState){
        if(this.props.charId !== prevProps.charId){
            this.updateChar();
        }
    };

    updateChar = ()=>{
        const {charId} = this.props;
        if (!charId) {
            return;
        };

        this.onCharLoading();
        this.marvelServices
            .getCharacter(charId)
            .then(this.onCharLoaded)
            .catch(this.onError);
    };

    onCharLoaded=(char)=>{
        this.setState({
            char,
            loading:false
        })
    };

    onCharLoading=()=>{
        this.setState({
            loading:true
        });
    };

    onError=()=>{
        this.setState({
            loading:false,
            error: true
        })
    };

    render(){
        const{char,loading,error} = this.state;

        const skeleton = char||loading||error ? null : <Skeleton/>;
        const errorMessage = error?<ErrorMessage/> : null;
        const spinner = loading?<Spinner/>: null;
        const content = !(loading || error|| !char)? <View char={char}/>:null;

        return (
            <div className="char__info">
                {skeleton}
                {errorMessage}
                {spinner}
                {content}
            </div>
        )
    }
}

const View =({char})=>{
    const{name,description,thumbnail,homepage,wiki,comics} = char;
    const comicsZero =()=>{
        if (comics.length ===0) {
            return(
                <li className="char__comics-item">
                    There is no comics found for this Character
                </li>
            )
        };
    }

    const imgStyle=()=>{
        if (thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg") {
            return {"objectFit": "contain"}
        }
    };

    return(
        <>
            <div className="char__basics">
                <img src={thumbnail} alt={name} style={imgStyle()}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description?description.substr(0,215)+"...":"There is no description provided"}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comics.slice(0,10).map((item,id)=>{  
                    return(
                        <li key={id} className="char__comics-item">
                            {item.name}
                        </li>
                    )
                    })}
                {comicsZero()}
            </ul>
        </>
    )
};

export default CharInfo;