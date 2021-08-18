import { Component } from '@angular/core';
import { Board } from './models/board.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  numCols: number;
  numRows: number;
  generation: number;
  gameStatus: number; // -1 no empieza | 0 activo | 1 pausa

  board: Board;;

  constructor() {
    this.numCols = 40;
    this.numRows = 40;
    this.generation = 0;
    this.gameStatus = 0;

    this.board = new Board(this.numCols, this.numRows);
  }

  ngOnInit() {
    setInterval(() => {
      if (this.gameStatus === 0) {
        this.board.checkBoard();
        this.generation++;
      }
    }, 50)
  }

  onClick(pRow: number, pCol: number) {
    this.board.changeStatus(pRow, pCol);
  }

  onClickPausa() {
    this.gameStatus = this.gameStatus === 0 ? 1 : 0;
  }
}
