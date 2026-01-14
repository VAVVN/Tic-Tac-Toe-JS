() => {
    console.log("Hello, World!");
};

//You’re going to store the gameboard as an array inside of a Gameboard object, so start there! Your players are also going to be stored in objects, and you’re probably going to want an object to control the flow of the game itself.
const Gameboard = (() => { // IIFE creating the Gameboard module
    const board = Array(9).fill(null); // create an array of 9 elements initialized to null to represent the board

    const getBoard = () => board; // getter that returns the internal board array

    const setCell = (index, player) => { // function to set a cell at a given index with a player's symbol
        if (board[index] === null) { // only set the cell if it is currently empty (null)
            board[index] = player; // assign the player's symbol to the specified index
        } // end if
    }; // end setCell

    const resetBoard = () => { // function to reset the board to all nulls
        for (let i = 0; i < board.length; i++) { // iterate over each index in the board array
            board[i] = null; // set each cell back to null
        } // end for
    }; // end resetBoard

    return { // expose the public API of the Gameboard module
        getBoard, // expose getBoard
        setCell, // expose setCell
        resetBoard // expose resetBoard
    }; // end return
})(); // execute the IIFE to create a singleton Gameboard module

// Player factory function
const Player = (name, symbol) => { // factory that creates a player object with a name and symbol
    return { name, symbol }; // return the player object containing name and symbol properties
}; // end Player

// Game controller module
const GameController = (() => { // IIFE creating the GameController module
    const player1 = Player("Player 1", "X"); // create player1 with name "Player 1" and symbol "X"
    const player2 = Player("Player 2", "O"); // create player2 with name "Player 2" and symbol "O"
    let currentPlayer = player1; // track whose turn it is, starting with player1

    const switchPlayer = () => { // function to switch the current player
        currentPlayer = currentPlayer === player1 ? player2 : player1; // toggle between player1 and player2
    }; // end switchPlayer

    const handleCellClick = (index) => { // handler for when a cell is clicked at a given index
        Gameboard.setCell(index, currentPlayer.symbol); // attempt to place the current player's symbol on the board
        if (checkWin(currentPlayer.symbol)) { // check if the current move created a win for the current player
            console.log(`${currentPlayer.name} wins!`); // announce the winner to the console
        } else { // if there is no win
            switchPlayer(); // switch to the other player for the next turn
        } // end if
    }; // end handleCellClick

    const checkWin = (symbol) => { // function to check if a given symbol has a winning combination
        const winningCombinations = [ // list of all index triplets that constitute a win
            [0, 1, 2], // top row
            [3, 4, 5], // middle row
            [6, 7, 8], // bottom row
            [0, 3, 6], // left column
            [1, 4, 7], // middle column
            [2, 5, 8], // right column
            [0, 4, 8], // diagonal top-left to bottom-right
            [2, 4, 6]  // diagonal top-right to bottom-left
        ]; // end winningCombinations
        return winningCombinations.some(combination => { // return true if any winning combination is fully occupied by the symbol
            return combination.every(index => Gameboard.getBoard()[index] === symbol); // check every index in the combination matches the symbol
        }); // end some
    }; // end checkWin

    return { // expose the public API of the GameController module
        handleCellClick // expose only the handleCellClick function publicly
    }; // end return
})(); // execute the IIFE to create a singleton GameController module

// Event listeners for the game cells
const cells = document.querySelectorAll(".cell"); // select all elements with the class "cell"
cells.forEach((cell, index) => { // iterate over each cell
    cell.addEventListener("click", () => { // add click event listener to each cell
        GameController.handleCellClick(index); // call the handleCellClick function with the cell's index
    }); // end addEventListener
}); // end forEach

