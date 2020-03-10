## Execution

Open terminal and cd to the folder boggle
The node modules are not present within the code, please install it by using the command `npm install react`.<br />
Run the app in development mode by using `npm start`.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.<br />

The whole assignment is also available in [github-abheysujith](https://github.com/abhey-sujith/boggle) .<br />
The program was made with node and react (used visual code as editor).<br />

### Files in src

`App.js` <br />
`App.css` <br />
`algorithm.js` <br />
`words_dictionary.json`<br />

### `App.js`

This file contains the code for the react page.<br />
The React page takes input the size n of the boggle board and using this a random n x n board is created and the solution is displayed. <br />

### `App.css`

Contains css script for div,h1 and the board.

### `algorithm.js`

Contains the algorithm for making the trie(digital tree) using dictionary and using this trie and depth first search to find the words in the board.<br />

### `words_dictionary.json`

Contains the dictionary words<br />

### `Assumptions`

It is assumed that user has to enter the input only (size of board).<br />
The json file is available in the src folder.<br />

### `problems faced`

As the value was change in the text box the state variable also changed which was creating rendering the random function all the time.<br />
Solved by using a if_state_changed variable in app.js so that when submit button was pressed and if any change was there then only new grid would be created.<br />