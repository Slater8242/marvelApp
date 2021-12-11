import { Component } from 'react';
import MarvelServices from '../../services/MarvelServices';
import ErrorMessage from '../errorMessage/errorMessage';
import Spinner from '../spinner/spinner';
import './charList.scss';

class CharList extends Component {
    state={
        char:[],
        loading:true,
        error:false,
        requestLoading: false,
        offset: 1541,
        charEnded:false
    };

    marvelServices = new MarvelServices();

    componentDidMount(){
        this.onRequest();
    };

    onLoading=()=>{
        this.setState({
            requestLoading:true
        });
    };

    onRequest =(offset)=>{
        this.onLoading();
        this.marvelServices
            .getAllCharacters(offset)
            .then(this.onLoaded)
            .catch(this.onError)
    };
    
    onLoaded=(newChar)=>{
        let ended = false;
        if(newChar.length < 9){
            ended = true;
        }

        this.setState(({char,offset})=>({
            char:[...char,...newChar],
            loading:false,
            requestLoading:false,
            offset: offset + 9,
            charEnded : ended
        }));
    };

    onError=()=>{
        this.setState({
            loading:false,
            error: true
        })
    };

    renderItems(char){
        const charData= char.map((item)=>{
            const {name,thumbnail}=item;
            let imgStyle ={"objectFit": "cover" }
            if (thumbnail==="http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg") {
                imgStyle = {"objectFit": "contain"};
            }
            return(
                <li key={item.id} 
                    className={`char__item `}
                    onClick={()=>this.props.onCharSelected(item.id)}    
                >
                    <img src={thumbnail} alt="charImg" style={imgStyle}/>
                    <div className="char__name">{name}</div>
                </li>
            )
        });
        return(
            <ul className="char__grid">
                {charData}
            </ul>
        );
    };

    render(){
        const {char,loading,error,offset,requestLoading,charEnded} = this.state;
        const charData = this.renderItems(char)
        const errorMessage = error?<ErrorMessage/>:null;
        const spinner = loading?<Spinner/>:null;
        const content = !(error||loading)?charData:null;
        return (
            <div className="char__list">
                {errorMessage}
                {spinner}
                {content}
                <button 
                    className="button button__main button__long"
                    disabled={requestLoading}
                    style={{"display": charEnded ? "none" : "block"}}
                    onClick={()=>this.onRequest(offset)}
                >
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    };
};

// const ListView=({char})=>{
//     const charData= char.map((item)=>{
//         const {name,thumbnail}=item;
//         let imgStyle ={"objectFit": "cover" }
//         if (thumbnail==="http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg") {
//              imgStyle = {"objectFit": "contain"};
//         }
//         return(
//             <li key={item.id} 
//                 className={`char__item `}
//                 onClick={()=>this.props.onSelected(item.id)}    
//             >
//                 <img src={thumbnail} alt="charImg" style={imgStyle}/>
//                 <div className="char__name">{name}</div>
//             </li>
//         )
//     });
//     return(
//         <ul className="char__grid">
//             {charData}
//         </ul>
//     );
// };

export default CharList;