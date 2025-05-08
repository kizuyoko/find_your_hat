const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
  constructor(height, width, percent) {
    this.field =  Field.generateField(height, width, percent);
    this.x = 0;
    this.y = 0;
    this.width = this.field[0].length;
    this.height = this.field.length;
    this.location = this.field[this.y][this.x];
    this.status = true;
  }
  static generateField(height=5, width=5, wholePercent=25) {
    let field = [];
    for (let i = 0; i < height; i++) {
      let row = [];
      for (let j = 0; j < width; j++) {
        row.push(fieldCharacter);
      }
      field.push(row);
    }
    field[0][0] = pathCharacter;
  
    function getRandomEmptySpot() {
      let y, x;
      do {
        y = Math.floor(Math.random() * height);
        x = Math.floor(Math.random() * width);
      } while (
        field[y][x] !== fieldCharacter
      );
      return [y, x];
    }

    // Add a hat
    field[getRandomEmptySpot()[0]][getRandomEmptySpot()[1]] = hat;

    // Add wholes
    const wholeAmount = Math.floor(height * width * (wholePercent * 0.01));

    for (let k = 1; k < wholeAmount; k++) {
      field[getRandomEmptySpot()[0]][getRandomEmptySpot()[1]] = hole;
    } 

    return field;
  }
  print() {
    console.log(this.field.join("\n"));
  }
  instruction() {
    console.log(
      '"u" is to go up,' + '\n' +
      '"r" is to go right,' + '\n' +
      '"d" is to go down,' + '\n' +
      '"l" is to go left.'
    );
  }
  move(direction) {
    this.field[this.y][this.x] = fieldCharacter;

    switch (direction) {
      case 'u': this.y--;
            break;
      case 'r': this.x++;
            break;
      case 'd': this.y++;
            break;
      case 'l': this.x--;
            break;
    } 
    this.location = this.field[this.y][this.x];
    this.field[this.y][this.x] = pathCharacter;
  }
  judge(){
    if (
      this.x < 0 ||
      this.x >= this.width ||
      this.y < 0 ||
      this.y >= this.height
    ) {
      console.log('You are out! You lost!!!');
      this.status = false;
    } else {
      switch (this.location) {
        case hat: console.log('Hat!!! You won!!!');
          this.status = false;
          break;
        case hole: console.log('Hole!!! You lost!!!'); 
          this.status = false;
          break;
        default: console.log('You are still in field. Go on!')  
      }
    }
  }



}
const myField = new Field(5, 5, 20);
while (myField.status === true) {
  myField.instruction();
  myField.print();
  let direction = prompt('Which direction?');
  myField.move(direction);
  myField.judge();
}
