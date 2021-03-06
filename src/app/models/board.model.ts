export class Board {
  board: number[][];

  constructor(pWidth: number, pHeight: number) {
    this.board = [];

    for (let i = 0; i < pWidth; i++) {
      this.board[i] = [];
      for (let j = 0; j < pHeight; j++) {
        this.board[i][j] = 0;
      }
    }
  }

  status(coordX: number, coordY: number): number {
    return this.board[coordX][coordY];
  }

  changeStatus(coordX: number, coordY: number): void {
    this.board[coordX][coordY] = this.board[coordX][coordY] === 0 ? 1 : 0;
  }

  checkBoard() {
    let tmpBoard = [];

    for (let i = 0; i < this.board.length; i++) {
      tmpBoard[i] = [];

      for (let j = 0; j < this.board[i].length; j++) {
        let temp = this.checkRules(i, j);
        tmpBoard[i].push(temp as never);
      }
    }

    this.board = [...tmpBoard];
  }

  checkRules(coordX: number, coordY: number) {
    const width = this.board.length;
    const heigth = this.board[0].length;
    const currentStatus = this.board[coordX][coordY];

    const xMenos = coordX - 1 < 0 ? width - 1 : coordX - 1;
    const xMas = coordX + 1 >= width ? 0 : coordX + 1;
    const yMenos = coordY - 1 < 0 ? heigth - 1 : coordY - 1;
    const yMas = coordY + 1 >= heigth ? 0 : coordY + 1;


    const vecinos =
      this.board[xMenos][yMenos] +
      this.board[xMenos][coordY] +
      this.board[xMenos][yMas] +
      this.board[coordX][yMenos] +
      this.board[coordX][yMas] +
      this.board[xMas][yMenos] +
      this.board[xMas][coordY] +
      this.board[xMas][yMas];

    if (currentStatus === 1 && (vecinos === 2 || vecinos === 3)) {
      return 1;
    }

    if (currentStatus === 0 && vecinos === 3) {
      return 1;
    }

    return 0;
  }
}
