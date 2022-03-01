import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Cell(props){
    return(
        <div className = {props.state}>
            {props.value}
        </div>
    );
}

class CompleteRow extends React.Component{
    constructor(props){
        super(props);
        this.guess = this.props.guess;
        this.wordToGuess = this.props.wordToGuess;
        this.counted = [];
    }
    renderCell(i){
        if(this.guess[i] == this.wordToGuess[i]){
            return(
                <Cell state = {"correct"} value = {this.guess[i]}/> 
            );
        }
        for(let j = 0; j < this.wordToGuess.length; j++){
            if(j != i && this.counted.indexOf(j) == -1){//If i and j are not the same, and j has not already been checked
                if(this.guess[i] == this.wordToGuess[j])
                {
                    this.counted = this.counted.concat([j]);
                    return(
                        <Cell state = {"wrongPosition"} value = {this.guess[i]}/>
                    );
                }
            }
        }
        return(
            <Cell state = {"initial"} value = {this.guess[i]}/> 
        );
    }

    render(){
        this.counted = [];
        return(
            <div>
                {this.renderCell(0)}
                {this.renderCell(1)}
                {this.renderCell(2)}
                {this.renderCell(3)}
                {this.renderCell(4)}
            </div>
        );
    }

}

class EmptyRow extends React.Component{
    renderCell(){
        return(
            <Cell state = {"initial"} value = {""}/> 
        );
    }

    render(){
        return(
            <div>
                {this.renderCell()}
                {this.renderCell()}
                {this.renderCell()}
                {this.renderCell()}
                {this.renderCell()}
            </div>
        );
    }
}

class CurrentRow extends React.Component{
    renderCell(i){
        return(
            <Cell state = {"initial"} value = {this.props.guess[i] ? this.props.guess[i] : "_"}/> 
        );
    }

    render(){
        return(
            <div className="current">
                {this.renderCell(0)}
                {this.renderCell(1)}
                {this.renderCell(2)}
                {this.renderCell(3)}
                {this.renderCell(4)}
            </div>
        );
    }
}

class Board extends React.Component{
    renderRow(i){
        let turn = this.props.turn;
        if(turn === i){
            return <CurrentRow guess = {this.props.guesses[i]}/>
        }
        if(turn < i){
            return(<EmptyRow/>);
        }
        return (<CompleteRow wordToGuess = {this.props.wordToGuess} guess = {this.props.guesses[i]}/>);
    }

    render(){
        return(
            <div>
                {this.renderRow(0)}
                {this.renderRow(1)}
                {this.renderRow(2)}
                {this.renderRow(3)}
                {this.renderRow(4)}
            </div>
        );
    }
}

class Keyboard extends React.Component{
    render(){
        return(
            <div>
                <div className='keyRow'>
                    <button className={this.props.keyStatus('Q')} onClick={(key) => this.props.handleInput("Q")}>Q</button>
                    <button className={this.props.keyStatus('W')} onClick={(key) => this.props.handleInput("W")}>W</button>
                    <button className={this.props.keyStatus('E')} onClick={(key) => this.props.handleInput("E")}>E</button>
                    <button className={this.props.keyStatus('R')} onClick={(key) => this.props.handleInput("R")}>R</button>
                    <button className={this.props.keyStatus('T')} onClick={(key) => this.props.handleInput("T")}>T</button>
                    <button className={this.props.keyStatus('Y')} onClick={(key) => this.props.handleInput("Y")}>Y</button>
                    <button className={this.props.keyStatus('U')} onClick={(key) => this.props.handleInput("U")}>U</button>
                    <button className={this.props.keyStatus('I')} onClick={(key) => this.props.handleInput("I")}>I</button>
                    <button className={this.props.keyStatus('O')} onClick={(key) => this.props.handleInput("O")}>O</button>
                    <button className={this.props.keyStatus('P')} onClick={(key) => this.props.handleInput("P")}>P</button>
                    <button className={this.props.keyStatus('A')} onClick={(key) => this.props.handleInput("A")}>A</button>
                    <button className={this.props.keyStatus('S')} onClick={(key) => this.props.handleInput("S")}>S</button>
                    <button className={this.props.keyStatus('D')} onClick={(key) => this.props.handleInput("D")}>D</button>
                    <button className={this.props.keyStatus('F')} onClick={(key) => this.props.handleInput("F")}>F</button>
                    <button className={this.props.keyStatus('G')} onClick={(key) => this.props.handleInput("G")}>G</button>
                    <button className={this.props.keyStatus('H')} onClick={(key) => this.props.handleInput("H")}>H</button>
                    <button className={this.props.keyStatus('J')} onClick={(key) => this.props.handleInput("J")}>J</button>
                    <button className={this.props.keyStatus('K')} onClick={(key) => this.props.handleInput("K")}>K</button>
                    <button className={this.props.keyStatus('L')} onClick={(key) => this.props.handleInput("L")}>L</button>
                    <button className={this.props.keyStatus('Z')} onClick={(key) => this.props.handleInput("Z")}>Z</button>
                    <button className={this.props.keyStatus('X')} onClick={(key) => this.props.handleInput("X")}>X</button>
                    <button className={this.props.keyStatus('C')} onClick={(key) => this.props.handleInput("C")}>C</button>
                    <button className={this.props.keyStatus('V')} onClick={(key) => this.props.handleInput("V")}>V</button>
                    <button className={this.props.keyStatus('B')} onClick={(key) => this.props.handleInput("B")}>B</button>
                    <button className={this.props.keyStatus('N')} onClick={(key) => this.props.handleInput("N")}>N</button>
                    <button className={this.props.keyStatus('M')} onClick={(key) => this.props.handleInput("M")}>M</button>
                    <button onClick={(key) => this.props.handleInput("del")}>DEL</button>
                    <button onClick={(key) => this.props.handleInput("enter")}>ENT</button>
                </div>
            </div>
        );
    }
}


class Game extends React.Component{
    constructor(){
        super();
        let word = words[Math.floor(Math.random()*words.length)]
        this.state = {
            wordToGuess: word,
            guesses: Array(5).fill(""),
            guessedLetters: [],
            turn: 0,
        };
    }

    handleInput(key){
        let guesses = this.state.guesses;
        let guess = guesses[this.state.turn];
        let turn = this.state.turn;
        if(guess.length < 5 && key != "del" && key != "enter"){
            guess = guess + key; 
            guesses[turn] = guess;
        }
        if(key == "del"){
            guess = guess.slice(0,guess.length-1);
            guesses[turn] = guess;        
        } else if(key == "enter" && guess.length == 5){
            turn++;
        }
        this.setState({
            guesses:guesses,
            turn:turn,
        });
    }

    keyStatus(key){
        let guesses = this.state.guesses;
        let wordToGuess = this.state.wordToGuess;
        let turn = this.state.turn;
        for(let g = 0; g < turn;g++){
            for(let c = 0; c < guesses[g].length;c++){
                if(key == guesses[g].charAt(c)){
                    if(wordToGuess.indexOf(key) != -1)
                    {
                        return 'correctKey';
                    }
                    return 'guessedKey';
                }
            }
        }
        return '';
    }

    render(){
        return(
            <div>
                <h3 className='title'>react-WORDLE</h3>
                <Board wordToGuess = {this.state.wordToGuess} guesses={this.state.guesses} turn = {this.state.turn}/>
                <Keyboard handleInput = {(key) => this.handleInput(key)} keyStatus={(key => this.keyStatus(key))}/>
            </div>
        );
    }
}

const words = ['LIGHT','WRUNG','COULD','PERKY','MOUNT','WHACK','SUGAR','KNOLL',
'CRIMP','WINCE','PRICK','ROBOT','POINT','PROXY','SHIRE','SOLAR','PANIC','TANGY','ABBEY','FAVOR','DRINK'
,'QUERY','GORGE','CRANK','SLUMP','BANAL','TIGER','SIEGE','TRUSS','BOOST','REBUS'];
ReactDOM.render(
    <Game />,
    document.getElementById("root")
)
