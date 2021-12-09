import { Component } from 'react';
import MarvelServices from '../../services/MarvelServices';
import './charList.scss';

class CharList extends Component {
    state={
        char:[],
        loading:true,
        error:false,
        selected:false,
        id:null
    };

    marvelServices = new MarvelServices();

    componentDidMount(){
        this.listChar();
    };

    componentWillUpdate(id){
        this.itemSelected(id);
    }

    onLoaded=(char)=>{
        this.setState({
            char
        })
    };

    listChar =()=>{
        this.marvelServices
            .getAllCharacters()
            .then(this.onLoaded)
    };

    itemSelected=(id)=>{
        if (this.state.id===id) {
            this.setState({
                selected: !this.state.selected
            });
        }
        
    };

    render(){
        const {char,selected,id} = this.state;
        return (
            <div className="char__list">
                {/* <ul className="char__grid">
                    <li className={`char__item ${selected? "char__item_selected":null}`}
                        onClick={this.itemSelected}
                    >
                        <img src={abyss} alt="abyss"/>
                        <div className="char__name">Abyss</div>
                    </li>
                </ul> */}
                <ListView key={id} char={char} selected={selected} itemSelected= {this.itemSelected}/>
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    };
};

const ListView=({char,selected,itemSelected})=>{
    const charData= char.map((item,id)=>{
        const {name,thumbnail}=item;
        return(
            <li key={id} className={`char__item ${selected? "char__item_selected":null}`}
                // onClick={}
            >
                <img src={thumbnail} alt="charImg"/>
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

export default CharList;