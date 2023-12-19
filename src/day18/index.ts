import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput.split('\n');

const directionMap = {
  'R': [1, 0],
  'D': [0, 1],
  'L': [-1, 0],
  'U': [0, -1],
};

const directions = ['R', 'D', 'L', 'U'] satisfies Direction[];

type Direction = keyof typeof directionMap;
type Vertex = [x: number, y: number];
type Line = [direction: Direction, distance: number];

const parseLine = (line: string, useColor = false): Line => {
  const [direction, distance, color] = line.split(' ');
  if (!useColor) {
    return [direction as Direction, Number(distance)];
  }

  const hex = color.slice(2, -1); // (#F0F0F0) -> F0F0F0
  const hexDirection = directions[Number(hex[hex.length - 1])];
  const decDistance = parseInt(hex.slice(0, 5), 16);

  return [hexDirection, decDistance];
}

function calculateArea(vertices: Vertex[]) {
  let area = 0;

  for (let i = 0; i < vertices.length; i++) {
    const [x1, y1] = vertices[i];
    const [x2, y2] = vertices[(i + 1) % vertices.length];

    area += x1 * y2 - x2 * y1
  }

  return Math.abs(area / 2);
}

const getArea = (lines: Line[]) => {
  const vertices: Vertex[] = [[0, 0]];
  let totalLength = 0;
  let current: Vertex = [0, 0];
  for (const [direction, distance] of lines) {
    const dir = directionMap[direction];
    const newX = current[0] + (dir[0] * distance);
    const newY = current[1] + (dir[1] * distance)
    current = [newX, newY];
    totalLength += distance;
    vertices.push([newX, newY]);
  }
  return calculateArea(vertices) + Math.round(totalLength / 2) + 1;
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const lines = input.map(l => parseLine(l));
  return getArea(lines);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const lines = input.map(l => parseLine(l, true));
  return getArea(lines);
};

const input = `
R 6 (#70c710)
D 5 (#0dc571)
L 2 (#5713f0)
D 2 (#d2c081)
R 2 (#59c680)
D 2 (#411b91)
L 5 (#8ceee2)
U 2 (#caa173)
L 1 (#1b58a2)
U 2 (#caa171)
R 2 (#7807d2)
U 3 (#a77fa3)
L 2 (#015232)
U 2 (#7a21e3)
`;

run({
  part1: {
    tests: [
      {
        input,
        expected: 62,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input,
        expected: 952408144115,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
