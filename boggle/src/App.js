import React from 'react';
import './App.css';
import {getBoard} from './algorithm'


const initialstate = {
  textBoxValue: null,
  size: null
};


let rows;
let solution ;
let solutionHeading ;
var if_state_changed;


class App extends React.Component {

constructor(props) {
  super(props)
  this.state = initialstate
    rows = [];
    solution = null;
    solutionHeading = null;
    if_state_changed=0;
}

updateSearch(event){
  this.setState({textBoxValue:event.target.value})
}


//if state variable size changes, the board and output is computed by using getBoard function
render() {

if(this.state.size !== null &&  this.state.size !== 0 &&this.state.size!==if_state_changed)
{
  //if_state_change is created so as to render it only when there is a change in state
  if_state_changed=this.state.size
  //getting board and output from algorithm.js
  let res = getBoard(this.state.size)
  let table = res.board;
  let solutionValue = Array.from(res.output)
  //console.log(Array.from(solutionValue))
  
  //table will be a array of n strings, where the size of each string also n
  //if n=2
  //table=['ab','cd']
  //this is converted to characters
  for(let i=0; i<table.length; i++)
  {
    table[i] = table[i].split("");
  }

  //box is made using table of characters
  rows = table.map(function (item, i){
    let entry = item.map(function (element, j) {

        return ( <td key={j} class="box"> {element} </td> );
    });
    return ( <tr key={i}class="box"> {entry} </tr> );
  });

  
  solutionHeading = (
      <div>
          <h3> Solutions </h3>
      </div>
    );

  //solutions are printed
  solution = solutionValue.map(function (item, i){
      return(<div key={i}> {i+1}.) {item} </div>)
  })
}


//ui is crated here
//the dimension of the board is asked and on button click the state variable size changes and render is activated
//board ,solution are shown in the browser
return (
    <div class="division">
      <center> 

        <h1><u> Boogle </u></h1> 
        <p> Enter the dimensions </p>
        <input type="text" value={this.state.textBoxValue} onChange= {this.updateSearch.bind(this)}/>   
        <button onClick={(e) => { this.setState({ size:this.state.textBoxValue }) }} > select </button>

        <br/><br/>

        <table>
          <tbody>
            {rows}
          </tbody>
        </table>

        {solutionHeading}
        {solution}

        <br/>
        <br/>
      </center>
    </div>
  );
}
}


export default App;
