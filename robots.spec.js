import { Robot, InvalidInputError } from "./robots";

function turnRight(robot) {
  robot.evaluate("R");
}

function turnLeft(robot) {
  robot.evaluate("L");
}

function advance(robot) {
  robot.evaluate("M");
}

describe("Robot", () => {
  describe("Create robot", () => {
    test("facing north by default", () => {
      const robot = new Robot();
      expect(robot.bearing).toEqual("N");
    });

    test("facing east", () => {
      const robot = new Robot();
      robot.place({ direction: "E", x: 0, y: 0 });

      expect(robot.bearing).toEqual("E");
    });

    test("facing west, at origin", () => {
      const robot = new Robot();
      robot.place({ direction: "W", x: 0, y: 0 });

      expect(robot.bearing).toEqual("W");
      expect(robot.coordinates).toEqual([0, 0]);
    });

    test("at negative position facing south", () => {
      const robot = new Robot();
      robot.place({ direction: "S", x: -1, y: -1 });

      expect(robot.bearing).toEqual("S");
      expect(robot.coordinates).toEqual([-1, -1]);
    });

    test("invalid robot bearing", () => {
      const robot = new Robot();

      expect(InvalidInputError.prototype).toBeInstanceOf(Error);
      expect(() => robot.place({ direction: "crood", x: 0, y: 0 })).toThrow(
        InvalidInputError
      );
    });
  });

  describe("Rotating clockwise", () => {
    const robot = new Robot();

    test("changes north to east", () => {
      robot.place({ direction: "N", x: 0, y: 0 });

      turnRight(robot);

      expect(robot.bearing).toEqual("E");
      expect(robot.coordinates).toEqual([0, 0]);
    });

    test("changes east to south", () => {
      robot.place({ direction: "E", x: 0, y: 0 });

      turnRight(robot);

      expect(robot.bearing).toEqual("S");
      expect(robot.coordinates).toEqual([0, 0]);
    });

    test("changes south to west", () => {
      robot.place({ direction: "S", x: 0, y: 0 });

      turnRight(robot);

      expect(robot.bearing).toEqual("W");
      expect(robot.coordinates).toEqual([0, 0]);
    });

    test("changes west to north", () => {
      robot.place({ direction: "W", x: 0, y: 0 });

      turnRight(robot);

      expect(robot.bearing).toEqual("N");
      expect(robot.coordinates).toEqual([0, 0]);
    });
  });

  describe("Rotating counter-clockwise", () => {
    const robot = new Robot();

    test("changes north to west", () => {
      robot.place({ direction: "N", x: 0, y: 0 });

      turnLeft(robot);

      expect(robot.bearing).toEqual("W");
      expect(robot.coordinates).toEqual([0, 0]);
    });

    test("changes west to south", () => {
      robot.place({ direction: "W", x: 0, y: 0 });

      turnLeft(robot);

      expect(robot.bearing).toEqual("S");
      expect(robot.coordinates).toEqual([0, 0]);
    });

    test("changes south to east", () => {
      robot.place({ direction: "S", x: 0, y: 0 });

      turnLeft(robot);

      expect(robot.bearing).toEqual("E");
      expect(robot.coordinates).toEqual([0, 0]);
    });

    test("changes east to north", () => {
      robot.place({ direction: "E", x: 0, y: 0 });

      turnLeft(robot);

      expect(robot.bearing).toEqual("N");
      expect(robot.coordinates).toEqual([0, 0]);
    });
  });

  describe("Moving forward one", () => {
    const robot = new Robot();

    test("advance when facing north", () => {
      robot.place({ direction: "N", x: 0, y: 0 });

      advance(robot);

      expect(robot.coordinates).toEqual([0, 1]);
      expect(robot.bearing).toEqual("N");
    });

    test("advance when facing south", () => {
      robot.place({ direction: "S", x: 0, y: 0 });

      advance(robot);

      expect(robot.coordinates).toEqual([0, -1]);
      expect(robot.bearing).toEqual("S");
    });

    test("advance when facing east", () => {
      robot.place({ direction: "E", x: 0, y: 0 });

      advance(robot);

      expect(robot.coordinates).toEqual([1, 0]);
      expect(robot.bearing).toEqual("E");
    });

    test("advance when facing west", () => {
      robot.place({ direction: "W", x: 0, y: 0 });

      advance(robot);

      expect(robot.coordinates).toEqual([-1, 0]);
      expect(robot.bearing).toEqual("W");
    });
  });

  describe("Follow series of instructions", () => {
    const robot = new Robot();

    test("moving east and north from README", () => {
      robot.place({ x: 7, y: 3, direction: "N" });

      robot.evaluate("RMMLML");

      expect(robot.coordinates).toEqual([9, 4]);
      expect(robot.bearing).toEqual("W");
    });

    test("moving west and north", () => {
      robot.place({ x: 0, y: 0, direction: "N" });

      robot.evaluate("LMMMRMLM");

      expect(robot.coordinates).toEqual([-4, 1]);
      expect(robot.bearing).toEqual("W");
    });

    test("moving west and south", () => {
      robot.place({ x: 2, y: -7, direction: "E" });

      robot.evaluate("RRMMMMMLM");

      expect(robot.coordinates).toEqual([-3, -8]);
      expect(robot.bearing).toEqual("S");
    });

    test("moving east and north", () => {
      robot.place({ x: 8, y: 4, direction: "S" });

      robot.evaluate("LMMMRRRMLLLL");

      expect(robot.coordinates).toEqual([11, 5]);
      expect(robot.bearing).toEqual("N");
    });

    test("instruct many robots", () => {
      const robot1 = new Robot();
      const robot2 = new Robot();
      robot1.place({ x: 0, y: 0, direction: "N" });
      robot2.place({ x: 2, y: -7, direction: "E" });

      robot1.evaluate("LMMMRMLM");
      robot2.evaluate("RRMMMMMLM");

      expect(robot1.coordinates).toEqual([-4, 1]);
      expect(robot1.bearing).toEqual("W");

      expect(robot2.coordinates).toEqual([-3, -8]);
      expect(robot2.bearing).toEqual("S");
    });
  });
});