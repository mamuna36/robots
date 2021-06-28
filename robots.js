export class InvalidInputError extends Error {
  constructor(message) {
    super();
    this.message = message || "Invalid Input";
  }
}

export class Robot {
  //defining the orientations
  static bearings = ["N", "E", "S", "W"];
  //defining the default orientation and position
  #bearing = 0;
  #x = 0;
  #y = 0;

  get bearing() {
    return Robot.bearings[this.#bearing];
  }

  get coordinates() {
    return [this.#x, this.#y];
  }
  //placing the robot at its initial position
  place({ x, y, direction }) {
    if (!Robot.bearings.includes(direction)) throw new InvalidInputError();

    this.#x = x;
    this.#y = y;
    this.#bearing = Robot.bearings.indexOf(direction);
  }

  advance() {
    switch (Robot.bearings[this.#bearing]) {
      case "N":
        this.#y++;
        break;
      case "E":
        this.#x++;
        break;
      case "S":
        this.#y--;
        break;
      case "W":
        this.#x--;
        break;
    }
  }

  evaluate(instructions) {
    instructions.split("").forEach((c) => {
      switch (c) {
        case "R":
          this.#bearing = (this.#bearing + 1) % Robot.bearings.length;
          break;
        case "L":
          this.#bearing =
            (this.#bearing - 1 + Robot.bearings.length) % Robot.bearings.length;
          break;
        case "M":
          this.advance();
          break;
        default:
          throw new InvalidInputError();
      }
    });
  }
}
