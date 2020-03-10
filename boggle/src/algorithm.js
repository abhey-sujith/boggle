//execution starts at line 113
//function to insert into the trie 
var Trie = function (top, value) {
    this.top = top;
    this.child = new Array(26);
    this.is_Word = false;
    // if the trie is not root
    if (top !== undefined) {
        top.child[value.charCodeAt(0) - 97] = this;
    }
};


//function to create the trie using the provided dictionary (words_dictionary.json)
var create_Trie = function (dictionary) {
    //setting root of trie
    var root = new Trie(undefined, '');
    //taking words from dictionary
    for (let word of Object.keys(dictionary)) {
        var current_Node = root;
        //the word is taken and each character in the word is added to trie
        for (var i = 0; i < word.length; i++) {
            var character = word[i];
            //changing to ascii (a-97,b-98.....)
            var code = character.charCodeAt(0);
            //checking if character between a and z
            if ((97 <= code) < 123) {
                var nextNode = current_Node.child[code - 97];
                //checks is a child already exists for current_node if not make new
                if (nextNode === undefined) {
                    nextNode = new Trie(current_Node, character);
                }
                current_Node = nextNode;
            }
        }
        //setting leaf of trie as true (end of word)
        current_Node.is_Word = true;
    }
    return root;
};


//function that takes grid, dictionary(trie) and size of boggle board and returns words
//uses depth first search
var Boggle_Words = function (grid, dictionary,n) {
    
    var queue = [];
    //words is where the found words are going to be stored
    var words = new Set();
    //iterating through the grid
    for (var y = 0; y < n; y++) {
        for (var x = 0; x < n; x++) {
            var c = grid[y][x];
            var code = c.charCodeAt(0);
            var node = dictionary.child[code - 97];
            //checking if the child is present pushing to queue
            if (node !== undefined) {
                //pushing all the characters in the grid so that we have to search only with that characters
                //if 3*3=9 characters then trie has to use only 9 characters from root
                queue.push([x, y, c, node, [[x, y]]]);
            }
        }
    }
    while (queue.length !== 0) {
        //poping the queue
        var [a, b, s, nod, h] = queue.pop();
        //checking neighbouring positions
        for (let [da, db] of [[1, 0], [1, -1], [0, -1], [-1, -1], [-1, 0], [-1, 1], [0, 1], [1, 1]]) {
            var [a2, b2] = [a + da, b + db];
            //so that the reusing the characters does not happen
            if (h.find(function (e) {
                    return (e[0] === a2) && (e[1] === b2);
                }) !== undefined) {
                continue;
            }
            //checking a2 and b2 inside the grid
            if (0 <= a2 && a2 < n && 0 <= b2 && b2 < n) {
                //storing history in hist
                var Hist = h.slice();
                Hist.push([a2, b2]);
                var s2 = s + grid[b2][a2];
                var nod2 = nod.child[grid[b2][a2].charCodeAt(0) - 97];
                //checking if the new character is child in the trie
                if (nod2 !== undefined) {
                    //if is_Word is true, it is a word from the dictionary
                    if (nod2.is_Word) {
                        //appending it to words
                        words.add(s2);
                }
                //pushing to queue
                    queue.push([a2, b2, s2, nod2, Hist]);
                }
            }
        }
    }
    return words.values()
}


//function to create a random string of size length
function makeid(length) {
    var result           = '';
    var characters       = 'abcdefghijklmnopqrstuvwxyz';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }


// the json dictionary is taken as input and made into a trie(the dictionary is available in src folder(words_dictionary.json))
 var df = require('./words_dictionary.json');
 var d = new create_Trie(df);


//The input is the dimension of the board taken from the react page, board and words are exported to the react page
export const getBoard = (value) =>
{
    //n is made the input which is taken from app.js
    var n=value;
    var board = [];
    //making random strings of size n and appending it to board(total length of the board will also be n)
    for (let i = 0; i < n; i++) {
        board.push(makeid(n));
      }

      //function which is told in assignment(arrguments are board,trie dictionary, and size)
      let output = Boggle_Words(board,d,n)

      //send to react page
      let res = {
        "board" : board,
        output : output
      }

    return res;
}
