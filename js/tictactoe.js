"use strict";

/**
 * Tic Tac Toe main game
 */
function TicTacToe (elem) {
  this.playable = true;
  this.board = new TicTacToeBoard();
  this.negamax = new Negamax();
  this.elem = document.getElementById(elem);
}; // end TicTacToe

/**
 * Send game as HTML table to DOM element
 */
TicTacToe.prototype.toDOM = function () {
  this.elem.innerHTML = this.toHTML();
}; // end toDOM

/**
 * Handles a turn of Tic Tac Toe
 */
TicTacToe.prototype.doTurn = function (square) {
  if (this.playable) {
    this.board.move(square);
    this.board.move(this.negamax.getBestMove(this.board));
    this.toDOM();

    if (this.board.isWon()) {
      this.playable = false;
      this.elem.innerHTML += "<p>" + this.board.ply & 1 ? "X" : "O" + 
        " wins! <a href='' onclick='init();'>Play again</a></p>";
    }
    else if (this.board.isDrawn()) {
      this.playable = false;
      this.elem.innerHTML += 
        "<p>Draw! <a href='' onclick='init();'>Play again</a></p>";
    }
  }
}; // end doTurn
  
/**
 * Renders the current game board to HTML
 * 
 * @return the HTML string
 */
TicTacToe.prototype.toHTML = function () {
  const output = ["<table>"];

  for (let i = 0; i < 9; i++) {
    if ((i + 1) % 3 === 1) {
      output.push("<tr>");
    }

    if (i in this.board.xMoves) {
      output.push("<td class='x'");
    }
    else if (i in this.board.oMoves) {
      output.push("<td class='o'");
    }
    else {
      output.push("<td class='empty' onclick='ttt.doTurn(" + i + ");'");
    }

    output.push("></td>");

    if ((i + 1) % 3 === 0) {
      output.push("<tr>");
    }
  }

  return output.join("");
}; // end toHTML
